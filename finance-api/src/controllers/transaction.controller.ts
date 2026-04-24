import { Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { AuthRequest } from "../middlewares/auth.middleware";

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
      if (!userId) throw new Error("Login is required!");
      const transactions = await transactionService.listByUserId(userId);
      return res.json(transactions);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: AuthRequest<{ id: string }>, res: Response) {
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

  async summary(req: AuthRequest, res: Response) {
    const userId = req.userId;
    if (!userId) throw new Error("Login is required!");
    const result = await transactionService.summary(userId);
    return res.json(result);
  }
}
