import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDef"; 
import { resolvers } from "./resolvers/index.resolver";

const startServer = async () => {
  const app: any = express();
  const port: number = 3000;
  
  // GraphQL API
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
  
  await apolloServer.start();
  
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  });
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer();