import { fork } from "child_process";
import { ICategory } from "../interfaces";

export const invokePurgeCategoriesChildProcess = () => {
  const child_process = fork("./src/child_processes/purgeCategoriesProcess");
  child_process.send({});
  child_process.on("message", (message: string) => console.log(message));
};

export const invokeProcessCategoriesChildProcess = (
  categoryNamesArray: string[]
): Promise<ICategory[]> => {
  return new Promise((resolve) => {
    const child_process = fork(
      "./src/child_processes/processCategoriesProcess"
    );
    child_process.send(categoryNamesArray);
    child_process.on("message", (categories: ICategory[]) => {
      resolve(categories);
    });
  });
};
