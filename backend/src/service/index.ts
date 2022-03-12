import * as RestaurantSchema from "./restaurants";

const schema = [
  ...RestaurantSchema.schema,
  `
  type Viewer {
    account: Account
  }

  type ViewerMutations {
    account: AccountMutations
  }

  type Account {
    id: String
    restaurants: RestaurantQueries!
  }

  type AccountMutations {
    id: String
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
    account: () => ({}),
  },
};

export { schema, resolvers };
