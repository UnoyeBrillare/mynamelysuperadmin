import { apiClient } from "@/lib/api";

interface GetUsersParams {
  search?: string;
  page: number;
  limit: number;
}

export const adminApi = {
  addAdmin: async (payload: GetUsersParams) => {
    try {
      const { data } = await apiClient.post(`/admin/add`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAdmins: async (params?: GetUsersParams) => {
    try {
      const { data } = await apiClient.get(`/admin/all`, {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
