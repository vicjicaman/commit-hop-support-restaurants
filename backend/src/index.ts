require("dotenv").config();
const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");
import GraphQLToolsTypes from "graphql-tools-types";

const awilix = require("awilix");

import search from "utils/search";
import { schema, resolvers } from "./service";

import Database from "drivers/db";
import RestaurantController from "controllers/restaurants";
import makeUserService from "services/restaurants";

const PORT_SERVICE = 4000;

const cxt: any = {};

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

const DATABASE_URL = process.env.DATABASE_URL;

container.register({
  restaurantController: awilix.asClass(RestaurantController),
  restaurantService: awilix.asFunction(makeUserService),
  db: awilix.asClass(Database).classic(),
  connectionString: awilix.asValue(DATABASE_URL),
  timeout: awilix.asValue(1000),
});

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
        viewer: () => ({ id: "viewer" }),
      },
      Mutation: {
        viewer: () => ({ id: "viewer" }),
      },
    },
  });

try {
  (async () => {
    const server = new ApolloServer({
      schema: prepare(schema, resolvers),
      context: { container },
    });
    await server.start();

    const app: any = express();
    server.applyMiddleware({ app, path: "/backend/graphql" });

    app.use(bodyParser());
    app.use(cors());

    app.get("/backend/health", function (req: any, res: any) {
      res.send("ok");
    });

    app.get("/backend/test", async function (req: any, res: any) {
      const index_name = "restaurants";

      const resOps = [];
      try {
        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 1,
            },
          },
        };

        var response = await search.indices.create({
          index: index_name,
          body: settings,
        });

        resOps.push(response.body);
      } catch (e) {
        resOps.push(e.toString());
      }

      const data: any[] = [];

      for (const rs of data) {
        const { id, name, description, latitude, longitude, images } = rs;

        var response = await search.index({
          id,
          index: index_name,
          body: { id, name, description, latitude, longitude, images },
          refresh: true,
        });

        resOps.push(response.body);
      }

      res.send(JSON.stringify(resOps));
    });

    console.log("Listen port " + PORT_SERVICE);
    app.listen({ port: PORT_SERVICE }, () => console.log("Node running."));
  })();
} catch (e) {
  console.error("service.error: " + e.toString());
}
