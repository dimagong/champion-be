import express from 'express'
import { getPremierLeagueCompetitions } from '../resolvers/premierLeagueResolvers/getPremierLeagueCompetitions.js'
import { getPremierLeagueResults } from '../resolvers/premierLeagueResolvers/getPremierLeagueResults.js'
import { Request, Response, NextFunction } from 'express'

export const routerPremierLeague = express.Router()

const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Time routerPremierLeague: ', Date.now())
    next()
}
routerPremierLeague.use(timeLog)

routerPremierLeague.get('/competitions', async (req, res, next) => {
    await getPremierLeagueCompetitions(req, res, next)
})
routerPremierLeague.get('/results', async (req, res, next) => {
    await getPremierLeagueResults(req, res, next)
})
