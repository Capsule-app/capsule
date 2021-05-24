import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../../util/hooks/useTranslation";

export const PeopleList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex mb-7 h-6 items-center">
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="" width="40px" height="40px" />
          </a>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <h4>{t("sections.people")}</h4>
        <section className="mt-2">
          <div className="py-1 flex items-center space-x-2">
            <img
              src="/me.png"
              alt=""
              className="w-6 h-6 rounded-full flex-none select-none"
            />
            <p className="font-bold">Alex</p>
          </div>
          <div className="py-1 flex items-center space-x-2">
            <img
              src="/default-profile.png"
              alt=""
              className="w-6 h-6 rounded-full flex-none select-none"
            />
            <p className="font-bold">Lorem</p>
          </div>
        </section>
      </div>
    </>
  );
};
