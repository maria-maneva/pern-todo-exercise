import { purgeUnusedCategories } from "../utils";

process.on("message", async () => {
  await purgeUnusedCategories();
  if (!!process.send) {
    process.send("categories purged childProcess");
  }
  process.exit();
});
