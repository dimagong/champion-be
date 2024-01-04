import config from "./config.js"
import express from "express"
import cors from "cors"
import { articles } from "./services/articles.js"
import { createArticle } from "./services/createArticle.js"
import { updateArticle } from "./services/updateArticle.js"
import { deleteArticle } from "./services/deleteArticle.js"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/articles", articles)

app.post("/add", (req, res) => createArticle(req, res))

app.put("/update/:id", (req, res) => updateArticle(req, res))

app.delete("/delete/:id", (req, res) => deleteArticle(req, res))

app.listen(config.port, () => console.log(`Server is live @ ${config.hostUrl}`))
