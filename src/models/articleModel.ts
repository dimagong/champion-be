export class ArticleEntity {
    question: string
    answer: string
    constructor(question: string, answer: string) {
        this.question = question
        this.answer = answer
    }
}

export class ArticlesContent {
    id: string
    data: string[] | null

    constructor(id: string, data: string[] | null) {
        this.id = id
        this.data = data
    }
}

export class Article {
    title: string
    subTitle: string
    url: string
    id: string
    constructor(title: string, subTitle: string, url: string, id: string) {
        this.title = title
        this.subTitle = subTitle
        this.url = url
        this.id = id
    }
}

export class ArticleId extends Article {
    content: {
        id: string
        data: string[] | null
    } | null
    constructor(id: string, title: string, subTitle: string, url: string) {
        super(id, title, subTitle, url)
        this.id = id
        this.content = null
    }
}
