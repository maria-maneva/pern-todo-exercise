import { parentPort } from "worker_threads";
import { purgeUnusedCategories } from "../utils";

(async () => {
  await purgeUnusedCategories();
  if (parentPort) {
    parentPort.postMessage("categories purged workerThread");
  }
})();
