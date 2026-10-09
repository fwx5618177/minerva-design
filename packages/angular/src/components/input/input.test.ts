import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { describe, expect, it, vi } from "vitest";
import { render, screen, settle, user } from "../../testing";
import { MnFormControl, MnFormHelperText, MnFormLabel } from "../form-control";
import { MnInput } from "./input";

describe("MnInput", () => {
  it("renders a textbox inside a root box with the default classes and hooks", async () => {
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="Name" placeholder="Your name" />`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveClass("field");
    expect(input).toHaveAttribute("placeholder", "Your name");
    expect(input).toHaveAttribute("data-part", "input");
    const root = input.parentElement!;
    expect(root.localName).toBe("mn-input");
    expect(root).toHaveClass("root", "outline", "medium");
    expect(root).toHaveAttribute("data-minerva", "input");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-component", "input");
    // native attributes moved to the input
    expect(root).not.toHaveAttribute("aria-label");
    expect(root).not.toHaveAttribute("placeholder");
  });

  it("puts variant and size classes on the root", async () => {
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="A" variant="filled" size="large" />`,
    })
    class Host {}
    await render(Host);
    const root = screen.getByRole("textbox").parentElement!;
    expect(root).toHaveClass("filled", "large");
    expect(root).not.toHaveClass("outline");
  });

  it("works uncontrolled with defaultValue and supports [(value)]", async () => {
    const u = user();
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="A" defaultValue="Ada" />
        <mn-input
          aria-label="B"
          [(value)]="text"
          (valueChange)="changed($event)"
        />`,
    })
    class Host {
      text = signal("x");
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const a = screen.getByRole("textbox", { name: "A" }) as HTMLInputElement;
    expect(a.value).toBe("Ada");
    await u.type(a, "!");
    expect(a.value).toBe("Ada!");
    const b = screen.getByRole("textbox", { name: "B" }) as HTMLInputElement;
    expect(b.value).toBe("x");
    await u.type(b, "yz");
    expect(fixture.componentInstance.text()).toBe("xyz");
    expect(fixture.componentInstance.changed).toHaveBeenLastCalledWith("xyz");
    fixture.componentInstance.text.set("reset");
    await fixture.whenStable();
    expect(b.value).toBe("reset");
  });

  it("renders prefix and suffix addons (strings and templates)", async () => {
    @Component({
      imports: [MnInput],
      template: `<ng-template #icon><b>icon</b></ng-template>
        <mn-input aria-label="A" prefix="@" [suffix]="icon" />
        <mn-input aria-label="B" prefix="" />`,
    })
    class Host {}
    await render(Host);
    const prefix = screen.getByText("@");
    expect(prefix).toHaveClass("addon", "start");
    expect(prefix).toHaveAttribute("data-part", "prefix");
    const suffix = screen.getByText("icon").parentElement!;
    expect(suffix).toHaveClass("addon", "end");
    expect(suffix).toHaveAttribute("data-part", "suffix");
    const b = screen.getByRole("textbox", { name: "B" }).parentElement!;
    expect(b.querySelector('[data-part="prefix"]')).toBeNull();
  });

  it("invalid marks the root and announces it", async () => {
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="A" invalid />`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.parentElement).toHaveClass("invalid");
    expect(input.parentElement).toHaveAttribute("data-invalid", "");
  });

  it("disabled prevents typing; readOnly prevents edits", async () => {
    const u = user();
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="D" disabled />
        <mn-input aria-label="R" readOnly defaultValue="keep" />`,
    })
    class Host {}
    await render(Host);
    const d = screen.getByRole("textbox", { name: "D" });
    expect(d).toBeDisabled();
    expect(d.parentElement).toHaveClass("disabled");
    await u.type(d, "x");
    expect(d).toHaveValue("");
    const r = screen.getByRole("textbox", { name: "R" });
    expect(r).toHaveAttribute("readonly");
    await u.type(r, "x");
    expect(r).toHaveValue("keep");
  });

  it("passes native attributes to the input", async () => {
    @Component({
      imports: [MnInput],
      template: `<mn-input
        aria-label="A"
        name="email"
        type="email"
        autocomplete="email"
        [maxLength]="20"
        [minLength]="2"
        required
      />`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("maxlength", "20");
    expect(input).toHaveAttribute("minlength", "2");
    expect(input).toBeRequired();
    expect(input.parentElement).toHaveAttribute("data-required", "");
  });

  it("is reachable with Tab and skipped when disabled", async () => {
    const u = user();
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="A" /><mn-input
          aria-label="B"
          disabled
        /><mn-input aria-label="C" />`,
    })
    class Host {}
    await render(Host);
    await u.tab();
    expect(screen.getByRole("textbox", { name: "A" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("textbox", { name: "C" })).toHaveFocus();
  });

  describe("inside mn-form-control", () => {
    it("is labelled, described and inherits the field state", async () => {
      @Component({
        imports: [MnInput, MnFormControl, MnFormLabel, MnFormHelperText],
        template: `<mn-form-control
          id="email"
          required
          [invalid]="invalid()"
          disabled
          readOnly
        >
          <mn-form-label>Email</mn-form-label>
          <mn-input aria-describedby="extra" />
          <mn-form-helper-text>Help</mn-form-helper-text>
        </mn-form-control>`,
      })
      class Host {
        invalid = signal(false);
      }
      const fixture = await render(Host);
      const input = screen.getByRole("textbox", { name: /Email/ });
      expect(input.id).toBe("email");
      expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
        "email-helper",
        "extra",
      ]);
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toHaveAttribute("aria-readonly", "true");
      expect(input).toHaveAttribute("readonly");
      expect(input).toBeDisabled();
      expect(input).not.toHaveAttribute("aria-invalid");
      fixture.componentInstance.invalid.set(true);
      await settle(fixture);
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input.parentElement).toHaveClass("invalid");
    });
  });

  describe("clearable", () => {
    it("shows a labelled clear button while there is a value, clears and keeps focus", async () => {
      const u = user();
      @Component({
        imports: [MnInput],
        template: `<mn-input
          aria-label="A"
          clearable
          [(value)]="text"
          (clear)="cleared()"
        />`,
      })
      class Host {
        text = signal("abc");
        cleared = vi.fn();
      }
      const fixture = await render(Host);
      const button = screen.getByRole("button", { name: "Clear" });
      expect(button).toHaveAttribute("data-part", "clear-button");
      await u.click(button);
      await fixture.whenStable();
      expect(fixture.componentInstance.text()).toBe("");
      expect(fixture.componentInstance.cleared).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("textbox")).toHaveValue("");
      expect(screen.getByRole("textbox")).toHaveFocus();
      expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
    });

    it("uses clearLabel and hides the button when disabled", async () => {
      @Component({
        imports: [MnInput],
        template: `<mn-input
            aria-label="A"
            clearable
            clearLabel="Erase"
            defaultValue="x"
          />
          <mn-input aria-label="B" clearable disabled defaultValue="x" />`,
      })
      class Host {}
      await render(Host);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button", { name: "Erase" })).toBeTruthy();
    });
  });

  it("toggles the password visibility", async () => {
    const u = user();
    @Component({
      imports: [MnInput],
      template: `<mn-input aria-label="Password" type="password" />`,
    })
    class Host {}
    const fixture = await render(Host);
    const input = document.querySelector("input")!;
    expect(input).toHaveAttribute("type", "password");
    await u.click(screen.getByRole("button", { name: "Show password" }));
    await fixture.whenStable();
    expect(input).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Hide password" }),
    ).toHaveAttribute("data-part", "password-toggle");
  });

  it("counts the characters and links the count to the input", async () => {
    const u = user();
    @Component({
      imports: [MnInput],
      template: `<mn-input
        aria-label="A"
        showCharCount
        [maxLength]="10"
        aria-describedby="hint"
      />`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox");
    await u.type(input, "abc");
    const count = document.querySelector('[data-part="count"]')!;
    expect(count).toHaveTextContent("3 / 10");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
      "hint",
      count.id,
    ]);
  });

  it("works with ngModel", async () => {
    const u = user();
    @Component({
      imports: [MnInput, FormsModule],
      template: `<mn-input aria-label="A" [(ngModel)]="text" />`,
    })
    class Host {
      text = "hello";
    }
    const fixture = await render(Host);
    await settle(fixture);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("hello");
    await u.type(input, "!");
    expect(fixture.componentInstance.text).toBe("hello!");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnInput, ReactiveFormsModule],
      template: `<mn-input aria-label="A" [formControl]="control" />`,
    })
    class Host {
      control = new FormControl("", Validators.required);
    }
    const fixture = await render(Host);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    input.focus();
    input.blur();
    await settle(fixture);
    expect(input).toHaveAttribute("aria-invalid", "true");
    await u.type(input, "ok");
    expect(fixture.componentInstance.control.value).toBe("ok");
    await settle(fixture);
    expect(input).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.setValue("set");
    await settle(fixture);
    expect(input).toHaveValue("set");
    fixture.componentInstance.control.disable();
    await settle(fixture);
    expect(input).toBeDisabled();
  });
});
