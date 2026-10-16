import { expect, test } from "./test";
test("DatePicker browser input opens a usable bounded calendar, selects and clears", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "Start date", exact: true });
  await input.click();
  const panel = page.getByRole("dialog", { name: "Start date", exact: true });
  await expect(panel).toBeVisible();
  expect((await panel.boundingBox())!.width).toBeGreaterThan(250);
  await expect(
    panel.getByRole("gridcell", { name: "2026-10-09" }),
  ).toHaveAttribute("aria-disabled", "true");
  await panel.getByRole("gridcell", { name: "2026-10-16" }).click();
  await expect(input).toHaveValue("2026-10-16");
  await expect(panel).toHaveCount(0);
  await page.getByRole("button", { name: "Clear date", exact: true }).click();
  await expect(input).toHaveValue("");
});
