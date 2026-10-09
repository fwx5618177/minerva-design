import { expect, test, type Locator, type Page } from "@playwright/test";
import { resolveTokens } from "../../packages/core/src/tokens/resolve";

const frameworks = [
  { id: "react", label: "React", prefix: "demo" },
  { id: "vue", label: "Vue", prefix: "vue-demo" },
  { id: "html", label: "HTML", prefix: "wc-demo" },
  { id: "react-native", label: "React Native", prefix: "native-demo" },
] as const;

const preview = (page: Page, prefix: string, demo = "basic") =>
  page.locator(`#${prefix}-${demo} [data-demo-preview]`);

async function themeChoice(page: Page, choice: string) {
  await page.getByRole("button", { name: /^Theme:/ }).click();
  await page.getByRole("menuitemradio", { name: choice, exact: true }).click();
}

const controlColors = (control: Locator) =>
  control.evaluate((element) => {
    const css = getComputedStyle(element);
    return { background: css.backgroundColor, color: css.color };
  });

test.beforeEach(async ({ page }) => {
  // Set only initial preferences. Every state transition below uses real UI events.
  await page.addInitScript(() => {
    if (window !== window.top) return;
    if (!localStorage.getItem("minerva-docs-language")) {
      localStorage.setItem("minerva-docs-language", "en");
      localStorage.setItem("minerva-docs-theme", "light");
      localStorage.setItem("minerva-docs-palette", "default");
    }
  });
});

for (const framework of frameworks) {
  test(`${framework.label}: counter, controlled input and checkboxes in production docs`, async ({
    page,
  }) => {
    await page.goto(`#/button?framework=${framework.id}`);
    await expect(
      page.getByRole("tab", { name: framework.label, exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    const importCode = page.locator("pre").first();
    await expect(importCode.locator(".token.keyword").first()).toBeVisible();
    expect(
      await importCode.evaluate(
        (element) => getComputedStyle(element).borderTopWidth,
      ),
    ).toBe("0px");
    const buttonDemo = preview(page, framework.prefix);
    await expect(
      buttonDemo.getByText("Clicked 0 times", { exact: true }),
    ).toBeVisible();
    const buttonBox = await buttonDemo
      .getByRole("button", { name: "Click me", exact: true })
      .boundingBox();
    const feedbackBox = await buttonDemo
      .getByText("Clicked 0 times", { exact: true })
      .boundingBox();
    expect(buttonBox).not.toBeNull();
    expect(feedbackBox).not.toBeNull();
    expect(feedbackBox!.x - buttonBox!.x - buttonBox!.width).toBeCloseTo(12, 0);
    expect(
      Math.abs(
        feedbackBox!.y +
          feedbackBox!.height / 2 -
          buttonBox!.y -
          buttonBox!.height / 2,
      ),
    ).toBeLessThan(2);
    await buttonDemo
      .getByRole("button", { name: "Click me", exact: true })
      .click();
    await buttonDemo
      .getByRole("button", { name: "Click me", exact: true })
      .click();
    await expect(
      buttonDemo.getByText("Clicked 2 times", { exact: true }),
    ).toBeVisible();

    await page.goto(`#/input?framework=${framework.id}`);
    const inputDemo = preview(page, framework.prefix);
    const controlled = inputDemo.getByRole("textbox", {
      name: "Controlled",
      exact: true,
    });
    await controlled.fill("Ada Lovelace");
    await controlled.press("Tab");
    await expect(controlled).toHaveValue("Ada Lovelace");
    await controlled.fill("");
    await expect(controlled).toHaveValue("");

    await page.goto(`#/checkbox?framework=${framework.id}`);
    const checkboxDemo = preview(page, framework.prefix);
    const remember = checkboxDemo.getByRole("checkbox", {
      name: "Remember me",
      exact: true,
    });
    const checked = checkboxDemo.getByRole("checkbox", {
      name: "Checked by default",
      exact: true,
    });
    await expect(remember).not.toBeChecked();
    await expect(checked).toBeChecked();
    await checkboxDemo.getByText("Remember me", { exact: true }).click();
    await expect(remember).toBeChecked();
    await checkboxDemo.getByText("Checked by default", { exact: true }).click();
    await expect(checked).not.toBeChecked();
  });

  test(`${framework.label}: theme and palette alter rendered control colors and persist`, async ({
    page,
  }) => {
    await page.goto(`#/button?framework=${framework.id}`);
    const button = preview(page, framework.prefix).getByRole("button", {
      name: "Click me",
      exact: true,
    });
    await expect(button).toBeVisible();
    const light = await controlColors(button);
    const lightPage = await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    await themeChoice(page, "Dark");
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-name",
      "dark",
    );
    await expect.poll(() => controlColors(button)).not.toEqual(light);
    await expect
      .poll(() =>
        page
          .locator("body")
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .not.toBe(lightPage);
    await button.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    const dark = await controlColors(button);
    await themeChoice(page, "Tech");
    await expect.poll(() => controlColors(button)).not.toEqual(dark);
    await button.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    const tech = await controlColors(button);
    await page.reload();
    await expect(button).toBeVisible();
    await expect.poll(() => controlColors(button)).toEqual(tech);
    await expect(
      page.getByRole("button", { name: "Theme: Dark", exact: true }),
    ).toBeVisible();
    await themeChoice(page, "GitHub Dark");
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-name",
      "github-dark",
    );
    await expect.poll(() => controlColors(button)).not.toEqual(tech);
    await themeChoice(page, "System");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-name",
      "light",
    );
    await button.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    const systemLight = await controlColors(button);
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-name",
      "dark",
    );
    await expect.poll(() => controlColors(button)).not.toEqual(systemLight);
  });
}

