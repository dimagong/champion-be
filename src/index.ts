import config from './config'
import express from 'express'
import cors from 'cors'
import { articles } from './services/articles'
import { createArticle } from './services/createArticle'
import { updateArticle } from './services/updateArticle'
import { deleteArticle } from './services/deleteArticle'
import { videoBestMoments } from './services/videoBestMoments'
import { imgBestMoments } from './services/imgBestMoments'
import {
    createPaymentSheet,
    getPublicKeyStripe,
} from './services/paymentMethod.js'
import { routerPremierLeague } from './routes/premierLeague'
import { errorHandler } from './util/errorHandler'
import { Request, Response, NextFunction } from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get(
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

app.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createArticle(req, res)
        next()
    } catch (err) {
        next(err)
    }
})

app.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        updateArticle(req, res)
    } catch (err) {
        next(err)
    }
})

app.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        deleteArticle(req, res)
    } catch (err) {
        next(err)
    }
})

app.get('/video', (req: Request, res: Response, next: NextFunction) => {
    try {
        videoBestMoments(req, res)
    } catch (err) {
        next(err)
    }
})

app.get('/img', (req: Request, res: Response, next: NextFunction) => {
    try {
        imgBestMoments(req, res)
    } catch (err) {
        next(err)
    }
})

app.post(
    '/payment-sheet',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            createPaymentSheet(req, res)
        } catch (err) {
            next(err)
        }
    }
)

app.get(
    '/payment-public-permission',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            getPublicKeyStripe(req, res)
        } catch (err) {
            next(err)
        }
    }
)
//=======
//====
//=
app.use('/premierLeague', routerPremierLeague)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(req, res, next, err)
})

//=======
//====
//=
app.listen(config.port, () => console.log(`Server is live @ ${config.hostUrl}`))
