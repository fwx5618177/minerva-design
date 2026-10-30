import { expect, test } from "@playwright/test";

// The chart pages in a real browser: every chart mounts a backend (WebGPU
// where available, WebGL2 in headless Chromium, Canvas2D otherwise) and
// draws its data layer without errors.

const PAGES = [
  "charts",
  "line-chart",
  "area-chart",
  "bar-chart",
  "scatter-chart",
  "candlestick-chart",
  "heatmap-chart",
  "sparkline",
  "quadrant-chart",
  "horizontal-bar-chart",
  "range-area-chart",
  "mixed-chart",
  "bubble-chart",
  "histogram-chart",
  "boxplot-chart",
  "waterfall-chart",
  "gantt-chart",
  "chart-engine",
];

/** Pages of the shape charts (Canvas2D, no GPU data layer) */
const SHAPE_PAGES = [
  "pie-chart",
  "radar-chart",
  "gauge-chart",
  "funnel-chart",
  "treemap-chart",
  "sankey-chart",
  "sunburst-chart",
  "radial-bar-chart",
  "calendar-heatmap",
  "bullet-chart",
];

/**
 * Pages of the other engines (trading, order books, 3D) and of the large
 * data showcases: their widgets draw on canvases of their own
 */
const WIDGET_PAGES = [
  "trading-chart",
  "technical-indicators",
  "depth-chart",
  "order-book",
  "order-book-heatmap",
  "time-and-sales",
  "scatter-3d-chart",
  "surface-3d-chart",
  "bar-3d-chart",
  "chart-performance",
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
    const charts = page.locator(".minerva-chart:not(.minerva-shape-chart)");
    await expect(charts.first()).toBeVisible();
    const count = await charts.count();
    for (let i = 0; i < count; i++) {
      const chart = charts.nth(i);
      await chart.scrollIntoViewIfNeeded();
      await expect(chart).toHaveAttribute(
        "data-renderer",
        /^(webgpu|webgl2|webgl|canvas2d)$/,
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
  for (const renderer of ["canvas2d", "webgl2", "webgl"]) {
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

for (const id of SHAPE_PAGES) {
  test(`${id}: every shape chart draws and shows a tooltip`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`#/${id}`);
    const charts = page.locator(".minerva-shape-chart");
    await expect(charts.first()).toBeVisible();
    const count = await charts.count();
    for (let i = 0; i < count; i++) {
      const chart = charts.nth(i);
      await chart.scrollIntoViewIfNeeded();
      const size = await chart
        .locator("canvas")
        .first()
        .evaluate((canvas: HTMLCanvasElement) => canvas.width * canvas.height);
      expect(size).toBeGreaterThan(0);
    }
    // the first chart reacts to the keyboard
    const stage = charts.first().locator(".minerva-chart-stage");
    await stage.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      charts.first().locator(".minerva-chart-tooltip"),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("hovered bars get a band behind them, not a border", async ({ page }) => {
  await page.goto("#/bar-chart");
  const chart = page.locator("#demo-basic .minerva-chart");
  await expect(chart).toHaveAttribute("data-renderer", /.+/);
  const stage = chart.locator(".minerva-chart-stage");
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.6);
  await expect(chart.locator(".minerva-chart-tooltip")).toBeVisible();
  // the band lives in the layer below the data canvas
  const order = await stage.evaluate((el) => {
    const children = [...el.children];
    const data = children.findIndex((c) =>
      c.classList.contains("minerva-chart-data"),
    );
    const band = children.findIndex(
      (c) =>
        c.tagName === "DIV" &&
        [...c.children].some(
          (b) => (b as HTMLElement).style.display === "block",
        ),
    );
    return { data, band };
  });
  expect(order.band).toBeGreaterThan(-1);
  expect(order.band).toBeLessThan(order.data);
});

for (const id of WIDGET_PAGES) {
  test(`${id}: every widget draws without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`#/${id}`);
    const demos = page.locator("section[id^='demo-']");
    await expect(demos.first()).toBeVisible();
    const count = await demos.count();
    for (let i = 0; i < count; i++) {
      const demo = demos.nth(i);
      await demo.locator("[data-demo-preview]").scrollIntoViewIfNeeded();
      // widgets mount (and generate their data) when they come into view
      await expect
        .poll(
          () =>
            demo
              .locator("canvas")
              .evaluateAll((canvases: HTMLCanvasElement[]) =>
                canvases.some((canvas) => canvas.width * canvas.height > 0),
              ),
          { timeout: 20_000 },
        )
        .toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
