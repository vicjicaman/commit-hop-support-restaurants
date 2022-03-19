import * as RestaurantModel from "entities/restaurants";

const schema = [
  `

  type Owner {
    name: String!
    image: String
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String

    supportedEmployees: Int!
    preparedMeals: Int!
    receivedDonations: Float!

    latitude: Float!
    longitude: Float!

    owner: Owner

    images: [String]!

    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type RestaurantQueries {
    id: ID
    list: [Restaurant]!
    find(latitude: Float!, longitude: Float!): [Restaurant]!
    search(term: String!): [Restaurant]!
    get(id: ID!): Restaurant
  }

  type RestaurantMutations {
    create: RestaurantQueries!
  }
`,
];

const resolvers = {
  RestaurantQueries: {
    list: (root: any, args: any, cxt: any): Promise<any[]> => {
      return cxt.container.resolve("restaurantController").list(root, args);
      //await RestaurantModel.list(),
    },
    find: async (parent: any, { latitude, longitude }: any): Promise<any[]> =>
      await RestaurantModel.find({ latitude, longitude }),
    search: async (parent: any, { term }: any): Promise<any[]> =>
      await RestaurantModel.search(term),
    get: async (parent: any, { id }: any): Promise<any> =>
      await RestaurantModel.get(id),
  },
  RestaurantMutations: {
    create: () => ({}),
  },
};

export { schema, resolvers };
