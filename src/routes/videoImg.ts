import express, { Request, Response, NextFunction } from 'express'
import { videoBestMoments } from '../resolvers/videoImgResolvers/videoBestMoments'
import { imgBestMoments } from '../resolvers/videoImgResolvers/imgBestMoments'

export const routerVideoImg = express.Router()

const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Time routerVideoImg: ', Date.now())
    next()
}
routerVideoImg.use(timeLog)

routerVideoImg.get(
    '/video',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            videoBestMoments(req, res)
        } catch (err) {
            next(err)
        }
    }
)

routerVideoImg.get(
    '/img',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            imgBestMoments(req, res)
        } catch (err) {
            next(err)
        }
    }
)
