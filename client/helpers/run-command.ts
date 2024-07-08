import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

export const runCommand = async <T>(
  command: string,
  parser: (arg: string) => T
): Promise<T | undefined> => {
  try {
    const { stdout, stderr } = await exec(command);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return undefined;
    }

    if (!stdout) {
      console.error(`stdout: ${stdout}`);
      return undefined;
    }

    console.log(`stdout: ${stdout}`);

    console.log(`${stdout}`);
    const parsed = parser(stdout);
    console.log(parsed);

    return parsed;
  } catch (error: any) {
    console.error(`Error executing command: ${error}`);

    return undefined;
  }
};