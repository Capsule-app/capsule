import React from "react";
import Head from "next/head";

export const OpenGraph: React.FC<{
  title: string;
  description: string;
  image: string;
}> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content="https://capsule.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta property="twitter:domain" content="capsule.app" />
      <meta property="twitter:url" content="https://capsule.app/" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
