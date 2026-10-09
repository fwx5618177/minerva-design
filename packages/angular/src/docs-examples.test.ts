import * as angular from "@angular/core";
import * as forms from "@angular/forms";
import ts from "typescript";
import { expect, it } from "vitest";
import * as minerva from "./index";
import {
  signalCode,
  formsCode,
} from "../../../apps/docs/src/docs/pages/angular/examples";
import { render, user, screen, settle, fireEvent } from "./testing";

// Execute the exact displayed docs sources through Angular's JIT compiler.
// Imports are restricted to the libraries used by these local examples.
function component(code: string, name: string): angular.Type<unknown> {
  const modules: Record<string, unknown> = {
    "@angular/core": angular,
    "@angular/forms": forms,
    "minerva-design/angular": minerva,
  };
  const { outputText } = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      experimentalDecorators: true,
    },
  });
  const exports: Record<string, angular.Type<unknown>> = {};
  new Function("require", "exports", outputText)((id: string) => {
    if (!(id in modules))
      throw new Error(`Unexpected documentation import: ${id}`);
    return modules[id];
  }, exports);
  return exports[name];
}

it("the documented signal form edits, uploads and saves", async () => {
  const fixture = await render(component(signalCode, "ProfileComponent"));
  const u = user();
  expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  await u.type(screen.getByRole("textbox", { name: "Name" }), "Ada");
  fireEvent.change(document.querySelector('input[type="file"]')!, {
    target: { files: [new File(["hello"], "hello.txt")] },
  });
  await settle(fixture);
  expect(screen.getByText("hello.txt")).toBeTruthy();
  await u.click(screen.getByRole("button", { name: "Save" }));
  await settle(fixture);
  expect(screen.getByText("Ada")).toHaveAttribute("role", "status");
});
it("the documented Reactive Forms flow validates email before submitting", async () => {
  const fixture = await render(component(formsCode, "SignupComponent"));
  const u = user();
  expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  await u.type(
    screen.getByRole("textbox", { name: "Email" }),
    "ada@example.com",
  );
  await settle(fixture);
  expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  await u.click(screen.getByRole("button", { name: "Save" }));
  await settle(fixture);
  expect(screen.getByRole("status").textContent).toBe("ada@example.com");
});
