import 'express-async-errors';
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import rootRouter from "./routes";


const app = express();

// ── Standard Middlewares ──
app.use(express.json());
app.use(cors());

// ── Health check ──
app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "VivekPlastic server is running!" });
});

app.use("/api", rootRouter);
// ── 404 Handler for undefined routes ──
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route ${req.originalUrl} not found. Please check your URL!`,
    });
});

// ── 404 Handler ──
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });
});



export default app;
