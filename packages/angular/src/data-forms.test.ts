import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { expect, it } from "vitest";
import {
  MnJsonField,
  MnKeyValueEditor,
  MnFormControl,
  MnFormLabel,
  MnFormHelperText,
} from "./index";
import { render, settle, user, screen } from "./testing";
@Component({
  imports: [
    ReactiveFormsModule,
    MnJsonField,
    MnKeyValueEditor,
    MnFormControl,
    MnFormLabel,
    MnFormHelperText,
  ],
  template: `
    <mn-form-control
      ><mn-form-label>Configuration</mn-form-label
      ><mn-json-field [formControl]="json" /><mn-form-helper-text
        >Project settings</mn-form-helper-text
      ></mn-form-control
    >
    <mn-key-value-editor [formControl]="entries" />
  `,
})
class Host {
  json = new FormControl('{"enabled":true}', { nonNullable: true });
  entries = new FormControl([{ key: "MODE", value: "production" }], {
    nonNullable: true,
  });
}
it("JSON participates in reactive forms, label wiring, touched and disabled state", async () => {
  const u = user();
  const f = await render(Host);
  const field = screen.getByLabelText("Configuration") as HTMLTextAreaElement;
  expect(field.value).toBe('{"enabled":true}');
  await u.clear(field);
  await u.type(field, "null");
  await u.tab();
  expect(f.componentInstance.json.value).toBe("null");
  expect(f.componentInstance.json.touched).toBe(true);
  expect(field.getAttribute("aria-describedby")).toContain(
    screen.getByText("Project settings").id,
  );
  f.componentInstance.json.setValue('{"reset":true}');
  await settle(f);
  expect(field.value).toBe('{"reset":true}');
  f.componentInstance.json.disable();
  await settle(f);
  expect(field.disabled).toBe(true);
  expect(
    (screen.getByRole("button", { name: "Format JSON" }) as HTMLButtonElement)
      .disabled,
  ).toBe(true);
});
it("key-value rows report immutable edits, additions, removals and form disabling", async () => {
  const u = user();
  const f = await render(Host);
  const value = screen.getByRole("textbox", { name: "Value 1" });
  await u.clear(value);
  await u.type(value, "development");
  await u.tab();
  expect(f.componentInstance.entries.value).toEqual([
    { key: "MODE", value: "development" },
  ]);
  expect(f.componentInstance.entries.touched).toBe(true);
  await u.click(screen.getByRole("button", { name: "Add row" }));
  expect(f.componentInstance.entries.value).toHaveLength(2);
  await u.click(screen.getByRole("button", { name: "Remove row 1" }));
  expect(f.componentInstance.entries.value).toEqual([{ key: "", value: "" }]);
  f.componentInstance.entries.disable();
  await settle(f);
  expect(
    (screen.getByRole("textbox", { name: "Key 1" }) as HTMLInputElement)
      .disabled,
  ).toBe(true);
  f.componentInstance.entries.reset();
  await settle(f);
  expect(
    (screen.getByRole("textbox", { name: "Key 1" }) as HTMLInputElement).value,
  ).toBe("MODE");
});
