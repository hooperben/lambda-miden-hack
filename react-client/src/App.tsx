// src/App.js
import React, { useEffect } from "react";
import MidenApp from "./MidenApp";

import { Toaster } from "./components/ui/toaster";
import useAccountStore from "./stores/useAccountStore";
import NavBar from "./components/nav-bar";
import EmptyPage from "./components/empty-page";
import "./globals.css";
import NoteSummary from "./components/note-summary";

const App = () => {
  const accountId = useAccountStore((state) => state.accountId);

  const testing = () => {
    // uncomment this to break
  };

  useEffect(() => {
    console.log("changed account:", accountId);
    // const client = new WebClient();
  }, [accountId]);

  return (
    <div className={`flex flex-col w-full font-mono`}>
      <>
        <Toaster />
        <NavBar />

        {accountId === "" && <EmptyPage />}

        {accountId !== "" && <NoteSummary />}
        {/* <MidenApp /> */}
      </>
    </div>
  );
};

export default App;
