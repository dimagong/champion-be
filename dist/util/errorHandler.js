"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (req, res, next, error) => {
    console.log(error);
    const status = 'statusCode' in error ? Number(error.statusCode) : 500;
    const message = error.message;
    const data = 'data' in error ? error.data : {};
    res.status(status).json({ message: message, data: data });
};
exports.errorHandler = errorHandler;
