import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    bio: String
    picture: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    user_id: ID!
    content: String!
    picture: String
    url: String
    created_at: String!
  }
  type Query {
    hello: String!
    user(name: String!): User
    users: [User!]!
  }
`;