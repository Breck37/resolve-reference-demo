import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";

const port = 4002;

export const typeDefs = gql`
  type Result {
    id: ID!
    rider: Rider
    position: Int
    race: String
    points: Int
  }

  extend type Rider @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    results: [Result]
  }
`;

const results = [
  {
    id: "1",
    position: 1,
    race: "Anaheim",
    points: 26,
    rider: 1,
  },
  {
    id: "2",
    position: 2,
    race: "Anaheim",
    points: 23,
    rider: 2,
  },
  {
    id: "3",
    position: 3,
    race: "Anaheim",
    points: 21,
    rider: 3,
  },
];

const resolvers = {
  Result: {
    rider(result) {
      return { id: result.rider, __typename: "Rider" };
    },
  },
  Query: {
    results() {
      return results;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Results service ready at: ${url} 🚀🚀🚀🚀`);
});
