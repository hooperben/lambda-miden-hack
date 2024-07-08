import { runCommand } from "./run-command";

export const midenSync = async () => {
  console.log("running miden sync");
  const parser = (arg: string) => arg;
  runCommand(
    "cd /Users/benhooper/dev/zkBrussels/miden-client/testing && miden sync",
    parser
  );
  console.log("miden sync complete");
};
