//GET,POST,DELETE Cart

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../../../../server/users';
import { Product } from '@prisma/client';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  const userId = user.user?.id;
  if (userId) {
    const cartItem = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(cartItem);
  }
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const userId = user.user?.id;
  // check user
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // get Product Id
  const { productId } = await req.json();
  // find Product
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  // check Product
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  // check existing cart
  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });

if (existingCartItem) {
  const updatedItem = await prisma.cartItem.update({
    where: { id: existingCartItem.id },
    data: {
      quantity: existingCartItem.quantity + 1,
      amount: (existingCartItem.quantity + 1) * (product?.price || 0),
    },
  });
  return NextResponse.json(updatedItem);
} else {
  // create cart
  const newCartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity: 1,
      amount: 1 * (product?.price || 0),
    },
  });

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
  });
  // calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);

  return NextResponse.json({ newCartItem, totalAmount });
}
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  const userId = user.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (!existingCartItem) {
    return NextResponse.json(
      { error: 'cart item does not exist' },
      { status: 400 },
    );
  }
  if (existingCartItem) {
    const deletedItem = await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
      include: { payment: true, product: true },
    });

    return NextResponse.json(deletedItem);
  }
}
