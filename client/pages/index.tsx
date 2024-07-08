import EmptyPage from "@/components/empty-page";
import NavBar from "@/components/nav-bar";
import NoteSummary from "@/components/note-summary";
import UserClaim from "@/components/user-claim";
import useAccountStore from "@/stores/useAccountStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const accountId = useAccountStore((state) => state.accountId);

  const router = useRouter();

  const [isUserClaim, setIsUserClaim] = useState(false);

  useEffect(() => {
    if (router.query.importNote && accountId) {
      setIsUserClaim(true);
    }
  }, [accountId, router.query]);

  return (
    <main className={`flex flex-col w-full font-mono`}>
      <NavBar />

      {isUserClaim && (
        <UserClaim
          notePath={router.query.importNote as string}
          onClose={() => setIsUserClaim(false)}
        />
      )}

      {accountId === "" && <EmptyPage />}

      {accountId !== "" && <NoteSummary />}
    </main>
  );
}
