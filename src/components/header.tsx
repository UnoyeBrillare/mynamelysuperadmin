import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { JSX } from "react";
import useAuthStore from "@/store/auth-store";

// Define page-specific header configurations
interface HeaderConfig {
  title: string;
  // Function to generate components, taking navigate as a parameter
  getComponents?: (navigate: ReturnType<typeof useNavigate>) => JSX.Element[];
}

const headerConfig: Record<string, HeaderConfig> = {
  "admin-settings": {
    title: "Admin Settings",
    getComponents: (navigate) => [
      <Button
        key="roles"
        onClick={() => navigate("/admin-settings/add")}
        variant="default"
        className="py-6"
      >
        Set Roles and Permissions
      </Button>,
    ],
  },
  dashboard: {
    title: "Dashboard",
  },
  users: {
    title: "Users",
  },
  payments: { title: "Payments" },
  default: { title: "Dashboard" },
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Get the current page key from pathname
  const getPageKey = (pathname: string): string => {
    const path = pathname.split("/").filter(Boolean).pop() || "dashboard";
    return path.toLowerCase();
  };

  // Get config for the current page, fallback to default
  const pageKey = getPageKey(location.pathname);
  const config = headerConfig[pageKey] || headerConfig.default;

  // Generate components for the current page, passing navigate
  const components = config.getComponents ? config.getComponents(navigate) : [];

  return (
    <header className="h-[100px] w-full bg-white border-b flex items-center justify-between px-10">
      <h1 className="text-2xl font-bold">{config.title}</h1>
      <div className="flex items-center gap-4">
        {components.map((component) => component)}
        <div
          className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white font-bold"
          aria-label="User profile"
        >
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </div>
      </div>
    </header>
  );
}
