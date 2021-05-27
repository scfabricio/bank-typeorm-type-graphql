import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import "./database/connect";

import { AccountResolver } from "./resolvers/AccountResolver";
import { UserResolver } from "./resolvers/UserResolver";

import { authChecker } from "./model/Auth";

dotenv.config();

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AccountResolver, 
        UserResolver
      ],
      authChecker 
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false, path: "/api" });

  app.listen(4000, () => {
    console.log("express serve started: localhost:4000" + apolloServer.graphqlPath);
  });
})();