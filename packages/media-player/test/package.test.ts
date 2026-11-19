// @vitest-environment node
import { readFile, readdir } from "node:fs/promises";
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

it("uses the shared icon workspace without foreign icon dependencies", async () => {
  const ownManifest = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  expect(ownManifest.dependencies["@minerva/icons"]).toBe("workspace:*");
  expect(ownManifest.dependencies).not.toHaveProperty("react-icons");
  const source = new URL("../src/", import.meta.url);
  const files = await readdir(source, { recursive: true });
  for (const file of files.filter((file) => /\.tsx?$/.test(file))) {
    const content = await readFile(new URL(file, source), "utf8");
    expect(content, file).not.toMatch(
      /(?:react-icons|lucide-react|@tabler\/icons)/,
    );
  }
});
