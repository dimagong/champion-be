import { adminDB, admin } from "./../util/admin.js"
import { db } from "./../util/firebase.js"
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
} from "firebase/firestore"
import { ArticleId, ArticlesContent, ArticleEntity } from "./../models/articleModel.js"

export const articles = async (req, res) => {
	const articlesRef = adminDB.collection("articles")

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
					//let content = { id, data: null }
					let content = { ...new ArticlesContent(id, null) }
					const dataContent = await Promise.all(
						collectionsDocId.map(async (el) => {
							const snapshot = await el.get()
							let snapshotData = []
							snapshot.forEach((doc) => {
								// snapshotData.push(doc.data())
								snapshotData.push({ ...new ArticleEntity(doc.data().question, doc.data().answer) })
							})
							return snapshotData
						})
					)
					content.data = [...dataContent]
					return content
				})
			)

			return mapContent
		}

		const completeContent = await collectContent()
		// console.log("competeContent  =>", completeContent)
		return res.status(200).json(completeContent)
	} catch (error) {
		return res.status(500).json({ general: "Something went wrong, please try again" })
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
