import { Request, Response, NextFunction } from 'express'

export const getLiverpoolMatchesResults = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url =
        'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=10&statuses=C&pageSize=5&page=0&altIds=true&sort=DESCENDING'
    try {
        const response = await fetch(url)
        const data = await response.json()

        const result = data.content.map((ct: any) => {
            return {
                homeTeam: ct.teams[0].team.shortName,
                guestTeam: ct.teams[1].team.shortName,
                score: `${ct.teams[0].score} - ${ct.teams[1].score}`,
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
