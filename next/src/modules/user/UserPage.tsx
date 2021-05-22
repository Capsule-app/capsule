import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { UserPageController } from "./UserPageController";
import { WaitForAuth } from "../auth/WaitForAuth";

export const UserPage: React.FC = () => {
  const router = useRouter();

  return (
    <WaitForAuth>
      <DefaultDesktopLayout>
        <Head>
          <title>Name (@{router.query.username}) | Capsule</title>
        </Head>
        <UserPageController />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
