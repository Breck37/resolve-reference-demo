import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";

const port = 4001;

const typeDefs = gql`
  type Rider @key(fields: "id") {
    id: ID!
    name: String
    number: Int
    bike: String
  }

  extend type Query {
    riders: [Rider]
  }
`;

const riders = [
  {
    id: 1,
    name: "Eli Tomac",
    number: 3,
    bike: "Yamaha",
  },
  {
    id: 2,
    name: "Cooper Webb",
    number: 2,
    bike: "KTM",
  },
  {
    id: 3,
    name: "Jason Anderson",
    number: 21,
    bike: "Kawasaki",
  },
];

const resolvers = {
  Rider: {
    __resolveReference(rider) {
      return riders.find((racer) => racer.id === parseInt(rider.id));
    },
  },
  Query: {
    riders() {
      return riders;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Riders service ready at: ${url} 🚀🚀🚀🚀`);
});
