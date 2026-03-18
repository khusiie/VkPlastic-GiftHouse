"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddlewarer = void 0;
const root_1 = require("../exceptions/root");
const errorMiddlewarer = (error, req, res, next) => {
    if (error instanceof root_1.HttpException) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
            errors: error.errors
        });
    }
    return res.status(500).json({
        message: 'Something went wrong',
        errors: error
    });
};
exports.errorMiddlewarer = errorMiddlewarer;
