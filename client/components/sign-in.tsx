import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAccountStore from "@/stores/useAccountStore";
import { useQuery } from "@tanstack/react-query";

type AccountInfo = {
  accountId: string;
  type: string;
  storageMode: string;
  nonce: number;
};

const SignIn = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const setAccountId = useAccountStore((state) => state.changeAccountId);

  const getAccounts = async (): Promise<AccountInfo[]> => {
    const request = await fetch("/api/account");
    const data = await request.json();
    return data.accounts;
  };

  const {
    data: accounts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getAccounts,
  });

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
          {accounts &&
            accounts.map((account) => (
              <DropdownMenuItem
                key={account.accountId}
                onClick={() => setAccountId(account.accountId)}
              >
                <p className="font-mono">{account.accountId}</p>
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
