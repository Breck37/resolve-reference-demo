import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const port = 4000;

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "riders", url: "http://localhost:4001" },
      { name: "results", url: "http://localhost:4002" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Gateway ready at: ${url} 🚀🚀🚀🚀`);
});
