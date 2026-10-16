import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (window === window.top)
      localStorage.setItem("minerva-docs-language", "en");
  });
});

for (const framework of ["react", "vue", "angular", "html"] as const) {
  test(`${framework}: DatePicker commits, bounds selection and clears in production docs`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`#/date-picker?framework=${framework}`);
    const area =
      framework === "react"
        ? page.locator("#demo-min-max [data-demo-preview]")
        : framework === "vue"
          ? page.locator("#vue-demo-range [data-demo-preview]")
          : framework === "angular"
            ? page.locator("#angular-demo-date-range [data-demo-preview]")
            : page.locator("#wc-demo-basic [data-demo-preview]");
    const input = area.getByRole("textbox").first();
    await expect(input).toBeVisible();
    const month = framework === "react" ? "04" : "10";
    await input.click();
    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("grid") });
    await expect(dialog).toBeVisible();
    const outside = dialog.getByRole("gridcell", {
      name: `2026-${month}-09`,
      exact: true,
    });
    await expect(outside).toHaveAttribute("aria-disabled", "true");
    await dialog
      .getByRole("gridcell", { name: `2026-${month}-16`, exact: true })
      .click();
    await expect(input).toHaveValue(`2026-${month}-16`);
    await expect(dialog).toHaveCount(0);
    await area.getByRole("button", { name: "Clear date", exact: true }).click();
    await expect(input).toHaveValue("");
    await input.fill(`2026-${month}-15`);
    await input.press("Tab");
    await expect(input).toHaveValue(`2026-${month}-15`);
    expect(errors).toEqual([]);
  });
}

test("React Native DatePicker selects a date and clears using the touch calendar", async ({
  page,
}) => {
  await page.goto("#/date-picker?framework=react-native");
  const area = page.locator("#native-demo-basic [data-demo-preview]");
  await area.getByRole("combobox", { name: "Departure" }).click();
  const dialog = page.getByRole("dialog", { name: "Departure" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /January 16, 2026/ }).click();
  await expect(area.getByText("2026-01-16", { exact: true })).toBeVisible();
  await area.getByRole("button", { name: "Clear date", exact: true }).click();
  await expect(area.getByText("Select date", { exact: true })).toBeVisible();
});
