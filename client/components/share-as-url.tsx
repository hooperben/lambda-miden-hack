import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAccountStore from "@/stores/useAccountStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";

const ShareAsUrl = ({ note }: { note: string }) => {
  const accountId = useAccountStore((state) => state.accountId);

  const filePath = `http://localhost:3000?importNote=${note}.mno`;

  const createNoteUrl = async () => {
    await fetch("/api/generate-note-url", {
      method: "POST",
      body: JSON.stringify({ sender: accountId, noteId: note }),
    });
  };

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: createNoteUrl,
  });

  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(filePath);
      setCopySuccess("Copied to clipboard!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className="font-mono">
      <Dialog>
        <DialogTrigger>
          <Button className="font-sm">Share Note As URL</Button>
        </DialogTrigger>

        <DialogContent className="font-mono">
          <DialogHeader>
            <DialogTitle className="text-center">Share Note URL</DialogTitle>
            <DialogDescription>
              <div className="text-center flex flex-col justify-center w-full gap-1">
                Generate a URL to share with the recipient to claim this note.
                <Button onClick={() => mutateAsync()} className="mt-4">
                  Generate Shareable URL
                </Button>
                {isSuccess && (
                  <div className="flex flex-col mt-4">
                    <Button onClick={copyToClipboard}>
                      Copy Shareable URL
                    </Button>
                    {copySuccess && <p className="mt-2">{copySuccess}</p>}
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareAsUrl;
