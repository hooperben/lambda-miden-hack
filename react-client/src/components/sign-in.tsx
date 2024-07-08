import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import useAccountStore from "../stores/useAccountStore";
import { useContext, useEffect, useState } from "react";
import { MidenClientStoreContext } from "../contexts/miden-client-store";

const SignIn = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const setAccountId = useAccountStore((state) => state.changeAccountId);

  const { accounts } = useContext(MidenClientStoreContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-mono">
          {accountId === "" ? "Sign In" : accountId}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account}
              onClick={() => setAccountId(account)}
            >
              <p className="font-mono">{account}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {accountId !== "" && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setAccountId("")}>
              Log out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignIn;
