# Gig Clock

A one-button set timer for gigs. Tap **Start Set** and a big white clock counts up on a black screen. Hold **End Set** for 1.5 seconds to stop it.

- Goes full screen on Start Set (Android and desktop). iPhone Safari can't do this for web pages, so on iPhone use Share → Add to Home Screen and open it from there.
- **+ / −** buttons on the right brighten or dim the digits for dark stages. The setting is remembered.
- Keeps the phone screen awake while a set runs (where the browser supports it).
- Survives a refresh or a locked phone: the start time lives in the browser, so the clock picks up where it was.
- Installable, and works with no signal once opened. Android Chrome: menu → **Install app**. iPhone Safari: Share → **Add to Home Screen**. After a deploy, the app shows the new version the second time it opens.
- Plain HTML and JS, no build step. Vercel serves the folder as-is.

## Tests

```sh
bun test
```
