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
exports.createArticle = void 0;
const admin_js_1 = require("../util/admin.js");
const articleModel_js_1 = require("../models/articleModel.js");
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const articlesRef = admin_js_1.adminDB.collection('articles');
    //const data = req.body
    const data = new articleModel_js_1.Article((_a = req.body) === null || _a === void 0 ? void 0 : _a.title, (_b = req.body) === null || _b === void 0 ? void 0 : _b.subTitle, (_c = req.body) === null || _c === void 0 ? void 0 : _c.content, (_d = req.body) === null || _d === void 0 ? void 0 : _d.url);
    const newArticle = articlesRef.doc();
    try {
        yield newArticle.set(Object.assign({}, data));
        return res.status(200).send({
            status: 'success',
            message: 'article added successfully',
            data: req.body,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('ERROR', error.message);
        }
        return res
            .status(500)
            .json({ general: 'Something went wrong, please try again' });
    }
});
exports.createArticle = createArticle;
