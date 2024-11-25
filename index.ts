import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import { Article } from "./models/article.model";

const app: Express = express();
const port: number = 3000;

// Rest API
app.get("/articles", async (req: Request, res: Response) => {
  const articles = await Article.find({
    deleted: false
  });

  res.json({
    articles: articles
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});