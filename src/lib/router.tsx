import { ProtectedRoute, PublicRoute } from "@/components/auth-route";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import RootLayout from "@/layouts/root-layout";
import DashboardPage from "@/pages/dashbooard";
import LoginPage from "@/pages/auth/login";
import PaymentsPage from "@/pages/payments";
import SettingsPage from "@/pages/settings";
import UserDetails from "@/pages/user-details";
import UsersPage from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { element: <DashboardPage />, index: true },
          { element: <UsersPage />, path: "users" },
          { element: <SettingsPage />, path: "settings" },
          { element: <PaymentsPage />, path: "payments" },
          { element: <UserDetails />, path: "users/:id" },
        ],
      },
      {
        path: "/",
        element: (
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        ),
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
