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
} from "firebase/firestore"
import { ArticleId } from "./../models/articleModel.js"

export const articles = async (req, res) => {
	const articlesRef = adminDB.collection("articles")
	try {
		const snapshot = await articlesRef.get()
		const data = snapshot.docs.map((doc) => ({
			...new ArticleId(
				doc.data().id,
				doc.data().title,
				doc.data().subtitle,
				doc.data().content,
				doc.data().url
			),
		}))
		console.log(data)
		return res.status(201).json(data)
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
