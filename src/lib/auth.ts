import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import ForgotPasswordEmail from '@/components/emails/reset-password';
import VerifyEmail from '@/components/emails/verify-email';
const resend = new Resend(process.env.RESEND_API_KEY as string);


export const auth = betterAuth({
  // email verify
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email',
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
  // google auth
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // auth with email and password
  emailAndPassword: {
    enabled: true,
    // reset password
    sendResetPassword: async ({ user, url }, request) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
    requireEmailVerification: false, // if you want to require email verification
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          return {
            data: {
              ...session,
            },
          };
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    nextCookies(),
  ],
});
