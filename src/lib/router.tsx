import { ProtectedRoute, PublicRoute } from "@/components/auth-route";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import RootLayout from "@/layouts/root-layout";
import DashboardPage from "@/pages/dashbooard";
import LoginPage from "@/pages/auth/login";
import PaymentsPage from "@/pages/payments";
import SettingsPage from "@/pages/settings";
import UsersPage from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";
import AdminDetailsPage from "@/pages/admin-details";
import UserDetailsPage from "@/pages/user-details";
import AddAdminPage from "@/pages/add-amdin";
import ForgotPasswordPage from "@/pages/auth/forgot-password";

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
          { element: <SettingsPage />, path: "admin-settings" },
          { element: <PaymentsPage />, path: "payments" },
          { element: <UserDetailsPage />, path: "users/:id" },
          { element: <AddAdminPage />, path: "admin-settings/add" },
          { element: <AdminDetailsPage />, path: "admin-settings/:id" },
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
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
  },
]);
