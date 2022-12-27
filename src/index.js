import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { typeDefs } from "./riders";
import { typeDefs as resultDefs } from "./results";

const port = 4000;

const server = new ApolloServer({
  typeDefs: [typeDefs, resultDefs],
  subscriptions: false,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Gateway ready at: ${url} 🚀🚀🚀🚀`);
});
