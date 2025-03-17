import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
    error: Error
) => {
    console.log(error)
    const status = 'statusCode' in error ? Number(error.statusCode) : 500
    const message = error.message
    const data = 'data' in error ? error.data : {}
    res.status(status).json({ message: message, data: data })
}
