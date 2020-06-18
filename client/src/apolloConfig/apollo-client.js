import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:3000/graphql"
  // uri: "/graphql" < - - Para produção
});

export const client = new ApolloClient({
  cache,
  link
});
