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
import serverless from "serverless-http";
const awilix = require("awilix");
//import search from "utils/search";
import { schema, resolvers } from "./gateway";
//import initialize from "./initialize"

import JsonDataDriver from "drivers/json";
import LoggerDriver from "common/drivers/logger";

import RestaurantController from "controllers/restaurant";
import RestaurantUsecase from "usecases/restaurant";
import RestaurantData from "data/restaurant";
import RestaurantFactory from "factories/restaurant";

import BorderPointController from "controllers/border-point";
import BorderPointUsecase from "usecases/border-point";
import BorderPointData from "data/border-point";
import BorderPointFactory from "factories/border-point";

import OpensourceController from "controllers/opensource";
import OpensourceUsecase from "usecases/opensource";
import OpensourceData from "data/opensource";
import OpensourceFactory from "factories/opensource";

//const PORT_SERVICE = 4700;

const cxt: any = {};

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  json: awilix.asClass(JsonDataDriver),
  logger: awilix.asClass(LoggerDriver),
  RestaurantController: awilix.asClass(RestaurantController),
  RestaurantData: awilix.asClass(RestaurantData),
  RestaurantFactory: awilix.asClass(RestaurantFactory),
  RestaurantUsecase: awilix.asClass(RestaurantUsecase),
  BorderPointController: awilix.asClass(BorderPointController),
  BorderPointData: awilix.asClass(BorderPointData),
  BorderPointFactory: awilix.asClass(BorderPointFactory),
  BorderPointUsecase: awilix.asClass(BorderPointUsecase),
  OpensourceController: awilix.asClass(OpensourceController),
  OpensourceData: awilix.asClass(OpensourceData),
  OpensourceFactory: awilix.asClass(OpensourceFactory),
  OpensourceUsecase: awilix.asClass(OpensourceUsecase),
});

const logResolver = async (resolve: any, root: any, args: any, cxt: any, info: any) => {
  const logger = cxt.container.cradle.logger;
  logger.debug(` --- args for ${info.fieldName}: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, cxt, info);
  logger.debug(` - result for ${info.fieldName}: ${JSON.stringify(result)}`);
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










function requestHandler(req: any, event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  req.gateway = { context, event };
}

const app: any = express();

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


const serverHandler = serverless(app, {
  request: requestHandler
});


try {
  (async () => {

    const schemaObj = prepare(schema, resolvers)
    const schemaWithMiddleware = applyMiddleware(schemaObj, logResolver)

    cxt.container = container;

    const server = new ApolloServer({
      schema: schemaWithMiddleware,
      context: cxt,
    });
    await server.start();

    server.applyMiddleware({ app, path: "/backend/graphql" });

    //await initialize(cxt);
    //console.log("Listen port " + PORT_SERVICE);
    //app.listen({ port: PORT_SERVICE }, () => console.log("Node running."));
  })();
} catch (e) {
  console.error("service.error: " + e.toString());
}


export const handler = async (event: any, context: any) => {
  const result = await serverHandler(event, context);
  return result;
};



