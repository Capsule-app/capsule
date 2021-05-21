import { gql } from "@apollo/client";

export const postsQuery = gql`
  query Posts {
    posts {
      id
      authorId
      content
      author {
        name
      }
    }
  }
`;
