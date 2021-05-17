import React from "react";
import { AppProps } from "next/app";
import { UserContextProvider } from "../shared-hooks/useUser";
import { AuthData } from "../modules/auth/AuthData";
import { MediaContextProvider } from "../shared-hooks/useScreenSize";
import { LanguageProvider } from "../lib/translations";
import "../styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <UserContextProvider>
        <AuthData>
          <MediaContextProvider>
            <Component {...pageProps} />
          </MediaContextProvider>
        </AuthData>
      </UserContextProvider>
    </LanguageProvider>
  );
};

export default App;
