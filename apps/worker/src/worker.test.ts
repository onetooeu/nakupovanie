import { describe, expect, it } from "vitest";

import { runOnce } from "./worker.js";

describe("worker skeleton", () => {
  it("starts idle without claiming unimplemented work", () => {
    expect(runOnce()).toEqual({
      processed: 0,
      service: "worker",
      status: "idle",
    });
  });
});
