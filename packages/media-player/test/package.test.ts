// @vitest-environment node
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
const manifest = JSON.parse(
  await readFile(
    new URL("../../minerva-design/package.json", import.meta.url),
    "utf8",
  ),
);
describe("published media player", () => {
  it("exports compiled media entries and CSS through the public package", () => {
    expect(manifest.exports["./media-player"].import.default).toBe(
      "./dist/media-player/index.js",
    );
    expect(manifest.exports["./media-player"].import.types).toBe(
      "./dist/media-player/index.d.ts",
    );
    expect(manifest.exports["./media-player/style.css"]).toBe(
      "./dist/media-player/style.css",
    );
  });
  it("installs its lazy stream adapters with the public package", () => {
    for (const name of ["hls.js", "dashjs", "mpegts.js"])
      expect(manifest.dependencies[name]).toBeTruthy();
  });
});
