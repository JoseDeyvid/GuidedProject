import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// cria pool de conexão
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// cria adapter
const adapter = new PrismaPg(pool);

// passa pro PrismaClient
export const prisma = new PrismaClient({
  adapter,
});
