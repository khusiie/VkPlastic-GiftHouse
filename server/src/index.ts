import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prismaClient } from "./prisma";

const PORT = process.env.PORT || 5000;

// Test Database connection
async function checkDb() {
  try {
    await prismaClient.$connect();
    console.log(" Database connected via Prisma");
  } catch (err: any) {
    console.error(" Database connection error:", err.message);
    process.exit(1); // Exit if DB connection fails in production
  }
}

async function startServer() {
  await checkDb();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
