import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://syn-api-production-e95c.up.railway.app/graphql",
});

export const client = new ApolloClient({
  cache,
  link,
});
