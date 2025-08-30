import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function RootLayout() {
  return (
    <div className="flex bg-secondary">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="container p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
