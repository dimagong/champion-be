import { adminDB, admin } from '../util/admin'
import { db } from '../util/firebase'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    collectionGroup,
} from 'firebase/firestore'
import {
    ArticleId,
    ArticlesContent,
    ArticleEntity,
} from '../models/articleModel'
import { Request, Response, NextFunction } from 'express'

export const articles = async (req: Request, res: Response) => {
    const articlesRef = adminDB.collection('articles')

    try {
        // const snapshotArticles = await articlesRef.get()
        // const snapshotArticlesDocs = snapshotArticles.docs
        // const data = snapshotArticlesDocs.map((doc) => {
        // 	return {
        // 		...new ArticleId(doc.data().id, doc.data().title, doc.data().subtitle, doc.data().url),
        // 	}
        // })

        const listArticlesRefs = await articlesRef.get()

        const listCollectionsDocs = listArticlesRefs.docs

        const docIdx = listCollectionsDocs.map((doc) => doc.id)

        const collectContent = async () => {
            const mapContent = await Promise.all(
                docIdx.map(async (id) => {
                    const docById = articlesRef.doc(id)
                    const collectionsDocId = await docById.listCollections()
                    let content = { ...new ArticlesContent(id, null) }
                    const dataContent = await Promise.all(
                        collectionsDocId.map(async (el) => {
                            const snapshot = await el.get()
                            let snapshotData: any[] | PromiseLike<any[]> = []
                            snapshot.forEach((doc) => {
                                snapshotData.push({
                                    ...new ArticleEntity(
                                        doc.data().question,
                                        doc.data().answer
                                    ),
                                })
                            })
                            return snapshotData
                        })
                    )
                    content.data = [...dataContent].flat()
                    return content
                })
            )

            return mapContent
        }

        const completeContent = await collectContent()

        const articles = listCollectionsDocs.map((doc) => {
            return {
                ...new ArticleId(
                    doc.id,
                    doc.data().title,
                    doc.data().subtitle,
                    doc.data().url
                ),
            }
        })

        articles.forEach((article) => {
            const findContent = completeContent.find(
                (content) => content.id === article.id
            )
            if (findContent) {
                article.content = { ...findContent }
            }
        })

        return res.status(200).json(articles)
    } catch (error) {
        return res
            .status(500)
            .json({ general: 'Something went wrong, please try again' })
    }
}

// export const articles = async (req, res, next) => {
// 	try {
// 		const articles = await getDocs(collection(db, "articles"))
// 		console.log("articles", articles)
// 		const articlesArray = []

// 		if (articles.empty) {
// 			res.status(400).send("No Products found")
// 		} else {
// 			articles.forEach((doc) => {
// 				const article = new Article(
// 					doc.data().title,
// 					doc.data().subtitle,
// 					doc.data().content,
// 					doc.data().url
// 				)
// 				articlesArray.push(article)
// 			})

// 			res.status(200).send(articlesArray)
// 		}
// 	} catch (error) {
// 		res.status(400).send(error.message)
// 	}
// }
