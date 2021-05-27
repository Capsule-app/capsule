import { gql } from "@apollo/client";

export const spaceQuery = gql`
  query Space($name: String!) {
    spaceByName(name: $name) {
      id
      name
      avatarUrl
      description
      members {
        id
        name
        username
        avatarUrl
      }
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
      }
    }
  }
`;
