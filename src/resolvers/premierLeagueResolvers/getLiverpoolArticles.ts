import { Request, Response, NextFunction } from 'express'

export const getLiverpoolArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const urls = [
        'https://backend.liverpoolfc.com/lfc-rest-api/news/virgil-van-dijks-message-after-carabao-cup-final-defeat',
        'https://backend.liverpoolfc.com/lfc-rest-api/news/march-internationals-guide-when-and-where-26-liverpool-players-are-action',
        'https://backend.liverpoolfc.com/lfc-rest-api/news/caoimhin-kelleher-were-bitterly-disappointed-its-tough-take',
        'https://backend.liverpoolfc.com/lfc-rest-api/news/liverpool-1-2-newcastle-watch-carabao-cup-final-match-action-and-full-replay',
    ]

    try {
        const articles = await Promise.all(
            urls.map(async (url) => {
                const response = await fetch(url)
                const data = await response.json()
                return {
                    title: data.title,
                    content: data.blocks[0].formattedText,
                    url:
                        data.blocks[1]?.image?.sizes?.xs.webpUrl ??
                        data.coverImage.sizes.xs.webpUrl,
                }
            })
        )
        return res.status(200).json(articles)
    } catch (error) {
        next(error)
    }
}
