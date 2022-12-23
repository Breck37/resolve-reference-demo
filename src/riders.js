import { ApolloServer, gql } from "apollo-server";

const port = 4001;

export const typeDefs = gql`
  type Rider {
    id: ID!
    name: String
    number: Int
    bike: String
  }

  type Query {
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
  Query: {
    riders() {
      return riders;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Riders service ready at: ${url} 🚀🚀🚀🚀`);
});
