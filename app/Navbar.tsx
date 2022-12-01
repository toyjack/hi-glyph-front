'use client'
import {useEffect} from "react";
import Link from "next/link";

function LoginButtons() {
  return (
    <>
      <Link href={"/user/register"} className="btn btn-ghost">
        登録
      </Link>
      <Link href={"/user/login"} className="btn btn-primary">
        ログイン
      </Link>
    </>
  );
}

function LogoutButtons() {
  return (
    <>
      <Link href={"/user/profile"} className="btn btn-info">
        プロファイル
      </Link>
      <Link href={"/user/logout"} className="btn btn-error">
        ログアウト
      </Link>
    </>
  );
}

function Navbar() {
  const navList = [
    { name: "Glyphs", path: "/glyphs" },
    { name: "Search", path: "/search" },
    { name: "About", path: "/about" },
  ];
    let loginButtons;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const ifLoggedIn = localStorage.getItem("accessToken") ? true : false;
    if (!ifLoggedIn) {
      loginButtons = <LoginButtons />;
    } else {
      loginButtons = <LogoutButtons />;
    }
  }, []);

  return (
    <header className="md:pt-5">
      <div className="navbar bg-base-100 rounded-box shadow-md">
        <div className="navbar-start">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            Hi-Glyph
          </Link>
        </div>

        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal p-0">
            {navList.map((nav) => (
              <li key={nav.name}>
                <Link href={nav.path}>{nav.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end lg:flex gap-2">{loginButtons}</div>
      </div>
    </header>
  );
}

export default Navbar;
