import { apiClient } from "@/lib/api";

interface Params {
  search?: string;
  page?: number;
  limit?: number;
}

export const paymentApi = {
  getPayments: async (params?: Params) => {
    try {
      const { data } = await apiClient.get(`/admin/payment`, {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
