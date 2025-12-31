'use client';



import { changeOrderStateToPending, changeOrderStateToSented, deleteOrder, getOrders } from '../services';
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
import Link from 'next/link';
import { Backpack, Edit, PlusCircle, Trash2 } from 'lucide-react';
import moment from 'moment';
import { Order } from '@/lib/generated/prisma';
const OrderTable = (props: {
  orders: Awaited<ReturnType<typeof getOrders>>;
}) => {
  const { orders } = props;
  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4 container mx-auto">
      <div className="flex flex-col md:flex-row items-center p-4 justify-between border-b border-gray-200 gap-3">

        <h1 className="text-xl w-full md:w-auto text-center md:text-left">
          Orders
        </h1>

        <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">

          <Button asChild>
            <Link href="/dashboard">
              Back
            </Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrderId</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">State</TableHead>
            <TableHead className="text-center">Order Time</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: Order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-center">{order.amount}</TableCell>
              <TableCell className="text-center">
                {order.state}
                <Button
                  onClick={async () => {
                    await changeOrderStateToSented(order.id)
                  }}
                  className='mx-2'>Change To Completed</Button>
                <Button
                  onClick={async () => {
                    await changeOrderStateToPending(order.id)
                  }}
                  className='mx-2'>Change To Pending</Button>
              </TableCell>
              <TableCell className="text-center">
                {moment(order.createdAt).fromNow()}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2 items-center">
                  <Button variant="ghost" asChild>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await deleteOrder(order.id);
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
            <TableCell colSpan={5}>Total Orders: {orders.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrderTable;
