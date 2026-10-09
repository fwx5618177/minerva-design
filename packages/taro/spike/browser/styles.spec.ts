import { expect, test } from "./test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#avatar")).toBeVisible();
});
test("real H5 styles preserve native geometry and respond to theme switching", async ({
  page,
}) => {
  await expect(page.locator("#avatar")).toHaveCSS("width", "64px");
  await expect(page.locator("#theme-card")).toHaveCSS("padding-top", "24px");
  const light = await page
    .locator("#theme-card")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  await page
    .locator("#theme")
    .getByRole("button", { name: "Dark", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator("#theme-card")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    )
    .not.toBe(light);
  const badge = page.locator("#theme [role=status]");
  await expect(badge).toHaveCSS("position", "absolute");
  await expect(badge).toHaveCSS("border-top-width", "2px");
});
test("typed time commits and native 12h columns change the value with explicit steps", async ({
  page,
}) => {
  const input = page.locator("#time").getByRole("textbox", { name: "Time" });
  await input.fill("02:30 PM");
  await input.press("Enter");
  await expect(input).toBeFocused();
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(input).toHaveValue("02:30 PM");
  await input.click();
  await expect(
    page.getByRole("listbox", { name: "Minutes" }).getByRole("option"),
  ).toHaveCount(4);
  await expect(page.getByRole("listbox", { name: "Seconds" })).toHaveCount(0);
  await page.getByRole("option", { name: "AM", exact: true }).click();
  await expect(input).toHaveValue("02:30 AM");
  await page.locator(".mn-time-backdrop").click({ position: { x: 10, y: 10 } });
  await expect(page.getByRole("listbox")).toHaveCount(0);
});
test("overflow arrows move the real scroll container and active page scrolls into view", async ({
  page,
}) => {
  const pages = page.locator("#pages"),
    scroll = pages.locator(".mn-page-tabs-scroll");
  await expect(
    pages.getByRole("button", { name: "Scroll pages right" }),
  ).toBeVisible();
  await pages.getByRole("button", { name: "Scroll pages right" }).click();
  await expect
    .poll(() => scroll.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await pages.getByRole("button", { name: "Go last page" }).click();
  const item = pages.locator('[data-value="page-11"]');
  await expect(item.getByRole("tab")).toHaveAttribute("aria-current", "page");
  await expect
    .poll(async () => {
      const a = await item.boundingBox(),
        b = await scroll.boundingBox();
      return !!a && !!b && a.x + a.width <= b.x + b.width + 1;
    })
    .toBe(true);
});
test("edge popover flips inside the viewport and measurement polling stops on close and unmount", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Edge details", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "Edge details panel" });
  await expect(panel).toHaveAttribute("data-side", "top");
  await expect(panel).toHaveCSS("position", "fixed");
  const box = (await panel.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(8);
  expect(box.x + box.width).toBeLessThanOrEqual(1192);
  await panel.getByRole("button", { name: "Close panel" }).click();
  await expect(panel).toHaveCount(0);
  const count = await page.evaluate(() =>
    Reflect.get(window, "nativeMeasurements"),
  );
  await page.waitForTimeout(250);
  expect(
    await page.evaluate(() => Reflect.get(window, "nativeMeasurements")),
  ).toBe(count);
  await page.getByRole("button", { name: "Edge details", exact: true }).click();
  await panel.getByRole("button", { name: "Unmount panel" }).click();
  const after = await page.evaluate(() =>
    Reflect.get(window, "nativeMeasurements"),
  );
  await page.waitForTimeout(250);
  expect(
    await page.evaluate(() => Reflect.get(window, "nativeMeasurements")),
  ).toBe(after);
});
test("virtual list renders a window and suppresses duplicate load requests while a promise is pending", async ({
  page,
}) => {
  const list = page.locator("#virtual .mn-virtual-list");
  expect(await list.locator(".mn-virtual-list-item").count()).toBeLessThan(30);
  await list.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect(page.locator("#virtual output")).toHaveText("Requests: 1");
  await list.evaluate((el) => {
    el.dispatchEvent(new Event("scroll"));
    el.dispatchEvent(new Event("scroll"));
  });
  await expect(page.locator("#virtual output")).toHaveText("Requests: 1");
  await expect.poll(() => list.evaluate((el) => el.scrollHeight)).toBe(980);
});
test("real browser workflow changes theme, validates form, confirms and shows the table result", async ({
  page,
}) => {
  const flow = page.locator("#workflow");
  await flow.getByRole("button", { name: "Dark", exact: true }).click();
  await flow.getByRole("button", { name: "Review project" }).click();
  await expect(flow.getByRole("alert")).toHaveText("Project name is required");
  await flow
    .getByRole("textbox", { name: "Project name" })
    .fill("Browser parity");
  await flow.getByRole("combobox", { name: "Choose team" }).click();
  await flow.getByRole("option", { name: "Platform" }).click();
  await flow.getByRole("button", { name: "Review project" }).click();
  await flow
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await expect(
    flow.getByRole("cell", { name: "Browser parity" }),
  ).toBeVisible();
  await expect(flow.getByRole("status")).toContainText("Project created");
  await flow.getByRole("status").getByRole("button", { name: "Close" }).click();
  await expect(flow.getByRole("status")).toHaveCount(0);
});

test("portable audit: semantic Box values, Alert axes and compound Drawer geometry", async ({
  page,
}) => {
  const box = page.locator("#audit-box");
  await expect(box).toHaveCSS("width", "200px");
  await expect(box).toHaveCSS("height", "40px");
  await expect(box).toHaveCSS(
    "border-radius",
    await box.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--radius-lg").trim(),
    ),
  );
  expect(
    await box.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).not.toBe("rgba(0, 0, 0, 0)");
  expect(await box.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe(
    "none",
  );
  const alert = page.locator("#audit-alert");
  await expect(alert).toHaveCSS("padding-top", "16px");
  await expect(alert).toHaveCSS("padding-left", "20px");
  await expect(alert).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.getByRole("button", { name: "Open audit drawer" }).click();
  const drawer = page.getByRole("dialog", { name: "Audit drawer" });
  await expect(drawer).toBeVisible();
  const rect = await drawer.boundingBox();
  expect(rect?.height).toBeCloseTo(page.viewportSize()!.height * 0.7, 0);
  expect(rect?.width).toBeCloseTo(page.viewportSize()!.width, 0);
  await expect(drawer.locator(".mn-drawer__footer")).toHaveCSS(
    "display",
    "flex",
  );
  await page.getByRole("button", { name: "Finish drawer" }).click();
  await expect(drawer).toHaveCount(0);
});

test("switch size and shape plus extra-large Modal use real native view geometry", async ({
  page,
}) => {
  const control = page.getByRole("switch", { name: "Large square switch" });
  await expect(control.locator(".mn-switch-track")).toHaveCSS("width", "48px");
  await expect(control.locator(".mn-switch-thumb")).toHaveCSS("width", "24px");
  await expect(control.locator(".mn-switch-thumb")).toHaveCSS(
    "border-radius",
    "2px",
  );
  await control.click();
  await expect(control).toHaveAttribute("aria-checked", "true");
  const segments = page.getByRole("group", { name: "Small segments" });
  await expect(
    segments.getByRole("button", { name: "On", exact: true }),
  ).toHaveCSS("padding-left", "8px");
  await page.getByRole("button", { name: "Open wide modal" }).click();
  const modal = page.getByRole("dialog", { name: "Wide modal" });
  await expect(modal).toHaveCSS("width", "900px");
  expect((await modal.boundingBox())!.height).toBeLessThanOrEqual(832);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(modal).toHaveCSS("width", "374px");
  expect((await modal.boundingBox())!.height).toBeLessThanOrEqual(828);
  await page.getByRole("button", { name: "Finish modal" }).click();
  await expect(modal).toHaveCount(0);
});

test("measured Menu, calendar sizes and loading Table render native host layout", async ({
  page,
}) => {
  await expect(
    page.locator("#audit-loading-table .mn-table-skeleton"),
  ).toHaveCount(3);
  await expect(
    page.locator("#audit-loading-table .mn-table__row").first(),
  ).toHaveCSS("display", "flex");
  await expect(
    page.locator("#audit-calendar .mn-calendar-day").first(),
  ).toHaveCSS("height", "40px");
  const trigger = page.getByRole("button", { name: "Audit actions" });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const menu = page.getByRole("menu");
  await expect(menu).toHaveAttribute("data-side", "top");
  await expect(menu).toHaveCSS("position", "fixed");
  await expect
    .poll(
      async () =>
        (await menu.boundingBox())!.y + (await menu.boundingBox())!.height,
    )
    .toBeLessThanOrEqual((await trigger.boundingBox())!.y);
  expect((await menu.boundingBox())!.width).toBeGreaterThanOrEqual(192);
  await page.getByRole("menuitem", { name: "Audit item" }).click();
  await expect(menu).toHaveCount(0);
});

for (const kind of ["Select", "AutoComplete", "Cascader"]) {
  test(`${kind} options flip above an actual viewport-edge native control and stop measuring after dismissal`, async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: `Show ${kind} edge`, exact: true })
      .click();
    const panel = page.locator("#edge-picker").getByRole("listbox");
    await expect(panel).toHaveAttribute("data-side", "top");
    await expect(panel).toHaveCSS("position", "fixed");
    if (kind === "Cascader") {
      await panel.getByRole("option", { name: /Edge option/ }).hover();
      await expect(
        panel.getByRole("option", { name: "Hovered child" }),
      ).toBeVisible();
    }
    await expect
      .poll(async () => {
        const bounds = (await panel.boundingBox())!;
        const anchor = (await page.locator("#edge-picker").boundingBox())!;
        return (
          bounds.x >= 8 &&
          bounds.x + bounds.width <= 1192 &&
          bounds.y + bounds.height <= anchor.y
        );
      })
      .toBe(true);
    await page
      .locator(".mn-picker-backdrop")
      .click({ position: { x: 20, y: 20 } });
    await expect(panel).toHaveCount(0);
    const count = await page.evaluate(() =>
      Reflect.get(window, "nativeMeasurements"),
    );
    await page.waitForTimeout(250);
    expect(
      await page.evaluate(() => Reflect.get(window, "nativeMeasurements")),
    ).toBe(count);
  });
}
test("Input size and filled variant style its full adornment wrapper", async ({
  page,
}) => {
  const wrapper = page.locator(".audit-small-input");
  await expect(wrapper).toHaveClass(/mn-input-root/);
  const values = await wrapper.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      height: el.getBoundingClientRect().height,
      expected: parseFloat(s.getPropertyValue("--control-height-sm")),
      color: s.backgroundColor,
      shadow: s.boxShadow,
    };
  });
  expect(values.height).toBe(values.expected);
  expect(values.color).not.toBe("rgba(0, 0, 0, 0)");
  expect(values.shadow).toBe("none");
  await expect(wrapper.getByRole("textbox")).toHaveCSS(
    "border-top-width",
    "0px",
  );
});

