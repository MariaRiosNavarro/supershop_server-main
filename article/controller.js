import { dbo } from "../utils/db.js"

export async function addArticle(req, res) {
    const article = req.body
    article.articleprice = Number(article.articleprice)
    article.imagepath = req.file.path
    await dbo.collection('article').insertOne(article)
    res.status(201).end()
}

export async function getAllArticles(req, res) {
    const articles = await dbo.collection('article').find().toArray()
    res.json(articles)
}