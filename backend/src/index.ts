require("dotenv").config();
const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");
import GraphQLToolsTypes from "graphql-tools-types";

import { schema, resolvers } from "./service";

const PORT_SERVICE = 4000;

const cxt: any = {};

export const prepare = (schema: any, resolvers: any) =>
  makeExecutableSchema({
    typeDefs: [
      ...schema,
      `
    scalar JSON
    scalar DateTime
    scalar Date
    scalar UUID

    type Query {
      viewer: Viewer
    }

    type Mutation {
      viewer: ViewerMutations
    }

  `,
    ],
    resolvers: {
      ...resolvers,
      Date: GraphQLDate,
      DateTime: GraphQLDateTime,
      JSON: GraphQLToolsTypes.JSON({ name: "JSON" }),
      UUID: GraphQLToolsTypes.JSON({ name: "UUID" }),
      Query: {
        viewer: () => ({}),
      },
      Mutation: {
        viewer: () => ({}),
      },
    },
  });

try {
  (async () => {
    const server = new ApolloServer({ schema: prepare(schema, resolvers) });
    await server.start();

    const app: any = express();
    server.applyMiddleware({ app, path: "/backend/graphql" });

    app.use(bodyParser());
    app.use(cors());

    app.get("/backend/health", function (req: any, res: any) {
      res.send("ok");
    });

    console.log("Listen port " + PORT_SERVICE);
    app.listen({ port: PORT_SERVICE }, () => console.log("Node running"));
  })();
} catch (e) {
  console.error("service.error: " + e.toString());
}
