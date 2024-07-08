import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import useAccountStore from "@/stores/useAccountStore";
import { NoteInfo } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import ImportNote from "./import-note";
import NewTransaction from "./new-transaction";
import ShareAsUrl from "./share-as-url";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const NoteSummary = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const getNotesBackend = async (): Promise<{
    notes: {
      inputNotes: NoteInfo[];
      outputNotes: NoteInfo[];
    };
  }> => {
    const request = await fetch(`/api/notes?accountId=${accountId}`);
    const data = await request.json();

    console.log(data);

    return data;
  };

  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [accountId, "notes"],
    queryFn: getNotesBackend,
  });

  const Row = ({ title, value }: { title: string; value: string }) => (
    <div className="flex justify-between">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );

  const getStatusColour = (status: string) => {
    switch (status) {
      case "Committed":
        return "text-[color:yellow]";
      case "Consumed":
        return "text-[color:green]";
      case "Spent":
        return "text-[color:yellow]";
      default:
        return "text-gray-500";
    }
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

      {isLoading && <p>Loading...</p>}

      <h2 className="mt-[60px]">Input Notes</h2>

      <Separator className="m-3 max-w-[98%]" />

      {notes &&
        notes.notes.inputNotes &&
        notes.notes.inputNotes.map((note) => (
          <Accordion type="single" collapsible key={note.ID}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex justify-between w-full">
                  <div>{note.ID} </div>
                  <div
                    className={`mr-10 ${getStatusColour(
                      note.Status.split(" ")[0]
                    )}`}
                  >
                    {note.Status.split(" ")[0]}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <Separator className="m-3 max-w-[98%]" />

                  <Row title="ID" value={note.ID} />
                  <Row title="Script Hash" value={note["Script Hash"]} />
                  <Row title="Assets Hash" value={note["Assets Hash"]} />
                  <Row title="Inputs Hash" value={note["Inputs Hash"]} />
                  <Row title="Serial Number" value={note["Serial Number"]} />
                  <Row title="Status" value={note.Status} />
                  <Row title="Tag" value={note.Tag} />
                  <Row title="Sender" value={note.Sender} />
                  <Row title="Exportable" value={note.Exportable} />

                  <Separator className="m-3 max-w-[98%]" />

                  <Row title="Type" value={note.Type} />
                  <Row title="Faucet ID" value={note["Faucet ID"].toString()} />
                  <Row title="Amount" value={note.Amount.toString()} />
                  <Row title="Index" value={note.Index.toString()} />
                  <Row title="Value" value={note.Value.toString()} />
                </div>

                <div className="mt-6">
                  <h1>Note Code</h1>

                  <Card className="mt-2 p-4">
                    <CardContent>
                      <pre>{note.code.join("\n")}</pre>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

      <h2 className="mt-[60px]">Output Notes</h2>

      <Separator className="m-3 max-w-[98%]" />

      {notes &&
        notes.notes.outputNotes &&
        notes.notes.outputNotes.map((note) => (
          <Accordion type="single" collapsible key={note.ID}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex justify-between w-full">
                  <div>{note.ID} </div>
                  <div
                    className={`mr-10 ${getStatusColour(
                      note.Status.split(" ")[0]
                    )}`}
                  >
                    {note.Status.split(" ")[0]}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-end gap-1">
                  <Button>Export Note (.mno file)</Button>

                  <ShareAsUrl note={note.ID} />
                </div>
                <div>
                  <Separator className="m-3 max-w-[98%]" />

                  <Row title="ID" value={note.ID} />
                  <Row title="Script Hash" value={note["Script Hash"]} />
                  <Row title="Assets Hash" value={note["Assets Hash"]} />
                  <Row title="Inputs Hash" value={note["Inputs Hash"]} />
                  <Row title="Serial Number" value={note["Serial Number"]} />
                  <Row title="Status" value={note.Status} />
                  <Row title="Tag" value={note.Tag} />
                  <Row title="Sender" value={note.Sender} />
                  <Row title="Exportable" value={note.Exportable} />

                  <Separator className="m-3 max-w-[98%]" />

                  <Row title="Type" value={note.Type} />
                  <Row title="Faucet ID" value={note["Faucet ID"].toString()} />
                  <Row title="Amount" value={note.Amount.toString()} />
                  <Row title="Index" value={note.Index.toString()} />
                  <Row title="Value" value={note.Value.toString()} />
                </div>

                <div className="mt-6">
                  <h1>Note Code</h1>

                  <Card className="mt-2 p-4">
                    <CardContent>
                      <pre>{note.code.join("\n")}</pre>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

      {notes && notes.notes.outputNotes.length === 0 && (
        <p>No output notes yet!</p>
      )}
    </div>
  );
};

export default NoteSummary;
