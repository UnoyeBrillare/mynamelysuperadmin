import RootLayout from "@/components/root";
import DashboardPage from "@/pages/dashbooard";
import LoginPage from "@/pages/login";
import PaymentsPage from "@/pages/payments";
import SettingsPage from "@/pages/settings";
import UserDetails from "@/pages/user-details";
import UsersPage from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { element: <DashboardPage />, index: true },
      { element: <UsersPage />, path: "users" },
      { element: <SettingsPage />, path: "settings" },
      { element: <PaymentsPage />, path: "payments" },
      { element: <UserDetails />, path: "users/:id" },
    ],
  },
]);
