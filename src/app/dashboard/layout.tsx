

import { NavbarDashboard } from "@/components/navbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarDashboard />
      {children}

    </div>
  );
}