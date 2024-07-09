import { CLI_PATH } from "@/consts/cli-path";
import { getNoteData } from "@/helpers/get-note-data";
import { midenSync } from "@/helpers/miden-sync";
import { runCommand } from "@/helpers/run-command";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accountId } = req.query;
  await Promise.all([await midenSync()]);

  const extractHashes = (
    input: string
  ): { inputNotes: string[]; outputNotes: string[] } => {
    const sections = input.split(/\n\s*Output Notes\s*\n══════════════\n/);

    const inputSection = sections[0].split(
      /\n\s*Input Notes\s*\n═════════════\n/
    )[1];
    const outputSection = sections[1] || "";

    const hashRegex = /\b0x[a-fA-F0-9]{64}\b/g;

    const getHashes = (section: string): string[] => {
      const lines = section.split("\n");
      const hashes: string[] = [];
      for (const line of lines) {
        const match = line.match(hashRegex);
        if (match) {
          hashes.push(...match);
        }
      }
      return hashes;
    };

    const inputNotes = getHashes(inputSection);
    const outputNotes = getHashes(outputSection);

    return { inputNotes, outputNotes };
  };

  const command = await runCommand(
    `${CLI_PATH} miden notes -l --account-id ${accountId}`,
    extractHashes
  );

  interface Response {
    inputNotes: string[];
    outputNotes: string[];
  }
  let responses: Response = {
    inputNotes: [],
    outputNotes: [],
  };

  if (command?.inputNotes) {
    for (const note of command?.inputNotes) {
      const currentNoteDetails = await getNoteData(note);
      responses.inputNotes.push(currentNoteDetails);
    }
  }

  if (command?.outputNotes) {
    for (const note of command?.outputNotes) {
      const currentNoteDetails = await getNoteData(note);
      responses.outputNotes.push(currentNoteDetails);
    }
  }

  res.status(200).json({ notes: responses });
}
