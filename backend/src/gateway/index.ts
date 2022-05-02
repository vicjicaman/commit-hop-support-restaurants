import * as RestaurantSchema from "./restaurant";

const schema = [
  ...RestaurantSchema.schema,
  `
  type Viewer {
    id: ID!
    account: Account
  }

  type ViewerMutations {
    account: AccountMutations
  }

  type Account {
    id: ID
    restaurants: RestaurantQueries!
  }

  type AccountMutations {
    restaurants: RestaurantMutations!
  }
`,
];

const resolvers = {
  ...RestaurantSchema.resolvers,
  Viewer: {
    account: () => ({ id: "vicjicama" }),
  },
  ViewerMutations: {
    account: () => ({ id: "vicjicama" }),
  },
  Account: {
    restaurants: () => ({ id: "restaurants" }),
  },
  AccountMutations: {
    restaurants: () => ({ id: "restaurants" }),
  },
};

export { schema, resolvers };
