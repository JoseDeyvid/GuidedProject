import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type Filters = {
  type?: string;
  search?: string;
};

export function useTransactions(filters?: Filters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const res = await api.get("/transactions", {
        params: filters,
      });

      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });
}
