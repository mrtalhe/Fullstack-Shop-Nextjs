"use client";

import { LayoutDashboard, ListOrderedIcon, ShoppingBag, User2Icon } from 'lucide-react';
import Link from 'next/link';

const DashboardSidebar = () => {
  return (
    <div className=" flex flex-col w-max my-5 border-2 border-solid border-gray-400 rounded p-5">
      <Link
        href="/dashboard"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <LayoutDashboard className='text-blue-600' />
        <p >dashboard</p>
      </Link>
      <Link
        href="/dashboard/products"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <ShoppingBag className='text-blue-600' />
        <p >Products</p>
      </Link>
      <Link
        href="/dashboard/orders"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <ListOrderedIcon className='text-blue-600' />
        <p >Orders</p>
      </Link>
      <Link
        href="/dashboard/users"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <User2Icon className='text-blue-600' />
        <p >Users</p>
      </Link>


    </div>
  );
};

export default DashboardSidebar;
