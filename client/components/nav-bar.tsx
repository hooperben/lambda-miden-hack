import useAccountStore from "@/stores/useAccountStore";

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

const testAccounts = ["0x9ea2f38b3a1ef69d", "0x96af2e5be4bbe43f"];

const NavBar = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const setAccountId = useAccountStore((state) => state.changeAccountId);

  return (
    <nav className="flex justify-between m-2">
      <h2 className="text-lg">Sendooor</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
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
                {account}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          {accountId !== "" && (
            <DropdownMenuItem onClick={() => setAccountId("")}>
              Log out
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
