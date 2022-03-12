const schema = [
  `

  type Owner {
    id: ID!
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

    owner: Owner!

    images: [String]!

    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type RestaurantQueries {
    id: String
    list: [Restaurant]!
    get(id: ID!): Restaurant
  }

  type RestaurantMutations {
    create: RestaurantQueries!
  }
`,
];

const resolvers = {
  RestaurantQueries: {
    list: () => [],
  },
  RestaurantMutations: {
    create: () => ({}),
  },
};

export { schema, resolvers };
