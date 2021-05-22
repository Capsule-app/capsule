import React, { useState } from "react";
import { Post as PostType } from "util/types/post";
import { getPostDate } from "lib/postDate";
import Linkify from "react-linkify";
import {
  CaretUpFill,
  CaretDownFill,
  ChatSquareFill,
  ReplyFill,
} from "react-bootstrap-icons";

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => {
  const date = getPostDate(post.createdAt);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div className="flex space-x-3">
      <div className="flex-none flex flex-col items-center space-y-1">
        <img
          src={post.author.avatarUrl || "/default-profile.png"}
          alt=""
          className="w-6.5 h-6.5 rounded-full flex-none select-none"
        />
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              setLiked(!liked);
              if (disliked) setDisliked(false);
            }}
            className="flex items-center justify-center rounded w-4.5 h-4.5 hover:bg-primary-100"
          >
            <CaretUpFill
              className={`text-xl ${liked ? "text-blue" : "text-primary-300"}`}
            />
          </button>
          <p className="text-primary-500 font-bold text-sm">21k</p>
          <button
            onClick={() => {
              setDisliked(!disliked);
              if (liked) setLiked(false);
            }}
            className="flex items-center justify-center rounded w-4.5 h-4.5 hover:bg-primary-100"
          >
            <CaretDownFill
              className={`text-xl ${
                disliked ? "text-red-100" : "text-primary-300"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <p className="font-bold">{post.author.name}</p>
          <p className="text-primary-300">@{post.author.username}</p>
        </div>
        <Linkify>
          <p className="break-words">{post.content}</p>
        </Linkify>
        <div className="h-5 flex items-center">
          <button className="flex items-center space-x-1 px-2 h-full hover:bg-primary-100">
            <ChatSquareFill className="text-sm text-primary-400" />
            <p className="font-bold text-sm text-primary-400">12 comments</p>
          </button>
          <button className="flex items-center space-x-1 px-2 h-full hover:bg-primary-100">
            <ReplyFill className="text-2xl text-primary-400" />
            <p className="font-bold text-sm text-primary-400">Share</p>
          </button>
          <p className="text-primary-300 text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
};
