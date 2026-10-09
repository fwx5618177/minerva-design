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
  MnFormLabel,
} from "../form-control";
import { MnRadio } from "./radio";
import { MnRadioGroup, type RadioValue } from "./radio-group";

const checkedValues = () =>
  screen
    .queryAllByRole("radio")
    .filter((r) => (r as HTMLInputElement).checked)
    .map((r) => (r as HTMLInputElement).value);

describe("MnRadioGroup", () => {
  it("renders a labelled vertical radiogroup with the group name on every radio", async () => {
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group label="Fruit" name="fruit" defaultValue="b">
        <mn-radio value="a" label="Apple" />
        <mn-radio value="b">Banana</mn-radio>
      </mn-radio-group>`,
    })
    class Host {}
    await render(Host);
    const group = screen.getByRole("radiogroup", { name: "Fruit" });
    expect(group).toHaveClass("radioGroup", "vertical");
    expect(group).toHaveAttribute("data-part", "list");
    expect(group).toHaveAttribute("aria-required", "false");
    expect(group).toHaveAttribute("aria-invalid", "false");
    const root = document.querySelector("mn-radio-group")!;
    expect(root).toHaveClass("radioGroupWrapper");
    expect(root).toHaveAttribute("data-minerva", "radio-group");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByText("Fruit")).toHaveClass("groupLabel");
    for (const radio of screen.getAllByRole("radio"))
      expect(radio).toHaveAttribute("name", "fruit");
    expect(checkedValues()).toEqual(["b"]);
    expect(
      screen.getByRole("radio", { name: "Banana" }).closest("mn-radio"),
    ).toHaveAttribute("data-state", "checked");
  });

  it("a press selects exactly one radio and emits its value (preserving numbers)", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group
        aria-label="N"
        [(value)]="value"
        (valueChange)="changed($event)"
      >
        <mn-radio [value]="1" label="One" />
        <mn-radio [value]="2" label="Two" />
        <mn-radio [value]="3" label="Three" />
      </mn-radio-group>`,
    })
    class Host {
      value = signal<RadioValue | null | undefined>(1);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    expect(checkedValues()).toEqual(["1"]);
    await u.click(screen.getByRole("radio", { name: "Two" }));
    await fixture.whenStable();
    expect(checkedValues()).toEqual(["2"]);
    await u.click(screen.getByText("Three"));
    await fixture.whenStable();
    expect(checkedValues()).toEqual(["3"]);
    expect(fixture.componentInstance.changed.mock.calls).toEqual([[2], [3]]);
    expect(fixture.componentInstance.value()).toBe(3);
    fixture.componentInstance.value.set(1);
    await fixture.whenStable();
    expect(checkedValues()).toEqual(["1"]);
    fixture.componentInstance.value.set(null);
    await fixture.whenStable();
    expect(checkedValues()).toEqual([]);
  });

  it("generates a shared name; arrow keys move and select, skipping disabled radios and wrapping", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group aria-label="L" [(value)]="value">
        <mn-radio value="a" label="A" />
        <mn-radio value="b" label="B" disabled />
        <mn-radio value="c" label="C" />
      </mn-radio-group>`,
    })
    class Host {
      value = signal<RadioValue | null | undefined>("a");
    }
    const fixture = await render(Host);
    const [a, , c] = screen.getAllByRole("radio");
    const name = a.getAttribute("name");
    expect(name).toBeTruthy();
    expect(c).toHaveAttribute("name", name!);
    a.focus();
    await u.keyboard("{ArrowDown}");
    await fixture.whenStable();
    expect(c).toHaveFocus();
    expect(fixture.componentInstance.value()).toBe("c");
    await u.keyboard("{ArrowDown}");
    await fixture.whenStable();
    expect(a).toHaveFocus();
    expect(fixture.componentInstance.value()).toBe("a");
  });

  it("disables all radios when disabled; an individually disabled radio cannot be selected", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group aria-label="G" disabled>
          <mn-radio value="a" label="A" />
        </mn-radio-group>
        <mn-radio-group aria-label="H" (valueChange)="changed($event)">
          <mn-radio value="b" label="B" disabled />
        </mn-radio-group>`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const a = screen.getByRole("radio", { name: "A" });
    expect(a).toBeDisabled();
    expect(screen.getByRole("radiogroup", { name: "G" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await u.click(a);
    expect(a).not.toBeChecked();
    const b = screen.getByRole("radio", { name: "B" });
    expect(b.closest("label")).toHaveClass("disabled");
    await u.click(b);
    expect(b).not.toBeChecked();
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
  });

  it("tabs into the checked radio and out of the group in one stop", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<button>before</button>
        <mn-radio-group aria-label="G" defaultValue="b">
          <mn-radio value="a" label="A" />
          <mn-radio value="b" label="B" />
        </mn-radio-group>
        <button>after</button>`,
    })
    class Host {}
    await render(Host);
    screen.getByRole("button", { name: "before" }).focus();
    await u.tab();
    expect(screen.getByRole("radio", { name: "B" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
  });

  it("sets aria-required / aria-invalid; helper text describes the group with error styling", async () => {
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group
        aria-label="G"
        required
        [error]="error()"
        helperText="Pick one"
      >
        <mn-radio value="a" label="A" />
      </mn-radio-group>`,
    })
    class Host {
      error = signal(false);
    }
    const fixture = await render(Host);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAccessibleDescription("Pick one");
    expect(screen.getByText("Pick one")).toHaveAttribute(
      "data-part",
      "helper-text",
    );
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Pick one")).toHaveClass("helperText", "errorText");
    expect(document.querySelector("mn-radio-group")).toHaveClass("error");
  });

  it("applies the direction class and propagates size and color; radios keep their own otherwise", async () => {
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<mn-radio-group
          aria-label="G"
          direction="horizontal"
          size="large"
          color="warning"
        >
          <mn-radio value="a" label="A" size="small" color="success" />
        </mn-radio-group>
        <mn-radio-group aria-label="H">
          <mn-radio value="b" label="B" size="small" color="success" />
        </mn-radio-group>`,
    })
    class Host {}
    await render(Host);
    expect(screen.getByRole("radiogroup", { name: "G" })).toHaveClass(
      "horizontal",
    );
    const [a, b] = Array.from(document.querySelectorAll("mn-radio"));
    expect(a).toHaveClass("large", "warning");
    expect(a).toHaveAttribute("data-color", "warning");
    expect(b).toHaveClass("small", "success");
    expect(document.querySelector("mn-radio-group")).toHaveAttribute(
      "data-size",
      "large",
    );
  });

  it("forwards id / aria-* to the radiogroup, not the host", async () => {
    @Component({
      imports: [MnRadioGroup, MnRadio],
      template: `<span id="d">Desc</span
        ><mn-radio-group id="g" aria-label="Group" aria-describedby="d">
          <mn-radio value="a" label="A" />
        </mn-radio-group>`,
    })
    class Host {}
    await render(Host);
    const group = screen.getByRole("radiogroup", { name: "Group" });
    expect(group.id).toBe("g");
    expect(group).toHaveAccessibleDescription("Desc");
    const root = document.querySelector("mn-radio-group")!;
    expect(root).not.toHaveAttribute("id");
    expect(root).not.toHaveAttribute("aria-label");
  });

  it("inherits label, description, disabled, required and invalid from a FormControl", async () => {
    @Component({
      imports: [
        MnRadioGroup,
        MnRadio,
        MnFormControl,
        MnFormLabel,
        MnFormHelperText,
        MnFormErrorMessage,
      ],
      template: `<mn-form-control
        required
        [invalid]="invalid()"
        [disabled]="disabled()"
      >
        <mn-form-label>Plan</mn-form-label>
        <mn-radio-group><mn-radio value="a" label="A" /></mn-radio-group>
        <mn-form-helper-text>Choose a plan</mn-form-helper-text>
        <mn-form-error-message>Required</mn-form-error-message>
      </mn-form-control>`,
    })
    class Host {
      invalid = signal(false);
      disabled = signal(false);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const group = screen.getByRole("radiogroup", { name: /Plan/ });
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAccessibleDescription("Choose a plan");
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.disabled.set(true);
    await settle(fixture);
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAccessibleDescription("Required");
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("works with ngModel", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio, FormsModule],
      template: `<mn-radio-group aria-label="G" [(ngModel)]="value">
        <mn-radio value="a" label="A" /><mn-radio value="b" label="B" />
      </mn-radio-group>`,
    })
    class Host {
      value = "b";
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(checkedValues()).toEqual(["b"]);
    await u.click(screen.getByRole("radio", { name: "A" }));
    expect(fixture.componentInstance.value).toBe("a");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnRadioGroup, MnRadio, ReactiveFormsModule],
      template: `<mn-radio-group aria-label="G" [formControl]="control">
        <mn-radio value="a" label="A" /><mn-radio value="b" label="B" />
      </mn-radio-group>`,
    })
    class Host {
      control = new FormControl<string | null>(null, Validators.required);
    }
    const fixture = await render(Host);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-invalid", "false");
    const a = screen.getByRole("radio", { name: "A" });
    a.focus();
    a.blur();
    await settle(fixture);
    expect(fixture.componentInstance.control.touched).toBe(true);
    expect(group).toHaveAttribute("aria-invalid", "true");
    await u.click(screen.getByRole("radio", { name: "B" }));
    expect(fixture.componentInstance.control.value).toBe("b");
    await settle(fixture);
    expect(group).toHaveAttribute("aria-invalid", "false");
    fixture.componentInstance.control.setValue("a");
    await settle(fixture);
    expect(checkedValues()).toEqual(["a"]);
    fixture.componentInstance.control.disable();
    await settle(fixture);
    for (const radio of screen.getAllByRole("radio"))
      expect(radio).toBeDisabled();
  });
});
