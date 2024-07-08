import React, { useEffect } from "react";
import EmptyPage from "./components/empty-page";
import NavBar from "./components/nav-bar";
import NoteSummary from "./components/note-summary";
import { Toaster } from "./components/ui/toaster";
import { MidenClientStoreProvider } from "./contexts/miden-client-store";
import "./globals.css";
import useAccountStore from "./stores/useAccountStore";

const App = () => {
  const accountId = useAccountStore((state) => state.accountId);

  useEffect(() => {
    console.log("changed account:", accountId);
    // const client = new WebClient();
  }, [accountId]);

  return (
    <div className={`flex flex-col w-full font-mono`}>
      <MidenClientStoreProvider>
        <Toaster />
        <NavBar />

        {accountId === "" && <EmptyPage />}

        {accountId !== "" && <NoteSummary />}
      </MidenClientStoreProvider>
    </div>
  );
};

export default App;
