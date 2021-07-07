import React from "react";
import {
  AddCircle,
  Image,
  FolderOpen,
  Ellipse,
  Search,
  Home,
  Person,
} from "react-ionicons";
import { Post as PostType } from "@capsule/client-gql";
import { Channels, Widgets, NewPost as Post } from "components";
import { useRouter } from "next/dist/client/router";
import { data, author } from "lib/posts";
import { resorts } from "lib/resorts";
import Link from "next/link";

const Input: React.FC = () => {
  return (
    <div className="mx-4 flex flex-row items-center space-x-2">
      <AddCircle color="#2825B5" width="24px" height="24px" />
      <Image color="#2825B5" width="24px" height="24px" />
      <FolderOpen color="#2825B5" width="24px" height="24px" />
      <input
        placeholder="Aa"
        className="w-full rounded-full px-4 py-2 bg-main-900 text-white placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default function HomePage(): React.ReactNode {
  const router = useRouter();
  const { channel } = router.query;
  const posts = data.filter((post) => post.channel === channel);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex h-full overflow-hidden bg-main">
        <Channels />
        <div className="w-full h-full overflow-auto relative border-l border-r border-gray-900">
          <header className="sticky top-0 h-7 w-full bg-main border-b-2 border-theme-900 flex flex-row items-center justify-between px-3">
            <div className="flex flex-row items-center space-x-2 divide-x-2 divide-gray-800">
              <p className="text-lg text-white font-semibold">#stream</p>
              <p className="pl-2 text-gray-400 font-semibold">
                A place to chat
              </p>
            </div>
            <div className="w-16 flex flex-row items-center h-5.5">
              <div className="h-full bg-main-500 rounded-l-full pl-2 flex-center">
                <Search color="#6B7280" width="18px" height="18px" />
              </div>
              <input
                placeholder="Search oasis.sh"
                className="h-full p-1 pr-4 rounded-r-full bg-main-500 placeholder-gray-500 text-white font-medium w-full focus:outline-none"
              />
            </div>
          </header>
          {posts && (
            <div className="mx-4 my-4 space-y-4">
              {posts.length > 0 &&
                posts.map((post: PostType, idx: number) => (
                  <Post key={post.id} post={post} idx={idx} />
                ))}
            </div>
          )}
          <Input />
        </div>
        <Widgets />
      </div>
      <div className="bg-main-900 w-full flex flex-row">
        <div className="min-w-channels bg-main-700 px-4 flex flex-row items-center space-x-2">
          <img
            src={author.photo.url}
            alt=""
            className="w-6.5 h-6.5 rounded-full"
          />
          <div>
            <p className="font-bold text-white text-lg">Alex</p>
            <div className="text-green-400 -mt-1 flex flex-row space-x-1 items-center">
              <Ellipse color="#34D399" width="16px" height="16px" />
              <p>Active</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row space-x-4 px-4 py-2">
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
          {resorts.map((resort, idx) => (
            <Link href={resort.name.toLowerCase()} passHref key={idx}>
              <a>
                <img
                  src={resort.avatar}
                  alt=""
                  className="w-6.5 h-6.5 rounded-full"
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
