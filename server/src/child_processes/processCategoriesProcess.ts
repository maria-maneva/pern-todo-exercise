import { processCategoryInput } from "../utils";

process.on("message", async (categoryNamesArray) => {
  const processedCategories = await processCategoryInput(categoryNamesArray);

  if (!!process.send) {
    process.send(processedCategories);
  }

  process.exit();
});
