import { NextFunction, Request, Response } from "express"
import { HttpException } from "../exceptions/root"

export const errorMiddlewarer = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpException) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
            errors: error.errors
        })
    }

    return res.status(500).json({
        message: 'Something went wrong',
        errors: error
    })
}
