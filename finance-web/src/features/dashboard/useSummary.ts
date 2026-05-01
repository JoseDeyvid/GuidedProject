import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useSummary() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await api.get("/transactions/summary");
      return res.data;
    },
  });
}
