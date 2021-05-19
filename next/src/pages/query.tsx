import React from "react";
import { GetServerSideProps } from "next";
import { client } from "../lib/common/apolloClient";
import { gql } from "@apollo/client";

interface Props {
  user: any;
}

const QueryPage: React.FC<Props> = ({ user }) => {
  return <p>whjats up {JSON.stringify(user)}</p>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query User {
        user(name: "Alex") {
          id
          name
          username
          bio
          posts {
            content
          }
        }
      }
    `,
  });

  return {
    props: {
      user: data,
    },
  };
};

export default QueryPage;
