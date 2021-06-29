import React from "react";

export const Widgets: React.FC = () => {
  return (
    <div className="h-screen p-3">
      <div className="min-w-widgets h-full bg-theme-900 rounded-40 p-4 space-y-4">
        <header className="flex flex-row items-center space-x-3">
          <div className="w-6.5 h-6.5 bg-black rounded-lg flex-center">
            <img
              src="https://raw.githubusercontent.com/oasis-sh/oasis/2c397012ae45dbb5bb7951405b8be8b75f0589f8/assets/logos/svg/icon.svg"
              width="36px"
              height="36px"
            />
          </div>
          <p className="text-2xl text-white">oasis.sh</p>
        </header>
        <p className="text-white">💬 Chat and discussions for communities</p>
      </div>
    </div>
  );
};
