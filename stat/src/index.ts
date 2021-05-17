import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const app = express();

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "What's up"
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware( { app});

app.listen(4000, () => {
  console.log("Server ready!");
})