import { adminDB, admin } from '../../util/admin'
import { Request, Response, NextFunction } from 'express'
// import { ArticleId } from "./../models/articleModel.js"

export const updateArticle = async (req: Request, res: Response) => {
    const articlesRef = adminDB.collection('articles')
    const data = req.body
    // const data = new ArticleId(req.body?.title, req.body?.subTitle, req.body?.content, req.body?.url)

    try {
        const id = req.params.id
        const upArticle = articlesRef.doc(id)
        await upArticle.update({
            ...data,
        })
        return res.status(200).send({
            status: 'success',
            message: 'article updated successfully',
            data: req.body,
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log('ERROR', error.message)
        }

        return res
            .status(500)
            .json({ general: 'Something went wrong, please try again' })
    }
}
