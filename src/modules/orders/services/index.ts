"use server"

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const getOrders = async () => {
  const result = await prisma.order.findMany();
  return result;
};

export const deleteOrder = async (id: string) => {
  await prisma.order.delete({ where: { id } });
  redirect('/dashboard/orders');
};


export const changeOrderStateToSented = async (id: string) => {
  await prisma.order.update({
    where: { id },
    data: { state: "Sented" },
  })
  redirect('/dashboard/orders');
}
export const changeOrderStateToPending = async (id: string) => {
  await prisma.order.update({
    where: { id },
    data: { state: "Pending" },
  })
  redirect('/dashboard/orders');
}