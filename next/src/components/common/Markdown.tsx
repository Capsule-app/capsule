import React from "react";
import Linkify from "react-linkify";

interface Props {
  text: string;
}

export const Markdown: React.FC<Props> = ({ text }) => {
  const arr = text.split(" ");

  const render = (item: string, index: any) =>
    item.startsWith("@") ? (
      <p className="font-bold text-blue" key={index}>
        {item}
      </p>
    ) : (
      <p key={index}>{item}</p>
    );

  return (
    <Linkify>
      <div className="flex space-x-1">{arr.map(render)}</div>
    </Linkify>
  );
};
