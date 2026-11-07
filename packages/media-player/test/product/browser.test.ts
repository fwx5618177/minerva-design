import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  chromium,
  firefox,
  webkit,
  devices,
  type Browser,
  type BrowserContextOptions,
} from "playwright";
import { packConsumer, packageRoot } from "./consumer";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.join(packageRoot, "test-results");
const results: {
  profile: string;
  format: string;
  status: string;
  error?: string;
}[] = [];
let consumer: Awaited<ReturnType<typeof packConsumer>>;
beforeAll(async () => {
  await rm(artifactRoot, { recursive: true, force: true });
  await mkdir(artifactRoot, { recursive: true });
  consumer = await packConsumer();
}, 180_000);
afterAll(async () => {
  await writeFile(
    path.join(artifactRoot, "browser-matrix.json"),
    JSON.stringify(
      { generatedAt: new Date().toISOString(), results },
      null,
      2,
    ) + "\n",
  );
  await consumer?.close();
});

it("installs an actual tarball with JavaScript, types, CSS and SSR-safe public engine entries", async () => {
  expect(consumer.ssr.version).toMatch(/^18\./);
  expect(consumer.ssr.engines).toEqual(["hls", "dash", "flv", "native"]);
  expect(consumer.ssr.html).toContain("<video");
  expect(consumer.ssr.hls).toBe("hls");
  const root = path.join(consumer.root, "node_modules/minerva-design");
  expect(
    await readFile(path.join(root, "dist/media-player/style.css"), "utf8"),
  ).toContain("container-type");
  expect(
    await readFile(path.join(root, "dist/media-player/index.d.ts"), "utf8"),
  ).toContain("MediaPlayer");
});

