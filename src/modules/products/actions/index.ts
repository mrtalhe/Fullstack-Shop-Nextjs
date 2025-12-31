'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from '@/lib/slugify';
import { Product, ProductCategory } from '@/lib/generated/prisma';

const validationUpsertProduct = (data: Record<string, any>) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: 'name is required' }),
    description: z.string().min(1, { message: 'description is requried' }),
    price: z
      .number({ message: 'price is required' })
      .min(1, { message: 'price must be at least 1' }),
    quantity: z
      .number({ message: 'quantity is required' })
      .min(1, { message: 'quantity must be at least 1' })
      .max(1000, { message: 'quantity must be at most 1000' }),
    category: z.enum(Object.values(ProductCategory) as [string]),
  });

  const result = formSchema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    return errors;
  }

  return null;
};

export const upsertProduct = async (
  prevData: { data: Product | null; error: Record<string, string> | null },
  formData: FormData,
) => {
  const id = formData.get('id') as string | null;

  const productData = {
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: parseInt(formData.get('price') as string),
    quantity: parseInt(formData.get('quantity') as string),
    slug: slugify(formData.get('name') as string),
  } as Product;

  //validation

  const error = validationUpsertProduct(productData);
  if (error) {
    return { data: prevData.data, error };
  }
  try {
    let result;
    if (id) {
      result = await prisma.product.update({
        where: {
          id,
        },
        data: productData,
      });
    } else {
      result = await prisma.product.create({
        data: {...productData, 
          slug: slugify(productData.name),
        },
      });
    }

    revalidatePath('/dashboard/products');

    // return result;
    return { error: null, data: result };
  } catch (e) {
    return { data: prevData.data, error: { general: 'upsert failed' } };
  }
};
