export class ArticleEntity {
	constructor(question, answer) {
		this.question = question
		this.answer = answer
	}
}

export class ArticlesContent {
	constructor(id, data) {
		this.id = id
		this.data = data
	}
}

export class Article {
	constructor(title, subTitle, url, id) {
		this.title = title
		this.subTitle = subTitle
		this.url = url
		this.id = id
	}
}

export class ArticleId extends Article {
	constructor(id, title, subTitle, content, url) {
		super(title, subTitle, content, url)
		this.id = id
	}
}
