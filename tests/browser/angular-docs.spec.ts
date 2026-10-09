import { expect, test } from "@playwright/test";
import { angularExamples } from "../../apps/docs/src/docs/angular/examples";

const pages = Object.keys(angularExamples).filter(
  (page) => page !== "monaco-code-editor",
);
for (let group = 0; group < 3; group++) {
  test(`all Angular documentation pages render their AOT examples (group ${group + 1})`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      if (window === window.top)
        localStorage.setItem("minerva-docs-language", "en");
    });
    for (const id of pages.filter((_, index) => index % 3 === group)) {
      await page.goto(`#/${id}?framework=angular`);
      const demos = page.locator("[data-angular-demo]");
      await expect(demos, id).toHaveCount(angularExamples[id]!.length);
      for (const demo of await demos.all()) {
        await expect(demo, id).toHaveAttribute("aria-busy", "false");
        await expect(
          demo.locator("mn-docs-example [data-minerva]").first(),
          id,
        ).toBeAttached();
        await expect(demo.getByText("Unable to load this example")).toHaveCount(
          0,
        );
      }
    }
    expect(errors).toEqual([]);
  });
}

test("Angular Monaco uses the configured engine, propagates edits and respects read-only", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("#/monaco-code-editor?framework=angular");
  const editable = page.locator(
    "#angular-demo-edit-source [data-demo-preview]",
  );
  await expect(editable.locator(".monaco-editor")).toBeVisible({
    timeout: 20000,
  });
  const input = editable.locator(".monaco-editor").getByRole("textbox");
  const before = Number.parseInt(
    await editable.locator("output").innerText(),
    10,
  );
  await input.focus();
  await page.keyboard.type("Angular");
  await expect(editable.locator("output")).toHaveText(
    `${before + 7} characters`,
  );
  const readonly = page
    .locator("#angular-demo-read-only-source .monaco-editor")
    .getByRole("textbox");
  await expect(readonly).not.toBeEditable();
  expect(errors).toEqual([]);
});

test("Angular Button counter uses the shared horizontal gap and centered alignment", async ({
  page,
}) => {
  await page.goto("#/button?framework=angular");
  const demo = page.locator("#angular-demo-actions-and-feedback");
  const button = demo.getByRole("button", { name: "Click me" });
  await expect(button).toBeVisible();
  await button.click();
  await expect(demo.locator("output")).toHaveText("Clicked 1 times");
  const action = await button.boundingBox();
  const output = await demo.locator("output").boundingBox();
  expect(action).not.toBeNull();
  expect(output).not.toBeNull();
  expect(Math.abs(output!.x - action!.x - action!.width - 12)).toBeLessThan(1);
  expect(
    Math.abs(output!.y + output!.height / 2 - action!.y - action!.height / 2),
  ).toBeLessThan(2);
});

test("Angular composition examples support queueing, radio groups and custom table content", async ({
  page,
}) => {
  await page.goto("#/confirm?framework=angular");
  await page.getByRole("button", { name: "Queue two confirmations" }).click();
  await expect(
    page.getByRole("alertdialog", { name: "Delete draft?" }),
  ).toBeVisible();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Confirm", exact: true })
    .click();
  await expect(
    page.getByRole("alertdialog", { name: "Archive project?" }),
  ).toBeVisible();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  await page.goto("#/menu?framework=angular");
  await page.getByRole("button", { name: "Display density" }).click();
  await expect(page.getByRole("group", { name: "Density" })).toBeVisible();
  await page.getByRole("menuitemradio", { name: "Compact" }).click();
  await expect(
    page.locator("#angular-demo-named-groups-and-radio-choices output"),
  ).toHaveText("Density: compact");
  await page.goto("#/table?framework=angular");
  const table = page.getByRole("table", {
    name: "Project summary",
    exact: true,
  });
  await table.getByRole("button", { name: "Select", exact: true }).click();
  await expect(table.locator("tbody tr").first()).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    table.getByRole("cell", { name: "Custom content spans both columns." }),
  ).toHaveAttribute("colspan", "2");
});

test("Angular native forms validate, submit and reset with visible results", async ({
  page,
}) => {
  await page.goto("#/button?framework=angular");
  const buttonForm = page.locator("#angular-demo-native-form-buttons");
  await buttonForm.getByRole("textbox", { name: "Title" }).fill("Minerva");
  await buttonForm
    .getByRole("button", { name: "Preview", exact: true })
    .click();
  await expect(buttonForm.getByRole("status")).toHaveText(
    "Preview opened (form not submitted)",
  );
  await buttonForm.getByRole("button", { name: "Save", exact: true }).click();
  await expect(buttonForm.getByRole("status")).toHaveText("Submitted Minerva");
  await buttonForm.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(buttonForm.getByRole("textbox", { name: "Title" })).toHaveValue(
    "Draft",
  );
  await expect(buttonForm.getByRole("status")).toHaveText("Reset");
  await page.goto("#/input?framework=angular");
  const form = page.locator(
    "#angular-demo-native-validation-and-field-context",
  );
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.getByRole("status")).toHaveText("Not submitted");
  const email = form.getByRole("textbox", { name: /Email/ });
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Submitted ada@example.com",
  );
  await form.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(email).toHaveValue("");
  await expect(form.getByRole("status")).toHaveText("Reset");
  const fields = page.locator(
    "#angular-demo-clear-password-and-character-count",
  );
  await fields.getByRole("button", { name: "Clear search" }).click();
  await expect(fields.getByRole("status")).toHaveText("Search: (empty)");
  await fields.getByRole("button", { name: "Show password" }).click();
  await expect(fields.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await expect(fields.getByLabel("Password", { exact: true })).toHaveValue(
    "secret-pass",
  );
});

test("Angular controlled examples write back menu, provider and loading state", async ({
  page,
}) => {
  await page.goto("#/menu?framework=angular");
  const checked = page.locator("#angular-demo-context-menu-and-checked-items");
  await checked
    .getByRole("button", { name: "Right-click here" })
    .click({ button: "right" });
  await page
    .getByRole("menuitemcheckbox", { name: "Show hidden files" })
    .click();
  await expect(checked.getByRole("status")).toContainText("Hidden: false");
  const nested = page.locator(
    "#angular-demo-nested-actions-and-expanded-state",
  );
  await nested.getByRole("button", { name: "File actions" }).click();
  await page.getByRole("menuitem", { name: "Export", exact: true }).click();
  await page.getByRole("menuitem", { name: "CSV", exact: true }).click();
  await expect(nested.getByRole("status")).toContainText(
    "CSV · Expanded: export",
  );
  await page.goto("#/confirm?framework=angular");
  const confirm = page.locator("#angular-demo-controlled-loading-and-recovery");
  await confirm.getByRole("button", { name: "Preview processing" }).click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Confirm", exact: true })
    .click();
  await expect(
    page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Cancel", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Complete request" }).click();
  await expect(confirm.getByRole("status")).toHaveText("Request completed");
  await page.goto("#/config-provider?framework=angular");
  const scope = page.locator("#angular-demo-reactive-nested-configuration");
  await scope.getByRole("button", { name: "Toggle scoped theme" }).click();
  await expect(scope.getByRole("status")).toHaveText("Scope: dark / default");
  await expect(
    scope
      .getByRole("button", { name: "Nested light tech button" })
      .locator("xpath=ancestor::mn-config[1]"),
  ).toHaveAttribute("data-theme", "light");
  await scope.getByRole("button", { name: "Reset scope" }).click();
  await expect(scope.getByRole("status")).toHaveText("Scope: light / default");
});
