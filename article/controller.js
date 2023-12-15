import { ObjectId } from "mongodb";
import { dbo } from "../utils/db.js";

export async function addArticle(req, res) {
  const article = req.body;
  article.articleprice = Number(article.articleprice);
  article.imagepath = req.file.path;
  await dbo.collection("article").insertOne(article);
  res.status(201).end();
}

export async function getAllArticles(req, res) {
  const articles = await dbo.collection("article").find().toArray();
  res.json(articles);
}

export async function deleteOneArticle(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Article Id is missing" });
    }

    //Wait & remove one movie
    const dbResponse = await dbo
      .collection("article")
      .deleteOne({ _id: new ObjectId() });
    //No Response handling
    if (!dbResponse) {
      return res.status(404).json({ message: "Article not found" });
    }
    //Confirmation back
    res
      .status(200)
      .json({ message: `Article with id= ${id} sucessfully deleted ✅` });
  } catch (error) {
    // Handle errors
    console.error(`Error deleting Article with id= ${id} ❌:`, error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
}
