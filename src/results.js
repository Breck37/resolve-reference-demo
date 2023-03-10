import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";

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
    position: 1,
    race: "Anaheim",
    points: 26,
  },
  {
    id: "2",
    position: 2,
    race: "Anaheim",
    points: 23,
  },
  {
    id: "3",
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

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Results service ready at: ${url} 🚀🚀🚀🚀`);
});
