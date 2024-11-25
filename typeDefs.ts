import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: String,
    title: String,
    avatar: String,
    description: String
  }

  type ResponseCode {
    code: String,
    message: String
  }

  type Category {
    id: String,
    title: String,
    avatar: String
  }

  type Query {
    getListArticle: [Article],
    getArticle(id: String): Article,
    getListCategory: [Category],
    getCategory(id: String): Category,
  }

  input ArticleInput {
    title: String,
    avatar: String,
    description: String
  }

  input CategoryInput {
    title: String,
    avatar: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article,
    deleteArticle(id: String): ResponseCode,
    updateArticle(id: String, article: ArticleInput): Article,
    createCategory(category: CategoryInput): Category,
    deleteCategory(id: String): ResponseCode,
    updateCategory(id: String, category: CategoryInput): Category,
  }
`;