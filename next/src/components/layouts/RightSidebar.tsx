import React, { useContext } from "react";
import { UserContext } from "lib/common/useUser";
import { useTranslation } from "util/hooks/useTranslation";
import { AuthContent } from "components/auth/AuthContent";
import { UnauthedContent } from "components/auth/UnauthedContent";
import Link from "next/link";

export const ProfileBlock: React.FC = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  if (!user) return <p>No user</p>;

  return (
    <>
      <AuthContent>
        <p>hello authed user!</p>
      </AuthContent>
      <UnauthedContent>
        <p>Who are you...?</p>
      </UnauthedContent>
      <div className="flex justify-end mb-7 h-6 items-center">
        <Link href={`/u/${user.username}`}>
          <a>
            <img
              src={user.avatarUrl}
              className="w-6 h-6 rounded-full flex-none select-none"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-primary-200">
        <section className="bg-primary-100 rounded-8 p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
            <div>
              <h4>{user.name}</h4>
              <p className="-mt-1 font-medium text-primary-300">{`@${user.username}`}</p>
            </div>
          </div>
          <p>{user.bio || t("users.noBio")}</p>
        </section>
        <section className="bg-primary-100 rounded-8 pb-3">
          <header className="p-3">
            <h4 className="font-serif">{t("sections.topics")}</h4>
          </header>
          <article className="border-t border-primary-200 p-3 cursor-pointer flex items-center space-x-2 w-full h-8 hover:bg-primary-200 transition duration-200 ease-in-out ">
            <div>
              <p className="text-sm text-gray-300">#cats</p>
              <p className="font-bold line-clamp-2 overflow-hidden">
                A report from the CDC now shows that your even your household
                pets are vulnerable to the virus. Cats need masks. #cats.
              </p>
            </div>
            <img src="/cat.png" alt="" className="w-7.5 h-7.5 rounded-8" />
          </article>
          <article className="border-t border-primary-200 p-3 cursor-pointer flex items-center space-x-2 w-full h-8 hover:bg-primary-200 transition duration-200 ease-in-out">
            <div>
              <p className="text-sm text-gray-300">#webdevelopement</p>
              <p className="font-bold line-clamp-2 overflow-hidden">
                Which is better, TypeScript or Javascript? I'm a new developer
                and was wondering which you would recommend to learn.
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
