import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userOrders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  
  return NextResponse.json(userOrders);
}