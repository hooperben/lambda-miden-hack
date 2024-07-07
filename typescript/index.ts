import { syncState } from "./helpers/sync-state";

const main = async () => {
  await syncState();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
