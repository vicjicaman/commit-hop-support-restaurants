import {
  IInfoLocation
} from "interfaces/info-location";

const schema = [
  `

  type InfoLocation {
    id: ID!
    name: String!
    description: String
    latitude: Float!
    longitude: Float!

    images: [String]!

    country: String
    address: String
  }

  type InfoLocationQueries {
    id: ID
    list: [InfoLocation]!
    get(id: ID!): InfoLocation
  }
`,
];

const resolvers = {
  InfoLocationQueries: {
    list: async (root: any, args: any, cxt: any): Promise<IInfoLocation[]> => {
      return await cxt.container.cradle.InfoLocationController.list();
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IInfoLocation> => {
      return await cxt.container.cradle.InfoLocationController.get(id);
    }
  }
};

export { schema, resolvers };
