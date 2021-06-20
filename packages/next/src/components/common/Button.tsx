import React from "react";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

interface Props {
  color: string;
  hover: string;
  size?: keyof typeof sizeClassnames;
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  color,
  hover,
  size = "big",
  children,
}) => {
  return (
    <button
      className={`bg-${color} hover:bg-${hover} ${sizeClassnames[size]} rounded-lg`}
    >
      {children}
    </button>
  );
};
