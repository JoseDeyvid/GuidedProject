import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateTransactionData = {
  id: string;
  title: string;
  amount: number;
  type: string;
};

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateTransactionData) => {
      const res = await api.put(`/transactions/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
}
