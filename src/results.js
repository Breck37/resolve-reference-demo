import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema, buildSubgraphSchema } from "@apollo/federation";

const port = 4002;

export const typeDefs = gql`
  type Result {
    id: ID!
    position: Int
    race: String
    points: Int
  }

  type Query {
    results: [Result]
  }
`;

const results = [
  {
    id: "1",
    rider: 1,
    position: 1,
    race: "Anaheim",
    points: 26,
  },
  {
    id: "2",
    rider: 2,
    position: 2,
    race: "Anaheim",
    points: 23,
  },
  {
    id: "3",
    rider: 3,
    position: 3,
    race: "Anaheim",
    points: 21,
  },
];

const resolvers = {
  Query: {
    results() {
      return results;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Results service ready at: ${url} 🚀🚀🚀🚀`);
});
