import { adminDB, admin } from '../../util/admin'
import { Request, Response, NextFunction } from 'express'
// import { ArticleId } from "./../models/articleModel.js"

export const deleteArticle = async (req: Request, res: Response) => {
    const articlesRef = adminDB.collection('articles')

    try {
        const id = req.params.id
        const removedArticle = articlesRef.doc(id)
        await removedArticle.delete()
        return res.status(200).send({
            status: 'success',
            message: 'article deleted successfully',
            data: req.body,
        })
    } catch (error) {
        throw error
    }
}
