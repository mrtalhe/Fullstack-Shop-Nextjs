import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const result = await prisma.product.findMany({ include: { images: true } });
  return NextResponse.json({
    data: result,
  });
}
