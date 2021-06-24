import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "lib/apollo";
import Head from "next/head";
import "lib/styles.css";

const App: React.FC<AppProps> = ({ Component }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/inter-ui/3.18.0/inter.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component />
    </ApolloProvider>
  );
};

export default App;
