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
