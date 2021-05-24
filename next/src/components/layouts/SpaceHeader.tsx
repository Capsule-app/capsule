import React, { useState, useContext } from "react";
import { UserContext } from "lib/common/useUser";
import { Media } from "util/hooks/useScreenSize";
import { Search } from "react-bootstrap-icons";
import { useTranslation } from "util/hooks/useTranslation";
import { CreatePostModal } from "components/modals/CreatePost";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export const Header: React.FC<{ space: string }> = ({ space }) => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`${process.env.API_URL}post/`, {
      user_id: user?.id,
      content: content,
      picture: "",
      url: "",
    });

    onClose();
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    push(`/search/${search}`);
  };

  if (!user) return null;

  return (
    <>
      <CreatePostModal
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        content={content}
        setContent={setContent}
      />
      <header className="border-b border-primary-100 m:border-b-0 flex sticky w-full flex-col z-10 pt-1 m:pt-5 top-0 bg-white">
        <div className="flex mb-1 m:mb-7 h-6 items-center">
          <div className="flex flex-1 justify-center w-full">
            <div className="relative w-full z-10 flex flex-col">
              <Media greaterThanOrEqual="md">
                <div className="items-center flex w-full bg-primary-100 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-800 rounded-lg">
                  <div className="h-full mx-4 flex items-center pointer-events-none">
                    <Search />
                  </div>
                  <form className="w-full" onSubmit={handleSearch}>
                    <input
                      placeholder={t("header.search")}
                      autoComplete="off"
                      spellCheck="false"
                      value={search}
                      onChange={(e: any) => setSearch(e.target.value)}
                      className="w-full py-2 px-4 rounded-8 text-primary-800 placeholder-primary-300 focus:outline-none bg-primary-100 pl-0"
                    />
                  </form>
                </div>
              </Media>
              <Media at="sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href="/u/alex">
                      <a>
                        <img
                          src={user.avatarUrl || "/default-profile.png"}
                          alt=""
                          className="w-5.5 h-5.5 rounded-full flex-none select-none"
                        />
                      </a>
                    </Link>
                    <h3></h3>
                  </div>
                  <Search className="w-4 h-4 text-primary-300" />
                </div>
              </Media>
            </div>
          </div>
        </div>
        <Media greaterThanOrEqual="md">
          <div className="flex justify-between items-center mb-5">
            <h3>{space}</h3>
          </div>
        </Media>
      </header>
    </>
  );
};
