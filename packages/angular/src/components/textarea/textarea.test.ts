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
  MnFormField,
  MnFormHelperText,
  MnFormLabel,
} from "../form-control";
import { MnTextarea } from "./textarea";

describe("MnTextarea", () => {
  it("renders a multiline textbox with the default classes, hooks and no manual resize", async () => {
    @Component({
      imports: [MnTextarea],
      template: `<textarea
        mnTextarea
        aria-label="Bio"
        rows="4"
        placeholder="About you"
      ></textarea>`,
    })
    class Host {}
    await render(Host);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea.localName).toBe("textarea");
    expect(textarea).toHaveClass("textarea", "outline", "medium");
    expect(textarea).toHaveStyle({ resize: "none" });
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAttribute("placeholder", "About you");
    expect(textarea).toHaveAttribute("data-minerva", "textarea");
    expect(textarea).toHaveAttribute("data-part", "root");
    expect(textarea).toHaveAttribute("data-size", "medium");
    expect(textarea).toHaveAttribute("data-variant", "outline");
  });

  it("applies variant, size and extra classes", async () => {
    @Component({
      imports: [MnTextarea],
      template: `<textarea
        mnTextarea
        aria-label="Bio"
        variant="filled"
        size="large"
        class="mine"
      ></textarea>`,
    })
    class Host {}
    await render(Host);
    expect(screen.getByRole("textbox")).toHaveClass("filled", "large", "mine");
  });

  it("supports multiline typing, defaultValue and [(value)]", async () => {
    const u = user();
    @Component({
      imports: [MnTextarea],
      template: `<textarea
          mnTextarea
          aria-label="A"
          defaultValue="Hi"
        ></textarea>
        <textarea
          mnTextarea
          aria-label="B"
          [(value)]="text"
          (valueChange)="changed($event)"
        ></textarea>`,
    })
    class Host {
      text = signal("x");
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const a = screen.getByRole("textbox", { name: "A" });
    expect(a).toHaveValue("Hi");
    await u.type(a, "{Enter}there");
    expect(a).toHaveValue("Hi\nthere");
    const b = screen.getByRole("textbox", { name: "B" });
    await u.type(b, "y");
    expect(fixture.componentInstance.text()).toBe("xy");
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith("xy");
    fixture.componentInstance.text.set("new");
    await fixture.whenStable();
    expect(b).toHaveValue("new");
  });

  it("invalid adds the error class and aria-invalid; disabled prevents typing", async () => {
    const u = user();
    @Component({
      imports: [MnTextarea],
      template: `<textarea mnTextarea aria-label="I" invalid></textarea>
        <textarea mnTextarea aria-label="D" disabled></textarea>`,
    })
    class Host {}
    await render(Host);
    const invalid = screen.getByRole("textbox", { name: "I" });
    expect(invalid).toHaveClass("invalid");
    expect(invalid).toHaveAttribute("aria-invalid", "true");
    const disabled = screen.getByRole("textbox", { name: "D" });
    expect(disabled).toBeDisabled();
    expect(disabled).toHaveAttribute("data-disabled", "");
    await u.type(disabled, "x");
    expect(disabled).toHaveValue("");
  });

  it("is reachable with Tab, keeps Enter as a newline and is skipped when disabled", async () => {
    const u = user();
    @Component({
      imports: [MnTextarea],
      template: `<textarea mnTextarea aria-label="A"></textarea>
        <textarea mnTextarea aria-label="B" disabled></textarea>
        <textarea mnTextarea aria-label="C"></textarea>`,
    })
    class Host {}
    await render(Host);
    await u.tab();
    const a = screen.getByRole("textbox", { name: "A" });
    expect(a).toHaveFocus();
    await u.keyboard("a{Enter}b");
    expect(a).toHaveValue("a\nb");
    await u.tab();
    expect(screen.getByRole("textbox", { name: "C" })).toHaveFocus();
  });

  it("integrates with mn-form-control label, helper, invalid and disabled state", async () => {
    @Component({
      imports: [MnTextarea, MnFormControl, MnFormLabel, MnFormHelperText],
      template: `<mn-form-control
        id="bio"
        [invalid]="invalid()"
        disabled
        required
      >
        <mn-form-label>Bio</mn-form-label>
        <textarea mnTextarea></textarea>
        <mn-form-helper-text>Short</mn-form-helper-text>
      </mn-form-control>`,
    })
    class Host {
      invalid = signal(false);
    }
    const fixture = await render(Host);
    const textarea = screen.getByRole("textbox", { name: /Bio/ });
    expect(textarea.id).toBe("bio");
    expect(textarea).toHaveAccessibleDescription("Short");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("aria-required", "true");
    fixture.componentInstance.invalid.set(true);
    await settle(fixture);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass("invalid");
  });

  it("FormField errorMessage makes it invalid", async () => {
    @Component({
      imports: [MnTextarea, MnFormField],
      template: `<mn-form-field label="Bio" errorMessage="Too short">
        <textarea mnTextarea></textarea>
      </mn-form-field>`,
    })
    class Host {}
    await render(Host);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Too short");
  });

  it("works with ngModel", async () => {
    const u = user();
    @Component({
      imports: [MnTextarea, FormsModule],
      template: `<textarea
        mnTextarea
        aria-label="A"
        [(ngModel)]="text"
      ></textarea>`,
    })
    class Host {
      text = "hello";
    }
    const fixture = await render(Host);
    await settle(fixture);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("hello");
    await u.type(textarea, "!");
    expect(fixture.componentInstance.text).toBe("hello!");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnTextarea, ReactiveFormsModule],
      template: `<textarea
        mnTextarea
        aria-label="A"
        [formControl]="control"
      ></textarea>`,
    })
    class Host {
      control = new FormControl("", Validators.required);
    }
    const fixture = await render(Host);
    const textarea = screen.getByRole("textbox");
    textarea.focus();
    textarea.blur();
    await settle(fixture);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    await u.type(textarea, "ok");
    expect(fixture.componentInstance.control.value).toBe("ok");
    await settle(fixture);
    expect(textarea).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.setValue("set");
    await settle(fixture);
    expect(textarea).toHaveValue("set");
    fixture.componentInstance.control.disable();
    await settle(fixture);
    expect(textarea).toBeDisabled();
  });
});