test("home: highlighted installation command, clipboard and interactive preview", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("#/");
  const terminal = page.getByRole("region", {
    name: "Terminal code",
    exact: true,
  });
  await expect(terminal).toContainText("pnpm add minerva-design");
  const token = terminal.locator("code .token").first();
  await expect(token).toBeVisible();
  const tokenColor = await token.evaluate(
    (element) => getComputedStyle(element).color,
  );
  const plainColor = await terminal
    .locator("code")
    .evaluate((element) => getComputedStyle(element).color);
  expect(tokenColor).not.toBe(plainColor);
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("pnpm add minerva-design");
  const demo = page.getByTestId("playground-preview");
  await demo.getByRole("button", { name: "Try button", exact: true }).click();
  await expect(demo.getByRole("status")).toHaveText("Clicks: 1");
  await demo
    .getByRole("textbox", { name: "Workspace name" })
    .fill("My workspace");
  await expect(demo).toContainText("My workspace");
  await demo
    .getByRole("switch", { name: "Notifications", exact: true })
    .click();
  await expect(demo).toContainText("Notifications disabled");
  await page.getByRole("button", { name: "Reset playground" }).click();
  await expect(demo.getByRole("status")).toHaveText("Clicks: 0");
  await expect(demo.getByRole("textbox")).toHaveValue("Minerva Studio");
});

test("Alert: close callback, reset and browser focus restoration", async ({
  page,
}) => {
  await page.goto("#/alert?framework=react");
  const closable = preview(page, "demo", "closable");
  await expect(closable.locator('[role="alert"], [role="status"]')).toHaveCount(
    2,
  );
  await closable
    .getByRole("button", { name: "Close", exact: true })
    .first()
    .click();
  await expect(closable.locator('[role="alert"], [role="status"]')).toHaveCount(
    1,
  );
  await expect(closable.getByText("Closed: 1", { exact: true })).toBeVisible();
  await closable.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(closable.locator('[role="alert"], [role="status"]')).toHaveCount(
    2,
  );
  const focus = preview(page, "demo", "return-focus");
  await focus
    .getByRole("button", { name: "Close", exact: true })
    .last()
    .click();
  await expect(
    focus.getByRole("button", { name: "Reset", exact: true }),
  ).toBeFocused();
});

