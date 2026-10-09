import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { describe, expect, it } from "vitest";
import { render, screen, settle } from "../../testing";
import { MnInput } from "../input";
import {
  MnFormControl,
  MnFormErrorMessage,
  MnFormField,
  MnFormHelperText,
  MnFormLabel,
} from "./form-control";

describe("MnFormControl", () => {
  it("is the root box with the hooks and no id", async () => {
    @Component({
      imports: [MnFormControl],
      template: `<mn-form-control
        id="f"
        invalid
        disabled
        readOnly
        required
        class="consumer"
        >x</mn-form-control
      >`,
    })
    class Host {}
    await render(Host);
    const root = document.querySelector("mn-form-control")!;
    expect(root).toHaveClass("root", "consumer");
    expect(root).not.toHaveAttribute("id");
    expect(root).toHaveAttribute("data-minerva", "form-control");
    expect(root).toHaveAttribute("data-part", "root");
    for (const state of ["disabled", "invalid", "readonly", "required"])
      expect(root).toHaveAttribute(`data-${state}`, "");
  });

  it("wires label, helper and error ids; the error replaces the helper while invalid", async () => {
    @Component({
      imports: [
        MnFormControl,
        MnFormLabel,
        MnFormHelperText,
        MnFormErrorMessage,
      ],
      template: `<mn-form-control id="email" [invalid]="invalid()">
        <mn-form-label>Email</mn-form-label>
        <mn-form-helper-text>help</mn-form-helper-text>
        <mn-form-error-message>bad</mn-form-error-message>
      </mn-form-control>`,
    })
    class Host {
      invalid = signal(false);
    }
    const fixture = await render(Host);
    const label = screen.getByText("Email");
    expect(label.localName).toBe("label");
    expect(label).toHaveAttribute("for", "email");
    expect(label).toHaveAttribute("id", "email-label");
    expect(label).toHaveClass("label");
    expect(screen.getByText("help")).toHaveAttribute("id", "email-helper");
    expect(screen.getByText("help")).toHaveClass("helper");
    expect(screen.queryByRole("alert")).toBeNull();
    fixture.componentInstance.invalid.set(true);
    await settle(fixture);
    expect(screen.queryByText("help")).toBeNull();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("bad");
    expect(alert).toHaveAttribute("id", "email-error");
    expect(alert).toHaveClass("error");
    expect(alert).toHaveAttribute("data-part", "error-message");
  });

  it("generates unique ids per field", async () => {
    @Component({
      imports: [MnFormControl, MnFormLabel, MnInput],
      template: `<mn-form-control
          ><mn-form-label>A</mn-form-label><mn-input
        /></mn-form-control>
        <mn-form-control
          ><mn-form-label>B</mn-form-label><mn-input
        /></mn-form-control>`,
    })
    class Host {}
    await render(Host);
    const a = screen.getByRole("textbox", { name: "A" });
    const b = screen.getByRole("textbox", { name: "B" });
    expect(a.id).toMatch(/field/);
    expect(a.id).not.toBe(b.id);
  });

  it("shows an aria-hidden required indicator only when required", async () => {
    @Component({
      imports: [MnFormControl, MnFormLabel],
      template: `<mn-form-control [required]="required()">
        <mn-form-label requiredIndicator="(required)">Name</mn-form-label>
      </mn-form-control>`,
    })
    class Host {
      required = signal(false);
    }
    const fixture = await render(Host);
    expect(document.querySelector(".required")).toBeNull();
    fixture.componentInstance.required.set(true);
    await settle(fixture);
    const indicator = screen.getByText("(required)");
    expect(indicator).toHaveClass("required");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect(indicator).toHaveAttribute("data-part", "required-indicator");
  });

  it("lets an explicit htmlFor win and works outside a field", async () => {
    @Component({
      imports: [
        MnFormControl,
        MnFormLabel,
        MnFormHelperText,
        MnFormErrorMessage,
      ],
      template: `<mn-form-control id="ctx"
          ><mn-form-label htmlFor="other">In</mn-form-label></mn-form-control
        >
        <mn-form-label class="c">Out</mn-form-label>
        <mn-form-helper-text>help</mn-form-helper-text>
        <mn-form-error-message>err</mn-form-error-message>`,
    })
    class Host {}
    await render(Host);
    expect(screen.getByText("In")).toHaveAttribute("for", "other");
    const out = screen.getByText("Out");
    expect(out).not.toHaveAttribute("for");
    expect(out).not.toHaveAttribute("id");
    expect(out).toHaveClass("label", "c");
    expect(screen.getByText("help")).not.toHaveAttribute("id");
    expect(screen.queryByText("err")).toBeNull();
  });

  it("follows the bound Angular form control when invalid is not set", async () => {
    @Component({
      imports: [
        MnFormControl,
        MnFormLabel,
        MnFormHelperText,
        MnFormErrorMessage,
        MnInput,
        ReactiveFormsModule,
      ],
      template: `<form [formGroup]="form">
        <mn-form-control id="email">
          <mn-form-label>Email</mn-form-label>
          <mn-input formControlName="email" />
          <mn-form-helper-text>help</mn-form-helper-text>
          <mn-form-error-message>Required</mn-form-error-message>
        </mn-form-control>
      </form>`,
    })
    class Host {
      form = new FormGroup({
        email: new FormControl("", Validators.required),
      });
    }
    const fixture = await render(Host);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).toHaveAccessibleDescription("help");
    fixture.componentInstance.form.controls.email.markAsTouched();
    await settle(fixture);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required");
    fixture.componentInstance.form.controls.email.setValue("a@b.c");
    await settle(fixture);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("MnFormField", () => {
  it("renders label, control and helper; the label targets the control", async () => {
    @Component({
      imports: [MnFormField, MnInput],
      template: `<mn-form-field label="Title" helperText="Public title" required
        ><mn-input
      /></mn-form-field>`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox", { name: /Title/ });
    expect(input).toHaveAccessibleDescription("Public title");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(document.querySelector("mn-form-field")).toHaveClass("root");
  });

  it("becomes invalid with errorMessage, hiding the helper text", async () => {
    @Component({
      imports: [MnFormField, MnInput],
      template: `<mn-form-field
        label="Title"
        helperText="Public title"
        errorMessage="Required"
        ><mn-input
      /></mn-form-field>`,
    })
    class Host {}
    await render(Host);
    const input = screen.getByRole("textbox", { name: "Title" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.queryByText("Public title")).toBeNull();
    expect(input).toHaveAccessibleDescription("Required");
  });

  it("allows invalid=false to suppress the error", async () => {
    @Component({
      imports: [MnFormField, MnInput],
      template: `<mn-form-field
        label="Title"
        errorMessage="Required"
        [invalid]="false"
        ><mn-input
      /></mn-form-field>`,
    })
    class Host {}
    await render(Host);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("with ngModel, shows the error message while the control is invalid", async () => {
    @Component({
      imports: [MnFormField, MnInput, FormsModule],
      template: `<form #f="ngForm">
        <mn-form-field label="Name" errorMessage="Required">
          <mn-input name="name" [(ngModel)]="name" required />
        </mn-form-field>
        <button type="submit">Save</button>
      </form>`,
    })
    class Host {
      name = "";
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.queryByRole("alert")).toBeNull();
    screen.getByRole("button", { name: "Save" }).click();
    await settle(fixture);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
