import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class AuthService {
  async register(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return user;
  }
}
