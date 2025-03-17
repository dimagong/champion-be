import { Request, Response, NextFunction } from 'express'

export const getNextLiverpoolMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url =
        'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=10&statuses=U,L&pageSize=5&startDate=2025-03-17&page=0&altIds=true&sort=ASCENDING'
    try {
        const response = await fetch(url)
        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
