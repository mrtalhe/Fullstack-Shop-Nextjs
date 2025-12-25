'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import UserNavbar from '@/components/userNavbar';
import { OrderProduct, Product } from '@prisma/client';

async function fetchOrder(id: string) {
  const res = await fetch(`/api/orders/${id}`);
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
}

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['orderId', id],
    queryFn: () => fetchOrder(id as string),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading order</p>;

  return (
    <div className="container mx-auto p-4">
      <p className="text-lg text-green-800">
        Your order has been completed. You can now view your order details here.
      </p>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-50">
          <UserNavbar />
        </div>

        <div className="md:w-3/4 mt-6 md:mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Your order products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products?.map(
                (orderProduct: OrderProduct & { product: Product }) => (
                  <TableRow key={orderProduct.product.id}>
                    <TableCell>
                      <Link className='text-lg hover:text-blue-600' href={`/products/${orderProduct.product.slug}`}>
                        {orderProduct.product.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <Button>
            <Link href="/user/orders">Back to orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
