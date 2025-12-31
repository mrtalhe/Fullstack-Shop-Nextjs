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
import Link from 'next/link';
import { Trash2, UserCircle } from 'lucide-react';
import moment from 'moment';
import {
  changeRoleToAdmin,
  changeRoleToMember,
  deleteUser,
  GetUsers,
} from '../services';
import { User } from '@/lib/generated/prisma';
const UserTable = (props: { users: Awaited<ReturnType<typeof GetUsers>> }) => {
  const { users } = props;
  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4 container mx-auto">
      <div className="flex flex-col md:flex-row items-center p-4 justify-between border-b border-gray-200 gap-3">
        <h1 className="text-xl w-full md:w-auto text-center md:text-left">
          users
        </h1>

        <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
          <Button asChild>
            <Link href="/dashboard">Back</Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">SignUp Time</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>

              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">
                {moment(user.createdAt).fromNow()}
              </TableCell>
              <TableCell className="text-center">{user.role}</TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center gap-2 items-center">
                  <Button variant="ghost" asChild></Button>
                  <Button
                    variant="ghost"
                    className="bg-red-600"
                    onClick={async () => {
                      await deleteUser(user.id);
                    }}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-green-500"
                    onClick={async () => {
                      await changeRoleToAdmin(user.id);
                    }}
                  >
                    <UserCircle />
                    Admin
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-blue-500"
                    onClick={async () => {
                      await changeRoleToMember(user.id);
                    }}
                  >
                    <UserCircle />
                    Member
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Users: {users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserTable;
