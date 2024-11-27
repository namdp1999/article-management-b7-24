import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
  type User {
    id: String,
    fullName: String,
    email: String,
    token: String,
    code: String,
    message: String
  }

  # type Query {
  #   getArticle(id: String): Article,
  # }

  input RegisterUserInput {
    fullName: String,
    email: String,
    password: String
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User,
  }
`;