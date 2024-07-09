"use client";

import ModeToggle from "./ui/dark-mode-button";
import SignIn from "./sign-in";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex justify-between m-2">
      <div className="flex">
        <Image src="/icon.png" width={40} height={20} alt="hey" />

        <h2 className="text-lg  ml-1">Sendooor</h2>
      </div>
      <div className="flex">
        <ModeToggle />
        <div className="m-1" />
        <SignIn />
      </div>
    </nav>
  );
};

export default NavBar;
