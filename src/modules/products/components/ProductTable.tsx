'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct, getProducts } from '../services';
import { Pagination } from '@/components/pagination';
import { useState } from 'react';

const ProductTable = (props: {
  products: Awaited<ReturnType<typeof getProducts>>;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const { products } = props;

  // calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const onDeleteProduct = (id: string) => {
    deleteProduct(id);
    window.location.href = '/dashboard/products';
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg shadow-md mt-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center p-4 justify-between border-b border-gray-200 gap-3">

          <h1 className="text-xl w-full md:w-auto text-center md:text-left">
            Products
          </h1>

          <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
            <Button asChild>
              <Link href="/dashboard/products/new">
                Add New Product
                <PlusCircle />
              </Link>
            </Button>

            <Button asChild>
              <Link href="/dashboard">
                Back
                <PlusCircle />
              </Link>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.category}
                </TableCell>
                <TableCell className="text-center">{product.price}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center">
                  <Image
                    src={product.images[0]?.image || '/assets/noImage.jpg'}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-full m-auto"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2 items-center">
                    <Button variant="ghost" asChild>
                      <Link href={`/dashboard/products/${product.id}`}>
                        <Edit />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onDeleteProduct(product.id);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                Total Products: {paginatedProducts.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="justify-center flex">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};
export default ProductTable;
