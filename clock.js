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

/** Milliseconds until the next whole second of elapsed time. */
export function msUntilNextTick(ms) {
  return 1000 - (Math.max(0, ms) % 1000);
}
