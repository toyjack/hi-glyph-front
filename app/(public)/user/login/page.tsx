"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

async function getToken(username: string, password: string) {
  const res = await fetch(
    "https://glyph.lab.hi.u-tokyo.ac.jp/auth/login",
    // "http://localhost:4001/auth/login",
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  const data = await res.json();
  if (data.error) {
    return;
  }
  return data["access_token"];
}

function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const accessToken = await getToken(email, password);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      router.push("/user/profile");
    }
  };

  return (
    <div className="flex flex-grow py-4 gap-5 items-center justify-center">
      <div className="rounded-box shadow-lg p-4 bg-base-100">
        <h2 className="text-lg font-bold">ログイン</h2>
        <form action="#" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col py-4">
            <label className="text-primary" htmlFor="email">
              Email
            </label>
            <input
              className=" input input-primary"
              type="email"
              id="email"
              ref={emailRef}
            />
          </div>

          <div className="flex flex-col py-4">
            <label className="" htmlFor="password">
              Password:
            </label>
            <input
              className="input input-primary p-2"
              type="password"
              id="password"
              ref={passwordRef}
            />
          </div>

          <div className="flex py-4">
            <input
              className="btn btn-primary w-full"
              type="submit"
              value="ログイン"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
