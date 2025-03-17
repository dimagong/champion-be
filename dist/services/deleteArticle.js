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
exports.deleteArticle = void 0;
const admin_js_1 = require("../util/admin.js");
// import { ArticleId } from "./../models/articleModel.js"
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articlesRef = admin_js_1.adminDB.collection('articles');
    try {
        const id = req.params.id;
        const removedArticle = articlesRef.doc(id);
        yield removedArticle.delete();
        return res.status(200).send({
            status: 'success',
            message: 'article deleted successfully',
            data: req.body,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteArticle = deleteArticle;
