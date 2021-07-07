import React from "react";
import { Person, Home, Earth, Settings, Search } from "react-ionicons";
import Link from "next/link";

export const Groups: React.FC = () => {
  return (
    <div className="bg-black flex flex-col justify-between items-center p-2">
      <div className="divide-y divide-gray-800">
        <div className="space-y-2 mb-2">
          <div className="w-6.5 h-6.5 bg-theme-700 rounded-full mb-3 flex-center">
            <img
              src="https://raw.githubusercontent.com/oasis-sh/oasis/2c397012ae45dbb5bb7951405b8be8b75f0589f8/assets/logos/svg/icon.svg"
              width="32px"
              height="32px"
            />
          </div>
          <Link href="/home" passHref>
            <a className="w-6.5 h-6.5 bg-theme-700 rounded-full flex-center">
              <Home color="#10B981" width="24px" height="24px" />
            </a>
          </Link>
          <Link href="/profile" passHref>
            <a className="w-6.5 h-6.5 bg-theme-700 rounded-full flex-center">
              <Person color="#10B981" width="24px" height="24px" />
            </a>
          </Link>
        </div>
        <div className="pt-2 space-y-2">
          <div className="w-6.5 h-6.5 bg-black rounded-lg flex-center">
            <img
              src="https://raw.githubusercontent.com/oasis-sh/oasis/2c397012ae45dbb5bb7951405b8be8b75f0589f8/assets/logos/svg/icon.svg"
              width="36px"
              height="36px"
            />
          </div>
          <Link href="/typescript">
            <a className="w-6.5 h-6.5 bg-theme-700 rounded-lg flex-center">
              <img
                src="https://miro.medium.com/max/816/1*TpbxEQy4ckB-g31PwUQPlg.png"
                className="w-full h-full rounded-lg"
              />
            </a>
          </Link>
          <Link href="/javascript">
            <a className="w-6.5 h-6.5 bg-theme-700 rounded-lg flex-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                className="w-full h-full rounded-lg"
              />
            </a>
          </Link>
          <div className="w-6.5 h-6.5 bg-theme-700 rounded-lg flex-center">
            <Earth color="white" width="36px" height="36px" />
          </div>
          <div className="w-6.5 h-6.5 bg-theme-700 rounded-lg flex-center">
            <Earth color="white" width="36px" height="36px" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-6 h-6 flex-center">
          <Search color="#6f84d3" width="24px" height="24px" />
        </div>
        <div className="w-6 h-6 flex-center">
          <Settings color="#6f84d3" width="24px" height="24px" />
        </div>
      </div>
    </div>
  );
};
