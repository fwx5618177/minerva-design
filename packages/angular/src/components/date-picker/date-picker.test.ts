import { expect, it } from "vitest";
import * as components from "../../index";
it("exports a native Angular DatePicker", () => {
  expect(components).toHaveProperty("MnDatePicker");
});

import { Component, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { describe, vi } from "vitest";
import { render, screen, settle, user as setupUser } from "../../testing";
import { MnDatePicker } from ".";
import { MnFormControl, MnFormLabel, MnFormHelperText } from "../form-control";
const input = () => screen.getByRole<HTMLInputElement>("textbox");
@Component({
  imports: [MnDatePicker],
  template: `<mn-date-picker
      [value]="value()"
      [defaultValue]="initial()"
      [minDate]="min()"
      [maxDate]="max()"
      [readOnly]="readonly()"
      (change)="changed($event)"
      (openChange)="opened($event)"
    /><button>After</button>`,
})
class Host {
  value = signal<string | null | undefined>(undefined);
  initial = signal("2026-10-15");
  min = signal<string | undefined>(undefined);
  max = signal<string | undefined>(undefined);
  readonly = signal(false);
  changed = vi.fn();
  opened = vi.fn();
}
async function setup(init: (host: Host) => void = () => {}) {
  const fixture = TestBed.createComponent(Host);
  init(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}
describe("MnDatePicker", () => {
  it("uses defaultValue only for the initial uncontrolled date", async () => {
    const fixture = await setup();
    fixture.componentInstance.initial.set("2026-12-24");
    await settle(fixture);
    expect(input()).toHaveValue("2026-10-15");
  });
  it("selects only dates within the range and reports panel changes", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.min.set("2026-10-10");
      h.max.set("2026-10-20");
    });
    await user.click(input());
    await settle(fixture);
    expect(screen.getAllByRole("gridcell")).toHaveLength(42);
    const disabled = screen.getByRole("gridcell", { name: "2026-10-09" });
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    await user.click(disabled);
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    await user.click(screen.getByRole("gridcell", { name: "2026-10-18" }));
    await settle(fixture);
    expect(input()).toHaveValue("2026-10-18");
    expect(input()).toHaveFocus();
    expect(fixture.componentInstance.changed).toHaveBeenLastCalledWith(
      "2026-10-18",
    );
    expect(fixture.componentInstance.opened.mock.calls).toEqual([
      [true],
      [false],
    ]);
  });
  it("preserves a controlled empty value when the parent ignores changes", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.value.set(null));
    expect(input()).toHaveValue("");
    await user.click(input());
    await settle(fixture);
    await user.click(screen.getAllByRole("gridcell")[15]);
    await settle(fixture);
    expect(fixture.componentInstance.changed).toHaveBeenCalled();
    expect(input()).toHaveValue("");
  });
  it("normalizes typed dates and rejects impossible dates", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(""));
    await user.type(input(), "2026-2-3");
    await user.tab();
    await settle(fixture);
    expect(input()).toHaveValue("2026-02-03");
    await user.clear(input());
    await user.type(input(), "2026-02-30");
    await user.tab();
    await settle(fixture);
    expect(input()).toHaveValue("");
  });
  it("moves across month boundaries by keyboard and restores focus on Escape", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set("2026-01-31"));
    input().focus();
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(screen.getByRole("gridcell", { name: "2026-01-31" })).toHaveFocus();
    await user.keyboard("{PageDown}");
    await settle(fixture);
    expect(screen.getByRole("gridcell", { name: "2026-02-28" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await settle(fixture);
    expect(input()).toHaveValue("2026-02-28");
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(input()).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("inherits form labels, descriptions and read-only state", async () => {
    @Component({
      imports: [MnDatePicker, MnFormControl, MnFormLabel, MnFormHelperText],
      template: `<mn-form-control id="birthday" readOnly required
        ><mn-form-label>Birthday</mn-form-label
        ><mn-date-picker /><mn-form-helper-text
          >Help</mn-form-helper-text
        ></mn-form-control
      >`,
    })
    class Field {}
    const fixture = await render(Field);
    expect(input()).toHaveAccessibleName("Birthday");
    expect(input()).toHaveAccessibleDescription("Help");
    expect(input()).toHaveAttribute("readonly");
    expect(input()).toBeRequired();
    const user = setupUser();
    input().focus();
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("integrates with Reactive Forms and clears to an empty string", async () => {
    @Component({
      imports: [MnDatePicker, ReactiveFormsModule],
      template: `<mn-date-picker [formControl]="control" />`,
    })
    class Field {
      control = new FormControl<string | null>("2026-10-15");
    }
    const fixture = await render(Field);
    const user = setupUser();
    expect(input()).toHaveValue("2026-10-15");
    await user.click(screen.getByRole("button", { name: "Clear date" }));
    await settle(fixture);
    expect(fixture.componentInstance.control.value).toBe("");
    fixture.componentInstance.control.disable();
    await settle(fixture);
    expect(input()).toBeDisabled();
  });
});
