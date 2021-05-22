import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { useTranslation } from "../../shared-hooks/useTranslation";
import { Search } from "react-bootstrap-icons";
import { Post } from "../feed/Post";
import axios from "axios";

interface Results {
  people: any;
  posts: any;
}

export const SearchPage: React.FC = () => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const [search, setSearch] = useState<Results>({ people: [], posts: [] });

  const fetchResults = async () => {
    const data = await axios
      .get(`${process.env.API_URL}search/${query.query}`)
      .then((res) => res.data);
    setSearch(data);
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  return (
    <DefaultDesktopLayout>
      <header className="border-b border-primary-100 m:border-b-0 flex sticky w-full flex-col z-10 pt-1 m:pt-5 top-0 bg-white">
        <div className="flex mb-1 m:mb-7 h-6 items-center">
          <div className="flex flex-1 justify-center w-full">
            <div className="relative w-full z-10 flex flex-col">
              <div className="items-center flex w-full bg-primary-100 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-800 rounded-lg">
                <div className="h-full mx-4 flex items-center pointer-events-none">
                  <Search />
                </div>
                <form className="w-full">
                  <input
                    placeholder={t("header.search")}
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full py-2 px-4 rounded-8 text-primary-800 placeholder-primary-300 focus:outline-none bg-primary-100 pl-0"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col space-y-2">
        {search.people.length > 0 &&
          search.people.map((result: any, i: number) => (
            <div className="flex space-x-2 items-center" key={i}>
              <img
                src={result.picture}
                alt=""
                className="w-6.5 h-6.5 rounded-full"
              />
              <div>
                <p className="font-bold">{result.name}</p>
                <p className="-mt-1 text-primary-300">@{result.username}</p>
              </div>
            </div>
          ))}
        {search.posts.length > 0 &&
          search.posts.map((result: any, i: number) => {
            const content = result.content.split(" ");
            const newResult = { ...result, content: content };
            return <Post post={newResult} key={i} />;
          })}
      </div>
    </DefaultDesktopLayout>
  );
};
