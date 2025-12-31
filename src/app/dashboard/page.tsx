'use client';

import { LogOut } from 'lucide-react';
import DashboardSidebar from '@/components/dashboardSidebar';
import { Button } from '@/components/ui';
import { signOut } from '../../../server/users';
import { toast } from 'sonner';

export default function Dashboard() {
  const LogOutLogic = async () => {
    await signOut();
    toast('Successfully logged out');
    window.location.href = '/';
  };

  return (
    <div className="container flex flex-col sm:flex-row mx-auto">
      <div>
        <DashboardSidebar />
      </div>
      <div className="flex-grow p-4 my-5">Hello Admin</div>
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
  );
}
