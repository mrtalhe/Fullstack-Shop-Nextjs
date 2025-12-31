import { NextResponse } from 'next/server';

import { getCurrentUser } from '../../../../../server/users';
import { prisma } from '@/lib/prisma';


export async function GET(req: Request) {
  const url = new URL(req.url);

  const authority = url.searchParams.get('Authority');
  const status = url.searchParams.get('Status');

  const user = await getCurrentUser();
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.currentUser?.id },
    include: { payment: true, product: true },
  });

  if (cartItems.length === 0) {
    return NextResponse.json(
      {
        code: 404,
        message: 'Invalid Payment request, no cart found!',
      },
      { status: 404 },
    );
  }

  if (status === 'OK') {
    // update oayment status
    await prisma.payment.update({
      where: { id: cartItems[0].payment!.id },
      data: { state: 'Paid', authority: authority },
    });

    // make order with products
    const order = await prisma.order.create({
      data: {
        userId: cartItems[0].userId,
        amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
        products: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price ?? 0,
          })),
        },
        payment: { connect: { id: cartItems[0].payment!.id } },

      },
      include: {
        payment: true,
        products: { include: { product: true } },
        user: true,
      },
    });

    // delete cart
    await prisma.cartItem.deleteMany({
      where: {
        userId: cartItems[0].userId,
      },
    });

    return NextResponse.redirect(new URL(`/user/order/${order.id}`, req.url));
  }
}
