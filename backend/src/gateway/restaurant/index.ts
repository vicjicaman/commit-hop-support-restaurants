import {
  IRestaurant
} from "interfaces/restaurant";

const schema = [
  `

  type Restaurant {
    id: ID!
    name: String!
    description: String
    latitude: Float!
    longitude: Float!

    images: [String]!

    country: String
    address: String
  }

  type RestaurantQueries {
    id: ID
    list: [Restaurant]!
    get(id: ID!): Restaurant
  }
`,
];

const resolvers = {
  RestaurantQueries: {
    list: async (root: any, args: any, cxt: any): Promise<IRestaurant[]> => {
      return await cxt.container.cradle.RestaurantController.list();
    },
    get: async (parent: any, { id }: any, cxt: any): Promise<IRestaurant> => {
      return await cxt.container.cradle.RestaurantController.get(id);
    }
  }
};

export { schema, resolvers };
