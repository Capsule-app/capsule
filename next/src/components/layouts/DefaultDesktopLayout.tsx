import React from "react";
import { MainLayout } from "./MainLayout";
import { PeopleList } from "./LeftSidebar";
import { ProfileBlock } from "./RightSidebar";

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
