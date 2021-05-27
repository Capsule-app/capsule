import { gql } from "@apollo/client";

export const userQuery = gql`
  query User($username: String!) {
    userByUsername(username: $username) {
      id
      name
      username
      avatarUrl
      bio
      createdAt
      posts {
        id
        content
        commentCount
        createdAt
        space {
          name
        }
      }
    }
  }
`;
