// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { runCommand } from "@/helpers/run-command";
import type { NextApiRequest, NextApiResponse } from "next";

type AccountInfo = {
  accountId: string;
  type: string;
  storageMode: string;
  nonce: number;
};

function parseTableToArray(table: string): AccountInfo[] {
  // Split the table into lines
  const lines = table.trim().split("\n");

  // Extract the header line
  const headers = lines[0].split("┆").map((header) => header.trim());

  // Extract the data lines
  const dataLines = lines.slice(2); // Skip the header and divider lines

  // Parse the data lines into objects
  const data: AccountInfo[] = dataLines
    .map((line) => {
      const [accountId, type, storageMode, nonce] = line
        .split("┆")
        .map((cell) => cell.trim());

      return {
        accountId,
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
