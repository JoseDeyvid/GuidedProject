import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const transactionController = new TransactionController();

// Create transaction
router.post("/", authMiddleware, (req, res) =>
  transactionController.create(req, res),
);
// Get user transactions
router.get("/", authMiddleware, (req, res) =>
  transactionController.list(req, res),
);
// Delete transaction
router.delete("/:id", authMiddleware, (req, res) =>
  transactionController.delete(req, res),
);
// Edit transaction
router.put("/:id", authMiddleware, (req, res) =>
  transactionController.edit(req, res),
);
// Get user summary of transactions
router.get("/summary", authMiddleware, (req, res) =>
  transactionController.summary(req, res),
);

// Export all transactions to csv
router.get("/export/csv", authMiddleware, (req, res) =>
  transactionController.exportCsv(req, res),
);

export default router;
