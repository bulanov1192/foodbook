"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const signInWithEmail = async () => {
    if (
      !email.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      )
    ) {
      setError("Invalid email address");
      return;
    }

    const res = await signIn("email", {
      email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    if (res?.error) {
      throw res.error;
    } else if (res?.ok) {
      return redirect("/link-sent");
    }
  };

  return (
    <form action={signInWithEmail} className="flex flex-col gap-y-2">
      <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="yourmail@example.com"
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login with Email
      </button>
    </form>
  );
}
