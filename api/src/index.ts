import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm";
import session from "express-session";
import { MeResolver } from "./modules/user/Me";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import cors from "cors";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver]
  })

  const apolloServer = new ApolloServer({
    schema, 
    context: ({ req }: any) => ({ req })
  });

  const app = express();

  app.use(cors());

  app.use(
    session({
      name: "qid",
      secret: "aaaaaaaaaa",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60
      }
    })
  )

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server listening at http://localhost:4000/graphql")
  })
}

main();