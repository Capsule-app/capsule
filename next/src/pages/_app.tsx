import React from "react";
import { AppProps } from "next/app";
import { UserContextProvider } from "lib/common/useUser";
import { AuthData } from "components/auth/AuthData";
import { MediaContextProvider } from "util/hooks/useScreenSize";
import { LanguageProvider } from "lib/translations";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "lib/apollo/apolloClient";
import "styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <UserContextProvider>
          <AuthData>
            <MediaContextProvider>
              <Component {...pageProps} />
            </MediaContextProvider>
          </AuthData>
        </UserContextProvider>
      </LanguageProvider>
    </ApolloProvider>
  );
};

export default App;
