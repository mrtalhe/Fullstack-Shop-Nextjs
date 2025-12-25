import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../../../../server/users';
import { NextResponse } from 'next/server';
import { ZarinGateway } from '../../../../server/payment';

export const POST = async () => {
  const user = await getCurrentUser();

  if (!user.currentUser?.id) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: user.currentUser.id,
    },
    select: {
      id: true,
      payment: true,
      amount: true,
    },
  });

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart does not exist' }, { status: 400 });
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const paymentRequest = {
    amount: totalAmount,
    description: 'Product payment.',
    email: user.currentUser.email,
  };

  const { authority, code } = await ZarinGateway(paymentRequest);

  if (code !== 100 || typeof authority !== 'string') {
    return NextResponse.json(
      { error: 'Incomplete payment request!' },
      { status: 400 },
    );
  }

  let updatedCart;
  const cart  = await prisma.cartItem.findFirst({
    where: { userId: user.currentUser.id },
    select: { id: true, payment: true, amount: true },
  });

  if (cart?.payment) {
    updatedCart = await prisma.cartItem.update({
      where: { id: cart.id },
      data: {
        payment: {
          update: {
            authority,
            code,
            state: 'Ready',
          },
        },
      },
      include: { payment: true },
    });
  } else {
    updatedCart = await prisma.cartItem.update({
      where: { id: cart?.id },
      data: {
        payment: {
          create: {
            authority,
            code,
            state: 'Ready',
          },
        },
      },
      include: { payment: true },
    });
  }

  return NextResponse.json({ data: authority });
};
