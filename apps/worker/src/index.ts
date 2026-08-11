import { runOnce } from "./worker.js";

process.stdout.write(`${JSON.stringify(runOnce())}\n`);
