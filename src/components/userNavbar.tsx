import { ListOrdered, User2Icon } from 'lucide-react';
import Link from 'next/link';

const UserNavbar = () => {
  return (
    <div className=" flex flex-col w-max my-5">
      <Link
        href="/user"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <User2Icon />
        <p >Profile</p>
      </Link>
      <Link
        href="/user/orders"
        className="my-1 px-5 border-2 border-solid border-gray-400 rounded p-2 flex items-center gap-2"
      >
        <ListOrdered />
        <p >My orders</p>
      </Link>


    </div>
  );
};

export default UserNavbar;
