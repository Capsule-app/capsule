import React from "react";
import { useUserByUsernameQuery } from "@capsule/client-gql";
import { Searchbar } from "components";
import Link from "next/link";

export const Widgets: React.FC = () => {
  const { data, loading } = useUserByUsernameQuery({
    variables: { username: "alex" },
  });
  if (!data || loading) return null;

  const user = data.userByUsername;
  if (!user) return null;

  return (
    <div className="h-screen p-2">
      <div className="min-w-340 h-full bg-gray-900 rounded-40 p-3 space-y-4">
        {/* <div className="bg-blue-100 flex items-center w-full space-x-3 rounded-40 p-1">
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
        </div> */}
        <div className="h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-40 p-5">
          <p className="text-gray-500">Who to follow</p>
        </div>
        <Searchbar />
      </div>
    </div>
  );
};
