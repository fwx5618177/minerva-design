# Local playback test media

Synthetic 8-second test pattern and 440Hz sine audio, generated locally with FFmpeg. No third-party footage, credentials or external stream service is used. H.264 baseline, yuv420p, 24 fps, 256x144; AAC 48kHz. Tests use the checked-in bytes and do not require FFmpeg at runtime.

To reproduce (from this directory, with FFmpeg installed):

```sh
ffmpeg -f lavfi -i testsrc2=size=256x144:rate=24 -f lavfi -i sine=frequency=440:sample_rate=48000 -t 8 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -g 24 -preset ultrafast -b:v 120k -c:a aac -b:a 32k -movflags +faststart sample.mp4
ffmpeg -i sample.mp4 -c copy -f hls -hls_time 2 -hls_playlist_type vod -hls_segment_filename hls/segment-%d.m2ts hls/index.m3u8
ffmpeg -i sample.mp4 -c copy -f dash -seg_duration 2 dash/index.mpd
ffmpeg -i sample.mp4 -c copy -f flv sample.flv
ffmpeg -i sample.mp4 -vn -c:a copy sample.m4a
```

`.m2ts` identifies transport-stream media without confusing formatters and type checkers with TypeScript source. Binary encoder output may differ across FFmpeg versions; semantic playback is the contract. These samples are excluded from the published package.

Documentation also serves `sample-small.mp4`, a 128×72 rendition for demonstrating a real source-quality switch:

```sh
ffmpeg -i sample.mp4 -vf scale=128:72 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -preset ultrafast -b:v 60k -c:a copy -movflags +faststart sample-small.mp4
```
