import express from 'express'
import { getPremierLeagueCompetitions } from '../resolvers/premierLeagueResolvers/getPremierLeagueCompetitions'
import { getPremierLeagueResults } from '../resolvers/premierLeagueResolvers/getPremierLeagueResults'
import { Request, Response, NextFunction } from 'express'
import { getNextLiverpoolMatches } from '../resolvers/premierLeagueResolvers/getNextLiverpoolMatches'
import { getLiverpoolMatchesResults } from '../resolvers/premierLeagueResolvers/getLiverpoolMatchesResults'
import { getLiverpoolArticles } from '../resolvers/premierLeagueResolvers/getLiverpoolArticles'

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

routerPremierLeague.get('/nextMatches', async (req, res, next) => {
    await getNextLiverpoolMatches(req, res, next)
})

routerPremierLeague.get('/liverpoolMatchesResults', async (req, res, next) => {
    await getLiverpoolMatchesResults(req, res, next)
})

routerPremierLeague.get('/liverpoolArticles', async (req, res, next) => {
    await getLiverpoolArticles(req, res, next)
})
