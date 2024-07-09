import type { NextApiRequest, NextApiResponse } from "next";

import { midenSync } from "@/helpers/miden-sync";
import { runCommand } from "@/helpers/run-command";
import { CLI_PATH } from "@/consts/cli-path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([await midenSync()]);

  const parsed = JSON.parse(req.body);

  const { sender, target, asset, noteType } = parsed;

  console.log(sender, target, asset, noteType);

  // miden send --sender <SENDER ACCOUNT ID> --target <TARGET ACCOUNT ID> --asset <AMOUNT>::<FAUCET ID> --note-type <NOTE_TYPE>

  const command = `miden send --sender ${sender} --target ${target} --asset ${asset} --note-type ${noteType.toLowerCase()}`;

  // miden mint --target <TARGET ACCOUNT ID> --asset <AMOUNT>::<FAUCET ID> --note-type <NOTE_TYPE>

  // BEN token id = 0xae77f3516204d2c3

  const mintCommand = `${CLI_PATH} miden mint --target ${target} --asset ${asset} --note-type ${noteType.toLowerCase()} --force`;

  console.log("running command");
  const runner = await runCommand(mintCommand, (data) => data);

  if (!runner) {
    return res.status(400).json({ error: "Failed to mint note" });
  }
  console.log(runner);

  res.status(200).json({ mintCommand });
}
