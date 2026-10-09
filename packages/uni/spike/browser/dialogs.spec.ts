import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("context menu anchors at pointer, repositions, and restores keyboard focus", async ({
  page,
}) => {
  const area = page.getByRole("button", { name: "Record area", exact: true });
  await area.scrollIntoViewIfNeeded();
  await area.click({ button: "right", position: { x: 12, y: 12 } });
  const menu = page.getByRole("menu", { name: "Record actions" });
  await expect(menu).toBeVisible();
  await expect(
    menu.getByRole("menuitem", { name: "Edit record" }),
  ).toBeFocused();
  const panel = page.locator(".mn-uni-context-positioner");
  const first = await panel.boundingBox();
  await area.click({ button: "right", position: { x: 42, y: 12 } });
  await expect
    .poll(async () => (await panel.boundingBox())!.x)
    .toBeGreaterThan(first!.x + 20);
  await menu.getByRole("menuitem", { name: "Edit record" }).click();
  await expect(menu).toHaveCount(0);
  await expect(area).toBeFocused();
  await area.press("Shift+F10");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(area).toBeFocused();
});
test("confirm shares modal geometry, accessible names, loading guard and focus return", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Delete record",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("alertdialog", {
    name: "Delete record permanently?",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-describedby", /.+/);
  await expect(dialog).toHaveCSS("width", "400px");
  await page.getByRole("button", { name: "Dismiss confirmation" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  const confirm = dialog.getByRole("button", { name: "Delete", exact: true });
  await confirm.click();
  await expect(confirm).toHaveAttribute("aria-busy", "true");
  await expect(confirm).toBeFocused();
  await expect(
    dialog.getByRole("button", { name: "Cancel", exact: true }),
  ).toBeDisabled();
  await expect(page.getByTestId("dialog-examples")).toContainText(
    "Record deleted",
  );
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
