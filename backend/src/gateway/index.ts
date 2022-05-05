import * as RestaurantSchema from "./restaurant";
import * as OpensourceSchema from "./opensource";
import * as BorderPointSchema from "./border-point";

const schema = [
  ...RestaurantSchema.schema,
  ...OpensourceSchema.schema,
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
    opensources: OpensourceQueries!
    borderPoints: BorderPointQueries!
  }

  type AccountMutations {
    id: ID
  }
`,
];

const resolvers = {
  ...RestaurantSchema.resolvers,
  ...OpensourceSchema.resolvers,
  ...BorderPointSchema.resolvers,
  Viewer: {
    account: () => ({ id: "vicjicama" }),
  },
  ViewerMutations: {
    account: () => ({ id: "vicjicama" }),
  },
  Account: {
    restaurants: () => ({ id: "restaurants" }),
    opensources: () => ({ id: "opensources" }),
    borderPoints: () => ({ id: "border-point" }),
  },
  AccountMutations: {
  },
};

export { schema, resolvers };
