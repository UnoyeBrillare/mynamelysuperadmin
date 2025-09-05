import useAuthStore from "@/store/auth-store";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Common types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Generic API error handler
export const handleApiError = (
  error: unknown,
  defaultMessage: string = "An error occurred"
): never => {
  if (axios.isAxiosError(error)) {
    const apiError: ApiError = {
      message: error.response?.data?.message || defaultMessage,
      errors: error.response?.data?.errors,
      status: error.response?.status || 500,
    };
    throw apiError;
  }
  throw new Error("An unexpected error occurred");
};

// Generic API request wrapper - this is all you need!
export const apiRequest = async <T = any>(
  requestFn: () => Promise<AxiosResponse<T>>,
  errorMessage: string = "Request failed"
): Promise<T> => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    return handleApiError(error, errorMessage);
  }
};
