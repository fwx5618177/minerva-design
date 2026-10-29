import { expect, test } from "@playwright/test";

// The chart pages in a real browser: every chart mounts a backend (WebGPU
// where available, WebGL2 in headless Chromium, Canvas2D otherwise) and
// draws its data layer without errors.

const PAGES = [
  "charts",
  "line-chart",
  "bar-chart",
  "scatter-chart",
  "quadrant-chart",
  "chart-engine",
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (window === window.top) {
      localStorage.setItem("minerva-docs-language", "en");
    }
  });
});

for (const id of PAGES) {
  test(`${id}: every chart mounts a renderer`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`#/${id}`);
    const charts = page.locator(".minerva-chart");
    await expect(charts.first()).toBeVisible();
    const count = await charts.count();
    for (let i = 0; i < count; i++) {
      const chart = charts.nth(i);
      await chart.scrollIntoViewIfNeeded();
      await expect(chart).toHaveAttribute(
        "data-renderer",
        /^(webgpu|webgl2|canvas2d)$/,
      );
      const size = await chart
        .locator("canvas.minerva-chart-data")
        .evaluate((canvas: HTMLCanvasElement) => canvas.width * canvas.height);
      expect(size).toBeGreaterThan(0);
    }
    expect(errors).toEqual([]);
  });
}

test("the renderer can be forced, with a fallback", async ({ page }) => {
  await page.goto("#/charts");
  const demo = page.locator("#demo-renderers");
  const chart = demo.locator(".minerva-chart");
  await expect(chart).toHaveAttribute("data-renderer", /.+/);
  for (const renderer of ["canvas2d", "webgl2"]) {
    await demo.getByRole("radio", { name: renderer, exact: true }).check();
    await expect(chart).toHaveAttribute("data-renderer", renderer);
    await expect(demo.getByRole("status")).toContainText(
      `drawn with: ${renderer}`,
    );
  }
});

test("hover shows a tooltip and the keyboard moves the highlight", async ({
  page,
}) => {
  await page.goto("#/line-chart");
  const stage = page.locator("#demo-basic .minerva-chart-stage");
  await expect(page.locator("#demo-basic .minerva-chart")).toHaveAttribute(
    "data-renderer",
    /.+/,
  );
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  const tooltip = page.locator("#demo-basic .minerva-chart-tooltip");
  await expect(tooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();
  await stage.focus();
  await page.keyboard.press("ArrowRight");
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
});
