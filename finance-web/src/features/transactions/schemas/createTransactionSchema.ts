import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  amount: z.number().positive("Valor deve ser maior que 0"),
  type: z.enum(["income", "expense"]),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
