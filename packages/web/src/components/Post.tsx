import React from "react";
import { Post as P } from "@capsule/client-gql";
import { Chatbubble, Heart, ArrowRedo } from "react-ionicons";

export const Post: React.FC<{ post: P; idx: number }> = ({ post, idx }) => {
  console.log(post);
  let image =
    "https://64.media.tumblr.com/da1a26e80adc532977a25e94d53c5c49/b9e5a52237339a5c-cb/s2048x3072/568edf51a340ced18821ee399476cde6fd8f259a.jpg";
  if (idx % 2 === 0)
    image =
      "https://png.pngtree.com/thumb_back/fw800/background/20200205/pngtree-vibrant-3d-art-colorful-cool-cute-background-image_329088.jpg";

  if (!post || !post.author) return null; // no post or author was deleted

  return (
    <div className="rounded-30 h-22 bg-accent relative">
      <img src={image} alt="" className="w-full h-22 rounded-30 object-cover" />
      <header className="absolute top-3 left-3 flex items-center space-x-2">
        <img
          src={post.author.photo ? post.author.photo.url : ""}
          alt=""
          className="w-6 h-6 rounded-full"
        />
        <div>
          <p className="font-bold text-gray-100">{post.author.name}</p>
          <p className="text-gray-100 -mt-1">@{post.author.username}</p>
        </div>
      </header>
      <div className="rounded-full glass py-3 px-4 absolute bottom-7 left-3 right-3 bg-gradient-to-b from-gray-600 to-gray-700 opacity-70">
        <p className="text-gray-100 opacity-100">{post.content}</p>
      </div>
      <footer className="absolute bottom-3 left-3 flex items-center space-x-3">
        <div className="flex items-center px-2 py-1 space-x-4.5 justify-between bg-gradient-to-b from-gray-600 to-gray-700 rounded-full">
          <Chatbubble color="white" width="22px" height="22px" />
          <p className="text-sm text-gray-100">122</p>
          <div style={{ width: "22px", height: "22px" }} />
        </div>
        <div className="flex items-center px-2 py-1 space-x-4.5 justify-between bg-gradient-to-b from-gray-600 to-gray-700 rounded-full">
          <ArrowRedo color="white" width="22px" height="22px" />
          <p className="text-sm text-gray-100">1.8k</p>
          <div style={{ width: "22px", height: "22px" }} />
        </div>
        <div className="flex items-center px-2 py-1 space-x-4.5 justify-between bg-gradient-to-b from-gray-600 to-gray-700 rounded-full">
          <Heart color="white" width="22px" height="22px" />
          <p className="text-sm text-gray-100">4.3k</p>
          <div style={{ width: "22px", height: "22px" }} />
        </div>
      </footer>
    </div>
  );
};
