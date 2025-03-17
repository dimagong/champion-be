"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleId = exports.Article = exports.ArticlesContent = exports.ArticleEntity = void 0;
class ArticleEntity {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}
exports.ArticleEntity = ArticleEntity;
class ArticlesContent {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
}
exports.ArticlesContent = ArticlesContent;
class Article {
    constructor(title, subTitle, url, id) {
        this.title = title;
        this.subTitle = subTitle;
        this.url = url;
        this.id = id;
    }
}
exports.Article = Article;
class ArticleId extends Article {
    constructor(id, title, subTitle, url) {
        super(id, title, subTitle, url);
        this.id = id;
        this.content = null;
    }
}
exports.ArticleId = ArticleId;
