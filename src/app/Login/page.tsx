"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const login = async () => {
    setIsGoogleLoading(true);
    signIn("google", {
      callbackUrl: `${window.location.origin}`,
    });
  };
  
  return (
    <main className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <button
          type="button"
          onClick={login}
          disabled={isGoogleLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isGoogleLoading ? "Logging in..." : "Sign in with Google"}
        </button>
      </div>
    </main>
  );
}
