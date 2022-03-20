import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

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
    list: async (root: any, args: any, cxt: any): Promise<IRestaurant[]> => {
      return await cxt.container.cradle.RestaurantController.list();
    },
    find: async (
      parent: any,
      { latitude, longitude }: any,
      cxt: any
    ): Promise<IRestaurant[]> => {
      return await cxt.container.cradle.RestaurantController.find({
        latitude,
        longitude,
      });
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IRestaurant> => {
      return await cxt.container.cradle.RestaurantController.get(id);
    },
    search: async (parent: any, { term }: any, cxt: any): Promise<any[]> => {
      return await cxt.container.cradle.RestaurantController.search(term);
    },
  },
  RestaurantMutations: {
    create: () => ({}),
  },
};

export { schema, resolvers };
