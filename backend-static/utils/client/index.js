import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://backend:4000/backend/graphql",
  cache: new InMemoryCache(),
});

export default client;
