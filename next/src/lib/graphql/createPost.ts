import { gql } from "@apollo/client";

export const createPostMutation = gql`
  mutation CreatePost($content: String!) {
    createPost(data: { content: $content })
  }
`;
