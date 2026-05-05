import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      amount: number;
      type: string;
    }) => {
      const res = await api.post("/transactions", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
}
