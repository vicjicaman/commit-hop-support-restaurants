import * as RestaurantSchema from "./restaurant";
import * as BorderPointSchema from "./border-point";

const schema = [
  ...RestaurantSchema.schema,
  ...BorderPointSchema.schema,
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
    borderPoints: BorderPointQueries!
  }

  type AccountMutations {
    id: ID
  }
`,
];

const resolvers = {
  ...RestaurantSchema.resolvers,
  ...BorderPointSchema.resolvers,
  Viewer: {
    account: () => ({ id: "vicjicama" }),
  },
  ViewerMutations: {
    account: () => ({ id: "vicjicama" }),
  },
  Account: {
    restaurants: () => ({ id: "restaurants" }),
    borderPoints: () => ({ id: "border-point" }),
  },
  AccountMutations: {
  },
};

export { schema, resolvers };
