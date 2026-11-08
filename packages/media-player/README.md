# Minerva media player implementation

Private implementation workspace. Only `minerva-design` is published.

Public imports:

```tsx
import { MediaPlayer } from "minerva-design/media-player";
import "minerva-design/media-player/style.css";

<MediaPlayer title="Preview" src={{ src: "/film.m3u8", type: "hls" }} />;
```

The existing `MediaPlayer` from `minerva-design` is a presentation/API adapter over this same playback implementation. It keeps Minerva theme tokens, translations, styling hooks and native audio semantics. Its controls use the `renderChrome` presentation contract; playback and media effects remain here.

Build and test from the repository root:

```sh
pnpm build
pnpm test:media-player
```

The package's fast unit project is `media-player`; its installed public-tarball browser project is `media-player-product`. Product tests run against the assembled public package, never the private workspace. Browser diagnostics are under `packages/media-player/test-results/` and are ignored by Git. Streaming libraries are loaded on attachment, and are not loaded for native progressive playback.

The Player documentation tab covers streams, quality switching, playlists, A-B repeat and capture. For React Native and mini-programs, retain the corresponding media host adapters: a DOM player cannot replace a native host by copying its markup.

## Layout and engine ownership

The player fills its parent. In a flex or grid layout, give the surrounding container a width, for example `style={{ width: "100%", maxWidth: 640 }}`. A maximum width alone does not make a flex item fill the available space. Custom chrome controls presentation; media events and engine failures use the same playback rules for every presentation.

Custom asynchronous engines must honor `options.signal` before attaching to a media element, ignore callbacks after destruction, and release only the resources they own. Replacing the ordered engine registrations reattaches the current source and restores its playback position. Recreating an array with the same factories does not reload playback. Keep factory instances stable with a module-level constant or `useMemo`; creating a new factory counts as a replacement.
