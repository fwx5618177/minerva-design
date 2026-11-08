import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { launchChrome } from "../../../../tools/chrome-cdp.mjs";
import { packConsumer, packageRoot } from "./consumer";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.join(packageRoot, "test-results");
const results: {
  profile: string;
  format: string;
  status: string;
  error?: string;
}[] = [
  {
    profile: "Firefox",
    format: "all",
    status: "not verified: CDP supports Chrome/Chromium only",
  },
  {
    profile: "WebKit",
    format: "all",
    status: "not verified: CDP supports Chrome/Chromium only",
  },
];
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
const button = (name: string) =>
  `[...document.querySelectorAll('button')].find(e => (e.getAttribute('aria-label') || e.textContent).trim() === ${JSON.stringify(name)})`;
const video = `document.querySelector('video')`;
const profiles = [
  { name: "Chrome desktop", options: { width: 1280, height: 900 } },
  {
    name: "Chrome Android viewport",
    options: { width: 393, height: 851, mobile: true, hasTouch: true },
  },
  {
    name: "Chrome iPhone viewport",
    options: { width: 390, height: 844, mobile: true, hasTouch: true },
  },
];
it("installs a tarball with JavaScript, types, CSS and SSR-safe engine entries", async () => {
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
for (const profile of profiles)
  describe(profile.name, () => {
    it.each(["mp4", "hls", "dash", "flv", "audio"])(
      "plays real %s media, seeks, switches source and unmounts",
      async (format) => {
        const page = await launchChrome(profile.options);
        try {
          await page.navigate(consumer.url);
          await page.wait(button(format));
          await page.click(button(format));
          const engines =
            format === "hls"
              ? ["hls", "native"]
              : [["mp4", "audio"].includes(format) ? "native" : format];
          await page.wait(
            `${video}?.readyState >= 2 && ${JSON.stringify(engines)}.includes(document.querySelector('[data-media]')?.getAttribute('data-engine'))`,
            { timeout: 20000 },
          );
          await page.click(button("Start"));
          await page.wait(`${video}?.currentTime > 0.2`);
          await page.evaluate(
            `window.playerHandle().pause(); window.playerHandle().seek(3)`,
          );
          await page.wait(
            `${video} && !${video}.seeking && ${video}.readyState >= 2 && ${video}.currentTime > 2.5`,
          );
          if (format !== "audio") await page.wait(`${video}.videoWidth > 0`);
          expect(
            await page.evaluate(
              `document.querySelector('[data-media]').getAttribute('data-media')`,
            ),
          ).toBe(format === "audio" ? "audio" : "video");
          expect(
            await page.evaluate(`${video}.hasAttribute('playsinline')`),
          ).toBe(true);
          expect(
            await page.evaluate(
              `document.documentElement.scrollWidth <= innerWidth`,
            ),
          ).toBe(true);
          if (profile.options.hasTouch) {
            const settings = button("设置");
            expect(
              await page.evaluate(`${settings}.getBoundingClientRect().height`),
            ).toBeGreaterThanOrEqual(44);
            const slider = `document.querySelector('[role="slider"][aria-label="播放进度"]')`;
            const box = await page.evaluate<{
              x: number;
              y: number;
              height: number;
            }>(
              `(()=>{const r=${slider}.getBoundingClientRect();return {x:r.x+r.width*.6,y:r.y+r.height/2,height:r.height}})()`,
            );
            expect(box.height).toBeGreaterThanOrEqual(28);
            await page.call("Input.dispatchTouchEvent", {
              type: "touchStart",
              touchPoints: [{ x: box.x, y: box.y }],
            });
            await page.call("Input.dispatchTouchEvent", {
              type: "touchEnd",
              touchPoints: [],
            });
            await page.wait(`${video}.currentTime > 4`);
            await page.click(settings);
            await page.wait(
              `document.querySelector('[role="menu"][aria-label="播放设置"]')`,
            );
            expect(
              await page.evaluate(
                `(()=>{const r=document.querySelector('[role="menu"][aria-label="播放设置"]').getBoundingClientRect();const p=document.querySelector('[data-media]').getBoundingClientRect();return r.x>=0&&r.right<=innerWidth&&r.y>=${format === "audio" ? "0" : "p.y"}&&r.bottom<=${format === "audio" ? "innerHeight" : "p.bottom"}})()`,
              ),
            ).toBe(true);
          }
          await page.wait(
            `Number(getComputedStyle(document.querySelector('[data-media] [class*="controls"]')).opacity) === 1`,
          );
          if (format === "mp4")
            await page.screenshot(
              path.join(
                artifactRoot,
                profile.name.replaceAll(" ", "-") + ".png",
              ),
            );
          if (format === "mp4") {
            await page.evaluate(`window.playerHandle().setQuality('high')`);
            await page.wait(
              `${video}.currentSrc.endsWith('/sample.mp4?quality=high') && ${video}.readyState >= 2 && !${video}.seeking`,
            );
            expect(await page.evaluate(`${video}.currentTime`)).toBeGreaterThan(
              2.5,
            );
          }
          await page.click(button("mp4"));
          await page.wait(
            `document.querySelector('[data-engine="native"]') && new URL(${video}.currentSrc).pathname.endsWith('/sample.mp4') && ${video}.readyState >= 2 && !${video}.seeking`,
          );
          await page.click(button("Unmount"));
          expect(
            await page.evaluate(`document.querySelectorAll('video').length`),
          ).toBe(0);
          expect(await page.evaluate(`window.playbackErrors`)).toEqual([]);
          expect(page.errors).toEqual([]);
          results.push({ profile: profile.name, format, status: "passed" });
        } catch (error) {
          results.push({
            profile: profile.name,
            format,
            status: "failed",
            error: String(error),
          });
          await page
            .screenshot(
              path.join(
                artifactRoot,
                `${profile.name.replaceAll(" ", "-")}-${format}-failed.png`,
              ),
            )
            .catch(() => undefined);
          console.error(
            "Playback failure",
            profile.name,
            format,
            await page
              .evaluate(
                `(()=>{const v=${video};return {source:v?.currentSrc,time:v?.currentTime,readyState:v?.readyState,mediaError:v?.error?.message,playbackErrors:window.playbackErrors}})()`,
              )
              .catch(() => null),
          );
          throw error;
        } finally {
          await page.close();
        }
      },
      45000,
    );
    it("supports Minerva SRT captions, localized controls and a light menu", async () => {
      const page = await launchChrome(profile.options);
      try {
        await page.navigate(`${consumer.url}?compat=1&captions=1`);
        await page.wait(button("Start"));
        await page.click(button("Start"));
        await page.wait(`${video}?.currentTime > .2`);
        await page.wait(
          `document.querySelector('[data-part="captions"]')?.textContent === 'Hello captions'`,
        );
        await page.evaluate(`window.playerHandle().pause()`);
        await page.click(button("Captions"));
        const menu = `document.querySelector('[role="menu"][aria-label="Captions"]')`;
        await page.wait(`${menu}?.getBoundingClientRect().height > 0`);
        expect(
          await page.evaluate(`getComputedStyle(${menu}).backgroundColor`),
        ).toBe("rgb(255, 255, 255)");
        expect(
          await page.evaluate(
            `document.querySelector('[role="menuitemradio"][aria-label="English"]')?.getAttribute('aria-checked') ?? [...document.querySelectorAll('[role="menuitemradio"]')].find(e=>{const copy=e.cloneNode(true);copy.querySelectorAll('[aria-hidden="true"]').forEach(n=>n.remove());return copy.textContent.trim()==='English'})?.getAttribute('aria-checked')`,
          ),
        ).toBe("true");
        await page.screenshot(
          path.join(
            artifactRoot,
            profile.name.replaceAll(" ", "-") + "-minerva.png",
          ),
        );
        expect(page.errors).toEqual([]);
        results.push({
          profile: profile.name,
          format: "minerva-srt",
          status: "passed",
        });
      } finally {
        await page.close();
      }
    }, 45000);
  });
it("captures real decoded video frames and records advancing desktop playback", async () => {
  const page = await launchChrome();
  try {
    await page.navigate(consumer.url);
    await page.click(button("Start"));
    await page.wait(
      `${video}?.currentTime > .2 && ${video}.videoWidth === 256`,
    );
    const image = await page.evaluate<{
      type: string;
      size: number;
      width: number;
      height: number;
    }>(`(async()=>{
      const blob=await window.playerHandle().screenshot();
      const image=await createImageBitmap(blob);
      const result={type:blob.type,size:blob.size,width:image.width,height:image.height};
      image.close();return result;
    })()`);
    expect(image.type).toBe("image/png");
    expect(image.size).toBeGreaterThan(0);
    expect([image.width, image.height]).toEqual([256, 144]);
    expect(await page.evaluate(`window.playerHandle().startRecording()`)).toBe(
      true,
    );
    await page.wait(
      `document.querySelector('[data-media][data-recording="true"]')`,
    );
    const started = await page.evaluate<number>(`${video}.currentTime`);
    await page.wait(`${video}.currentTime >= ${started + 0.3}`);
    const recording = await page.evaluate<{
      type: string;
      size: number;
    } | null>(`(async()=>{
      const blob=await window.playerHandle().stopRecording();
      return blob && {type:blob.type,size:blob.size};
    })()`);
    expect(recording?.type).toMatch(/^video\//);
    expect(recording?.size).toBeGreaterThan(0);
    await page.wait(
      `!document.querySelector('[data-media][data-recording="true"]')`,
    );
    expect(await page.evaluate(`window.playbackErrors`)).toEqual([]);
    expect(page.errors).toEqual([]);
    results.push({
      profile: "Chrome desktop",
      format: "screenshot-recording",
      status: "passed",
    });
  } finally {
    await page.close();
  }
}, 45000);
it("the public ref and component work with React 19 types, SSR and playback", async () => {
  const other = await packConsumer("19.3.0");
  const page = await launchChrome();
  try {
    expect(other.ssr.version).toMatch(/^19\./);
    await page.navigate(other.url);
    await page.wait(button("Start"));
    await page.click(button("Start"));
    await page.wait(`${video}?.currentTime > .2`);
    await page.click(button("Unmount"));
    expect(
      await page.evaluate(`document.querySelectorAll('video').length`),
    ).toBe(0);
    expect(page.errors).toEqual([]);
  } finally {
    await page.close();
    await other.close();
  }
}, 180000);
it("publishes both player contracts from the same package", () => {
  expect(consumer.manifest.exports["./media-player"].import.default).toBe(
    "./dist/media-player/index.js",
  );
  expect(consumer.manifest.exports["./media-player/style.css"]).toBe(
    "./dist/media-player/style.css",
  );
});
