import React, { useState } from "react";
import { Post as PostType } from "util/types/post";
import { getPostDate } from "lib/postDate";
import { FooterButton } from "components/post/FooterButton";
import {
  CaretUpFill,
  CaretDownFill,
  ChatSquareFill,
  ReplyFill,
} from "react-bootstrap-icons";
import Link from "next/link";

export const Post: React.FC<{ post: PostType }> = ({ post }) => {
  const date = getPostDate(post.createdAt);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  if (!post.author) return null;

  // var emojified = post.content.replace(/:(\w+):/g, "![:$1:](/emoji/$1.png)");

  return (
    <div className="w-full flex space-x-3 border-b-2 m:border-b-0 border-primary-100">
      <div className="flex-none flex flex-col items-center space-y-1">
        <img
          src={post.author.avatarUrl || "/default-profile.png"}
          alt=""
          className="w-6.5 h-6.5 rounded-full flex-none select-none"
        />
      </div>
      <div className="space-y-1 w-full">
        <header className="flex items-center space-x-1">
          <p className="text-primary-300 text-sm">by</p>
          <Link href={`/u/${post.author.username}`}>
            <a className="font-bold text-sm hover:underline">
              u/{post.author.username}
            </a>
          </Link>
          {post.space && (
            <>
              <p className="text-primary-300 text-sm">in</p>
              <Link href={`/s/${post.space.name}`}>
                <a className="font-bold text-sm hover:underline">
                  s/{post.space.name}
                </a>
              </Link>
            </>
          )}
          <p className="text-primary-400 text-sm">{date}</p>
        </header>
        <p className="text-lg">{post.content}</p>
        <div className="-ml-1 h-5 flex items-center">
          <FooterButton
            text={`${post.commentCount || "No"} comment${
              post.commentCount !== 1 ? "s" : ""
            }`}
            icon={<ChatSquareFill className="text-sm text-primary-400" />}
          />
          <FooterButton
            text="Share"
            icon={<ReplyFill className="text-2xl text-primary-400" />}
          />
        </div>
      </div>
      <div className="flex-none flex flex-col items-center">
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
        <p
          className={`${
            liked || disliked
              ? liked
                ? "text-blue"
                : "text-red-100"
              : "text-primary-500"
          } font-bold text-sm`}
        >
          21k
        </p>
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
  );
};
