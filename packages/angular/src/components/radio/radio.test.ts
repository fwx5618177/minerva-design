import { Component, signal } from "@angular/core";
import { describe, expect, it } from "vitest";
import { render, screen, settle, user } from "../../testing";
import { MnFormControl } from "../form-control";
import { MnRadio } from "./radio";

describe("MnRadio (standalone)", () => {
  it("renders a native radio labelled by its label, with the classes and hooks", async () => {
    @Component({
      imports: [MnRadio],
      template: `<mn-radio label="Card" value="card" name="pay" required />`,
    })
    class Host {}
    await render(Host);
    const radio = screen.getByRole("radio", { name: "Card" });
    expect(radio).not.toBeChecked();
    expect(radio).toHaveAttribute("value", "card");
    expect(radio).toHaveAttribute("name", "pay");
    expect(radio).toBeRequired();
    expect(radio).toHaveClass("input");
    expect(radio.closest("label")).toHaveClass("radio");
    const root = document.querySelector("mn-radio")!;
    expect(root).toHaveClass("radioWrapper", "medium", "primary");
    expect(root).toHaveAttribute("data-minerva", "radio");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).toHaveAttribute("data-color", "primary");
    // uncontrolled: the DOM holds the state
    expect(root).not.toHaveAttribute("data-state");
    expect(root).not.toHaveAttribute("name");
    expect(root.querySelector('[data-part="control"]')).toHaveClass(
      "radioMark",
    );
  });

  it("uses projected content as label and checks when clicking it; respects defaultChecked", async () => {
    const u = user();
    @Component({
      imports: [MnRadio],
      template: `<mn-radio [(checked)]="on">Pro</mn-radio
        ><mn-radio aria-label="B" defaultChecked />`,
    })
    class Host {
      on = signal<boolean | undefined>(undefined);
    }
    const fixture = await render(Host);
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    await u.click(screen.getByText("Pro"));
    await fixture.whenStable();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(fixture.componentInstance.on()).toBe(true);
    expect(document.querySelector("mn-radio")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("unchecks the bound state of a sibling with the same name", async () => {
    const u = user();
    @Component({
      imports: [MnRadio],
      template: `<mn-radio name="n" label="A" [(checked)]="a" /><mn-radio
          name="n"
          label="B"
          [(checked)]="b"
        />`,
    })
    class Host {
      a = signal<boolean | undefined>(true);
      b = signal<boolean | undefined>(false);
    }
    const fixture = await render(Host);
    await u.click(screen.getByRole("radio", { name: "B" }));
    await fixture.whenStable();
    expect(fixture.componentInstance.b()).toBe(true);
    expect(fixture.componentInstance.a()).toBe(false);
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
  });

  it("follows the checked input", async () => {
    @Component({
      imports: [MnRadio],
      template: `<mn-radio label="A" [checked]="on()" />`,
    })
    class Host {
      on = signal(false);
    }
    const fixture = await render(Host);
    const radio = screen.getByRole("radio");
    expect(radio).not.toBeChecked();
    fixture.componentInstance.on.set(true);
    await fixture.whenStable();
    expect(radio).toBeChecked();
    expect(document.querySelector("mn-radio")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("does not check when disabled", async () => {
    const u = user();
    @Component({
      imports: [MnRadio],
      template: `<mn-radio label="A" disabled />`,
    })
    class Host {}
    await render(Host);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
    expect(radio.closest("label")).toHaveClass("disabled");
    await u.click(radio);
    expect(radio).not.toBeChecked();
  });

  it("applies size and color; danger color is not the error state", async () => {
    @Component({
      imports: [MnRadio],
      template: `<mn-radio label="A" size="large" color="danger" />`,
    })
    class Host {}
    await render(Host);
    const root = document.querySelector("mn-radio")!;
    expect(root).toHaveClass("large", "danger");
    expect(root).not.toHaveClass("error");
    expect(root.className).not.toMatch(/undefined|\s{2}/);
  });

  it("links the helper text, then the error message with its icon", async () => {
    @Component({
      imports: [MnRadio],
      template: `<span id="extra">Extra</span>
        <mn-radio
          label="A"
          helperText="Help"
          errorMessage="Pick one"
          [error]="error()"
          aria-describedby="extra"
        />`,
    })
    class Host {
      error = signal(false);
    }
    const fixture = await render(Host);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAccessibleDescription("Help Extra");
    expect(screen.getByText("Help")).toHaveClass("helperText");
    expect(document.querySelector(".errorIcon")).toBeNull();
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();
    expect(radio).toHaveAccessibleDescription("Pick one Extra");
    expect(screen.getByText("Pick one")).toHaveClass("helperText", "errorText");
    expect(document.querySelector(".errorIcon svg")).toBeTruthy();
    expect(document.querySelector("mn-radio")).toHaveAttribute(
      "data-invalid",
      "",
    );
  });

  it("supports aria-label / aria-labelledby and id; omits aria-describedby without descriptions", async () => {
    @Component({
      imports: [MnRadio],
      template: `<span id="lbl">Labelled</span>
        <mn-radio aria-label="Named" id="r1" />
        <mn-radio aria-labelledby="lbl" />`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const named = screen.getByRole("radio", { name: "Named" });
    expect(named.id).toBe("r1");
    expect(named).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("radio", { name: "Labelled" })).toBeTruthy();
  });

  it("inherits disabled from a FormControl unless overridden", async () => {
    @Component({
      imports: [MnRadio, MnFormControl],
      template: `<mn-form-control disabled>
        <mn-radio label="A" />
        <mn-radio label="B" [disabled]="false" />
      </mn-form-control>`,
    })
    class Host {}
    await render(Host);
    expect(screen.getByRole("radio", { name: "A" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "B" })).toBeEnabled();
  });
});
