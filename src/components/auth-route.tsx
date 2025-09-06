import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/auth-store";

const isAuthenticated = true;

export const ProtectedRoute = ({ children }: { children: any }) => {
  // const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const PublicRoute = ({ children }: { children: any }) => {
  // const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    const redirectTo = "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
