import { expect, test, type Locator, type Page } from "@playwright/test";

// The icon pages in a real browser: canvas icons and icon canvases start a
// backend (WebGPU where available, WebGL2 in headless Chromium, Canvas2D
// otherwise), report it in data-renderer and actually put pixels on screen.

const BACKEND = /^(webgpu|webgl2|webgl|canvas2d)$/;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (window === window.top) {
      localStorage.setItem("minerva-docs-language", "en");
    }
  });
});

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
};

/**
 * Whether a canvas shows something: GPU canvases cannot be read back once
 * composited, so the screen under the canvas is compared with and without it
 */
const expectPainted = async (page: Page, canvas: Locator) => {
  await canvas.scrollIntoViewIfNeeded();
  const clip = (await canvas.boundingBox())!;
  expect(clip.width * clip.height).toBeGreaterThan(0);
  await canvas.evaluate((element: HTMLElement) => {
    element.style.opacity = "0";
  });
  const blank = await page.screenshot({ clip });
  await canvas.evaluate((element: HTMLElement) => {
    element.style.opacity = "";
  });
  await expect
    .poll(async () => (await page.screenshot({ clip })).equals(blank), {
      timeout: 10_000,
    })
    .toBe(false);
};

const rendererBar = (page: Page) =>
  page.locator("[data-renderer-bar]").getByRole("radiogroup", {
    name: "Icon renderer",
  });

const pickRenderer = (page: Page, kind: string) =>
  page.locator(`[data-renderer-bar] label[data-kind="${kind}"]`).click();

for (const id of ["icons", "icon", "icon-canvas", "icons-core"]) {
  test(`${id}: the icon renderer bar is on top of the page`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto(`#/${id}`);
    await expect(rendererBar(page)).toBeVisible();
    await expect(rendererBar(page).getByRole("radio")).toHaveCount(5);
    expect(errors).toEqual([]);
  });
}

test("icon: canvas icons draw on every backend", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("#/icon");
  const demo = page.locator("#demo-canvas");
  await expect(demo.locator("svg.minerva-icon")).toHaveCount(1);
  const canvases = demo.locator("canvas.minerva-icon");
  // auto, webgpu, webgl2, webgl, canvas2d
  await expect(canvases).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    await expect(canvases.nth(i)).toHaveAttribute("data-renderer", BACKEND);
    await expectPainted(page, canvases.nth(i));
  }
  // forced backends that headless Chromium has keep their backend
  await expect(canvases.nth(2)).toHaveAttribute("data-renderer", "webgl2");
  await expect(canvases.nth(3)).toHaveAttribute("data-renderer", "webgl");
  await expect(canvases.nth(4)).toHaveAttribute("data-renderer", "canvas2d");
  // a custom icon on the default backend
  const custom = page.locator("#demo-custom canvas.minerva-icon");
  await expect(custom).toHaveAttribute("data-renderer", BACKEND);
  await expectPainted(page, custom);
  expect(errors).toEqual([]);
});

test("icon: the renderer bar switches the auto canvas icons", async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto("#/icon");
  const canvases = page.locator("#demo-canvas canvas.minerva-icon");
  const auto = canvases.first();
  await expect(auto).toHaveAttribute("data-renderer", BACKEND);
  for (const kind of ["canvas2d", "webgl2", "webgl"]) {
    await pickRenderer(page, kind);
    await expect(auto).toHaveAttribute("data-renderer", kind);
    await expectPainted(page, auto);
  }
  // a forced icon keeps its backend
  await expect(canvases.nth(4)).toHaveAttribute("data-renderer", "canvas2d");
  await pickRenderer(page, "webgl2");
  await expect(canvases.nth(4)).toHaveAttribute("data-renderer", "canvas2d");
  expect(errors).toEqual([]);
});

test("icon-canvas: every icon canvas draws", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("#/icon-canvas");
  const demos = page.locator("section[id^='demo-']");
  await expect(demos).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    const hosts = demos.nth(i).locator(".minerva-icon-canvas");
    await expect(hosts.first()).toBeVisible();
    const count = await hosts.count();
    for (let j = 0; j < count; j++) {
      const host = hosts.nth(j);
      await host.scrollIntoViewIfNeeded();
      await expect(host).toHaveAttribute("data-renderer", BACKEND);
      await expectPainted(page, host.locator("canvas"));
    }
  }
  const panels = page.locator("#demo-renderers .minerva-icon-canvas");
  await expect(panels).toHaveCount(4);
  await expect(panels.nth(1)).toHaveAttribute("data-renderer", "webgl2");
  await expect(panels.nth(2)).toHaveAttribute("data-renderer", "webgl");
  await expect(panels.nth(3)).toHaveAttribute("data-renderer", "canvas2d");
  expect(errors).toEqual([]);
});

