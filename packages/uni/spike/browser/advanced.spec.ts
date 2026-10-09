import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("Drawer native classes produce bottom geometry and Escape restores the opener", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Open advanced drawer",
    exact: true,
  });
  await trigger.click();
  const drawer = page.getByRole("dialog", {
    name: "Advanced details",
    exact: true,
  });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveCSS("height", "240px");
  const box = (await drawer.boundingBox())!;
  expect(box.y + box.height).toBe(1000);
  await drawer.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test("Virtual list scroll actually swaps the DOM window while preserving scroll geometry", async ({
  page,
}) => {
  const list = page.getByTestId("advanced-virtual");
  await expect(list).toHaveCSS("height", "120px");
  await list.evaluate((el) => (el.scrollTop = 800));
  await expect(list.locator('[data-virtual-index="20"]')).toHaveText(
    "Advanced row 20",
  );
  await expect(list.locator('[data-virtual-index="0"]')).toHaveCount(0);
  expect(await list.evaluate((el) => el.scrollHeight)).toBe(4000);
});
test("Switch/Radio/Alert/Tabs visible interactions and native classes are styled", async ({
  page,
}) => {
  const power = page.getByRole("switch", {
    name: "Advanced power",
    exact: true,
  });
  await power.click();
  await expect(power).toBeChecked();
  const track = page.locator(".advanced-harness [data-switch-track]");
  await expect(track).toHaveCSS("width", "48px");
  await expect(page.locator(".advanced-harness [data-switch-thumb]")).toHaveCSS(
    "width",
    "24px",
  );
  await page.getByRole("radio", { name: "Professional", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Professional", exact: true }),
  ).toHaveAttribute("aria-checked", "true");
  const alert = page.getByTestId("advanced-alert");
  await alert.getByRole("button", { name: "Collapse", exact: true }).click();
  await expect(alert.locator("[data-alert-content]")).toBeHidden();
  const tab = page.getByRole("tab", { name: "Advanced tab one", exact: true });
  await tab.focus();
  await tab.press("ArrowDown");
  await expect(
    page.getByRole("tab", { name: "Advanced tab two", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toHaveText("Advanced panel two");
});
test("JSON formatting preserves raw lexemes, toggle icon tooltip and command keyboard workflow are real", async ({
  page,
}) => {
  const json = page.getByRole("textbox", {
    name: "Advanced JSON",
    exact: true,
  });
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(json).toHaveValue(
    '{\n    "big": 9007199254740993,\n    "big": 1e+9\n}',
  );
  const icon = page.getByRole("button", {
    name: "Advanced favorite",
    exact: true,
  });
  await icon.click();
  await expect(icon).toHaveAttribute("aria-pressed", "true");
  await icon.hover();
  await expect(page.getByRole("tooltip")).toHaveText("Advanced favorite");
  await page.keyboard.press("Control+j");
  const search = page
    .getByRole("dialog", { name: "Command palette", exact: true })
    .getByRole("combobox");
  await expect(search).toBeFocused();
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(
    page.getByRole("dialog", { name: "Command palette", exact: true }),
  ).toHaveCount(0);
});

test("explicit Tab color stays tinted before selection and selected pills invert the surface", async ({
  page,
}) => {
  const tab = page.getByRole("tab", { name: "Advanced tab two", exact: true });
  const before = await tab.evaluate((el) => ({
    bg: getComputedStyle(el).backgroundColor,
    fg: getComputedStyle(el).color,
  }));
  expect(before.bg).not.toBe("rgba(0, 0, 0, 0)");
  await tab.click();
  const after = await tab.evaluate((el) => ({
    bg: getComputedStyle(el).backgroundColor,
    fg: getComputedStyle(el).color,
  }));
  expect(after.bg).toBe(before.fg);
  expect(after.fg).toBe(before.bg);
});
