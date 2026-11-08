import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Presentation assets come from our existing film. Product-test fixtures remain
// independent, small and deterministic under packages/media-player/test/product.
const directory = fileURLToPath(
  new URL("../public/media-player/", import.meta.url),
);
const film = fileURLToPath(
  new URL(
    "../public/media/promo-v4/Film-en-landscape-1080p.mp4",
    import.meta.url,
  ),
);
const run = (...args) =>
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-y", ...args],
    { cwd: directory, stdio: "inherit" },
  );
for (const name of ["hls", "dash"]) {
  rmSync(`${directory}/${name}`, { recursive: true, force: true });
  mkdirSync(`${directory}/${name}`, { recursive: true });
}
run(
  "-i",
  film,
  "-vf",
  "scale=1280:720",
  "-r",
  "24",
  "-c:v",
  "libx264",
  "-profile:v",
  "baseline",
  "-pix_fmt",
  "yuv420p",
  "-preset",
  "medium",
  "-crf",
  "24",
  "-g",
  "48",
  "-sc_threshold",
  "0",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
  "-movflags",
  "+faststart",
  "sample.mp4",
);
run(
  "-i",
  "sample.mp4",
  "-vf",
  "scale=640:360",
  "-c:v",
  "libx264",
  "-profile:v",
  "baseline",
  "-pix_fmt",
  "yuv420p",
  "-preset",
  "medium",
  "-crf",
  "24",
  "-g",
  "48",
  "-sc_threshold",
  "0",
  "-c:a",
  "copy",
  "-movflags",
  "+faststart",
  "sample-small.mp4",
);
run(
  "-i",
  "sample.mp4",
  "-c",
  "copy",
  "-f",
  "hls",
  "-hls_time",
  "6",
  "-hls_playlist_type",
  "vod",
  "-hls_segment_filename",
  "hls/segment-%d.m2ts",
  "hls/index.m3u8",
);
run(
  "-i",
  "sample.mp4",
  "-c",
  "copy",
  "-f",
  "dash",
  "-seg_duration",
  "6",
  "dash/index.mpd",
);
run("-i", "sample.mp4", "-c", "copy", "-f", "flv", "sample.flv");
run("-i", "sample.mp4", "-vn", "-c:a", "copy", "sample.m4a");
run(
  "-ss",
  "30",
  "-i",
  "sample.mp4",
  "-frames:v",
  "1",
  "-q:v",
  "3",
  "poster.jpg",
);
