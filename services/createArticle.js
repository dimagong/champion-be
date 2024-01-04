import { adminDB, admin } from "./../util/admin.js"
import { Article } from "./../models/articleModel.js"

export const createArticle = async (req, res) => {
	const articlesRef = adminDB.collection("articles")
	//const data = req.body
	const data = new Article(req.body?.title, req.body?.subTitle, req.body?.content, req.body?.url)

	const newArticle = articlesRef.doc()

	try {
		await newArticle.set({ ...data })
		return res.status(200).send({
			status: "success",
			message: "article added successfully",
			data: req.body,
		})
	} catch (error) {
		console.log("ERROR", error.message)
		return res.status(500).json({ general: "Something went wrong, please try again" })
	}
}