test("icon-canvas: the renderer bar restarts the auto canvases", async ({
  page,
}) => {
  await page.goto("#/icon-canvas");
  const basic = page.locator("#demo-basic .minerva-icon-canvas");
  const forced = page.locator("#demo-renderers .minerva-icon-canvas").nth(1);
  await expect(basic).toHaveAttribute("data-renderer", BACKEND);
  for (const kind of ["canvas2d", "webgl"]) {
    await pickRenderer(page, kind);
    await expect(basic).toHaveAttribute("data-renderer", kind);
    await expectPainted(page, basic.locator("canvas"));
  }
  await expect(forced).toHaveAttribute("data-renderer", "webgl2");
});

test("icons-core: the controller and the 2D context demos draw", async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto("#/icons-core");
  const controller = page.locator("#demo-controller [data-renderer]");
  await expect(controller).toHaveAttribute("data-renderer", BACKEND);
  await expectPainted(page, controller.locator("canvas"));
  await page
    .locator("#demo-controller")
    .getByRole("button", { name: "Next icons" })
    .click();
  await expectPainted(page, controller.locator("canvas"));
  for (const id of ["canvas2d", "geometry"]) {
    await expectPainted(page, page.locator(`#demo-${id} canvas`).first());
  }
  await expect(page.locator("#demo-svg-string img")).toBeVisible();
  expect(errors).toEqual([]);
});

test("icons: the gallery draws every tile in canvas mode", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("#/icons");
  const demo = page.locator("#demo-gallery");
  const svgs = demo.locator("svg.minerva-icon");
  await expect(svgs.first()).toBeVisible();
  const count = await svgs.count();
  expect(count).toBeGreaterThan(150);
  await demo.getByRole("radio", { name: "Canvas", exact: true }).check();
  const canvases = demo.locator("canvas.minerva-icon");
  await expect(canvases).toHaveCount(count);
  await expect(demo.locator("svg.minerva-icon")).toHaveCount(0);
  for (const index of [0, count - 1]) {
    await expect(canvases.nth(index)).toHaveAttribute("data-renderer", BACKEND);
    await expectPainted(page, canvases.nth(index));
  }
  // every tile reports a backend, all from the one shared pool
  await expect
    .poll(() =>
      canvases.evaluateAll((elements) => [
        ...new Set(
          elements.map((element) => element.getAttribute("data-renderer")),
        ),
      ]),
    )
    .toEqual([expect.stringMatching(BACKEND)]);
  expect(errors).toEqual([]);
});

// the same demos in the Vue components (minerva-design/vue/icons) and the
// custom elements (minerva-design/web-components/icon)
const FRAMEWORKS = [
  { framework: "vue", prefix: "vue-demo", icon: "canvas.minerva-icon" },
  { framework: "html", prefix: "wc-demo", icon: "minerva-icon[renderer]" },
] as const;

for (const { framework, prefix, icon } of FRAMEWORKS) {
  test(`${framework}: canvas icons and icon canvases draw`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto(`#/icon?framework=${framework}`);
    await expect(page.locator(`#${prefix}-basic svg`).first()).toBeVisible();
    // auto, webgpu, webgl2, webgl, canvas2d (data-renderer on the canvas in
    // Vue, on the host element for the custom elements)
    const icons = page.locator(`#${prefix}-canvas ${icon}`);
    await expect(icons).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(icons.nth(i)).toHaveAttribute("data-renderer", BACKEND);
      await expectPainted(
        page,
        framework === "vue" ? icons.nth(i) : icons.nth(i).locator("canvas"),
      );
    }
    await expect(icons.nth(4)).toHaveAttribute("data-renderer", "canvas2d");
    await pickRenderer(page, "canvas2d");
    await expect(icons.first()).toHaveAttribute("data-renderer", "canvas2d");

    await page.goto(`#/icon-canvas?framework=${framework}`);
    const host = page.locator(
      `#${prefix}-basic ${framework === "vue" ? ".minerva-icon-canvas" : "minerva-icon-canvas"}`,
    );
    await expect(host).toHaveAttribute("data-renderer", BACKEND);
    await expectPainted(page, host.locator("canvas"));
    await expect(page.locator(`#${prefix}-basic [role=status]`)).toContainText(
      "Drawn with",
    );
    expect(errors).toEqual([]);
  });
}