const profiles: {
  name: string;
  engine: typeof chromium;
  options?: BrowserContextOptions;
}[] = [
  { name: "Chromium desktop", engine: chromium },
  { name: "Firefox desktop", engine: firefox },
  { name: "WebKit desktop", engine: webkit },
  {
    name: "Chromium Android viewport",
    engine: chromium,
    options: devices["Pixel 5"],
  },
  {
    name: "WebKit iPhone viewport",
    engine: webkit,
    options: devices["iPhone 13"],
  },
];
for (const profile of profiles) {
  describe(profile.name, () => {
    let browser: Browser;
    beforeAll(async () => {
      browser = await profile.engine.launch();
    }, 30_000);
    afterAll(async () => {
      await browser?.close();
    });
    it.each(["mp4", "hls", "dash", "flv", "audio"])(
      "plays a real local %s stream, seeks, switches source and unmounts",
      async (format) => {
        const context = await browser.newContext(profile.options);
        const page = await context.newPage();
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        try {
          await page.goto(consumer.url);
          await page.getByRole("button", { name: format, exact: true }).click();
          await page.waitForFunction(
            () => {
              const video = document.querySelector("video");
              return video && video.readyState >= 2;
            },
            undefined,
            { timeout: 20_000 },
          );
          await page
            .getByRole("button", { name: "Start", exact: true })
            .click();
          await page.waitForFunction(
            () => document.querySelector("video")!.currentTime > 0.2,
          );
          expect(
            format === "hls"
              ? ["hls", "native"]
              : [["mp4", "audio"].includes(format) ? "native" : format],
          ).toContain(
            await page.locator("[data-media]").getAttribute("data-engine"),
          );
          await page.evaluate(() => {
            const host = window as unknown as {
              playerHandle(): { seek(time: number): void; pause(): void };
            };
            host.playerHandle().pause();
            host.playerHandle().seek(3);
          });
          await expect
            .poll(() =>
              page
                .locator("video")
                .evaluate((video) => (video as HTMLVideoElement).currentTime),
            )
            .toBeGreaterThan(2.5);
          if (format !== "audio")
            await page.waitForFunction(
              () => document.querySelector("video")!.videoWidth > 0,
            );
          expect(
            await page.locator("[data-media]").getAttribute("data-media"),
          ).toBe(format === "audio" ? "audio" : "video");
          expect(
            await page.locator("video").getAttribute("playsinline"),
          ).not.toBeNull();
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
          if (profile.options?.hasTouch) {
            const settings = page.getByRole("button", {
              name: "设置",
              exact: true,
            });
            expect(
              (await settings.boundingBox())!.height,
            ).toBeGreaterThanOrEqual(44);
            const progress = page.getByRole("slider", {
              name: "播放进度",
              exact: true,
            });
            const track = (await progress.boundingBox())!;
            expect(track.height).toBeGreaterThanOrEqual(28);
            await progress.tap({
              position: { x: track.width * 0.6, y: track.height / 2 },
            });
            await expect
              .poll(() =>
                page
                  .locator("video")
                  .evaluate((video) => (video as HTMLVideoElement).currentTime),
              )
              .toBeGreaterThan(4);
            await settings.tap();
            const menu = page.getByRole("menu", { name: "播放设置" });
            await menu.waitFor({ state: "visible" });
            const menuBox = (await menu.boundingBox())!;
            const playerBox = (await page
              .locator("[data-media]")
              .boundingBox())!;
            expect(menuBox.x).toBeGreaterThanOrEqual(0);
            expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(
              page.viewportSize()!.width,
            );
            expect(menuBox.y).toBeGreaterThanOrEqual(
              format === "audio" ? 0 : playerBox.y,
            );
            expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(
              format === "audio"
                ? page.viewportSize()!.height
                : playerBox.y + playerBox.height,
            );
          }
          await page.waitForFunction(
            () =>
              Number(
                getComputedStyle(
                  document
                    .querySelector('[aria-label="播放进度"]')!
                    .closest("[data-media]")!
                    .querySelector('[class*="controls"]')!,
                ).opacity,
              ) === 1,
          );
          if (format === "mp4")
            await page.screenshot({
              path: path.join(
                artifactRoot,
                profile.name.replaceAll(" ", "-") + ".png",
              ),
            });
          await page.getByRole("button", { name: "mp4", exact: true }).click();
          await page.waitForFunction(
            () => document.querySelector('[data-engine="native"]') !== null,
          );
          await page
            .getByRole("button", { name: "Unmount", exact: true })
            .click();
          expect(await page.locator("video").count()).toBe(0);
          expect(
            await page.evaluate(
              () =>
                (window as unknown as { playbackErrors: unknown[] })
                  .playbackErrors,
            ),
          ).toEqual([]);
          expect(errors).toEqual([]);
          results.push({ profile: profile.name, format, status: "passed" });
        } catch (error) {
          results.push({
            profile: profile.name,
            format,
            status: "failed",
            error: String(error),
          });
          await page
            .screenshot({
              path: path.join(
                artifactRoot,
                `${profile.name.replaceAll(" ", "-")}-${format}-failed.png`,
              ),
            })
            .catch(() => undefined);
          throw error;
        } finally {
          await context.close();
        }
      },
      45_000,
    );
    it("plays through the Minerva contract with SRT, localized controls and a light menu", async () => {
      const context = await browser.newContext(profile.options);
      try {
        const page = await context.newPage();
        await page.goto(`${consumer.url}?compat=1&captions=1`);
        await page.getByRole("button", { name: "Start", exact: true }).click();
        await page.waitForFunction(
          () => document.querySelector("video")!.currentTime > 0.2,
        );
        await expect
          .poll(() => page.locator('[data-part="captions"]').textContent())
          .toBe("Hello captions");
        await page.evaluate(() =>
          (window as unknown as { playerHandle: () => { pause: () => void } })
            .playerHandle()
            .pause(),
        );
        await page
          .getByRole("button", { name: "Captions", exact: true })
          .click();
        const menu = page.getByRole("menu", { name: "Captions" });
        expect(await menu.isVisible()).toBe(true);
        expect(
          await menu.evaluate((node) => getComputedStyle(node).backgroundColor),
        ).toBe("rgb(255, 255, 255)");
        await page.screenshot({
          path: path.join(
            artifactRoot,
            profile.name.replaceAll(" ", "-") + "-minerva.png",
          ),
          animations: "disabled",
        });
        expect(
          await page
            .getByRole("menuitemradio", { name: "English", exact: true })
            .getAttribute("aria-checked"),
        ).toBe("true");
        results.push({
          profile: profile.name,
          format: "minerva-srt",
          status: "passed",
        });
      } finally {
        await context.close();
      }
    }, 45_000);
  });
}

it("the packed public component and ref also work in a React 19 consumer", async () => {
  const other = await packConsumer("19.3.0");
  let browser: Browser | undefined;
  try {
    expect(other.ssr.version).toMatch(/^19\./);
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(other.url);
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.waitForFunction(
      () => document.querySelector("video")!.currentTime > 0.2,
    );
    await page.getByRole("button", { name: "Unmount", exact: true }).click();
    expect(await page.locator("video").count()).toBe(0);
  } finally {
    await browser?.close();
    await other.close();
  }
}, 180_000);

it("publishes the advanced player and its original component from the same package", () => {
  expect(consumer.manifest.exports["./media-player"].import.default).toBe(
    "./dist/media-player/index.js",
  );
  expect(consumer.manifest.exports["./media-player/style.css"]).toBe(
    "./dist/media-player/style.css",
  );
});
