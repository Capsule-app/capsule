import React from "react";
import Head from "next/head";
import { WaitForAuth } from "components/auth/WaitForAuth";
import { DefaultDesktopLayout } from "components/layouts/DefaultDesktopLayout";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Wrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <WaitForAuth>
      <DefaultDesktopLayout>
        <Head>
          <title>{title || "Capsule"}</title>
        </Head>
        {children}
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
