import React from "react";
import { MainLayout } from "./MainLayout";
import { PeopleList } from "./PeopleList";
import { ProfileBlock } from "./ProfileBlock";

interface Props {
  children?: React.ReactNode;
}

export const DefaultDesktopLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainLayout leftPanel={<PeopleList />} rightPanel={<ProfileBlock />}>
      {children}
    </MainLayout>
  );
};
