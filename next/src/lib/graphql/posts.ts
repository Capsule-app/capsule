import { gql } from "@apollo/client";

export const postsQuery = gql`
  query Posts {
    posts {
      id
      content
      createdAt
      author {
        id
        name
        username
        avatarUrl
      }
    }
  }
`;
