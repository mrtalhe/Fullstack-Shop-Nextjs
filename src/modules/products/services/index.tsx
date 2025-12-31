'use server';

import { Product } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  return result;
};

export const getProductsApi = async () => {
  const result = await fetch('http://localhost:3000/api/product', {
    next: { revalidate: 30 },
  });
  const response = result.json();
  return response;
};

export const getProductById = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }

  return result;
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { images: true },
  });
  return product;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath('/dashboard/products');

  return result;
};

export const lastProducts = async () => {
  const result = await prisma.product.findMany({
    take: 8,
    include: { images: true },
  });
  return result;
};
