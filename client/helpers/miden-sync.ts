import { CLI_PATH } from "@/consts/cli-path";
import { runCommand } from "./run-command";

export const midenSync = async () => {
  console.log("running miden sync");
  const parser = (arg: string) => arg;
  await runCommand(`${CLI_PATH} miden sync`, parser);
  console.log("miden sync complete");
};
