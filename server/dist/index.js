"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./prisma");
const PORT = process.env.PORT || 5000;
// Test Database connection
async function checkDb() {
    try {
        await prisma_1.prismaClient.$connect();
        console.log(" Database connected via Prisma");
    }
    catch (err) {
        console.error(" Database connection error:", err.message);
        process.exit(1); // Exit if DB connection fails in production
    }
}
async function startServer() {
    await checkDb();
    app_1.default.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
        console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
startServer();
