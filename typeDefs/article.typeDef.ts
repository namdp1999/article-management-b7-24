import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: String,
    title: String,
    avatar: String,
    description: String,
    categoryId: String,
    category: Category
  }

  type ResponseCode {
    code: String,
    message: String
  }

  type Query {
    getListArticle(
      sortKey: String,
      sortValue: String
    ): [Article],
    getArticle(id: String): Article,
  }

  input ArticleInput {
    title: String,
    avatar: String,
    description: String,
    categoryId: String,
  }

  type Mutation {
    createArticle(article: ArticleInput): Article,
    deleteArticle(id: String): ResponseCode,
    updateArticle(id: String, article: ArticleInput): Article,
  }
`;