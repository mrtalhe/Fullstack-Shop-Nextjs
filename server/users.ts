'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: 'Signed in successfully.',
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'An unknown error occurred.',
    };
  }
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
      },
    });

    return {
      success: true,
      message: 'Signed up successfully.',
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'An unknown error occurred.',
    };
  }
};
export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: 'successfully logout.',
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'An unknown error occurred.',
    };
  }
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = await prisma.user.findFirst({
    where: { id: session?.user.id },
  });

  return {
    ...session,
    currentUser,
  };
};

export const userSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};


