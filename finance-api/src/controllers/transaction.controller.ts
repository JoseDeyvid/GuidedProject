import { Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { stringify } from "csv-stringify/sync";

const transactionService = new TransactionService();

export class TransactionController {
  async create(req: AuthRequest, res: Response) {
    try {
      const { title, amount, type } = req.body;
      const userId = req.userId;
      if (!userId) throw new Error("Login is required!");
      const transaction = await transactionService.create(
        userId,
        title,
        amount,
        type,
      );
      return res.status(201).json(transaction);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { type, search, page, limit } = req.query;
      if (!userId) throw new Error("Login is required!");
      const transactions = await transactionService.listByUserId(userId, {
        type: type as string,
        search: search as string,
        page: Number(page) || 1,
        limit: Math.max(1, Math.min(Number(limit) || 10, 100)),
      });
      return res.json(transactions);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      if (!userId) throw new Error("Login is required!");
      await transactionService.delete(id, userId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async edit(req: AuthRequest, res: Response) {
    try {
      const { title, amount, type } = req.body;
      const { id } = req.params;
      const userId = req.userId;
      if (!userId) throw new Error("Login is required!");
      const editedTransaction = await transactionService.edit(
        id,
        userId,
        title,
        amount,
        type,
      );
      return res.json(editedTransaction);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async summary(req: AuthRequest, res: Response) {
    const userId = req.userId;
    if (!userId) throw new Error("Login is required!");
    const result = await transactionService.summary(userId);
    return res.json(result);
  }

  async exportCsv(req: AuthRequest, res: Response) {
    const userId = req.userId;
    if (!userId) throw new Error("Login is required!");
    const transactions = await transactionService.exportCsv(userId);

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,

      amount: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(transaction.amount),

      createdAt: new Intl.DateTimeFormat("pt-BR").format(
        new Date(transaction.createdAt),
      ),
      type: transaction.type === "income" ? "Receita" : "Despesa",
    }));

    const csv = stringify(formattedTransactions, {
      header: true,
      columns: ["id", "title", "amount", "type", "createdAt"],
    });

    res.header("Content-Type", "text/csv");

    res.attachment("transactions.csv");

    return res.send(csv);
  }
}
