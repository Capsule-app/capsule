import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      bio
    }
  }
`;

const GET_ME = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

const Test: React.FC = () => {
  const [Login, { data }] = useMutation(LOGIN);

  return (
    <>
      <button
        onClick={() => {
          Login({
            variables: { email: "alex@overstreet.me", password: "12345" },
          });
        }}
      >
        Press me
      </button>
      {JSON.stringify(data) || "allalal"}
    </>
  );
};

export default Test;
