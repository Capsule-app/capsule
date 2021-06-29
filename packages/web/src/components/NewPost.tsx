import React from "react";
import { Post as P } from "@capsule/client-gql";
// import { Chatbubble, Heart, ArrowRedo } from "react-ionicons";

export const NewPost: React.FC<{ post: P; idx: number }> = ({ post }) => {
  if (!post || !post.author) return null;

  return (
    <div className="w-full relative">
      <header className="flex space-x-3">
        <img
          src={post.author.photo ? post.author.photo.url : ""}
          alt=""
          className="w-6 h-6 rounded-lg"
        />
        <div>
          <p className="text-white text-lg">{post.author.name}</p>
          <p className="text-gray-200 font-normal text-md">{post.content}</p>
        </div>
      </header>
    </div>
  );
};
