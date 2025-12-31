import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from "@/lib/generated/prisma";
import type * as PrismaType from "@/lib/generated/prisma";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
export type { PrismaType };