import {
  IOpensource
} from "interfaces/opensource";

const schema = [
  `

  type Opensource {
    id: ID!
    name: String!
    description: String
    repository: String!
    logo: String!
  }

  type OpensourceQueries {
    id: ID
    list: [Opensource]!
    get(id: ID!): Opensource
  }
`,
];

const resolvers = {
  OpensourceQueries: {
    list: async (root: any, args: any, cxt: any): Promise<IOpensource[]> => {
      return await cxt.container.cradle.OpensourceController.list();
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IOpensource> => {
      return await cxt.container.cradle.OpensourceController.get(id);
    }
  }
};

export { schema, resolvers };
