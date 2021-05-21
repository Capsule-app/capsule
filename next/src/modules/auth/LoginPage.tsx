import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { loginQuery } from "lib/graphql/login";
import { isClient } from "lib/constants";

export const LoginPage: React.FC = () => {
  const [useLogin, { data, error }] = useMutation(loginQuery);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (form: any) => {
    await useLogin({ variables: form });

    if (!isClient() || !data) return;
    localStorage.setItem("uid", data.login.accessToken);
    window.location.reload();
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
        {error && error.graphQLErrors[0].message}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          {/* <p className="font-semibold text-red-100">{error}</p> */}
          <button
            type="submit"
            className="flex outline-none focus:ring-4 focus:ring-accent py-2 px-6 rounded-lg bg-accent items-center justify-center"
          >
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
