import React from "react";
import Head from "next/head";
import { WaitForAuth } from "components/auth/WaitForAuth";
import { DefaultDesktopLayout } from "modules/layouts/DefaultDesktopLayout";

interface Props {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <WaitForAuth>
      <DefaultDesktopLayout>
        <Head>
          <title>Your Feed | Capsule</title>
        </Head>
        {children}
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
