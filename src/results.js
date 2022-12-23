import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const port = 4002;

const typeDefs = gql`
  type Result {
    id: ID!
    rider: Rider
    position: Int
    race: String
    points: Int
  }

  extend type Rider @key(fields: "id") {
    id: ID! @external
    results: [Result]
  }

  extend type Query {
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
  Rider: {
    results(rider) {
      return results.filter((result) => {
        console.log({
          rider,
          result,
          cond: result.rider === parseInt(rider.id),
        });
        return result.rider === parseInt(rider.id);
      });
    },
  },
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
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Results service ready at: ${url} 🚀🚀🚀🚀`);
});
