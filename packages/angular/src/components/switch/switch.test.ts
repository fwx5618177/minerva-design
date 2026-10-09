import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { render, screen } from "../../testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MnSwitch } from "./switch";

describe("MnSwitch", () => {
  it("renders a labelled role=switch checkbox with the shared hooks", async () => {
    @Component({
      imports: [MnSwitch],
      template: `<mn-switch label="Wi-Fi" size="small" color="success" />`,
    })
    class Host {}
    await render(Host);
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).not.toBeChecked();
    const root = control.closest('[data-part="root"]')!;
    expect(root.localName).toBe("label");
    expect(root).toHaveAttribute("data-state", "unchecked");
    expect(root).toHaveAttribute("data-size", "small");
    expect(root).toHaveClass("switch", "small", "success", "labelEnd");
  });

  it("toggles uncontrolled, emits checkedChange and supports [(checked)]", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnSwitch],
      template: `<mn-switch
        label="A"
        [(checked)]="on"
        (checkedChange)="changed($event)"
      />`,
    })
    class Host {
      on = signal(false);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await user.click(screen.getByRole("switch"));
    await fixture.whenStable();
    expect(fixture.componentInstance.on()).toBe(true);
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(true);
    expect(screen.getByRole("switch")).toBeChecked();
    fixture.componentInstance.on.set(false);
    await fixture.whenStable();
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles with Enter and ignores presses while disabled or loading", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnSwitch],
      template: `<mn-switch
        label="A"
        [disabled]="disabled()"
        [loading]="loading()"
      />`,
    })
    class Host {
      disabled = signal(false);
      loading = signal(false);
    }
    const fixture = await render(Host);
    const control = screen.getByRole("switch");
    control.focus();
    await user.keyboard("{Enter}");
    expect(control).toBeChecked();
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();
    await user.click(control);
    expect(control).toBeChecked();
    expect(control).toHaveAttribute("aria-busy", "true");
  });

  it("works with ngModel", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnSwitch, FormsModule],
      template: `<mn-switch label="A" [(ngModel)]="value" />`,
    })
    class Host {
      value = true;
    }
    const fixture = await render(Host);
    await fixture.whenStable();
    expect(screen.getByRole("switch")).toBeChecked();
    await user.click(screen.getByRole("switch"));
    expect(fixture.componentInstance.value).toBe(false);
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnSwitch, ReactiveFormsModule],
      template: `<mn-switch label="Terms" [formControl]="control" />`,
    })
    class Host {
      control = new FormControl(false, Validators.requiredTrue);
    }
    const fixture = await render(Host);
    const control = screen.getByRole("switch");
    expect(control).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.markAsTouched();
    await fixture.whenStable();
    expect(control).toHaveAttribute("aria-invalid", "true");
    await user.click(control);
    expect(fixture.componentInstance.control.value).toBe(true);
    await fixture.whenStable();
    expect(control).not.toHaveAttribute("aria-invalid");
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(control).toBeDisabled();
  });

  it("side labels and segments set the state", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnSwitch],
      template: ` <mn-switch aria-label="Mode" offLabel="Off" onLabel="On" />
        <mn-switch
          aria-label="Source"
          variant="segmented"
          offLabel="A"
          onLabel="B"
        />`,
    })
    class Host {}
    await render(Host);
    await user.click(screen.getByRole("button", { name: "On" }));
    expect(screen.getByRole("switch", { name: "Mode" })).toBeChecked();
    const group = screen.getByRole("group", { name: "Source" });
    expect(group).toHaveAttribute("data-variant", "segmented");
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
