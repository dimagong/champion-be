"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// type CustomError = {
//     status: number
//     message: string
//     context?: { [key: string]: any }
// }
const errorHandler = (req, res, next, error) => {
    if ('status' in error && error.status === 401) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    if ('status' in error && error.status === 404) {
        return res.status(404).send({ message: 'Not Found' });
    }
    if (error instanceof SyntaxError &&
        'status' in error &&
        error.status === 400 &&
        'body' in error) {
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    return res.status(500).send({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
