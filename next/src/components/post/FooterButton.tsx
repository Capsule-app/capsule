import React from "react";

interface Props {
  text: string;
  icon: React.ReactNode;
  handleClick?: (event: any) => void;
}

export const FooterButton: React.FC<Props> = ({ text, icon, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 px-2 h-full hover:bg-primary-100"
    >
      {icon}
      <p className="font-bold text-sm text-primary-400">{text}</p>
    </button>
  );
};
