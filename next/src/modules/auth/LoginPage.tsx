import React, { useState } from "react";
import axios from "axios";

const isClient = () => typeof window !== "undefined";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (e: any) => {
    e.preventDefault();

    const res = await axios
      .post(`${process.env.API_URL}auth/login/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          return res.data;
        }

        localStorage.setItem("token", res.data._token);
        return res.data;
      });
    if (!res.error && isClient()) {
      console.log("aaaaaaaaaaaaaaaaaaaaaa");
      window.location.reload();
    }
  };

  return (
    <div className="grid w-full h-full grid-rows-fr">
      <div className="hideen m:flex" />
      <div className="flex m-auto flex-col p-6 gap-6 bg-primary-100 m:rounded-8 x-10 m:w-400 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-3xl text-black font-bold">Welcome</span>
          <div className="flex-wrap">
            By logging in, you accept our&nbsp;
            <a href="/404" className="text-accent font-semibold">
              Privacy Policy
            </a>
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={loginUser}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          <p className="font-semibold text-red-100">{error}</p>
          <button className="flex outline-none focus:ring-4 focus:ring-accent py-2 px-6 rounded-lg bg-accent flex items-center justify-center">
            <p className="text-base font-bold text-white">Login</p>
          </button>
        </form>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center m:px-7">
        <p>capsule</p>
      </div>
    </div>
  );
};
