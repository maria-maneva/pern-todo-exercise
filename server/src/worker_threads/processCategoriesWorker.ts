import { parentPort, workerData } from "worker_threads";
import { processCategoryInput } from "../utils";

(async () => {
  const processedCategories = await processCategoryInput(workerData);
  if (parentPort) {
    parentPort.postMessage(processedCategories);
  }
})();
