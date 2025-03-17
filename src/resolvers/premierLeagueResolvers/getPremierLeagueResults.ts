import { Request, Response, NextFunction } from 'express'

export const getPremierLeagueResults = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = `https://footballapi.pulselive.com/football/standings?compSeasons=719&altIds=true&detail=2&FOOTBALL_COMPETITION=1&live=true`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return res.status(200).json(data.tables[0].entries)
    } catch (error) {
        next(error)
    }
}
