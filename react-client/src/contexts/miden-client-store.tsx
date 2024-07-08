import { WebClient } from "@demox-labs/miden-sdk";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface IMidenClientStore {
  client: WebClient | undefined;
  setClient?: any;
  accounts: string[];
}

const defaultMidenClientStore: IMidenClientStore = {
  client: undefined,
  setClient: () => {},
  accounts: [],
};

export const MidenClientStoreContext = createContext<IMidenClientStore>(
  defaultMidenClientStore
);

export const MidenClientStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [client, setClient] = useState<any>(undefined);

  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const webClient = new WebClient();
        await webClient.create_client("http://18.203.155.106:57291");
        setClient(webClient);
        console.log("set client");
      } catch (error) {
        console.log(error);
        console.log("error initializing client");
      }
    };

    initializeClient();
  }, []);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (client) {
        try {
          const formatted = [""]; // info.map((item: any) => item.id);

          setAccounts(formatted);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchAccountInfo();
  }, [client]);

  const values = useMemo(
    () => ({ client, setClient, accounts }),
    [client, setClient, accounts]
  );

  return (
    <MidenClientStoreContext.Provider value={values}>
      {children}
    </MidenClientStoreContext.Provider>
  );
};
