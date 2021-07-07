import React from "react";
import { People } from "react-ionicons";

interface Props {
  name: string;
}

const MemberGroup: React.FC<Props> = ({ name }) => {
  return (
    <div className="text-left w-full mb-2">
      <p className="text-lg text-white font-semibold">{name}</p>
      <div className="flex flex-row space-x-2 mt-1">
        <img
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt=""
          className="w-5 h-5 rounded-full"
        />
        <p className="text-lg text-white font-medium">alex</p>
      </div>
      <div className="flex flex-row space-x-2 mt-1">
        <img
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt=""
          className="w-5 h-5 rounded-full"
        />
        <p className="text-lg text-white font-medium">alex</p>
      </div>
      <div className="flex flex-row space-x-2 mt-1">
        <img
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt=""
          className="w-5 h-5 rounded-full"
        />
        <p className="text-lg text-white font-medium">alex</p>
      </div>
    </div>
  );
};

export const Widgets: React.FC = () => {
  return (
    <div className="min-w-widgets h-screen bg-main-800 space-y-3 flex flex-col items-center">
      <header className="w-full h-7 sticky top-0 bg-main-700 border-b-2 border-theme-900 flex flex-row items-center px-3">
        <People color="white" width="22px" height="22px" />
        <p className="mx-2 text-green-400 text-lg font-bold">online</p>
        <div className="flex flex-row items-center">
          <p className="rounded-l-lg px-1 bg-green-500">65</p>
          <p className="rounded-r-lg px-1 bg-green-700">144</p>
        </div>
      </header>
      <div className="w-full px-3">
        <MemberGroup name="Admins" />
        <MemberGroup name="Mods" />
        <MemberGroup name="Members" />
      </div>
    </div>
  );
};
