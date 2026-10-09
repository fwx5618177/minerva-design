import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/h5.html");
});
test("H5 modal traps focus, isolates background and restores focus/scroll", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Open modal" }).click();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("#outside")).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Last", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#outside")).not.toHaveAttribute("inert", "");
  await expect(page.getByRole("button", { name: "Open modal" })).toBeFocused();
});
test("H5 authored trigger portals modal content and previews untrusted HTML safely", async ({
  page,
}) => {
  await page.locator("#authored").click();
  expect(
    await page
      .locator(".mn-uni-popover-panel")
      .evaluate((el) => el.parentElement === document.body),
  ).toBe(true);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.getByRole("button", { name: "Close popover" }).click();
  await expect(page.locator("#authored")).toBeFocused();
  await expect(
    page.frameLocator("iframe").getByText("Safe preview"),
  ).toBeVisible();
  expect(
    await page.evaluate(() => Reflect.get(window, "compromised")),
  ).toBeUndefined();
});
test("H5 loads a real local Monaco editor and preserves user edits", async ({
  page,
}) => {
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await page.locator(".monaco-editor").click();
  await page.keyboard.press("ControlOrMeta+End");
  await page.keyboard.type(" world");
  await expect(page.locator("#code")).toHaveText("hello world");
});

for (const kind of ["drawer", "popover"]) {
  test(`H5 ${kind} updates live modality and restores background interaction`, async ({
    page,
  }) => {
    await page.getByRole("button", { name: `Open lifecycle ${kind}` }).click();
    const toggle = page.getByRole("button", {
      name: `Toggle ${kind} modality`,
    });
    await toggle.click();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    expect(
      await page
        .locator("#lifecycle-outside")
        .evaluate((el) => Boolean(el.closest("[inert]"))),
    ).toBe(true);
    await page
      .locator("#lifecycle-outside")
      .evaluate((el) => (el as HTMLElement).focus());
    await expect(toggle).toBeFocused();
    await toggle.click();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    expect(
      await page
        .locator("#lifecycle-outside")
        .evaluate((el) => Boolean(el.closest("[inert]"))),
    ).toBe(false);
    await page.locator("#lifecycle-outside").focus();
    await expect(page.locator("#lifecycle-outside")).toBeFocused();
  });
}
test("H5 popover repositions after content growth on first open and reopen", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Open lifecycle popover" });
  for (let attempt = 0; attempt < 2; attempt++) {
    await trigger.click();
    const panel = page.locator(".mn-uni-popover-panel");
    await expect(panel).toHaveAttribute("data-side", "top");
    const before = await panel.boundingBox();
    await page.getByRole("button", { name: "Resize content" }).click();
    await expect
      .poll(async () => Math.round((await panel.boundingBox())!.y - before!.y))
      .toBe(attempt === 0 ? -100 : 100);
    await page.getByRole("button", { name: "End popover lifecycle" }).click();
    await expect(panel).toHaveCount(0);
  }
});
