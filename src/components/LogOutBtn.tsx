"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogOutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: window.location.origin + "/auth" })}
      className="text-white text-sm font-medium py-2 px-4 rounded bg-red-500 hover:bg-red-600"
    >
      Logout
    </button>
  );
}
