import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { describe, expect, it, vi } from "vitest";
import { render, screen, settle, user } from "../../testing";
import {
  MnFormControl,
  MnFormErrorMessage,
  MnFormHelperText,
} from "../form-control";
import { MnCheckbox } from "./checkbox";

const labelOf = (el: HTMLElement) => el.closest("label")!;

describe("MnCheckbox", () => {
  it("renders a labelled native checkbox with the classes and hooks", async () => {
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox label="Accept" />`,
    })
    class Host {}
    await render(Host);
    const box = screen.getByRole("checkbox", { name: "Accept" });
    expect(box).not.toBeChecked();
    expect(box).toHaveClass("input");
    expect(box).toHaveAttribute("data-part", "input");
    expect(labelOf(box)).toHaveClass("checkbox", "square");
    expect(screen.getByText("Accept")).toHaveClass("label");
    const root = document.querySelector("mn-checkbox")!;
    expect(root).toHaveClass("checkboxWrapper");
    expect(root).toHaveAttribute("data-minerva", "checkbox");
    expect(root).toHaveAttribute("data-state", "unchecked");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).toHaveAttribute("data-color", "primary");
    expect(root).toHaveAttribute("data-shape", "square");
    expect(root.querySelector('[data-part="control"]')).toHaveClass(
      "checkmark",
    );
  });

  it("uses the projected content as label, prefers label and hides an empty label", async () => {
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox>Agree</mn-checkbox>
        <mn-checkbox label="Label">Child</mn-checkbox>
        <mn-checkbox aria-label="Bare" />`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("checkbox", { name: "Agree" })).toBeTruthy();
    expect(screen.queryByText("Child")).toBeNull();
    const bare = screen.getByRole("checkbox", { name: "Bare" });
    expect(labelOf(bare).querySelector(".label")).toHaveAttribute("hidden");
    expect(
      labelOf(screen.getByRole("checkbox", { name: "Agree" })).querySelector(
        ".label",
      ),
    ).not.toHaveAttribute("hidden");
  });

  it("toggles uncontrolled, emits checkedChange and supports [(checked)]", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox
          label="A"
          [(checked)]="on"
          (checkedChange)="changed($event)"
        />
        <mn-checkbox label="B" defaultChecked />`,
    })
    class Host {
      on = signal(false);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
    await u.click(screen.getByText("A"));
    await fixture.whenStable();
    expect(fixture.componentInstance.on()).toBe(true);
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(true);
    expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(document.querySelector("mn-checkbox")).toHaveAttribute(
      "data-state",
      "checked",
    );
    fixture.componentInstance.on.set(false);
    await fixture.whenStable();
    expect(screen.getByRole("checkbox", { name: "A" })).not.toBeChecked();
  });

  it("toggles with Space; Enter does nothing; skipped by Tab when disabled", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox label="A" /><mn-checkbox
          label="B"
          disabled
        /><mn-checkbox label="C" />`,
    })
    class Host {}
    await render(Host);
    await u.tab();
    const a = screen.getByRole("checkbox", { name: "A" });
    expect(a).toHaveFocus();
    await u.keyboard(" ");
    expect(a).toBeChecked();
    await u.keyboard("{Enter}");
    expect(a).toBeChecked();
    await u.keyboard(" ");
    expect(a).not.toBeChecked();
    await u.tab();
    expect(screen.getByRole("checkbox", { name: "C" })).toHaveFocus();
  });

  it("does not toggle or emit when disabled", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox
        label="A"
        disabled
        (checkedChange)="changed()"
      />`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    expect(labelOf(box)).toHaveClass("disabled");
    await u.click(box);
    expect(box).not.toBeChecked();
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
  });

  it("exposes and keeps the indeterminate state as mixed; hides the icon meanwhile", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox
        label="All"
        icon="✓"
        [indeterminate]="mixed()"
        defaultChecked
      />`,
    })
    class Host {
      mixed = signal(true);
    }
    const fixture = await render(Host);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box).toHaveAttribute("aria-checked", "mixed");
    expect(box.indeterminate).toBe(true);
    expect(box).toBePartiallyChecked();
    expect(document.querySelector("mn-checkbox")).toHaveAttribute(
      "data-state",
      "indeterminate",
    );
    expect(screen.queryByText("✓")).toBeNull();
    // a click toggles, the indeterminate input stays applied
    await u.click(box);
    await fixture.whenStable();
    expect(box.indeterminate).toBe(true);
    fixture.componentInstance.mixed.set(false);
    await fixture.whenStable();
    expect(box.indeterminate).toBe(false);
    expect(box).not.toHaveAttribute("aria-checked");
    if (!box.checked) await u.click(box);
    await fixture.whenStable();
    expect(box).toBeChecked();
    expect(screen.getByText("✓")).toBeTruthy();
  });

  it("applies size, shape, color, labelPlacement and error classes", async () => {
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox
          label="A"
          size="large"
          shape="circle"
          color="danger"
          labelPlacement="start"
          error
        />
        <mn-checkbox label="B" color="primary" />`,
    })
    class Host {}
    await render(Host);
    const a = labelOf(screen.getByRole("checkbox", { name: "A" }));
    expect(a).toHaveClass(
      "large",
      "circle",
      "colorDanger",
      "labelStart",
      "error",
    );
    expect(a.className).not.toMatch(/undefined|\s{2}/);
    const b = labelOf(screen.getByRole("checkbox", { name: "B" }));
    expect(b.className).not.toMatch(/color|undefined/);
  });

  it("renders the helper text and the error icon / text in the error state", async () => {
    @Component({
      imports: [MnCheckbox],
      template: `<mn-checkbox label="A" helperText="Help" [error]="error()" />`,
    })
    class Host {
      error = signal(false);
    }
    const fixture = await render(Host);
    const box = screen.getByRole("checkbox");
    const helper = screen.getByText("Help");
    expect(helper).toHaveClass("helperText");
    expect(box).toHaveAccessibleDescription("Help");
    expect(document.querySelector(".errorIcon")).toBeNull();
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();
    expect(helper).toHaveClass("errorText");
    expect(document.querySelector(".errorIcon svg")).toBeTruthy();
    expect(box).toHaveAttribute("aria-invalid", "true");
  });

  it("passes id, name, value, required and aria-describedby to the input", async () => {
    @Component({
      imports: [MnCheckbox],
      template: `<span id="hint">Hint</span>
        <mn-checkbox
          id="agree"
          name="terms"
          value="yes"
          required
          aria-describedby="hint"
          >A</mn-checkbox
        >`,
    })
    class Host {}
    await render(Host);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("id", "agree");
    expect(box).toHaveAttribute("name", "terms");
    expect(box).toHaveAttribute("value", "yes");
    expect(box).toBeRequired();
    expect(box).toHaveAccessibleDescription("Hint");
    expect(document.querySelector("mn-checkbox")).not.toHaveAttribute("id");
  });

  describe("inside mn-form-control", () => {
    it("takes id, description, invalid, required and disabled; explicit disabled=false wins", async () => {
      @Component({
        imports: [
          MnCheckbox,
          MnFormControl,
          MnFormHelperText,
          MnFormErrorMessage,
        ],
        template: `<mn-form-control
            id="t"
            [invalid]="invalid()"
            required
            disabled
          >
            <mn-checkbox label="Terms" />
            <mn-form-helper-text>Help</mn-form-helper-text>
            <mn-form-error-message>Must accept</mn-form-error-message>
          </mn-form-control>
          <mn-form-control disabled
            ><mn-checkbox label="Free" [disabled]="false"
          /></mn-form-control>`,
      })
      class Host {
        invalid = signal(false);
      }
      const fixture = await render(Host);
      const box = screen.getByRole("checkbox", { name: "Terms" });
      expect(box.id).toBe("t");
      expect(box).toBeRequired();
      expect(box).toBeDisabled();
      expect(box).toHaveAccessibleDescription("Help");
      expect(screen.getByRole("checkbox", { name: "Free" })).toBeEnabled();
      fixture.componentInstance.invalid.set(true);
      await settle(fixture);
      expect(box).toHaveAttribute("aria-invalid", "true");
      expect(box).toHaveAccessibleDescription("Must accept");
      expect(labelOf(box)).toHaveClass("error");
    });

    it("does not toggle inside a read-only field", async () => {
      const u = user();
      @Component({
        imports: [MnCheckbox, MnFormControl],
        template: `<mn-form-control readOnly
          ><mn-checkbox label="A"
        /></mn-form-control>`,
      })
      class Host {}
      await render(Host);
      const box = screen.getByRole("checkbox");
      expect(box).toHaveAttribute("aria-readonly", "true");
      await u.click(box);
      expect(box).not.toBeChecked();
      box.focus();
      await u.keyboard(" ");
      expect(box).not.toBeChecked();
    });
  });

  it("works with ngModel", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox, FormsModule],
      template: `<mn-checkbox label="A" [(ngModel)]="value" />`,
    })
    class Host {
      value = true;
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("checkbox")).toBeChecked();
    await u.click(screen.getByRole("checkbox"));
    expect(fixture.componentInstance.value).toBe(false);
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnCheckbox, ReactiveFormsModule],
      template: `<mn-checkbox label="Terms" [formControl]="control" />`,
    })
    class Host {
      control = new FormControl(false, Validators.requiredTrue);
    }
    const fixture = await render(Host);
    const box = screen.getByRole("checkbox");
    expect(box).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.markAsTouched();
    await settle(fixture);
    expect(box).toHaveAttribute("aria-invalid", "true");
    await u.click(box);
    expect(fixture.componentInstance.control.value).toBe(true);
    await settle(fixture);
    expect(box).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.setValue(false);
    await settle(fixture);
    expect(box).not.toBeChecked();
    fixture.componentInstance.control.disable();
    await settle(fixture);
    expect(box).toBeDisabled();
  });
});
