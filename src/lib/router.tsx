import RootLayout from "@/components/root";
import DashboardPage from "@/pages/dashbooard";
import LoginPage from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [{ element: <DashboardPage />, index: true }],
  },
]);
