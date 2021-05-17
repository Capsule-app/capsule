import React from "react";
import Head from "next/head";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { FeedPageController } from "./FeedPageController";
import { WaitForAuth } from "../auth/waitForAuth";

export const FeedPage: React.FC = () => {
  return (
    <WaitForAuth>
      <DefaultDesktopLayout>
        <Head>
          <title>Your Feed | Capsule</title>
        </Head>
        <FeedPageController />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
