import NavBar from "@/components/nav-bar";
import useAccountStore from "@/stores/useAccountStore";
import { useEffect } from "react";
import NoteSummary from "@/components/note-summary";
import EmptyPage from "@/components/empty-page";

export default function Home() {
  const accountId = useAccountStore((state) => state.accountId);

  useEffect(() => {
    console.log("changed account:", accountId);
  }, [accountId]);

  return (
    <main className={`flex flex-col w-full font-mono`}>
      <NavBar />

      {accountId === "" && <EmptyPage />}

      {accountId !== "" && <NoteSummary />}
    </main>
  );
}
