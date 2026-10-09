import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (window !== window.top) return;
    localStorage.setItem("minerva-docs-language", "en");
    localStorage.setItem("minerva-docs-theme", "light");
  });
});

test("header search aligns icon, label and keyboard hint and opens the library search", async ({
  page,
}) => {
  await page.goto("#/button");
  const trigger = page.locator('button[aria-keyshortcuts="Meta+K Control+K"]');
  const positions = await trigger.evaluate((button) => {
    const elements = [
      button.querySelector("svg"),
      button.querySelector("kbd"),
      button.querySelector('[data-part="label"]'),
    ];
    return elements.map((element) => {
      const rect = element!.getBoundingClientRect();
      return { x: rect.x, y: rect.y + rect.height / 2, width: rect.width };
    });
  });
  expect(Math.abs(positions[0].y - positions[1].y)).toBeLessThanOrEqual(2);
  expect(positions[0].x + positions[0].width).toBeLessThan(positions[2].x);
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog").getByRole("combobox").fill("Button");
  await expect(page.getByRole("option").first()).toContainText("Button");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("AppShell icons preserve outline geometry and navigation uses NavTree", async ({
  page,
}) => {
  await page.goto("#/app-shell?framework=react");
  const demo = page.locator("#demo-basic [data-demo-preview]");
  const icon = demo
    .locator('[data-minerva="icon-button"] svg[fill="none"]')
    .first();
  await expect(icon).toBeVisible();
  expect(await icon.evaluate((svg) => getComputedStyle(svg).fill)).toBe("none");
  const navigation = demo.locator(
    '[data-minerva="nav-tree"][data-part="root"]',
  );
  await expect(navigation).toBeVisible();
  await navigation.getByText("Books", { exact: true }).click();
  await expect(
    demo.getByRole("heading", { name: "Books", exact: true }),
  ).toBeVisible();
});

test("Vue optional Monaco mounts a real worker-backed editor and restores fallback text", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("#/monaco-code-editor?framework=vue");
  const basic = page.locator("#vue-demo-basic [data-demo-preview]");
  const editor = basic.locator(".monaco-editor");
  await expect(editor).toBeVisible({ timeout: 20000 });
  const input = editor.getByRole("textbox");
  const initialLength = Number.parseInt(
    await basic.getByRole("status").innerText(),
    10,
  );
  await input.focus();
  await page.keyboard.type("Hello from Vue");
  await expect(basic.getByRole("status")).toHaveText(
    `${initialLength + 14} characters`,
  );
  await expect(editor.locator(".view-lines")).toContainText("Hello from Vue");
  await basic.getByRole("switch", { name: "Read-only editor" }).click();
  await expect(input).not.toBeEditable();
  const fallback = page.locator("#vue-demo-fallback [data-demo-preview]");
  await fallback
    .getByRole("textbox", { name: "Recoverable editor" })
    .fill("Keep my edits");
  await fallback
    .getByRole("button", { name: "Load local editor engine" })
    .click();
  await expect(fallback.locator(".monaco-editor")).toBeVisible();
  await expect(fallback.getByRole("status")).toHaveText("Keep my edits");
  expect(errors).toEqual([]);
});

test("Angular AOT examples execute native events, render their API and follow the site theme", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("#/button?framework=angular");
  const section = page.locator("[data-native-angular-section]");
  const demo = section.locator("[data-demo-preview]").first();
  const button = demo.getByRole("button", { name: "Click me", exact: true });
  await expect(button).toBeVisible();
  await button.click();
  await button.click();
  await expect(demo.getByRole("status")).toHaveText("Clicked 2 times");
  await expect(
    section.getByRole("heading", { name: "Angular API", exact: true }),
  ).toBeVisible();
  await expect(section.locator("table").first()).toContainText("loading");
  await page.getByRole("button", { name: /^Theme:/ }).click();
  await page.getByRole("menuitemradio", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(demo.locator("mn-config")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("homepage playground changes rendered styles, isolates its theme and exposes matching source", async ({
  page,
}) => {
  await page.goto("#/");
  const panel = page.getByRole("region", { name: "Component playground" });
  const preview = panel.getByTestId("playground-preview");
  const button = preview.getByRole("button", { name: "Try button" });
  const readStyle = (property: string) =>
    button.evaluate(
      (element, key) => getComputedStyle(element).getPropertyValue(key),
      property,
    );
  const initialColor = await readStyle("background-color");
  await panel.getByRole("combobox", { name: "Palette" }).click();
  await page.getByRole("option", { name: "Graphite", exact: true }).click();
  await expect.poll(() => readStyle("background-color")).not.toBe(initialColor);
  const initialHeight = await readStyle("height");
  await panel.getByRole("combobox", { name: "Density" }).click();
  await page.getByRole("option", { name: "Compact", exact: true }).click();
  await expect.poll(() => readStyle("height")).not.toBe(initialHeight);
  await panel.getByRole("combobox", { name: "Corners" }).click();
  await page.getByRole("option", { name: "Square", exact: true }).click();
  await expect.poll(() => readStyle("border-radius")).toBe("0px");
  const initialBackground = await preview.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await panel.getByRole("switch", { name: "Dark preview" }).click();
  await expect
    .poll(() => preview.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(initialBackground);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await panel.getByRole("switch", { name: "Disable button" }).click();
  await expect(button).toBeDisabled();
  await panel.getByRole("button", { name: "View example source" }).click();
  const code = panel.getByRole("region", { name: "TSX code" });
  await expect(code).toContainText('palette="graphite"');
  await expect(code).toContainText('radius="none"');
  await expect(code).toContainText("disabled={true}");
  await expect(code.locator(".token.keyword").first()).toBeVisible();
});

for (const theme of ["Light", "Dark"] as const) {
  test(`framework branding and canonical logo remain visible in ${theme}`, async ({
    page,
  }) => {
    await page.goto("#/");
    await page.getByRole("button", { name: /^Theme:/ }).click();
    await page.getByRole("menuitemradio", { name: theme, exact: true }).click();
    const grid = page.locator('section[aria-labelledby="home-frameworks"]');
    await expect(grid.getByRole("link")).toHaveCount(10);
    await expect(grid.locator("[data-framework-icon]").first()).toHaveCSS(
      "width",
      "30px",
    );
    for (const container of [
      grid,
      page.getByRole("group", { name: "Supported frameworks" }),
    ]) {
      const colors = await container
        .locator("[data-framework-icon]")
        .evaluateAll((icons) =>
          icons.map((icon) => getComputedStyle(icon).color),
        );
      expect(new Set(colors).size).toBeGreaterThanOrEqual(7);
      for (const color of colors) {
        const [r, g, b] = color.match(/\d+/g)!.map(Number);
        expect(r === g && g === b).toBe(false);
      }
    }
    const logo = page.locator("[data-minerva-logo]").first();
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((el) => (el as HTMLImageElement).src)).toBe(
      await page
        .locator('link[rel="icon"]')
        .evaluate((el) => (el as HTMLLinkElement).href),
    );
    expect(
      await logo.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const rows = await grid.getByRole("link").evaluateAll((links) => {
        const counts: Record<number, number> = {};
        for (const link of links) {
          const y = Math.round(link.getBoundingClientRect().top);
          counts[y] = (counts[y] ?? 0) + 1;
        }
        return Object.values(counts);
      });
      expect(rows).toEqual(width === 1280 ? [5, 5] : [2, 2, 2, 2, 2]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("#/button?framework=vue");
    const tab = page.getByRole("tab", { name: "Vue", exact: true });
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(tab.locator('[data-framework-icon="vue"]')).toBeVisible();
    expect(
      await tab.locator("svg").evaluate((el) => getComputedStyle(el).color),
    ).toBe("rgb(38, 155, 112)");
  });
}

test("documented search example filters keywords and reports keyboard selection", async ({
  page,
}) => {
  await page.goto("#/command?framework=react");
  const demo = page.locator("#demo-site-search [data-demo-preview]");
  await demo.getByRole("button", { name: /Search documentation/ }).click();
  const dialog = page.getByRole("dialog", { name: "Search documentation" });
  await dialog.getByRole("combobox").fill("submit");
  await expect(dialog.getByRole("option")).toHaveCount(1);
  await dialog.getByRole("combobox").press("ArrowDown");
  await dialog.getByRole("combobox").press("Enter");
  await expect(dialog).not.toBeVisible();
  await expect(demo.getByRole("status")).toHaveText("Selected: Button");
});
