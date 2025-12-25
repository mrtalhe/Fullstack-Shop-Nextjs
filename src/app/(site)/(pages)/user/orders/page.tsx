'use client';

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
import { Order } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment'
const UserOrders = () => {

  async function fetchOrders() {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  }
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchOrders();
      setOrders(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container flex flex-col sm:flex-row mx-auto">
  
        <div className="flex-grow p-4">
          {orders.length === 0 ? (
            <p>you have not orders</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >Order State</TableHead>
                  <TableHead >َAmount</TableHead>
                  <TableHead >Order Time</TableHead>
                  <TableHead >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.state}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                      {moment(order.createdAt).fromNow()}

                    <TableCell>
                      <Button asChild>
                        <Link href={`/user/order/${order.id}`}>Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div>
          <Button className='my-5' asChild>
            <Link href="/user">Back</Link>
          </Button>
        </div>
    </div>
  );
};

export default UserOrders;
