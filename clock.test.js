import { describe, expect, test } from "bun:test";
import { formatElapsed, msUntilNextTick } from "./clock.js";

describe("formatElapsed", () => {
  test.each([
    [0, "0:00"],
    [999, "0:00"],
    [1000, "0:01"],
    [65_000, "1:05"],
    [59 * 60_000 + 59_000, "59:59"],
    [3_600_000, "1:00:00"],
    [3_600_000 + 5 * 60_000 + 9_000, "1:05:09"],
    [-5000, "0:00"],
  ])("%p ms -> %p", (ms, expected) => {
    expect(formatElapsed(ms)).toBe(expected);
  });
});

describe("msUntilNextTick", () => {
  test("waits a full second at a boundary", () => {
    expect(msUntilNextTick(3000)).toBe(1000);
  });

  test("waits the remainder mid-second", () => {
    expect(msUntilNextTick(3250)).toBe(750);
  });
});
