import { midenSync } from "@/helpers/miden-sync";
import { runCommand } from "@/helpers/run-command";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // exec('echo "Hello, World!"');

  await midenSync();
  const formatNotes = (arg: string) => {
    const notes = arg.split("\n");
    return notes;
  };
  const notes = await runCommand(
    "cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden notes -l",
    formatNotes
  );

  res.status(200).json({ notes });
}
