import type { NextApiRequest, NextApiResponse } from "next";

import { midenSync } from "@/helpers/miden-sync";

const removeMnoSuffix = (input: string): string => {
  const suffix = ".mno";
  if (input.endsWith(suffix)) {
    return input.slice(0, -suffix.length);
  }
  return input;
};
import { runCommand } from "@/helpers/run-command";
import { CLI_PATH } from "@/consts/cli-path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([await midenSync()]);

  const parsed = JSON.parse(req.body);

  console.log(parsed);

  const { notePath, accountId } = parsed;

  const filePath = `/Users/benhooper/dev/zkBrussels/miden-client/client/public/${notePath}.mno`;

  // miden export --filename /Users/benhooper/dev/zkBrussels/miden-client/client/public/ -e partial 0x25a654abc87170b6a1dbdb62d281c34d2af92e54e47dbc8d8ec5c85d11d302d3

  // import the note
  // const importCommand = `cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden import ${filePath}`;
  // const importRunner = await runCommand(importCommand, (data) => data);

  const command = `${CLI_PATH} miden consume-notes --account ${accountId} ${removeMnoSuffix(
    notePath
  )} --force`;

  console.log(command);

  const runner = await runCommand(command, (data) => data);

  res.status(200).json({ runner });
}
