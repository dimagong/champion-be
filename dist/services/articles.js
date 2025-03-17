"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articles = void 0;
const admin_1 = require("../util/admin");
const articleModel_1 = require("../models/articleModel");
const articles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articlesRef = admin_1.adminDB.collection('articles');
    try {
        // const snapshotArticles = await articlesRef.get()
        // const snapshotArticlesDocs = snapshotArticles.docs
        // const data = snapshotArticlesDocs.map((doc) => {
        // 	return {
        // 		...new ArticleId(doc.data().id, doc.data().title, doc.data().subtitle, doc.data().url),
        // 	}
        // })
        const listArticlesRefs = yield articlesRef.get();
        const listCollectionsDocs = listArticlesRefs.docs;
        const docIdx = listCollectionsDocs.map((doc) => doc.id);
        const collectContent = () => __awaiter(void 0, void 0, void 0, function* () {
            const mapContent = yield Promise.all(docIdx.map((id) => __awaiter(void 0, void 0, void 0, function* () {
                const docById = articlesRef.doc(id);
                const collectionsDocId = yield docById.listCollections();
                let content = Object.assign({}, new articleModel_1.ArticlesContent(id, null));
                const dataContent = yield Promise.all(collectionsDocId.map((el) => __awaiter(void 0, void 0, void 0, function* () {
                    const snapshot = yield el.get();
                    let snapshotData = [];
                    snapshot.forEach((doc) => {
                        snapshotData.push(Object.assign({}, new articleModel_1.ArticleEntity(doc.data().question, doc.data().answer)));
                    });
                    return snapshotData;
                })));
                content.data = [...dataContent].flat();
                return content;
            })));
            return mapContent;
        });
        const completeContent = yield collectContent();
        const articles = listCollectionsDocs.map((doc) => {
            return Object.assign({}, new articleModel_1.ArticleId(doc.id, doc.data().title, doc.data().subtitle, doc.data().url));
        });
        articles.forEach((article) => {
            const findContent = completeContent.find((content) => content.id === article.id);
            if (findContent) {
                article.content = Object.assign({}, findContent);
            }
        });
        return res.status(200).json(articles);
    }
    catch (error) {
        return res
            .status(500)
            .json({ general: 'Something went wrong, please try again' });
    }
});
exports.articles = articles;
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
