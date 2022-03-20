require("dotenv").config();
const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");
import GraphQLToolsTypes from "graphql-tools-types";

const awilix = require("awilix");

//import search from "utils/search";
import { schema, resolvers } from "./gateway";

import DatabaseDriver from "drivers/db";
import SearchDriver from "drivers/search";
import RestaurantController from "controllers/restaurants";
import RestaurantUsecase from "usecases/restaurants";
import RestaurantData from "data/restaurants";
import RestaurantFactory from "factories/restaurants";

const PORT_SERVICE = 4000;

const cxt: any = {};

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  db: awilix.asClass(DatabaseDriver),
  search: awilix.asClass(SearchDriver),
  RestaurantController: awilix.asClass(RestaurantController),
  RestaurantData: awilix.asClass(RestaurantData),
  RestaurantFactory: awilix.asClass(RestaurantFactory),
  RestaurantUsecase: awilix.asClass(RestaurantUsecase),
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

    /*app.get("/backend/test", async function (req: any, res: any) {
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
    });*/

    console.log("Listen port " + PORT_SERVICE);
    app.listen({ port: PORT_SERVICE }, () => console.log("Node running."));
  })();
} catch (e) {
  console.error("service.error: " + e.toString());
}

/*
const formatName = (name: string, descriptor: any): any => {
  const splat = descriptor.path.split("/");

  console.log(splat);
  const namespace = splat[splat.length - 2]; // `repository` or `service`
  const upperNamespace =
    namespace.charAt(0).toUpperCase() + namespace.substring(1);
  return name + upperNamespace;
};

container.loadModules(
  [

  ],

  {
    formatName,
    resolverOptions: {
      register: awilix.asClass,
    },
  }
);*/
