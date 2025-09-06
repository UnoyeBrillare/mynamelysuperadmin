import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-secondary overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full overflow-auto ml-[300px]">
        <Header />
        <div className="container mx-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
