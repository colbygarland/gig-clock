import { describe, expect, test } from "bun:test";
import { BRIGHTNESS_LEVELS, formatElapsed, msUntilNextTick, stepBrightness } from "./clock.js";

const LAST = BRIGHTNESS_LEVELS.length - 1;

describe("stepBrightness", () => {
  test("full white is the brightest level", () => {
    expect(BRIGHTNESS_LEVELS[LAST]).toBe(1);
  });

  test("steps down and up", () => {
    expect(stepBrightness(LAST, -1)).toBe(LAST - 1);
    expect(stepBrightness(2, 1)).toBe(3);
  });

  test("stops at the ends", () => {
    expect(stepBrightness(0, -1)).toBe(0);
    expect(stepBrightness(LAST, 1)).toBe(LAST);
  });

  test.each([NaN, -1, 99, 1.5, null])("bad saved value %p falls back to full white", (bad) => {
    expect(stepBrightness(bad, 0)).toBe(LAST);
  });
});

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
