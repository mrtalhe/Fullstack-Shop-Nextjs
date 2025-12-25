import { PrismaClient } from '@prisma/client';
import type * as PrismaType from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
export type { PrismaType };
