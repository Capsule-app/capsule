import React from "react";
import { WaitForAuth } from "components/auth/WaitForAuth";
import { DefaultDesktopLayout } from "modules/layouts/DefaultDesktopLayout";

interface Props {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <WaitForAuth>
      <DefaultDesktopLayout>{children}</DefaultDesktopLayout>
    </WaitForAuth>
  );
};
