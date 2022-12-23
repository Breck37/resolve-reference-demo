import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import fetch from "node-fetch";

const port = 4001;
const apiUrl = "http://localhost:4000";

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
    __resolveReference(ref) {
      return riders.find((rider) => {
        console.log({ rider, ref });
        return rider.id === Number(ref.id);
      });
    },
  },
  Query: {
    riders() {
      return riders;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Riders service ready at: ${url} 🚀🚀🚀🚀`);
});
