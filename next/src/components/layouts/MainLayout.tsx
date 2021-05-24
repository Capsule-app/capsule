import React from "react";
import { FixedGridPanel, MiddlePanel } from "./GridPanels";
import { Media } from "../../util/hooks/useScreenSize";

interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSidebar = <div />,
}) => {
  return (
    <main className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-200">
      <Media
        greaterThanOrEqual="xl"
        className={`relative grid grid-cols-xl gap-5`}
      >
        <FixedGridPanel>{leftPanel}</FixedGridPanel>
        <MiddlePanel>{children}</MiddlePanel>
        <FixedGridPanel>{rightPanel}</FixedGridPanel>
      </Media>
      <Media at="lg" className="relative grid grid-cols-lg gap-5">
        {tabletSidebar}
        <MiddlePanel>{children}</MiddlePanel>
        <FixedGridPanel>{rightPanel}</FixedGridPanel>
      </Media>
      <Media at="md" className="relative grid grid-cols-md gap-5">
        <MiddlePanel>{children}</MiddlePanel>
        <FixedGridPanel>{rightPanel}</FixedGridPanel>
      </Media>
      <Media at="sm">
        <MiddlePanel>
          <div className="px-2 w-screen">{children}</div>
        </MiddlePanel>
      </Media>
    </main>
  );
};
