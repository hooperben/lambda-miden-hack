import { Separator } from "./ui/separator";
import NewTransaction from "./new-transaction";
import { MidenClientStoreContext } from "../contexts/miden-client-store";
import { useContext, useEffect, useState } from "react";
import ImportNote from "./import-note";
import useAccountStore from "../stores/useAccountStore";
import { Button } from "./ui/button";
import { WebClient } from "@demox-labs/miden-sdk";

const NoteSummary = () => {
  const { client } = useContext(MidenClientStoreContext);

  const accountId = useAccountStore((state) => state.accountId);

  const [userNotes, setUserNotes] = useState<any[]>([]);

  useEffect(() => {
    if (!client) return;
    const getNotes = async () => {
      try {
        await client.sync_state();
        console.log("synced state");
      } catch (error) {
        console.log("error getting notes");
      }

      console.log("accounts");
      const accounts = await client.get_accounts();
      console.log(accounts);

      try {
        console.log("notes");

        const notes = await client.get_input_notes(
          // account_id: accounts[0].id,
          "All"
        );

        console.log("set notes");
        setUserNotes(notes);

        const note_details = await client.get_input_note(notes[0]);
        console.log(note_details);

        console.log(notes);
      } catch (err) {
        console.log(err);
        console.log("error getting notes");
        console.log(err);
      }
    };

    getNotes();
  }, [client]);

  const consumeNote = async (note: string) => {
    try {
      await client.sync_state();

      console.log("synced state");

      console.log(accountId);

      const faucetId = "0xa685a26f911aaf06";

      await client.fetch_and_cache_account_auth_by_pub_key(accountId); // console.log([note]);

      const checkExists = await client.get_input_note(note);
      console.log(checkExists);

      if (!checkExists) return;

      const webClient = new WebClient();
      await webClient.create_client("http://18.203.155.106:57291");

      // fails here
      const test = await webClient.new_consume_transaction(accountId, [note]);
      console.log(test);

      console.log("consumed!"); //
    } catch (err) {
      console.log(err);
    }
  };

  const truncateNote = (input: string): string => {
    if (input.length <= 12) {
      return input; // If the string is 12 characters or less, return it as is
    }
    const firstPart = input.slice(0, 6);
    const lastPart = input.slice(-6);
    return `${firstPart}...${lastPart}`;
  };

  return (
    <div className="flex flex-col align-center justify-center mx-4">
      <div className="flex justify-between w-[98%] mt-4 items-center">
        <p className="text-sm">Your Notes</p>

        <div className="flex gap-1">
          <ImportNote />
          <NewTransaction />
        </div>
      </div>
      <Separator className="m-3 max-w-[98%]" />

      <div>
        <h2>Committed Notes - Not Consumed Yet</h2>
        <Separator className="m-3 max-w-[98%]" />

        {userNotes.map((note) => (
          <div key={note} className="flex justify-between">
            <p>{truncateNote(note)}</p>
            <Button onClick={() => consumeNote(note)}>Consume Note</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteSummary;
