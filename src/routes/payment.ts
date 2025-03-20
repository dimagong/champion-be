import express, { Request, Response, NextFunction } from 'express'
import { articles } from '../resolvers/articlesResolvers/articles'
import { createArticle } from '../resolvers/articlesResolvers/createArticle'
import { updateArticle } from '../resolvers/articlesResolvers/updateArticle'
import { deleteArticle } from '../resolvers/articlesResolvers/deleteArticle'
import {
    createPaymentSheet,
    getPublicKeyStripe,
} from '../resolvers/paymentResolvers/paymentMethod'

export const routerPayment = express.Router()

const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Time payment: ', Date.now())
    next()
}
routerPayment.use(timeLog)

routerPayment.post(
    '/payment-sheet',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            createPaymentSheet(req, res)
        } catch (err) {
            next(err)
        }
    }
)

routerPayment.get(
    '/payment-public-permission',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            getPublicKeyStripe(req, res)
        } catch (err) {
            next(err)
        }
    }
)
