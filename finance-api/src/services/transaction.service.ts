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

  // This commented function makes Node perform the calculation,
  // and the other makes the database perform the calculation; in this way,
  // the processing on the backend is reduced, making it faster and more scalable.

  // async summary(userId: string) {
  //   const transactions = await prisma.transaction.findMany({
  //     where: { userId },
  //   });
  //   const summary = transactions.reduce(
  //     (acc, transaction) => {
  //       if (transaction.type === "income") {
  //         acc.income += transaction.amount;
  //         acc.balance += transaction.amount;
  //       } else {
  //         acc.expense += transaction.amount;
  //         acc.balance -= transaction.amount;
  //       }
  //       return acc;
  //     },
  //     {
  //       income: 0,
  //       expense: 0,
  //       balance: 0,
  //     },
  //   );
  //   return summary;
  // }

  // The commented function makes Node perform the calculation,
  // and that makes the database perform the calculation; in this way,
  // the processing on the backend is reduced, making it faster and more scalable.
  async summary(userId: string) {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId,
          type: "income",
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: "expense",
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
}
