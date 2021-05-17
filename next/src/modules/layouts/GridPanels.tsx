import React from "react";

interface Props {
  children: React.ReactNode;
}

export const FixedGridPanel: React.FC<Props> = ({ children }) => {
  return (
    <div className={`flex pt-5 flex-col flex-1 sticky top-0 h-screen`}>
      {children}
    </div>
  );
};

export const MiddlePanel: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col flex-1 w-full">{children}</div>;
};
