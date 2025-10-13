import path from "path";
import { config as dotenvConfig } from "dotenv";
import type { PrismaConfig } from "prisma";

// Load environment variables from .env file
dotenvConfig();

const config: PrismaConfig = {
  schema: path.join("db", "prisma", "schema.prisma"),
  migrations: {
    path: path.join("db", "prisma", "migrations"),
  },
  // If you set custom generator options in it, or custom adapter, etc.
};

export default config;
