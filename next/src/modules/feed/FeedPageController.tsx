import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../shared-hooks/useUser";
import { Header } from "../layouts/Header";
import { Post } from "./Post";
import axios from "axios";

export const FeedPageController: React.FC = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<any>([]);

  const getPosts = async () => {
    try {
      const data = await axios
        .post(`${process.env.API_URL}auth/posts`, { id: user ? user.id : "" })
        .then((res) => res.data);
      setPosts(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  return (
    <>
      <Header />
      <div className="mt-2 m:mt-0 space-y-3">
        {posts &&
          posts.length > 0 &&
          posts.map((post: any) => <Post post={post} key={post.id} />)}
      </div>
    </>
  );
};
