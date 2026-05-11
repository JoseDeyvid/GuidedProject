import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type Filters = {
  type?: string;
  search?: string;
  page?: number;
};

export function useTransactions(filters?: Filters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      console.log("REQUEST!");
      const res = await api.get("/transactions", {
        params: filters,
      });

      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });
}
