# Gig Clock

A one-button set timer for gigs. Tap **Start Set** and a big white clock counts up on a black screen. Hold **End Set** for 1.5 seconds to stop it.

- Keeps the phone screen awake while a set runs (where the browser supports it).
- Survives a refresh or a locked phone: the start time lives in the browser, so the clock picks up where it was.
- Plain HTML and JS, no build step. Vercel serves the folder as-is.

## Tests

```sh
bun test
```
