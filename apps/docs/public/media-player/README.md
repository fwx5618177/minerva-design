# Documentation playback assets

The documentation plays the existing, approved Minerva Design film and its soundtrack. The source is `../media/promo-v4/Film-en-landscape-1080p.mp4` (60 seconds, 1080p). These are presentation assets, independent of the synthetic automation fixtures in `packages/media-player/test/product/media`.

The main MP4, HLS, DASH and FLV renditions are 1280×720 H.264 baseline / AAC at 24 fps. `sample-small.mp4` is a real 640×360 rendition for quality switching. `sample.m4a` is the film's AAC soundtrack. `poster.jpg` shows the component UI at thirty seconds. Everything is served locally and excluded from the npm package.

Regenerate from the repository root with FFmpeg installed:

```sh
node apps/docs/scripts/generate-player-media.mjs
```

The script replaces derived streaming segments so old assets do not remain. `.m2ts` avoids confusing transport-stream segments with TypeScript source. Encoder bytes can differ between FFmpeg versions; browser decoding, dimensions, duration, seeking and source switching are the verified contracts.
