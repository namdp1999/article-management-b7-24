import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDef"; 
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
  const app: any = express();
  const port: number = 3000;
  
  // GraphQL API
  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => {
      return {
        req: req
      };
    }
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