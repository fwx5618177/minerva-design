import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("Modal width and responsive bottom geometry use the shared cancelable surface and return focus", async ({
  page,
}) => {
  const opener = page.getByRole("button", {
    name: "Open measured modal",
    exact: true,
  });
  await opener.click();
  const dialog = page.getByRole("dialog", {
    name: "Measured modal",
    exact: true,
  });
  await expect(dialog).toHaveCSS("width", "900px");
  await page.setViewportSize({ width: 500, height: 800 });
  await expect(dialog).toHaveCSS("width", "484px");
  expect(
    (await dialog.boundingBox())!.y + (await dialog.boundingBox())!.height,
  ).toBeCloseTo(792, 0);
  await dialog.press("Escape");
  await expect(opener).toBeFocused();
});
test("Menu RTL child keyboard scope and Rating hover/keyboard update real focus and values", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Open RTL menu" }).click();
  const parent = page.getByRole("menuitem", { name: "Branch" });
  await parent.press("ArrowLeft");
  const child = page.getByRole("menuitem", { name: "Leaf", exact: true });
  await expect(child).toBeFocused();
  await child.press("Escape");
  await expect(parent).toBeFocused();
  await parent.press("Escape");
  const rating = page.getByRole("slider", { name: "Measured rating" });
  await rating.focus();
  await rating.press("PageUp");
  await expect(rating).toHaveAttribute("aria-valuenow", "6");
  await expect(rating.locator(".mn-star").first()).toHaveCSS(
    "font-size",
    "20px",
  );
  await rating.locator(".mn-star").nth(4).hover();
  await expect(rating.locator(".mn-star.mn-active")).toHaveCount(5);
});
test("AutoComplete flips above the viewport edge, keeps input focus and selects its original option", async ({
  page,
}) => {
  const input = page.getByRole("combobox", { name: "Measured completion" });
  await input.focus();
  const popup = page
    .getByRole("listbox")
    .filter({ has: page.getByRole("option", { name: "Alpha", exact: true }) });
  await expect(popup).toHaveAttribute("data-side", "top");
  await expect(input).toBeFocused();
  const rect = await popup.boundingBox();
  expect(rect!.y).toBeGreaterThanOrEqual(8);
  expect(rect!.y + rect!.height).toBeLessThanOrEqual(
    (await input.boundingBox())!.y,
  );
  await page.getByRole("option", { name: "Alpha", exact: true }).click();
  await expect(input).toHaveValue("Alpha");
  await expect(popup).toBeHidden();
});
