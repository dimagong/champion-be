import { adminDB, admin } from "../util/admin.js"
// import { ArticleId } from "./../models/articleModel.js"

export const deleteArticle = async (req, res) => {
	const articlesRef = adminDB.collection("articles")

	try {
		const id = req.params.id
		const removedArticle = articlesRef.doc(id)
		await removedArticle.delete()
		return res.status(200).send({
			status: "success",
			message: "article deleted successfully",
			data: req.body,
		})
	} catch (error) {
		console.log("ERROR", error.message)
		return res.status(500).json({ general: "Something went wrong, please try again" })
	}
}
