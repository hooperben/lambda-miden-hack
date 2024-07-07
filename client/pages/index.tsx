import Image from "next/image";
import { Inter } from "next/font/google";
import RustComponent from "@/src/rust-component";
import { WebClient } from "@demox-labs/miden-sdk";
import NavBar from "@/components/nav-bar";
import useAccountStore from "@/stores/useAccountStore";
import { useEffect } from "react";
import NoteSummary from "@/components/note-summary";

export default function Home() {
  const accountId = useAccountStore((state) => state.accountId);

  useEffect(() => {
    console.log("changed account:", accountId);
  }, [accountId]);

  return (
    <main className={`flex flex-col w-full font-mono`}>
      <NavBar />

      <NoteSummary />

      {/* <RustComponent /> */}
    </main>
  );
}
