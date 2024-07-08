import type { NextApiRequest, NextApiResponse } from "next";

import { midenSync } from "@/helpers/miden-sync";
import { runCommand } from "@/helpers/run-command";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([await midenSync()]);

  const parsed = JSON.parse(req.body);

  console.log(parsed);

  const { sender, noteId } = parsed;

  console.log(sender);
  console.log(noteId);

  const filePath = `/Users/benhooper/dev/zkBrussels/miden-client/client/public/${noteId}.mno`;

  // miden export --filename /Users/benhooper/dev/zkBrussels/miden-client/client/public/ -e partial 0x25a654abc87170b6a1dbdb62d281c34d2af92e54e47dbc8d8ec5c85d11d302d3

  const command = `cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden export --filename ${filePath} -e partial ${noteId}`;

  const runner = await runCommand(command, (data) => data);

  res.status(200).json({ runner });
}
