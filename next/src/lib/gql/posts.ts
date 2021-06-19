import { gql } from "@apollo/client";

export const postsQuery = gql`
  query Posts {
    posts {
      id
      content
      commentCount
      votes {
        action
        authorId
      }
      createdAt
      author {
        id
        name
        username
        photo {
          url
        }
      }
      space {
        name
      }
    }
  }
`;
