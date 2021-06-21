// this is done to avoid the error
// The worker script extension must be ".js", ".mjs", or ".cjs". Received ".ts"
// so we can use ts file within a worker

const path = require("path");
require("ts-node").register();
require(path.resolve(__dirname, "./purgeCategoriesWorker.ts"));
