import React from "react";
import { Home, Notifications, Mail, Bookmark } from "react-ionicons";
import { useUserByUsernameQuery } from "@capsule/client-gql";
import Link from "next/link";

export const Navigation: React.FC = () => {
  const { data, loading } = useUserByUsernameQuery({
    variables: { username: "alex" },
  });
  if (!data || loading) return null;

  const user = data.userByUsername;
  if (!user) return null;

  return (
    <div className="min-w-180 h-full border-r border-primary-200 flex flex-col justify-between pt-5">
      <div className="space-y-3">
        <div className="flex-center w-full h-60 mx-auto relative">
          <Home width="30px" height="30px" />
          <div className="w-1 h-full absolute right-0 bg-accent"></div>
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
