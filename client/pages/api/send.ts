import type { NextApiRequest, NextApiResponse } from "next";

import { midenSync } from "@/helpers/miden-sync";
import { runCommand } from "@/helpers/run-command";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([await midenSync()]);

  console.log(req.body);

  const parsed = JSON.parse(req.body);

  const { sender, target, asset, noteType } = parsed;

  console.log(sender, target, asset, noteType);

  // miden send --sender <SENDER ACCOUNT ID> --target <TARGET ACCOUNT ID> --asset <AMOUNT>::<FAUCET ID> --note-type <NOTE_TYPE>

  const command = `miden send --sender ${sender} --target ${target} --asset ${asset} --note-type ${noteType.toLowerCase()}`;

  // miden mint --target <TARGET ACCOUNT ID> --asset <AMOUNT>::<FAUCET ID> --note-type <NOTE_TYPE>

  // BEN token id = 0xae77f3516204d2c3

  const other = `cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden mint --target ${target} --asset ${asset} --note-type ${noteType.toLowerCase()} --force`;

  console.log(other);

  console.log("running command");
  const runner = await runCommand(other, (data) => data);
  console.log(runner);

  // console.log(command);

  const tx = "";

  res.status(200).json({ tx, other });
}
