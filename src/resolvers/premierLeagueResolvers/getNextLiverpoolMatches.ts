import { Request, Response, NextFunction } from 'express'
import moment from 'moment'

export const getNextLiverpoolMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const startDate = moment().format('YYYY-MM-DD')
    const url = `https://footballapi.pulselive.com/football/fixtures?comps=1&teams=10&statuses=U,L&pageSize=5&startDate=${startDate}&page=0&altIds=true&sort=ASCENDING`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return res.status(200).json(data.content)
    } catch (error) {
        next(error)
    }
}
