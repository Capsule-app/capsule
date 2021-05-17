import React from "react";

interface Post {
  name: string;
  username: string;
  user_picture?: string;
  content: string | Array<string>;
  post_picture?: string;
  url?: string;
  id: string;
}

interface Props {
  post: Post;
  keyword?: string;
}

export const Post: React.FC<Props> = ({ post, keyword }) => {
  var arr, tags;
  if (typeof post.content === "string") {
    arr = post.content.split(" ");
    tags = arr.filter((t) => t.startsWith("#"));
  } else {
    tags = post.content.filter((t) => t.startsWith("#"));
  }

  return (
    <article className="space-y-2">
      <header className="flex space-x-2">
        {post.user_picture ? (
          <img
            src={post.user_picture}
            alt=""
            className="w-6.5 h-6.5 rounded-full flex-none select-none"
          />
        ) : (
          <img
            src="/default-profile.png"
            alt=""
            className="w-6.5 h-6.5 rounded-full flex-none select-none"
          />
        )}
        <div>
          <p className="font-bold">{post.name}</p>
          <p className="text-primary-300 -mt-1">@{post.username}</p>
        </div>
      </header>
      <section>
        {typeof post.content === "string" ? (
          <p className="break-words">
            {post.content.trim().replace(/#(\S+)/gi, "")}
            {tags &&
              tags.map((tag, index) => (
                <a href={`/search/${tag.substr(1)}`}>
                  <span
                    className="text-gradient bg-gradient-to-r from-secondary-300 to-secondary-100"
                    key={index}
                  >
                    &nbsp;{tag}
                  </span>
                </a>
              ))}
          </p>
        ) : (
          <div className="flex flex-wrap w-full">
            {post.content.map((result: any, i: number) =>
              result.includes(keyword) ? (
                result.startsWith("#") ? (
                  <p
                    key={i}
                    className="font-bold text-gradient bg-gradient-to-r from-secondary-300 to-secondary-100"
                  >
                    {result}&nbsp;
                  </p>
                ) : (
                  <p className="font-bold" key={i}>
                    {result}&nbsp;
                  </p>
                )
              ) : result.startsWith("#") ? (
                <p
                  key={i}
                  className="text-gradient bg-gradient-to-r from-secondary-300 to-secondary-100"
                >
                  {result}&nbsp;
                </p>
              ) : (
                <p key={i}>{result}&nbsp;</p>
              )
            )}
          </div>
        )}
      </section>
    </article>
  );
};
