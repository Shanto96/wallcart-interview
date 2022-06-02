import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://devapiv2.walcart.com/graphql",
      headers: {
        "content-type": "application/json",
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