test("Button: React, Vue, Web Components and Native Web share rendered theme styles", async ({
  page,
}, testInfo) => {
  const measured: Record<string, Record<string, string>> = {};
  for (const framework of frameworks) {
    await page.goto(`#/button?framework=${framework.id}`);
    if (framework.id === "react") {
      await themeChoice(page, "Dark");
      await themeChoice(page, "Tech");
    }
    const button = preview(page, framework.prefix).getByRole("button", {
      name: "Click me",
      exact: true,
    });
    await expect(button).toBeVisible();
    await button.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    measured[framework.id] = await button.evaluate((element) => {
      const box = getComputedStyle(element);
      // RN puts text styles on its Text child; use the real label in each renderer.
      const label = getComputedStyle(
        element.querySelector('[data-part="label"]') ?? element,
      );
      return {
        background: box.backgroundColor,
        color: label.color,
        borderRadius: box.borderRadius,
        height: box.height,
        padding: box.padding,
        fontSize: label.fontSize,
      };
    });
  }
  await testInfo.attach("rendered-button-styles", {
    body: JSON.stringify(measured, null, 2),
    contentType: "application/json",
  });
  expect(measured.vue).toEqual(measured.react);
  expect(measured.html).toEqual(measured.react);
  // The native provider deliberately defaults to the shared touch design preset.
  // Match semantic styling across renderers, then verify native geometry against
  // its actual preset rather than pretending the two defaults are pixel-identical.
  const touch = resolveTokens({
    mode: "dark",
    palette: "tech",
    design: { preset: "touch" },
  });
  expect(measured["react-native"]).toEqual({
    ...measured.react,
    height: `${touch.sizes["control-height-md"]}px`,
    padding: `0px ${touch.sizes["control-padding-x-md"]}px`,
    borderRadius: `${touch.radius.lg}px`,
  });
});

test("mini API selector loads each platform's actual props and events", async ({
  page,
}) => {
  await page.goto("#/platform-support");
  const section = page.getByRole("region", {
    name: "Mini-program component API",
  });
  await expect(
    section
      .getByRole("table", { name: "Events" })
      .getByText("onClick", { exact: true }),
  ).toBeVisible();
  await section.getByRole("combobox", { name: "API platform" }).click();
  await page.getByRole("option", { name: "uni-app", exact: true }).click();
  await section.getByRole("combobox", { name: "API component" }).click();
  await page.getByRole("option", { name: "Input", exact: true }).click();
  await expect(
    section
      .getByRole("table", { name: "Events" })
      .getByText("update:modelValue", { exact: true }),
  ).toBeVisible();
  await section.getByRole("combobox", { name: "API platform" }).click();
  await page.getByRole("option", { name: "WeChat", exact: true }).click();
  await expect(section.locator("pre")).toContainText(
    "minerva-design/input/index",
  );
  await expect(
    section
      .getByRole("table", { name: "Events" })
      .getByText("change", { exact: true }),
  ).toBeVisible();
});

for (const framework of frameworks.filter((f) => f.id !== "react-native")) {
  test(`${framework.label}: text divider applies dashed thickness and asymmetric alignment`, async ({
    page,
  }) => {
    await page.goto(`#/divider?framework=${framework.id}`);
    const demo = preview(page, framework.prefix, "with-text");
    const right =
      framework.id === "html"
        ? demo.locator('minerva-divider[text-align="right"] [role="separator"]')
        : demo.locator('[role="separator"]').filter({ hasText: "Right" });
    await expect(right).toBeVisible();
    const lines = await right.evaluate((el) =>
      ["::before", "::after"].map((pseudo) => {
        const css = getComputedStyle(el, pseudo);
        return {
          width: parseFloat(css.width),
          style: css.borderTopStyle,
          thickness: css.borderTopWidth,
        };
      }),
    );
    expect(lines.map((l) => l.style)).toEqual(["dashed", "dashed"]);
    expect(lines.map((l) => l.thickness)).toEqual(["3px", "3px"]);
    expect(lines[0].width).toBeGreaterThan(lines[1].width * 4);
  });
}
