import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isClient } from "lib/constants";
import { useCreateUserMutation } from "@capsule/client-gql";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  const [useCreateUser, { data, error }] = useCreateUserMutation();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (form: any) => {
    await useCreateUser({ variables: form });
  };

  useEffect(() => {
    if (!isClient() || !data) return;

    if (data.createUser) window.location.reload();
  }, [data]);

  return (
    <div className="grid w-full h-full grid-rows-fr">
      <div className="hidden m:flex" />
      <div className="flex m-auto flex-col p-6 gap-6 bg-primary-100 m:rounded-8 x-10 m:w-400 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-3xl text-black font-bold">Welcome</span>
          <div className="flex-wrap">
            Already have an account?&nbsp;
            <Link href="/login" passHref>
              <a className="text-accent font-semibold">Login</a>
            </Link>
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
          <input
            {...register("name")}
            placeholder="Name"
            type="text"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          <input
            {...register("username")}
            placeholder="Username"
            type="text"
            className="flex outline-none py-2 px-3 rounded-lg bg-primary-200"
          />
          <button
            type="submit"
            className="flex outline-none focus:ring-4 focus:ring-accent py-2 px-6 rounded-lg bg-accent items-center justify-center"
          >
            <p className="text-base font-bold text-white">Sign up</p>
          </button>
        </form>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center m:px-7">
        <p>capsule</p>
      </div>
    </div>
  );
};

export default SignUpPage;
