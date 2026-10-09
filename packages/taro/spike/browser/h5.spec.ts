import { test, expect } from "./test";
test.beforeEach(async ({ page }) => {
  await page.goto("/h5.html");
});
test("H5 roving tabs, keyboard select and command activation", async ({
  page,
}) => {
  const a = page.getByRole("tab", { name: "Alpha" }),
    c = page.getByRole("tab", { name: "Charlie" });
  await a.focus();
  await a.press("ArrowRight");
  await expect(c).toBeFocused();
  await expect(a).toHaveAttribute("aria-selected", "true");
  await c.press("Enter");
  await expect(page.getByRole("tabpanel")).toHaveText("Charlie panel");
  await page.getByRole("combobox", { name: "Choice" }).press("ArrowDown");
  await expect(page.getByRole("option", { name: "Apple" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox", { name: "Choice" })).toContainText(
    "Banana",
  );
  await page.getByRole("button", { name: "Commands", exact: true }).click();
  const input = page.getByRole("dialog").getByRole("textbox");
  await input.press("ArrowDown");
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(page.locator("#command-result")).toHaveText("b");
});
test("H5 File input, sandbox and modal background isolation", async ({
  page,
}) => {
  await page.locator("input[type=file]").setInputFiles({
    name: "note.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("hello"),
  });
  await expect(page.locator("#files")).toHaveText("note.txt");
  await expect(
    page.frameLocator("iframe").getByText("Safe preview"),
  ).toBeVisible();
  expect(
    await page.evaluate(() => Reflect.get(window, "compromised")),
  ).toBeUndefined();
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Locked drawer" })).toHaveCount(
    0,
  );
  await expect(page.getByRole("button", { name: "Open drawer" })).toBeFocused();
});
test("H5 uses the real local Monaco editor and emits edits", async ({
  page,
}) => {
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await page.locator(".monaco-editor").click();
  await page.keyboard.press("ControlOrMeta+End");
  await page.keyboard.type(" world");
  await expect(page.locator("#code")).toHaveText("hello world");
});

for (const mode of ["default", "nonmodal", "modal"]) {
  test(`H5 ${mode} Popover composes cancelable close and restores focus`, async ({
    page,
  }) => {
    const trigger = page.getByRole("button", {
      name: `Open ${mode} popover`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", {
      name: `Popover ${mode}`,
      exact: true,
    });
    await expect(dialog).toBeVisible();
    if (mode === "modal")
      await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    else await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await page
      .getByRole("button", { name: `Canceled ${mode} close`, exact: true })
      .click();
    await expect(page.locator(`#callbacks-${mode}`)).toHaveText("1");
    await expect(dialog).toBeVisible();
    await page
      .getByRole("button", { name: `Owner canceled ${mode}`, exact: true })
      .click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    if (mode === "modal")
      await page
        .locator(".mn-popover-backdrop")
        .click({ position: { x: 1, y: 1 } });
    else await page.mouse.click(1, 1);
    await expect(dialog).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });
}
