import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("avatar")).toBeVisible();
});
test("real styles honor dimensions, color, padding and Box precedence", async ({
  page,
}) => {
  await expect(page.getByTestId("avatar")).toHaveCSS("width", "64px");
  await expect(page.getByTestId("avatar")).toHaveCSS("height", "64px");
  await expect(page.getByTestId("card")).toHaveCSS("padding-top", "24px");
  await expect(page.getByTestId("card")).not.toHaveCSS("box-shadow", "none");
  await expect(page.getByTestId("box")).toHaveCSS("padding-top", "16px");
  await expect(page.getByTestId("box")).toHaveCSS("padding-right", "8px");
  await expect(page.getByTestId("box")).toHaveCSS("padding-left", "12px");
  const badge = page.locator("[data-badge]");
  await expect(badge).toHaveCSS("min-height", "24px");
  await expect(badge).not.toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.getByRole("button", { name: "Important", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("container resizing drives grid columns and split collapse independent of viewport", async ({
  page,
}) => {
  const grid = page.locator("[data-grid-layout]");
  expect(
    (
      await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns)
    ).split(" "),
  ).toHaveLength(2);
  await page
    .locator(".harness-container")
    .evaluate((el) => ((el as HTMLElement).style.width = "1250px"));
  await expect
    .poll(
      async () =>
        (
          await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns)
        ).split(" ").length,
    )
    .toBe(4);
  await page
    .locator(".harness-container")
    .evaluate((el) => ((el as HTMLElement).style.width = "400px"));
  await expect
    .poll(
      async () =>
        (
          await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns)
        ).split(" ").length,
    )
    .toBe(1);
  await expect(page.locator(".mn-uni-split-layout")).toHaveCSS(
    "flex-direction",
    "column",
  );
});
test("theme changes computed component colors and ring uses a real determinate visual", async ({
  page,
}) => {
  const card = page.getByTestId("card");
  const light = await card.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await page.getByRole("radio", { name: "Dark", exact: true }).click();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(light);
  await expect(page.locator('[data-progress-visual="circle"]')).toHaveCSS(
    "background-image",
    /conic-gradient/,
  );
  await expect(page.locator('[data-progress-visual="spinner"]')).toHaveCSS(
    "animation-name",
    "mn-spin",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-progress-visual="spinner"]')).toHaveCSS(
    "animation-name",
    "none",
  );
});
test("mobile shell mounts one navigation and desktop toggle updates its slot state", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Collapse sidebar", exact: true })
    .click();
  await expect(page.locator("[data-navigation]")).toHaveText(
    "Compact navigation",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("[data-navigation]")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await expect(page.locator("[data-navigation]")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Close navigation", exact: true })
    .click();
  await expect(page.locator("[data-navigation]")).toHaveCount(0);
});
test("floating sidebar expands over content without changing the reserved rail", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Enable floating sidebar", exact: true })
    .click();
  await page.locator(".samples").hover();
  await expect(page.locator("[data-navigation]")).toHaveText(
    "Compact navigation",
  );
  const content = page.locator(".mn-uni-app-content");
  const left = (await content.boundingBox())!.x;
  await page.locator(".mn-uni-app-sidebar").hover();
  await expect(page.locator("[data-navigation]")).toHaveText("Full navigation");
  expect((await content.boundingBox())!.x).toBe(left);
});
test("page navigation scroll controls and committed active page move a real viewport", async ({
  page,
}) => {
  const viewport = page.locator("[data-page-viewport]");
  await expect(
    page.getByRole("button", { name: "Scroll pages right" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Scroll pages right" }).click();
  await expect
    .poll(() => viewport.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await page.locator("[data-last-page]").click();
  const last = page.getByRole("button", { name: "Document 12", exact: true });
  await expect(last).toHaveAttribute("aria-current", "page");
  const item = (await last.boundingBox())!,
    view = (await viewport.boundingBox())!;
  expect(item.x + item.width).toBeLessThanOrEqual(view.x + view.width + 1);
});
test("TimePicker shows stepped native columns and commits the selected seconds", async ({
  page,
}) => {
  const input = page.getByRole("textbox", { name: "Time", exact: true });
  await input.click();
  await expect(
    page.locator('[data-time-column="minute"] [role="option"]'),
  ).toHaveCount(4);
  await page.locator('[data-time-column="second"] [data-unit="40"]').click();
  await expect(input).toHaveValue("09:15:40");
  await input.press("Escape");
  await expect(page.locator(".mn-uni-time-panel")).toHaveCount(0);
});
test("Popover flips above a bottom anchor with real viewport bounds and dismisses", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Show anchored details", exact: true })
    .click();
  const panel = page.locator(".mn-uni-popover-panel");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("data-side", "top");
  const box = (await panel.boundingBox())!,
    trigger = (await page
      .getByRole("button", { name: "Show anchored details", exact: true })
      .boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(trigger.y - 5);
  expect(box.width).toBeCloseTo(trigger.width, 0);
  await panel.press("Escape");
  await expect(panel).toHaveCount(0);
});
