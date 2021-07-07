import React from "react";
import { ChevronDown } from "react-ionicons";
import { Hashtag } from "icons/Hashtag";

/* ----------------------------- */

interface ChannelProps {
  name: string;
  active?: boolean;
}

/* ----------------------------- */

const Channel: React.FC<ChannelProps> = ({ name, active }) => {
  return (
    <div
      className={`flex flex-row items-center space-x-2 ${
        active ? "text-white" : "text-gray-500"
      }`}
    >
      <Hashtag />
      <p className={`text-lg ${active ? "text-white" : "text-gray-500"}`}>
        {name}
      </p>
    </div>
  );
};

/* ----------------------------- */

export const Channels: React.FC = () => {
  return (
    <div className="min-w-channels w-min h-full bg-main-500 border-l border-gray-900 flex flex-col relative">
      <header className="h-7 px-2 sticky top-0 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-gray-600" />
          <p className="text-xl text-white font-semibold">oasis.sh</p>
        </div>
        <ChevronDown color="white" width="20px" height="20px" />
      </header>
      <div className="mt-1 px-3">
        <img
          src="https://blog.creatopy.com/wp-content/uploads/2020/10/School-Banner-Design-Ideas-And-Examples.png"
          className="h-12 w-full object-cover rounded-lg"
          alt=""
        />
        {/* Channels */}
        <p className="text-gray-600 pt-3">Channels</p>
        <Channel name="stream" active />
        <Channel name="show" />
        <Channel name="ask" />
        <Channel name="polls" />
        {/* Welcome */}
        <p className="text-gray-600 pt-3">Welcome</p>
        <Channel name="arrivals" />
        <Channel name="rules" />
        <Channel name="info" />
      </div>
    </div>
  );
};
