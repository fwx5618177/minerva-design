import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { describe, expect, it, vi } from "vitest";
import { render, screen, settle, user } from "../../testing";
import { MnConfig } from "../../config";
import { MnFormControl, MnFormHelperText, MnFormLabel } from "../form-control";
import { MnNumberInput } from "./number-input";

const field = (name = "Qty") =>
  screen.getByRole("spinbutton", { name }) as HTMLInputElement;
const rootOf = (el: HTMLElement) => el.parentElement!;

/** Two-way bound field with a change spy and extra inputs */
const controlled = (
  options: {
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    readOnly?: boolean;
    showStepper?: boolean;
    incrementLabel?: string;
    decrementLabel?: string;
    notANumberMessage?: string;
    belowMinMessage?: string;
    aboveMaxMessage?: string;
  } = {},
  initial: number | null = null,
) => {
  @Component({
    imports: [MnNumberInput],
    template: `<mn-number-input
      aria-label="Qty"
      [(value)]="value"
      (valueChange)="spy($event)"
      [step]="options.step ?? 1"
      [min]="options.min"
      [max]="options.max"
      [disabled]="options.disabled ?? false"
      [readOnly]="options.readOnly ?? false"
      [showStepper]="options.showStepper ?? false"
      [incrementLabel]="options.incrementLabel"
      [decrementLabel]="options.decrementLabel"
      [notANumberMessage]="options.notANumberMessage"
      [belowMinMessage]="options.belowMinMessage"
      [aboveMaxMessage]="options.aboveMaxMessage"
    />`,
  })
  class Host {
    options = options;
    value = signal<number | null>(initial);
    spy = vi.fn();
  }
  return Host;
};

