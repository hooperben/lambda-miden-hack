import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccountState {
  accountId?: string;
  changeAccountId: (accountId: string) => void;
}
const useAccountStore = create(
  persist<AccountState>(
    (set) => ({
      accountId: "",
      changeAccountId: (accountId: string) => set(() => ({ accountId })),
    }),
    {
      name: "account-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAccountStore;
