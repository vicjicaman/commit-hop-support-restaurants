import * as RestaurantSchema from "./restaurant";
import * as OpensourceSchema from "./opensource";
import * as ProjectSchema from "./project";
import * as BorderPointSchema from "./border-point";
import * as InfoLocationSchema from "./info-location";

const schema = [
  ...RestaurantSchema.schema,
  ...OpensourceSchema.schema,
  ...ProjectSchema.schema,
  ...BorderPointSchema.schema,
  ...InfoLocationSchema.schema,
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
    projects: ProjectQueries!
    borderPoints: BorderPointQueries!
    infoLocations: InfoLocationQueries!
  }

  type AccountMutations {
    id: ID
  }
`,
];

const resolvers = {
  ...RestaurantSchema.resolvers,
  ...OpensourceSchema.resolvers,
  ...ProjectSchema.resolvers,
  ...BorderPointSchema.resolvers,
  ...InfoLocationSchema.resolvers,
  Viewer: {
    account: () => ({ id: "vicjicama" }),
  },
  ViewerMutations: {
    account: () => ({ id: "vicjicama" }),
  },
  Account: {
    restaurants: () => ({ id: "restaurants" }),
    opensources: () => ({ id: "opensources" }),
    projects: () => ({ id: "projects" }),
    borderPoints: () => ({ id: "border-points" }),
    infoLocations: () => ({ id: "info-locations" }),
  },
  AccountMutations: {
  },
};

export { schema, resolvers };
