import express, { Request, Response, NextFunction } from 'express'
import { articles } from '../resolvers/articlesResolvers/articles'
import { createArticle } from '../resolvers/articlesResolvers/createArticle'
import { updateArticle } from '../resolvers/articlesResolvers/updateArticle'
import { deleteArticle } from '../resolvers/articlesResolvers/deleteArticle'

export const routerArticles = express.Router()

const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Time routerArticles: ', Date.now())
    next()
}
routerArticles.use(timeLog)

routerArticles.get(
    '/articles',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await articles(req, res)
            next()
        } catch (err) {
            next(err)
        }
    }
)

routerArticles.post(
    '/add',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createArticle(req, res)
            next()
        } catch (err) {
            next(err)
        }
    }
)

routerArticles.put(
    '/update/:id',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            updateArticle(req, res)
        } catch (err) {
            next(err)
        }
    }
)

routerArticles.delete(
    '/delete/:id',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            deleteArticle(req, res)
        } catch (err) {
            next(err)
        }
    }
)
