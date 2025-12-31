import { Prisma } from "@/lib/generated/prisma";


export type ProductsWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

export type CartWithProduct = Prisma.CartItemGetPayload<{
  include: { product: { include: { images: true } } };
}>;

export type OrderWithProducts = Prisma.OrderGetPayload<{
  include: { products: true };
}>;




let paymentState = ['READY', 'PEDNDING', 'SUCCESS', 'CANCEL'];

export type memberRole = 'admin' | 'member' | 'owner';