describe("MnNumberInput", () => {
  it("renders a spinbutton inside the root box with the classes and hooks", async () => {
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input
        aria-label="Qty"
        [defaultValue]="5"
        [min]="0"
        [max]="10"
        id="qty"
        name="qty"
        placeholder="0"
      />`,
    })
    class Host {}
    await render(Host);
    const input = field();
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
    expect(input).toHaveAttribute("aria-valuenow", "5");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveAttribute("id", "qty");
    expect(input).toHaveAttribute("name", "qty");
    expect(input).toHaveAttribute("placeholder", "0");
    expect(input).toHaveAttribute("data-minerva", "number-input");
    expect(input).toHaveAttribute("data-part", "input");
    expect(input).toHaveClass("field");
    expect(input.value).toBe("5");
    const root = rootOf(input);
    expect(root.localName).toBe("mn-number-input");
    expect(root).toHaveClass("root", "medium");
    expect(root).toHaveAttribute("data-minerva", "number-input");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-size", "medium");
    // native attributes moved to the input
    for (const name of ["aria-label", "id", "name", "placeholder", "min"]) {
      expect(root).not.toHaveAttribute(name);
    }
  });

  it("omits aria-valuenow / min / max when empty and unbounded", async () => {
    await render(controlled());
    const input = field();
    expect(input).not.toHaveAttribute("aria-valuenow");
    expect(input).not.toHaveAttribute("aria-valuemin");
    expect(input).not.toHaveAttribute("aria-valuemax");
    expect(input.value).toBe("");
  });

  it("formats the value with the precision (inferred from step)", async () => {
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input aria-label="A" [value]="1.5" [step]="0.01" />
        <mn-number-input aria-label="B" [value]="2.25" [precision]="3" />
        <mn-number-input aria-label="C" [value]="2.5" [step]="0" />`,
    })
    class Host {}
    await render(Host);
    expect(field("A").value).toBe("1.50");
    expect(field("B").value).toBe("2.250");
    expect(field("C").value).toBe("3");
  });

  it("works uncontrolled with defaultValue", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input
        aria-label="Qty"
        [defaultValue]="2"
        (valueChange)="spy($event)"
      />`,
    })
    class Host {
      spy = vi.fn();
    }
    const fixture = await render(Host);
    await u.click(field());
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenLastCalledWith(3);
    expect(field().value).toBe("3");
    expect(field()).toHaveAttribute("aria-valuenow", "3");
  });

  it("does not emit while typing, only on blur commit", async () => {
    const u = user();
    const fixture = await render(controlled());
    await u.type(field(), "-1");
    expect(field().value).toBe("-1");
    expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
    await u.tab();
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenCalledWith(-1);
    expect(fixture.componentInstance.value()).toBe(-1);
    expect(field()).toHaveAttribute("aria-valuenow", "-1");
  });

  it("keeps an intermediate draft such as '1.' while typing", async () => {
    const u = user();
    const fixture = await render(controlled({ step: 0.1 }));
    await u.type(field(), "1.");
    await settle(fixture);
    expect(field().value).toBe("1.");
    expect(rootOf(field())).not.toHaveClass("invalid");
    await u.type(field(), "25");
    await u.tab();
    await settle(fixture);
    expect(field().value).toBe("1.3");
    expect(fixture.componentInstance.value()).toBe(1.3);
  });

  it("commits on Enter by blurring", async () => {
    const u = user();
    const fixture = await render(controlled());
    await u.type(field(), "42{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenCalledWith(42);
    expect(field()).not.toHaveFocus();
  });

  it("flags out-of-range drafts, then clamps and rounds on commit", async () => {
    const u = user();
    const fixture = await render(controlled({ min: 0, max: 10 }));
    await u.type(field(), "99");
    await settle(fixture);
    const root = rootOf(field());
    expect(root).toHaveClass("invalid", "shake");
    expect(root).toHaveAttribute("title", "Maximum 10");
    expect(root).toHaveAttribute("data-invalid", "");
    expect(field()).toHaveAttribute("aria-invalid", "true");
    await u.tab();
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenLastCalledWith(10);
    expect(field().value).toBe("10");
    expect(root).not.toHaveClass("invalid");
    expect(root).not.toHaveAttribute("title");

    await u.clear(field());
    await u.type(field(), "3.7");
    await u.tab();
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenLastCalledWith(4);

    await u.clear(field());
    await u.type(field(), "-2");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "Minimum 0");
  });

  it("flags non-numeric drafts and reverts them on blur without emitting", async () => {
    const u = user();
    const fixture = await render(controlled({}, 3));
    await u.clear(field());
    await u.type(field(), "1e3");
    await settle(fixture);
    expect(rootOf(field())).toHaveClass("invalid");
    expect(rootOf(field())).toHaveAttribute("title", "Enter a number");
    await u.tab();
    await settle(fixture);
    expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
    expect(field().value).toBe("3");
  });

  it("commits null when cleared (allowEmpty), else the clamped min or 0", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input aria-label="A" [(value)]="a" />
        <mn-number-input
          aria-label="B"
          [(value)]="b"
          [allowEmpty]="false"
          [min]="2"
        />
        <mn-number-input aria-label="C" [(value)]="c" [allowEmpty]="false" />`,
    })
    class Host {
      a = signal<number | null>(3);
      b = signal<number | null>(7);
      c = signal<number | null>(7);
    }
    const fixture = await render(Host);
    await u.clear(field("A"));
    await u.clear(field("B"));
    await u.clear(field("C"));
    await u.type(field("C"), "-");
    await u.tab();
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.a()).toBeNull();
    expect(field("A")).not.toHaveAttribute("aria-valuenow");
    expect(host.b()).toBe(2);
    expect(field("B").value).toBe("2");
    expect(host.c()).toBe(0);
  });

  it("steps with ArrowUp / ArrowDown within the bounds, without float drift", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input
          aria-label="A"
          [(value)]="a"
          [min]="0"
          [max]="2"
        />
        <mn-number-input aria-label="B" [(value)]="b" [step]="0.1" />
        <mn-number-input aria-label="C" [(value)]="c" [step]="5" />`,
    })
    class Host {
      a = signal<number | null>(1);
      b = signal<number | null>(0.1);
      c = signal<number | null>(null);
    }
    const fixture = await render(Host);
    const host = fixture.componentInstance;
    await u.click(field("A"));
    await u.keyboard("{ArrowUp}{ArrowUp}");
    await settle(fixture);
    expect(host.a()).toBe(2);
    expect(field("A")).toHaveAttribute("aria-valuenow", "2");
    await u.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    await settle(fixture);
    expect(host.a()).toBe(0);
    expect(field("A").value).toBe("0");

    await u.click(field("B"));
    await u.keyboard("{ArrowUp}{ArrowUp}");
    await settle(fixture);
    expect(host.b()).toBe(0.3);
    expect(field("B").value).toBe("0.3");

    await u.click(field("C"));
    await u.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(host.c()).toBe(-5);
  });

  it("steps by ten with PageUp / PageDown and jumps to the bounds with Home / End", async () => {
    const u = user();
    const fixture = await render(controlled({ min: -2, max: 30 }, 5));
    const host = fixture.componentInstance;
    await u.click(field());
    await u.keyboard("{PageUp}");
    await settle(fixture);
    expect(host.spy).toHaveBeenLastCalledWith(15);
    await u.keyboard("{PageUp}{PageUp}");
    await settle(fixture);
    expect(host.spy).toHaveBeenLastCalledWith(30);
    await u.keyboard("{PageDown}");
    await settle(fixture);
    expect(host.spy).toHaveBeenLastCalledWith(20);
    await u.keyboard("{Home}");
    await settle(fixture);
    expect(host.spy).toHaveBeenLastCalledWith(-2);
    expect(field().value).toBe("-2");
    await u.keyboard("{End}");
    await settle(fixture);
    expect(host.spy).toHaveBeenLastCalledWith(30);
    expect(field()).toHaveAttribute("aria-valuenow", "30");
  });

  it("uses the step for PageUp and leaves Home / End to the caret when unbounded", async () => {
    const u = user();
    const fixture = await render(controlled({ step: 0.5 }, 1));
    await u.click(field());
    await u.keyboard("{Home}{End}");
    await settle(fixture);
    expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
    await u.keyboard("{PageUp}");
    await settle(fixture);
    expect(fixture.componentInstance.spy).toHaveBeenLastCalledWith(6);
    expect(field().value).toBe("6.0");
  });

  it("renders the stepper buttons only with showStepper", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input aria-label="Plain" [defaultValue]="1" />
        <mn-number-input
          aria-label="Qty"
          [(value)]="value"
          showStepper
          [min]="1"
          [max]="2"
        />`,
    })
    class Host {
      value = signal<number | null>(1);
    }
    const fixture = await render(Host);
    expect(rootOf(field("Plain")).querySelector("button")).toBeNull();
    const root = rootOf(field());
    const up = root.querySelector<HTMLButtonElement>(".stepUp")!;
    const down = root.querySelector<HTMLButtonElement>(".stepDown")!;
    expect(up).toHaveClass("step");
    expect(up.parentElement).toHaveClass("stepper");
    expect(up.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(up.parentElement).toHaveAttribute("data-part", "stepper");
    expect(up).toHaveAttribute("data-part", "increment");
    expect(down).toHaveAttribute("data-part", "decrement");
    expect(up).toHaveAttribute("tabindex", "-1");
    expect(up).toHaveAttribute("aria-label", "Increase");
    expect(down).toHaveAttribute("aria-label", "Decrease");
    expect(down).toBeDisabled();
    await u.click(up);
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe(2);
    expect(up).toBeDisabled();
    expect(down).toBeEnabled();
    await u.click(down);
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe(1);
  });

  it("is a single tab stop (the stepper buttons are pointer-only)", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input aria-label="Qty" showStepper />
        <button type="button">after</button>`,
    })
    class Host {}
    await render(Host);
    await u.tab();
    expect(field()).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
  });

  it("syncs the text when the bound value changes from outside", async () => {
    const fixture = await render(controlled({}, 1));
    fixture.componentInstance.value.set(9);
    await settle(fixture);
    expect(field().value).toBe("9");
    fixture.componentInstance.value.set(null);
    await settle(fixture);
    expect(field().value).toBe("");
  });

  it("disabled blocks typing, keyboard stepping and the stepper", async () => {
    const u = user();
    const fixture = await render(
      controlled({ disabled: true, showStepper: true }, 1),
    );
    expect(field()).toBeDisabled();
    const root = rootOf(field());
    expect(root).toHaveClass("disabled");
    expect(root).toHaveAttribute("data-disabled", "");
    root.querySelectorAll("button").forEach((b) => expect(b).toBeDisabled());
    await u.type(field(), "5{ArrowUp}");
    await settle(fixture);
    expect(field().value).toBe("1");
    expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
  });

  it("read-only blocks typing and stepping", async () => {
    const u = user();
    const fixture = await render(
      controlled({ readOnly: true, min: 0, max: 10 }, 3),
    );
    expect(field()).toHaveAttribute("readonly");
    expect(rootOf(field())).toHaveAttribute("data-readonly", "");
    await u.click(field());
    await u.keyboard("{ArrowUp}{PageUp}{Home}{End}9");
    await u.tab();
    await settle(fixture);
    expect(field().value).toBe("3");
    expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
  });

  it("invalid and size mark the root", async () => {
    @Component({
      imports: [MnNumberInput],
      template: `<mn-number-input
        aria-label="Qty"
        [value]="1"
        invalid
        size="large"
        required
      />`,
    })
    class Host {}
    await render(Host);
    const root = rootOf(field());
    expect(root).toHaveClass("invalid", "large");
    expect(root).not.toHaveClass("shake");
    expect(root).not.toHaveAttribute("title");
    expect(root).toHaveAttribute("data-size", "large");
    expect(root).toHaveAttribute("data-required", "");
    expect(field()).toHaveAttribute("aria-invalid", "true");
    expect(field()).toBeRequired();
  });

  it("lets label props override the built-in strings", async () => {
    const u = user();
    const fixture = await render(
      controlled({
        showStepper: true,
        min: 0,
        max: 5,
        incrementLabel: "Plus",
        decrementLabel: "Minus",
        notANumberMessage: "NaN!",
        belowMinMessage: "Too small",
        aboveMaxMessage: "Too big",
      }),
    );
    const root = rootOf(field());
    expect(root.querySelector('[aria-label="Plus"]')).not.toBeNull();
    expect(root.querySelector('[aria-label="Minus"]')).not.toBeNull();
    await u.type(field(), "x");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "NaN!");
    await u.clear(field());
    await u.type(field(), "9");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "Too big");
    await u.clear(field());
    await u.type(field(), "-1");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "Too small");
  });

  it("uses the localized strings of <mn-config>", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput, MnConfig],
      template: `<mn-config locale="zh">
        <mn-number-input aria-label="Qty" showStepper [max]="10" />
      </mn-config>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const root = rootOf(field());
    expect(root.querySelector('[aria-label="增加"]')).not.toBeNull();
    await u.type(field(), "99");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "最大值 10");
    await u.clear(field());
    await u.type(field(), "abc");
    await settle(fixture);
    expect(root).toHaveAttribute("title", "请输入数字");
  });

  it("works with ngModel (committed values only)", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput, FormsModule],
      template: `<mn-number-input aria-label="Qty" [(ngModel)]="value" />`,
    })
    class Host {
      value = signal<number | null>(4);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(field().value).toBe("4");
    await u.clear(field());
    await u.type(field(), "12");
    expect(fixture.componentInstance.value()).toBe(4);
    await u.tab();
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe(12);
    fixture.componentInstance.value.set(7);
    await settle(fixture);
    expect(field().value).toBe("7");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput, ReactiveFormsModule],
      template: `<mn-number-input aria-label="Qty" [formControl]="control" />`,
    })
    class Host {
      control = new FormControl<number | null>(null, Validators.required);
    }
    const fixture = await render(Host);
    const control = fixture.componentInstance.control;
    expect(field()).not.toHaveAttribute("aria-invalid");
    await u.click(field());
    await u.tab();
    await settle(fixture);
    expect(control.touched).toBe(true);
    expect(field()).toHaveAttribute("aria-invalid", "true");
    expect(rootOf(field())).toHaveClass("invalid");
    await u.type(field(), "8");
    expect(control.value).toBeNull();
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    expect(control.value).toBe(9);
    expect(field()).not.toHaveAttribute("aria-invalid");
    control.setValue(3);
    await settle(fixture);
    expect(field().value).toBe("3");
    control.disable();
    await settle(fixture);
    expect(field()).toBeDisabled();
  });

  it("inherits the state of <mn-form-control>", async () => {
    @Component({
      imports: [MnNumberInput, MnFormControl, MnFormLabel, MnFormHelperText],
      template: `<mn-form-control id="count" invalid disabled required>
        <mn-form-label>Count</mn-form-label>
        <mn-number-input [value]="1" />
        <mn-form-helper-text>help</mn-form-helper-text>
      </mn-form-control>`,
    })
    class Host {}
    await render(Host);
    const input = field("Count");
    expect(input.id).toBe("count");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toBeDisabled();
    expect(rootOf(input)).toHaveClass("invalid", "disabled");
  });

  it("<mn-form-control readOnly> blocks stepping", async () => {
    const u = user();
    @Component({
      imports: [MnNumberInput, MnFormControl],
      template: `<mn-form-control readOnly>
        <mn-number-input aria-label="Qty" [(value)]="value" />
      </mn-form-control>`,
    })
    class Host {
      value = signal<number | null>(3);
    }
    const fixture = await render(Host);
    expect(field()).toHaveAttribute("readonly");
    await u.click(field());
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe(3);
  });
});
