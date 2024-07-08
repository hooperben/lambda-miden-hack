// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { runCommand } from "@/helpers/run-command";
import type { NextApiRequest, NextApiResponse } from "next";

type AccountInfo = {
  accountId: string;
  type: string;
  storageMode: string;
  nonce: number;
};

const removePipe = (input: string): string => {
  return input.startsWith("│ ") ? input.substring(2) : input;
};

function parseTableToArray(table: string): AccountInfo[] {
  const lines = table.trim().split("\n");
  const dataLines = lines.slice(2); // Skip the header and divider lines

  const data: AccountInfo[] = dataLines
    .map((line) => {
      const [accountId, type, storageMode, nonce] = line
        .split("┆")
        .map((cell) => cell.trim());

      return {
        accountId: removePipe(accountId),
        type,
        storageMode,
        nonce: parseInt(nonce, 10),
      };
    })
    .filter((account) => account.type !== undefined);

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accounts = await runCommand(
    "cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden account -l",
    parseTableToArray
  );

  res.status(200).json({ accounts });
}
