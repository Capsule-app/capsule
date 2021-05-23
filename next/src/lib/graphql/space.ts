import { gql } from "@apollo/client";

export const spaceQuery = gql`
  query Space($name: String!) {
    spaceByName(name: $name) {
      id
      name
      members {
        id
        name
        username
        avatarUrl
      }
    }
  }
`;
