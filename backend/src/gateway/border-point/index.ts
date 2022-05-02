import {
  IBorderPoint
} from "interfaces/border-point";

const schema = [
  `

  type BorderPoint {
    id: ID!
    name: String!
    description: String
    latitude: Float!
    longitude: Float!

    images: [String]!

    country: String
    address: String
  }

  type BorderPointQueries {
    id: ID
    list: [BorderPoint]!
    get(id: ID!): BorderPoint
  }
`,
];

const resolvers = {
  BorderPointQueries: {
    list: async (root: any, args: any, cxt: any): Promise<IBorderPoint[]> => {
      return await cxt.container.cradle.BorderPointController.list();
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IBorderPoint> => {
      return await cxt.container.cradle.BorderPointController.get(id);
    }
  }
};

export { schema, resolvers };
