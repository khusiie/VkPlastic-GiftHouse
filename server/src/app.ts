import 'express-async-errors';
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import rootRouter from "./routes";
import { errorMiddlewarer } from './middlewares/error';



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

app.use(errorMiddlewarer)

export default app;
