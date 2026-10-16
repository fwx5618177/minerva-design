import { expect, test } from "@playwright/test";
test("DatePicker browser popup selects a bounded day and clears its value", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "Start date", exact: true });
  await input.click();
  const panel = page.getByRole("dialog", { name: "Start date", exact: true });
  await expect(panel).toBeVisible();
  expect((await panel.boundingBox())!.width).toBeGreaterThan(250);
  await expect(panel.locator('[data-day="2026-10-09"]')).toBeDisabled();
  await panel.locator('[data-day="2026-10-16"]').click();
  await expect(input).toHaveValue("2026-10-16");
  await expect(panel).toHaveCount(0);
  await page.getByRole("button", { name: "Clear date", exact: true }).click();
  await expect(input).toHaveValue("");
});
