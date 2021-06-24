import React from "react";
import { Chatbubble } from "react-ionicons";

const LandingPage: React.FC = () => {
  return (
    <>
      <header className="header px-5 py-1">
        <Chatbubble width="50px" height="50px" color="lightblue" />
      </header>
      <div className="mt-10 mx-auto flex flex-col items-center">
        <p className="font-bold text-5xl">Connect with Capsule.</p>
        <div className="thing h-22"></div>
      </div>
    </>
  );
};

export default LandingPage;
