const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildSchema } = require("type-graphql");

const app = express();

const apolloServer = new ApolloServer({
  schema = await buildSchema({
    resolvers: [],
    validate: false
  })
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started.");
});
