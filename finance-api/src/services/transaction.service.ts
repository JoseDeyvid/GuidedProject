import { prisma } from "../lib/prisma";

export class TransactionService {
  async create(userId: string, title: string, amount: number, type: string) {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        title,
        type,
        userId,
      },
    });
    return transaction;
  }

  async listByUserId(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return transactions;
  }

  async delete(id: string, userId: string) {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction || transaction.userId !== userId)
      throw new Error("Not authorized!");
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });

    return deletedTransaction;
  }
}
