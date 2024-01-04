export class Article {
	constructor(title, subTitle, content, url) {
		this.title = title
		this.subTitle = subTitle
		this.content = content
		this.url = url
	}
}

export class ArticleId extends Article {
	constructor(id, title, subTitle, content, url) {
		super(title, subTitle, content, url)
		this.id = id
	}
}
