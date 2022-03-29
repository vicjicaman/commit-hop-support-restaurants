require("dotenv").config();
const path = require("path");
const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";
const { applyMiddleware } = require("graphql-middleware");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");
import GraphQLToolsTypes from "graphql-tools-types";
const awilix = require("awilix");

//import search from "utils/search";
import { schema, resolvers } from "./gateway";

import LoggerDriver from "common/drivers/logger";
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
  logger: awilix.asClass(LoggerDriver),
  search: awilix.asClass(SearchDriver),
  RestaurantController: awilix.asClass(RestaurantController),
  RestaurantData: awilix.asClass(RestaurantData),
  RestaurantFactory: awilix.asClass(RestaurantFactory),
  RestaurantUsecase: awilix.asClass(RestaurantUsecase),
});

const logResolver = async (resolve: any, root: any, args: any, cxt: any, info: any) => {
  const logger = cxt.container.cradle.logger;
  logger.debug(`args for ${info.fieldName}: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, cxt, info);
  logger.debug(`result for ${info.fieldName}: ${JSON.stringify(result)}`);
  return result
}


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

    const schemaObj = prepare(schema, resolvers)
    const schemaWithMiddleware = applyMiddleware(schemaObj, logResolver)


    const server = new ApolloServer({
      schema: schemaWithMiddleware,
      context: { container },
    });
    await server.start();

    const app: any = express();
    server.applyMiddleware({ app, path: "/backend/graphql" });


    app.use(bodyParser());
    app.use(cors());

    app.use((req: any, res: any, next: any) => {
      next();
    });

    app.use(
      "/backend/static",
      express.static(path.join(__dirname, "app", "static"))
    );
    app.get("/backend/health", function (req: any, res: any) {
      res.send("ok");
    });

    /*app.get("/backend/test", async function (req: any, res: any) {
      const index_name = "restaurants";

      const resOps = [];

      const list = await container.cradle.RestaurantData.list();

      for (const rs of list) {
        await container.cradle.search.driver().index({
          id: rs.id,
          index: index_name,
          body: rs,
          refresh: true,
        });
      }

      res.send(JSON.stringify(list));
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
