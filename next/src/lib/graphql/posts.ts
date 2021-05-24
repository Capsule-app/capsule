import { gql } from "@apollo/client";

export const postsQuery = gql`
  query Posts {
    posts {
      id
      content
      commentCount
      createdAt
      author {
        id
        name
        username
        avatarUrl
      }
      space {
        name
      }
    }
  }
`;
