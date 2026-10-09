import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("primitives")).toBeVisible();
});
test("divider geometry and token borders survive real CSS parsing", async ({
  page,
}) => {
  const divider = page.getByTestId("divider");
  await expect(divider).toHaveCSS("width", "180px");
  await expect(divider).toHaveCSS("margin-top", "0px");
  await expect(divider.locator(".mn-divider-line").first()).toHaveCSS(
    "border-top-width",
    "3px",
  );
  await expect(divider.locator(".mn-divider-line").first()).toHaveCSS(
    "border-top-style",
    "dashed",
  );
  await expect(page.getByTestId("vertical-divider")).toHaveCSS(
    "height",
    "70px",
  );
});
test("code scrolls inside its cap and skeletons implement animation, sizing and loaded children", async ({
  page,
}) => {
  const code = page.getByRole("region", { name: "Payload" });
  expect(await code.evaluate((e) => e.clientHeight)).toBeLessThanOrEqual(64);
  expect(await code.evaluate((e) => e.scrollHeight)).toBeGreaterThan(64);
  await expect(code.locator(".mn-code")).toHaveCSS("white-space", "pre");
  const avatar = page.getByTestId("skeleton").locator('[data-part="avatar"]');
  await expect(avatar).toHaveCSS("width", "52px");
  await expect(avatar).toHaveCSS("animation-name", "none");
  const paragraph = page
    .getByTestId("skeleton")
    .locator('[data-part="line"]')
    .first();
  await expect(paragraph).toHaveCSS("height", "16px");
  await expect(paragraph).toHaveCSS("padding", "0px");
  await expect(paragraph).toHaveCSS("box-shadow", "none");
  const lastLine = page
    .getByTestId("skeleton-text")
    .locator('[data-part="line"]')
    .last();
  await expect(lastLine).toHaveCSS("animation-name", "mn-skeleton-wave");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(lastLine).toHaveCSS("animation-name", "none");
  await page
    .getByRole("button", { name: "Finish loading", exact: true })
    .click();
  await expect(page.getByTestId("primitives")).toContainText("Ready");
  await expect(page.getByTestId("skeleton")).toHaveCount(0);
});
test("textarea owner rejection preserves focus and native editability while density and empty slots render", async ({
  page,
}) => {
  const locked = page.getByRole("textbox", { name: "Locked notes" });
  await locked.fill("rejected");
  await expect(locked).toHaveValue("locked");
  await expect(locked).toBeFocused();
  await expect(locked).toHaveCSS("min-height", "96px");
  const local = page.getByRole("textbox", { name: "Local notes" });
  await local.fill("New text");
  await expect(local).toHaveValue("New text");
  await expect(local).toHaveCSS("min-height", "64px");
  const row = page.getByTestId("primitives").getByRole("listitem").first();
  await expect(row).toHaveCSS("min-height", "40px");
  await expect(row).toContainText("0");
  await expect(page.getByTestId("empty")).toHaveCSS("width", "220px");
  await expect(page.getByTestId("empty")).not.toHaveCSS("box-shadow", "none");
  await expect(
    page
      .getByTestId("empty")
      .getByRole("button", { name: "Create", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByTestId("descriptions").getByRole("definition").first(),
  ).toHaveText("0");
});

test("Empty renders the real shared SVG with React-sized icon tile and padding", async ({
  page,
}) => {
  const empty = page.getByTestId("empty-svg");
  const illustration = empty.locator("img.mn-empty-inbox");
  await expect(illustration).toHaveCSS("width", "28px");
  await expect(illustration).toHaveCSS("height", "28px");
  await expect(empty).toHaveCSS("padding", "16px 12px");
  await expect(empty.locator(".mn-empty-icon")).toHaveCSS("padding", "8px");
  await expect
    .poll(() => illustration.evaluate((e: HTMLImageElement) => e.naturalWidth))
    .toBe(64);
  await expect(empty.locator(".mn-empty-title")).toHaveCSS("font-size", "13px");
});
