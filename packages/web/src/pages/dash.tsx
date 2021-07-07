import React from "react";
import { AddCircle as Image } from "react-ionicons";
import { Post as PostType } from "@capsule/client-gql";
import { Groups, Channels, Widgets, NewPost as Post } from "components";

// https://blog.creatopy.com/wp-content/uploads/2020/10/School-Banner-Design-Ideas-And-Examples.png

export default function HomePage(): React.ReactNode {
  const author = {
    id: "123456",
    createdAt: String(Date.now()),
    bio: "Designer of Oasis",
    email: "alex@overstreet.me",
    name: "Alex Overstreet",
    username: "alex",
    photo: {
      url: "https://pbs.twimg.com/profile_images/1395178472549588992/zLCOzHj3_400x400.jpg",
      createdAt: String(Date.now()),
      id: "123456",
    },
  };

  const posts = [
    {
      id: "123456",
      author,
      commentCount: 0,
      comments: [],
      content: "Hey whats up",
      createdAt: String(Date.now()),
      votes: [],
      voteCount: 0,
    },
    {
      id: "123456",
      author,
      commentCount: 0,
      comments: [],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt felis felis, at vestibulum risus fringilla vitae. Vivamus et est malesuada lectus posuere consequat nec eu dolor. Praesent eget condimentum urna, quis scelerisque justo. Praesent eget lorem venenatis, mattis massa ac, elementum erat.",
      createdAt: String(Date.now()),
      votes: [],
      voteCount: 0,
    },
  ];

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-theme-700">
      <Groups />
      <Channels />
      <div className="w-full overflow-auto relative">
        <div className="sticky top-0 h-6.5 w-full bg-theme-700 border-b-2 border-theme-800" />
        {posts && (
          <div className="mx-4 my-4 space-y-4">
            {posts.length > 0 &&
              posts.map((post: PostType, idx: number) => (
                <Post key={post.id} post={post} idx={idx} />
              ))}
          </div>
        )}
        <div className="pl-4 pr-1 pb-4 sticky left-0 bottom-0 bg-theme-700 w-full z-20 space-y-3">
          <div className="left-4 top-0 absolute w-6 h-6 rounded-lg bg-gray-500"></div>
          <div className="ml-6.5 px-3 bg-theme-input h-6 rounded-lg flex flex-row items-center">
            <Image color="#6f84d3" />
            <input
              className="ml-3 w-full placeholder-gray-400 text-white bg-theme-input focus:outline-none"
              placeholder="Message #stream"
            />
          </div>
        </div>
      </div>
      <Widgets />
    </div>
  );
}
