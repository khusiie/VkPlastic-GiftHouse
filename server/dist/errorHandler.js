"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const root_1 = require("./exceptions/root");
const InternalException_1 = require("./exceptions/InternalException");
const zod_1 = require("zod");
const validation_1 = require("./exceptions/validation");
const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HttpException) {
                exception = error;
            }
            else {
                if (error instanceof zod_1.ZodError) {
                    exception = new validation_1.UnprocessableEntity(error.issues, 'Unprocessable entity', root_1.ErrorCode.UNPROCESSABLE_Entity);
                }
                else {
                    exception = new InternalException_1.InternalException('Something went wrong', error, root_1.ErrorCode.INTERNAL_EXCEPTION);
                }
            }
            next(exception);
        }
    };
};
exports.errorHandler = errorHandler;
