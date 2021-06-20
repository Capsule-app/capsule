import React, { useContext } from "react";
import { UserContext } from "lib/common/useUser";
import { Home, Search, Notifications, Mail, Bookmark } from "react-ionicons";
import Link from "next/link";

const LeftSidebar: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <div className="min-w-180 h-full border-r border-primary-200 flex flex-col justify-between pt-5">
      <div className="space-y-3">
        <div className="flex-center w-60 h-60 mx-auto">
          <Home width="30px" height="30px" />
        </div>
        <div className="flex-center w-60 h-60 mx-auto">
          <Notifications width="30px" height="30px" color="gray" />
        </div>
        <div className="flex-center w-60 h-60 mx-auto">
          <Mail width="30px" height="30px" color="gray" />
        </div>
        <div className="flex-center w-60 h-60 mx-auto">
          <Bookmark width="30px" height="30px" color="gray" />
        </div>
      </div>
      <div className="flex-center w-60 h-60 mx-auto mb-6">
        <Link href={user.username ? `/u/${user.username}` : "/login"} passHref>
          <a>
            <img
              src={user.photo ? user.photo.url : "/default-profile.png"}
              alt=""
              className="w-6.5 h-6.5 rounded-full"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

const Searchbar: React.FC = () => {
  return (
    <div className="flex items-center h-5">
      <div className="bg-primary-700 rounded-l-lg h-full flex-center px-2">
        <Search />
      </div>
      <input
        placeholder="Search"
        className="bg-primary-700 rounded-r-lg h-full outline-no-chrome"
      />
    </div>
  );
};

const RightSidebar: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <div className="h-screen p-2">
      <div className="min-w-340 h-px bg-gray-900 rounded-40 p-3 sticky top-2 space-y-4">
        <div className="bg-blue-100 flex items-center w-full space-x-3 rounded-40 p-1">
          <Link
            href={user.username ? `/u/${user.username}` : "/login"}
            passHref
          >
            <a>
              <img
                src={user.photo ? user.photo.url : "/default-profile.png"}
                alt=""
                className="w-7 h-7 rounded-full"
              />
            </a>
          </Link>
          <div className="text-gray-100 font-bold text-2xl">{user.name}</div>
        </div>
        <div className="h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-40"></div>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <div className="flex w-full max-w-1350 mx-auto">
      <LeftSidebar />
      <div className="w-full pt-8 mx-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">What's going on?</p>
          <Search width="32px" height="32px" />
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-30 h-22 bg-accent"></div>
          <div className="rounded-30 h-22 bg-red-100"></div>
          <div className="rounded-30 h-22 bg-accent"></div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default ProfilePage;
