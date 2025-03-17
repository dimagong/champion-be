import { Request, Response, NextFunction } from 'express'
export const getPremierLeagueCompetitions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = `https://footballapi.pulselive.com/football/competitions/1/compseasons?page=0&pageSize=100`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
