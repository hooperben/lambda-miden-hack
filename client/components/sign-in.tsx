import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import useAccountStore from "@/stores/useAccountStore";
import { useState } from "react";

const testAccounts = ["0x9ea2f38b3a1ef69d", "0x96af2e5be4bbe43f"];

const SignIn = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const setAccountId = useAccountStore((state) => state.changeAccountId);

  const [loading, setLoading] = useState(false);

  const handleSignInPress = async () => {
    setLoading(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="font-mono"
          onClick={() => handleSignInPress()}
        >
          {accountId === "" ? "Sign In" : accountId}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {testAccounts.map((account) => (
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
