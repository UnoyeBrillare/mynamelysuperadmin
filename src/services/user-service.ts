import { apiClient } from "@/lib/api";

interface GetUsersParams {
  search?: string;
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  plan?: string;
}

export const userApi = {
  getUsers: async (params?: GetUsersParams) => {
    try {
      const { data } = await apiClient.get(`/admin/all-users`, {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  getOneUser: async (userId: string) => {
    try {
      const { data } = await apiClient.get(`/admin/all-users/${userId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  getUserStats: async (startDate: string, endDate: string) => {
    try {
      const { data } = await apiClient.get(`/admin/stats`, {
        params: { startDate, endDate },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getSubscriptionStats: async (startDate: string, endDate: string) => {
    try {
      const { data } = await apiClient.get(`/admin/stats`, {
        params: { startDate, endDate },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
