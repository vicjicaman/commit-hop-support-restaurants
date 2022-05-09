import {
  IProject
} from "interfaces/project";

const schema = [
  `

  type Project {
    id: ID!
    name: String!
    description: String
    webpage: String!
    logo: String!
  }

  type ProjectQueries {
    id: ID
    list: [Project]!
    get(id: ID!): Project
  }
`,
];

const resolvers = {
  ProjectQueries: {
    list: async (root: any, args: any, cxt: any): Promise<IProject[]> => {
      return await cxt.container.cradle.ProjectController.list();
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IProject> => {
      return await cxt.container.cradle.ProjectController.get(id);
    }
  }
};

export { schema, resolvers };
