'use client';

import UserNavbar from '@/components/userNavbar';
import { useQuery } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { signOut } from '../../../../../server/users';
import { toast } from 'sonner';
import { Button } from '@/components/ui';

const UserPage = () => {
  const LogOutLogic = async () => {
    await signOut();
    toast('succesfuly you log outed');
    window.location.href = '/';
  };
  async function fetchCurrentUser() {
    const res = await fetch('/api/me');
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });

  const user = data?.currentUser;
  return (
    <div>
      <div className="container flex flex-col sm:flex-row mx-auto items-center">
        <div>
          <UserNavbar />
        </div>
        <div className="flex-grow  p-4 my-5">Hello {user?.name}</div>
        <div></div>
        <div className="my-5">
          <Button
            onClick={LogOutLogic}
            className="flex text-lg bg-color-white hover:bg-color-white text-red-600"
          >
            Log Out
            <LogOut className="color-red-500 mx-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
