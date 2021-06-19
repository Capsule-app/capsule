import { gql } from "@apollo/client";

export const postQuery = gql`
  query Post($id: String!) {
    post(id: $id) {
      id
      content
      commentCount
      comments {
        content
        author {
          name
          photo {
            url
          }
        }
      }
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
