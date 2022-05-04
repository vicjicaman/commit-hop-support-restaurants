import { ApolloClient, InMemoryCache } from "@apollo/client";

const SERVER_GRAPHQL = process.env["SERVER_GRAPHQL"];
console.log(SERVER_GRAPHQL)
const client = new ApolloClient({
  uri: `${SERVER_GRAPHQL}`,
  cache: new InMemoryCache(),
});

export default client;
