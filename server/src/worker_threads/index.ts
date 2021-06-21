import { Worker } from "worker_threads";
import { ICategory } from "../interfaces";

export const invokePurgeCategoriesWorker = () => {
  const worker = new Worker("./src/worker_threads/purgeCategoriesWorker.js");
  worker.on("message", (message: string) => console.log(message));
};

export const invokeProcessCategoriesWorker = (
  categoryNamesArray: string[]
): Promise<ICategory[]> => {
  return new Promise((resolve) => {
    const worker = new Worker(
      "./src/worker_threads/processCategoriesWorker.js",
      { workerData: categoryNamesArray }
    );

    worker.on("message", (categories: ICategory[]) => {
      resolve(categories);
    });
  });
};
