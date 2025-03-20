import config from './config'
import express from 'express'
import cors from 'cors'
import { routerPremierLeague } from './routes/premierLeague'
import { errorHandler } from './util/errorHandler'
import { Request, Response, NextFunction } from 'express'
import { routerArticles } from './routes/articles'
import { routerPayment } from './routes/payment'
import { routerVideoImg } from './routes/videoImg'

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

app.use(routerArticles)

app.use(routerPayment)

app.use(routerVideoImg)

app.use('/premierLeague', routerPremierLeague)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(req, res, next, err)
})

app.listen(config.port, () => console.log(`Server is live @ ${config.hostUrl}`))
