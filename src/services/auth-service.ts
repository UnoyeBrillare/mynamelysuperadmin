import { apiClient } from "@/lib/api";
import axios from "axios";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        `/admin/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || "Login failed",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        throw apiError;
      }
      throw new Error("An unexpected error occurred");
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get(`/admin`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || "Login failed",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        throw apiError;
      }
      throw new Error("An unexpected error occurred");
    }
  },

  // Forgot password
  forgotPassword: async (cred: any) => {
    try {
      const response = await apiClient.post(`/admin/forgot-password`, cred);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || "Forgot password failed",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        throw apiError;
      }
      throw new Error("An unexpected error occurred");
    }
  },

  // Reest password
  resetPassword: async (cred: any) => {
    try {
      const response = await apiClient.post(`/admin/reset-password`, cred);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || "Forgot password failed",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        throw apiError;
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
