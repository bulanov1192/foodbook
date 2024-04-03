"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogOutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: window.location.origin + "/auth" })}
      className="text-white text-sm font-medium py-1 px-2 hover:bg-red-600"
    >
      Logout
    </button>
  );
}
