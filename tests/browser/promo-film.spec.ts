import { expect, test } from "@playwright/test";

for (const language of ["en", "zh"] as const) {
  for (const mobile of [false, true]) {
    test(`${language} film plays in ${mobile ? "portrait" : "landscape"}`, async ({
      page,
    }) => {
      await page.setViewportSize(
        mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
      );
      await page.addInitScript(
        (lng) => localStorage.setItem("minerva-docs-language", lng),
        language,
      );
      const movieRequests: string[] = [];
      page.on("request", (request) => {
        if (request.url().endsWith(".mp4")) movieRequests.push(request.url());
      });
      await page.goto("./");
      const video = page.locator("video");
      await video.scrollIntoViewIfNeeded();
      const format = mobile ? "portrait" : "landscape";
      await expect(video).toHaveAttribute(
        "src",
        `/minerva-design/media/promo-v4/Film-${language}-${format}-1080p.mp4`,
      );
      await expect(video).toHaveAttribute("preload", "none");
      expect(movieRequests).toEqual([]);
      await video.evaluate(async (element: HTMLVideoElement) => {
        element.muted = true;
        await element.play();
      });
      await expect
        .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime))
        .toBeGreaterThan(0.1);
      const media = await video.evaluate((el: HTMLVideoElement) => {
        el.pause();
        return {
          duration: el.duration,
          width: el.videoWidth,
          height: el.videoHeight,
          error: el.error?.message,
        };
      });
      expect(media).toEqual({
        duration: mobile ? 30 : 60,
        width: mobile ? 1080 : 1920,
        height: mobile ? 1920 : 1080,
        error: undefined,
      });
      await expect
        .poll(() =>
          video.evaluate((el: HTMLVideoElement) => {
            el.textTracks[0].mode = "hidden";
            return el.textTracks[0].cues?.length ?? 0;
          }),
        )
        .toBeGreaterThan(0);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      await video.screenshot({
        path: `test-results/promo-${language}-${format}.png`,
      });
    });
  }
}

test("language switching replaces a playing film and manual format selection", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("minerva-docs-language", "en"),
  );
  await page.goto("./");
  const video = page.locator("video");
  await video.evaluate(async (el: HTMLVideoElement) => {
    el.muted = true;
    await el.play();
  });
  await page.getByRole("button", { name: "Language: English" }).click();
  await page.getByRole("menuitemradio", { name: "中文" }).click();
  await expect(video).toHaveAttribute("src", /Film-zh-landscape-1080p.mp4$/);
  expect(
    await video.evaluate((el: HTMLVideoElement) => ({
      paused: el.paused,
      time: el.currentTime,
    })),
  ).toEqual({ paused: true, time: 0 });
  await page.getByRole("button", { name: "竖版 · 30 秒" }).click();
  await expect(video).toHaveAttribute("src", /Film-zh-portrait-1080p.mp4$/);
  await expect(
    page.getByRole("link", { name: "打开视频", exact: true }),
  ).toHaveAttribute("href", /Film-zh-portrait-1080p.mp4$/);
});
