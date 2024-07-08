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
import { useContext, useState } from "react";
import { MidenClientStoreContext } from "../contexts/miden-client-store";
import { toast } from "./ui/use-toast";

const SignIn = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const setAccountId = useAccountStore((state) => state.changeAccountId);

  const { client } = useContext(MidenClientStoreContext);

  const [accounts, setAccounts] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSignInPress = async () => {
    setLoading(true);
    try {
      const test = await client.get_accounts();
      console.log(test);
      const formatted = test.map((item: any) => item.id);

      console.log(formatted);
      setAccounts(formatted);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleAccountCreation = async () => {
    setLoading(true);
    try {
      const newAccount = await client.new_wallet("OffChain", true);
      console.log(newAccount);

      await client.sync_state();
      console.log("synced state");

      // const test = await client.get_accounts();
      // console.log(test);
      // const formatted = test.map((item: any) => item.id);

      // console.log(formatted);
      // setAccounts(formatted);

      setAccountId(newAccount);

      toast({
        title: `Account created 🫡`,
        description: `${newAccount} is ready to go.`,
      });
    } catch (err) {
      console.log("error creating new account");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        // onPointerDown={() => console.log("called")}
        onPointerDown={() => handleSignInPress()}
      >
        <Button
          variant="outline"
          className="font-mono"
          onClick={() => handleSignInPress()}
        >
          {accountId === "" ? "Sign In" : accountId}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {accounts.length !== 0 && (
          <>
            <DropdownMenuLabel className="font-mono">
              Accounts
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          {loading && <DropdownMenuItem>Loading...</DropdownMenuItem>}
          {!loading &&
            accounts.map((account) => (
              <DropdownMenuItem
                key={account}
                onClick={() => setAccountId(account)}
              >
                <p className="font-mono">{account}</p>
              </DropdownMenuItem>
            ))}

          {accounts.length !== 0 && <DropdownMenuSeparator />}

          {accountId === "" && (
            <DropdownMenuItem onClick={handleAccountCreation}>
              <h1 className="font-mono font-bold">Create New Account</h1>
            </DropdownMenuItem>
          )}
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
