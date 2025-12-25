import { Prisma } from '@prisma/client';

export type ProductsWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

export type CartWithProduct = Prisma.CartItemGetPayload<{
  include: { product: { include: { images: true } } };
}>;


export type MemberWithUser = Prisma.MemberGetPayload<{
  include: { user: true };
}>;
export type OrderWithProducts = Prisma.OrderGetPayload<{
  include: { products: true };
}>;




let paymentState = ['READY', 'PEDNDING', 'SUCCESS', 'CANCEL'];

export type memberRole = 'admin' | 'member' | 'owner';