import SignInWithGithubBtn from "@/components/SignInWithGithubBtn";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import SignInWithGoogleBtn from "@/components/SignInWithGoogleBtn";

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <div className="wrapper flex w-screen h-screen justify-center items-center">
      <div className="card w-1/2 min-w-[260px] max-w-[500px] bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-indigo-600">Please sign in</h1>
          <p className="text-gray-700 text-base">
            Sign in to access more personalized features
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <SignInForm />
          <SignInWithGithubBtn />
          <SignInWithGoogleBtn />
        </div>
      </div>
    </div>
  );
}
