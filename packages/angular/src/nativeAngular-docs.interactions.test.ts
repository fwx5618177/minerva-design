import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { expect, it } from "vitest";
import * as components from "./index";
import { angularExamples } from "../../../apps/docs/src/docs/angular/examples";
import { render, settle, screen, fireEvent, user } from "./testing";

async function example(page: string, id: string) {
  const source = angularExamples[page]!.find((item) => item.id === id)!;
  expect(source, `${page}:${id}`).toBeDefined();
  TestBed.configureTestingModule({
    providers: [components.provideEmbeddedMinerva()],
  });
  class Example {
    constructor() {
      Object.assign(this, structuredClone(source.state));
    }
  }
  Component({
    imports: source.imports.map(
      (name) => (components as Record<string, unknown>)[name],
    ) as never[],
    template: source.template,
  })(Example);
  return render(Example);
}

it("Button example preserves preview/submit/reset behavior and controlled form values", async () => {
  const fixture = await example("button", "native-form-buttons");
  await user().click(screen.getByRole("button", { name: "Preview" }));
  expect(screen.getByRole("status").textContent).toContain(
    "form not submitted",
  );
  await user().clear(screen.getByRole("textbox", { name: "Title" }));
  await user().type(screen.getByRole("textbox", { name: "Title" }), "Minerva");
  await user().click(screen.getByRole("button", { name: "Save" }));
  await settle(fixture);
  expect(screen.getByRole("status").textContent).toBe("Submitted Minerva");
  await user().click(screen.getByRole("button", { name: "Reset" }));
  expect(
    (screen.getByRole("textbox", { name: "Title" }) as HTMLInputElement).value,
  ).toBe("Draft");
  expect(screen.getByRole("status").textContent).toBe("Reset");
});
it("Button template icon example activates and resets its visible output", async () => {
  await example("button", "template-icons-links-and-width");
  expect(
    screen
      .getByRole("button", { name: "Add" })
      .querySelector('[data-part="start-icon"] svg'),
  ).not.toBeNull();
  await user().click(screen.getByRole("button", { name: "Add" }));
  await user().click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByRole("status").textContent).toBe("2 actions");
  expect(
    screen
      .getByRole("link", { name: "Button documentation" })
      .getAttribute("href"),
  ).toContain("framework=angular");
  await user().click(
    screen.getByRole("button", { name: "Reset full-width action" }),
  );
  expect(screen.getByRole("status").textContent).toBe("0 actions");
});
it("Input example clears, counts, reveals the password and resets", async () => {
  const fixture = await example("input", "clear-password-and-character-count");
  expect(
    fixture.nativeElement.querySelector('[data-part="count"]')?.textContent,
  ).toContain("7");
  await user().click(screen.getByRole("button", { name: "Clear search" }));
  expect(screen.getByRole("status").textContent).toBe("Search: (empty)");
  const password = screen.getByLabelText("Password") as HTMLInputElement;
  expect(password.type).toBe("password");
  await user().click(screen.getByRole("button", { name: "Show password" }));
  expect(password.type).toBe("text");
  expect(password.value).toBe("secret-pass");
  await user().click(screen.getByRole("button", { name: "Hide password" }));
  expect(password.type).toBe("password");
  await user().click(screen.getByRole("button", { name: "Reset inputs" }));
  expect(
    (screen.getByRole("textbox", { name: "Search" }) as HTMLInputElement).value,
  ).toBe("Minerva");
});
it("Input form example links its field context and resets after valid submission", async () => {
  const fixture = await example("input", "native-validation-and-field-context");
  const input = screen.getByRole("textbox", {
    name: /Email/,
  }) as HTMLInputElement;
  expect(input.required).toBe(true);
  expect(input.type).toBe("email");
  expect(input.getAttribute("aria-describedby")).toBeTruthy();
  await user().type(input, "ada@example.com");
  await user().click(screen.getByRole("button", { name: "Subscribe" }));
  await settle(fixture);
  expect(screen.getByRole("status").textContent).toBe(
    "Submitted ada@example.com",
  );
  await user().click(screen.getByRole("button", { name: "Reset" }));
  expect(input.value).toBe("");
});
it("Table appearance example recovers from loading and switches density", async () => {
  await example("table", "density-appearance-and-loading");
  expect(screen.getByRole("table").getAttribute("data-size")).toBe("small");
  await user().click(screen.getByRole("button", { name: "Toggle density" }));
  expect(screen.getByRole("table").getAttribute("data-size")).toBe("large");
  await user().click(screen.getByRole("button", { name: "Reload" }));
  expect(screen.queryByRole("cell", { name: "Minerva" })).toBeNull();
  await user().click(screen.getByRole("button", { name: "Finish loading" }));
  expect(screen.getByRole("cell", { name: "Minerva" })).toBeTruthy();
});
it("Menu checkbox example writes emitted state back to its item data", async () => {
  const fixture = await example("menu", "context-menu-and-checked-items");
  fireEvent.contextMenu(
    screen.getByRole("button", { name: "Right-click here" }),
  );
  await settle(fixture);
  await user().click(
    screen.getByRole("menuitemcheckbox", { name: "Show hidden files" }),
  );
  expect(screen.getByRole("status").textContent).toContain("Hidden: false");
  fireEvent.contextMenu(
    screen.getByRole("button", { name: "Right-click here" }),
  );
  await settle(fixture);
  expect(
    screen
      .getByRole("menuitemcheckbox", { name: "Show hidden files" })
      .getAttribute("aria-checked"),
  ).toBe("false");
});
it("Menu nested example executes a leaf and can reset expansion", async () => {
  const fixture = await example("menu", "nested-actions-and-expanded-state");
  await user().click(screen.getByRole("button", { name: "File actions" }));
  await settle(fixture);
  await user().click(screen.getByRole("menuitem", { name: "Export" }));
  await user().click(screen.getByRole("menuitem", { name: "CSV" }));
  expect(screen.getByRole("status").textContent).toContain(
    "CSV · Expanded: export",
  );
  await user().click(screen.getByRole("button", { name: "Reset menu" }));
  expect(screen.getByRole("status").textContent).toContain("Expanded: none");
});
it("Popover example controls visibility and disables its own trigger", async () => {
  const fixture = await example(
    "popover",
    "controlled-open-and-disabled-trigger",
  );
  await user().click(screen.getByRole("button", { name: "Disable trigger" }));
  expect(
    (
      screen.getByRole("button", {
        name: "Controlled details",
      }) as HTMLButtonElement
    ).disabled,
  ).toBe(true);
  await user().click(screen.getByRole("button", { name: "Open from parent" }));
  await settle(fixture);
  expect(
    screen.getByRole("dialog", { name: "Controlled details" }),
  ).toBeTruthy();
  await user().click(screen.getByRole("button", { name: "Close details" }));
  expect(screen.getByRole("status").textContent).toContain("Panel: closed");
});
it("Confirm loading example finishes its caller-owned operation and can reopen", async () => {
  const fixture = await example("confirm", "controlled-loading-and-recovery");
  await user().click(
    screen.getByRole("button", { name: "Preview processing" }),
  );
  await settle(fixture);
  await user().click(screen.getByRole("button", { name: "Confirm" }));
  expect(
    (screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement)
      .disabled,
  ).toBe(true);
  await user().click(screen.getByRole("button", { name: "Complete request" }));
  expect(screen.getByRole("status").textContent).toBe("Request completed");
  await user().click(
    screen.getByRole("button", { name: "Preview processing" }),
  );
  await settle(fixture);
  expect(
    (screen.getByRole("button", { name: "Confirm" }) as HTMLButtonElement)
      .disabled,
  ).toBe(false);
});
it("Nested configuration example updates its scope and retains the inner override", async () => {
  const fixture = await example(
    "config-provider",
    "reactive-nested-configuration",
  );
  await user().click(
    screen.getByRole("button", { name: "Toggle scoped theme" }),
  );
  await settle(fixture);
  const scopes = fixture.nativeElement.querySelectorAll(
    "mn-config",
  ) as NodeListOf<HTMLElement>;
  expect(scopes[0].getAttribute("data-theme")).toBe("dark");
  expect(scopes[1].getAttribute("data-theme")).toBe("light");
  await user().click(screen.getByRole("button", { name: "Reset scope" }));
  expect(screen.getByRole("status").textContent).toBe("Scope: light / default");
});
