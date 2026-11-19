/**
 * Turn elapsed milliseconds into a clock string.
 * Under an hour: "M:SS" (e.g. "7:05", "42:10"). An hour or more: "H:MM:SS".
 */
export function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${ss}`;
  }

  return `${minutes}:${ss}`;
}

/** Digit brightness steps, dimmest first. The last one is full white. */
export const BRIGHTNESS_LEVELS = [0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 1];

/** Move `delta` steps from `index`, staying within the levels. Bad input falls back to full white. */
export function stepBrightness(index, delta) {
  const last = BRIGHTNESS_LEVELS.length - 1;
  const start = Number.isInteger(index) && index >= 0 && index <= last ? index : last;
  return Math.min(last, Math.max(0, start + delta));
}

/** Milliseconds until the next whole second of elapsed time. */
export function msUntilNextTick(ms) {
  return 1000 - (Math.max(0, ms) % 1000);
}