for (const [mode, side] of [
  ["ltr-right", "left"],
  ["rtl-center", "left"],
  ["rtl-left", "right"],
]) {
  test(`Menu ${mode} uses independent nested floating panels, flips to ${side}, and releases measurement on close`, async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: `Show submenu ${mode}`, exact: true })
      .click();
    const root = page.getByRole("menu", { name: "Root actions", exact: true });
    await expect(root).toHaveCSS("position", "fixed");
    const before = (await root.boundingBox())!;
    const trigger = page.getByRole("menuitem", {
      name: "More actions",
      exact: true,
    });
    await trigger.click();
    const submenu = page.getByRole("menu", {
      name: "More actions",
      exact: true,
    });
    await expect(submenu).toHaveCSS("position", "fixed");
    await expect(submenu).toHaveAttribute("data-side", side);
    const child = (await submenu.boundingBox())!,
      item = (await trigger.boundingBox())!;
    if (side === "left")
      expect(child.x + child.width).toBeLessThanOrEqual(item.x);
    else expect(child.x).toBeGreaterThanOrEqual(item.x + item.width);
    expect((await root.boundingBox())!.height).toBeCloseTo(before.height, 0);
    await expect(submenu).toHaveCSS(
      "background-color",
      await root.evaluate((el) => getComputedStyle(el).backgroundColor),
    );
    await trigger.click();
    await expect(submenu).toHaveCount(0);
    const countSub = () =>
      page.evaluate(() =>
        Object.entries(
          Reflect.get(window, "nativeMeasurementsBySelector") ?? {},
        )
          .filter(([selector]) => selector.includes("mn-menu-sub-"))
          .reduce((sum, [, value]) => sum + Number(value), 0),
      );
    const closedCount = await countSub();
    await page.waitForTimeout(250);
    expect(await countSub()).toBe(closedCount);
    await trigger.click();
    await page.getByRole("menuitem", { name: "Advanced", exact: true }).click();
    await expect(
      page.getByRole("menu", { name: "Advanced", exact: true }),
    ).toHaveCSS("position", "fixed");
    await page
      .getByRole("menuitem", { name: "Deep action", exact: true })
      .click();
    await expect(page.locator("#menu-selection")).toHaveText("deep");
    await expect(root).toHaveCount(0);
    const stopped = await page.evaluate(() =>
      Reflect.get(window, "nativeMeasurements"),
    );
    await page.waitForTimeout(250);
    expect(
      await page.evaluate(() => Reflect.get(window, "nativeMeasurements")),
    ).toBe(stopped);
  });
}
