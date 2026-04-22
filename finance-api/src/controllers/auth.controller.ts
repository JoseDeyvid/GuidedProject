import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.register(name, email, password);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userToken = await authService.login(email, password);
      return res.json(userToken);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
