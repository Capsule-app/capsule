import React from "react";
import { Grid, ArrowDown } from "react-ionicons";
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
    <div className="min-w-channels bg-theme-800 flex flex-col space-y-2 p-2 h-full relative">
      <header className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-3">
          <div className="w-5 h-5 rounded-lg bg-gray-600" />
          <p className="text-lg text-white">oasis.sh</p>
        </div>
        <ArrowDown color="white" width="20px" height="20px" />
      </header>
      <div className="relative">
        <input
          placeholder="Jump to..."
          className="p-1 px-2 rounded-lg bg-theme-700 placeholder-gray-500 text-white font-medium w-full focus:outline-none"
        />
        <div className="absolute top-0 right-2 flex flex-row items-center space-x-1">
          <Grid color="#6B7280" width="18px" height="18px" />
          <p className="text-xl text-gray-500">K</p>
        </div>
      </div>
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
      <div className="absolute bottom-3 left-0 right-0 rounded-lg mx-3 bg-theme-600 p-1 flex flex-row items-center space-x-3">
        <img
          src="https://pbs.twimg.com/profile_images/1395178472549588992/zLCOzHj3_400x400.jpg"
          alt=""
          className="w-6 h-6 rounded-lg bg-gray-500"
        />
        <p className="font-bold text-lg text-white">Alex Overstreet</p>
      </div>
    </div>
  );
};
