import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  MnFormControl,
  MnFormErrorMessage,
  MnFormHelperText,
  MnFormLabel,
} from "../form-control";
import {
  render,
  screen,
  settle,
  user as setupUser,
  within,
} from "../../testing";
import { MnModal } from "../modal";
import { MnTimePicker } from "./time-picker";

const at = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);

const getInput = () => screen.getByRole<HTMLInputElement>("textbox");
const getColumns = () =>
  Array.from(
    screen.getByRole("dialog").querySelectorAll<HTMLElement>(".timeColumn"),
  );
const column = (name: string) => screen.getByRole("listbox", { name });
const lastDate = (fn: ReturnType<typeof vi.fn>) =>
  fn.mock.lastCall?.[0] as Date | null | undefined;

afterEach(() => {
  document.body.innerHTML = "";
});

@Component({
  imports: [MnTimePicker],
  template: `<mn-time-picker
      aria-label="Start"
      [defaultValue]="initial()"
      [format]="format()"
      [use12Hours]="use12Hours()"
      [showSecond]="showSecond()"
      [hourStep]="hourStep()"
      [minuteStep]="minuteStep()"
      [secondStep]="secondStep()"
      [minTime]="minTime()"
      [maxTime]="maxTime()"
      [clearable]="clearable()"
      [disabled]="disabled()"
      [size]="size()"
      (valueChange)="changed($event)"
      (openChange)="openChanged($event)"
    />
    <button type="button">After</button>
    <p>Outside</p>`,
})
class Host {
  initial = signal<Date | undefined>(undefined);
  format = signal("HH:mm:ss");
  use12Hours = signal(false);
  showSecond = signal(true);
  hourStep = signal(1);
  minuteStep = signal(1);
  secondStep = signal(1);
  minTime = signal<Date | undefined>(undefined);
  maxTime = signal<Date | undefined>(undefined);
  clearable = signal(true);
  disabled = signal<boolean | undefined>(undefined);
  size = signal<"small" | "medium" | "large">("medium");
  changed = vi.fn();
  openChanged = vi.fn();
}

/** Renders Host after configuring its signals (before the first change detection) */
async function setup(init: (host: Host) => void = () => {}) {
  const fixture = TestBed.createComponent(Host);
  init(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement as HTMLElement);
  await fixture.whenStable();
  return fixture;
}

describe("MnTimePicker", () => {
  it("renders an empty input with the default placeholder, name and hooks", async () => {
    await setup();
    const input = getInput();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Select time");
    expect(input).toHaveAttribute("name", "time-picker");
    expect(input).toHaveAccessibleName("Start");
    expect(input).toHaveAttribute("data-minerva", "input");
    expect(input).toHaveAttribute("data-part", "input");
    const root = input.closest('[data-minerva="time-picker"]')!;
    expect(root.localName).toBe("mn-time-picker");
    expect(root).toHaveClass("timePicker");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).not.toHaveAttribute("aria-label");
    const box = root.querySelector('[data-component="input"]')!;
    expect(box).toHaveClass("root", "outline", "medium");
    expect(box).toHaveAttribute("data-variant", "outline");
    expect(
      root.querySelector('[data-minerva="time-picker"][data-part="icon"]'),
    ).toHaveClass("clockIcon");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("formats defaultValue, a custom format and the size", async () => {
    await setup((h) => {
      h.initial.set(at(14, 30, 0));
      h.format.set("HH:mm");
      h.size.set("small");
    });
    expect(getInput()).toHaveValue("14:30");
    expect(document.querySelector('[data-component="input"]')).toHaveClass(
      "small",
    );
  });

  it("opens on click (3 columns, selected units) and toggles closed", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(at(10, 30, 45)));
    await user.click(getInput());
    await settle(fixture);
    const dialog = screen.getByRole("dialog", { name: "Start" });
    expect(dialog).toHaveClass("popup");
    expect(dialog).toHaveAttribute("data-part", "content");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(dialog).toHaveAttribute("data-placement", "bottom-start");
    expect(
      document.querySelector('[data-minerva="time-picker"][data-part="root"]'),
    ).toHaveAttribute("data-state", "open");
    expect(fixture.componentInstance.openChanged).toHaveBeenLastCalledWith(
      true,
    );
    const columns = getColumns();
    expect(columns).toHaveLength(3);
    expect(within(columns[0]).getAllByText(/^\d\d$/)).toHaveLength(24);
    expect(within(columns[1]).getAllByText(/^\d\d$/)).toHaveLength(60);
    expect(within(columns[0]).getByText("10")).toHaveClass("selected");
    expect(within(columns[1]).getByText("30")).toHaveClass("selected");
    expect(within(columns[2]).getByText("45")).toHaveClass("selected");
    expect(within(columns[2]).getByText("45")).toHaveAttribute(
      "data-selected",
      "",
    );
    expect(getInput()).toHaveFocus();
    await user.click(getInput());
    await settle(fixture);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(fixture.componentInstance.openChanged).toHaveBeenLastCalledWith(
      false,
    );
  });

  it("emits valueChange and updates the input when units are clicked", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(at(10, 30, 45)));
    const changed = fixture.componentInstance.changed;
    await user.click(getInput());
    await settle(fixture);
    await user.click(within(getColumns()[0]).getByText("08"));
    await settle(fixture);
    expect(lastDate(changed)?.getHours()).toBe(8);
    expect(getInput()).toHaveValue("08:30:45");
    await user.click(within(getColumns()[1]).getByText("15"));
    await user.click(within(getColumns()[2]).getByText("05"));
    await settle(fixture);
    expect(lastDate(changed)).toEqual(at(8, 15, 5));
    expect(getInput()).toHaveValue("08:15:05");
    expect(within(getColumns()[2]).getByText("05")).toHaveClass("selected");
    expect(changed).toHaveBeenCalledTimes(3);
  });

  it("showSecond=false removes the seconds from the format and the panel", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.showSecond.set(false);
      h.initial.set(at(9, 5, 7));
    });
    expect(getInput()).toHaveValue("09:05");
    await user.click(getInput());
    await settle(fixture);
    expect(getColumns()).toHaveLength(2);
  });

  it("respects the hour, minute and second steps", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.hourStep.set(2);
      h.minuteStep.set(15);
      h.secondStep.set(30);
    });
    await user.click(getInput());
    await settle(fixture);
    const [hours, minutes, seconds] = getColumns();
    const labels = (el: HTMLElement) =>
      within(el)
        .getAllByText(/^\d\d$/)
        .map((u) => u.textContent!.trim());
    expect(labels(hours)).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i * 2).padStart(2, "0")),
    );
    expect(labels(minutes)).toEqual(["00", "15", "30", "45"]);
    expect(labels(seconds)).toEqual(["00", "30"]);
    // nothing selected without a value
    expect(document.querySelector(".selected")).toBeNull();
  });

  it("disables units outside minTime / maxTime and ignores them", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.initial.set(at(9, 30, 0));
      h.minTime.set(at(9, 15, 0));
      h.maxTime.set(at(17, 0, 0));
    });
    await user.click(getInput());
    await settle(fixture);
    const [hours, minutes] = getColumns();
    expect(within(hours).getByText("08")).toHaveClass("disabled");
    expect(within(hours).getByText("08")).toHaveAttribute("data-disabled", "");
    expect(within(hours).getByText("08")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(within(hours).getByText("09")).not.toHaveClass("disabled");
    expect(within(hours).getByText("18")).toHaveClass("disabled");
    expect(within(minutes).getByText("14")).toHaveClass("disabled");
    expect(within(minutes).getByText("15")).not.toHaveClass("disabled");
    await user.click(within(hours).getByText("08"));
    await user.click(within(minutes).getByText("14"));
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("09:30:00");
  });

  it("supports a 12-hour clock with AM/PM", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.initial.set(at(10, 30, 45));
      h.use12Hours.set(true);
      h.format.set("hh:mm:ss a");
    });
    const changed = fixture.componentInstance.changed;
    expect(getInput()).toHaveValue("10:30:45 AM");
    await user.click(getInput());
    await settle(fixture);
    expect(getColumns()).toHaveLength(4);
    expect(column("AM/PM")).toBe(getColumns()[3]);
    expect(within(getColumns()[3]).getByText("AM")).toHaveClass("selected");
    await user.click(within(getColumns()[3]).getByText("PM"));
    await settle(fixture);
    expect(lastDate(changed)?.getHours()).toBe(22);
    expect(getInput()).toHaveValue("10:30:45 PM");
    await user.click(within(getColumns()[0]).getByText("03"));
    await settle(fixture);
    expect(lastDate(changed)?.getHours()).toBe(15);
    await user.click(within(getColumns()[0]).getByText("12"));
    await user.click(within(getColumns()[3]).getByText("AM"));
    await settle(fixture);
    expect(lastDate(changed)?.getHours()).toBe(0);
    expect(getInput()).toHaveValue("12:30:45 AM");
  });

  it("parses typed text, ignores invalid text and normalizes on blur", async () => {
    const user = setupUser();
    const fixture = await setup();
    const changed = fixture.componentInstance.changed;
    await user.type(getInput(), "ab");
    await settle(fixture);
    expect(changed).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("ab");
    getInput().blur();
    await settle(fixture);
    expect(getInput()).toHaveValue("");

    await user.type(getInput(), "12:34:56");
    await settle(fixture);
    expect(lastDate(changed)).toBeInstanceOf(Date);
    expect([
      lastDate(changed)?.getHours(),
      lastDate(changed)?.getMinutes(),
      lastDate(changed)?.getSeconds(),
    ]).toEqual([12, 34, 56]);
    await user.clear(getInput());
    getInput().blur();
    await settle(fixture);
    expect(lastDate(changed)).toBeNull();

    await user.type(getInput(), "1:2:3");
    getInput().blur();
    await settle(fixture);
    expect(getInput()).toHaveValue("01:02:03");
  });

  it("does not commit a half-typed time", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.format.set("HH:mm"));
    const changed = fixture.componentInstance.changed;
    await user.type(getInput(), "12:3");
    expect(changed).not.toHaveBeenCalled();
    await user.type(getInput(), "0", { skipClick: true });
    await settle(fixture);
    expect(changed).toHaveBeenCalledTimes(1);
    expect(lastDate(changed)?.getMinutes()).toBe(30);
  });

  it("clears with the (IconButton-like) clear button", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(at(10, 0, 0)));
    const clear = screen.getByRole("button", { name: "Clear time" });
    expect(clear).toHaveClass(
      "iconButton",
      "neutral",
      "variant-ghost",
      "small",
      "circle",
      "clearButton",
    );
    expect(clear).toHaveAttribute("data-minerva", "icon-button");
    expect(clear).toHaveAttribute("data-state", "inactive");
    expect(screen.getAllByRole("button")).toHaveLength(2); // + "After"
    await user.click(clear);
    await settle(fixture);
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(null);
    expect(getInput()).toHaveValue("");
    expect(getInput()).toHaveFocus();
    expect(document.querySelector(".clearButton")).toBeNull();
    expect(document.querySelector(".clockIcon")).not.toBeNull();
  });

  it("has no clear button when clearable is false", async () => {
    await setup((h) => {
      h.initial.set(at(10, 0, 0));
      h.clearable.set(false);
    });
    expect(document.querySelector(".clearButton")).toBeNull();
    expect(document.querySelector(".clockIcon")).not.toBeNull();
  });

  it("never opens while disabled", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.initial.set(at(10, 0, 0));
      h.disabled.set(true);
    });
    expect(getInput()).toBeDisabled();
    expect(document.querySelector(".clearButton")).toBeNull();
    const root = document.querySelector("mn-time-picker")!;
    expect(root).toHaveAttribute("data-disabled", "");
    expect(root).not.toHaveAttribute("disabled");
    await user.click(getInput());
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(fixture.componentInstance.openChanged).not.toHaveBeenCalled();
  });

  it("closes on an outside click", async () => {
    const user = setupUser();
    const fixture = await setup();
    await user.click(getInput());
    await settle(fixture);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Outside"));
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports [(value)] and [(open)]", async () => {
    const user = setupUser();
    @Component({
      imports: [MnTimePicker],
      template: `<mn-time-picker [(value)]="time" [(open)]="open" />`,
    })
    class TwoWay {
      time = signal<Date | null>(at(8, 0, 0));
      open = signal(false);
    }
    const fixture = await render(TwoWay);
    expect(getInput()).toHaveValue("08:00:00");
    expect(getInput()).toHaveAccessibleName("Time");
    fixture.componentInstance.time.set(at(12, 0, 0));
    await settle(fixture);
    expect(getInput()).toHaveValue("12:00:00");
    fixture.componentInstance.open.set(true);
    await settle(fixture);
    await user.click(within(column("Hours")).getByText("07"));
    await settle(fixture);
    expect(fixture.componentInstance.time()).toEqual(at(7, 0, 0));
    await user.click(screen.getByRole("button", { name: "Clear time" }));
    await settle(fixture);
    expect(fixture.componentInstance.time()).toBeNull();
    expect(getInput()).toHaveValue("");
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(fixture.componentInstance.open()).toBe(false);
  });
});

describe("MnTimePicker keyboard", () => {
  const openWithKeyboard = async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(at(10, 30, 0)));
    getInput().focus();
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(
      within(column("Hours")).getByRole("option", { name: "10" }),
    ).toHaveFocus();
    return { user, fixture };
  };

  it("ArrowDown opens the panel and moves focus into it; Enter / Arrows / Home / End pick", async () => {
    const { user, fixture } = await openWithKeyboard();
    const changed = fixture.componentInstance.changed;
    const hour = (name: string) =>
      within(column("Hours")).getByRole("option", { name });
    expect(hour("10")).toHaveAttribute("data-part", "item");
    expect(hour("10")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowDown}{Enter}");
    await settle(fixture);
    expect(lastDate(changed)).toEqual(at(11, 30, 0));
    expect(hour("11")).toHaveAttribute("data-selected", "");
    expect(hour("10")).not.toHaveAttribute("data-selected");
    await user.keyboard("{ArrowRight}{End}{Enter}");
    await settle(fixture);
    expect(lastDate(changed)).toEqual(at(11, 59, 0));
    await user.keyboard("{Home}");
    expect(
      within(column("Minutes")).getByRole("option", { name: "00" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(hour("11")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(getInput()).toHaveFocus();
    expect(getInput()).toHaveValue("11:59:00");
  });

  it("ArrowDown on a clicked-open panel moves focus into it", async () => {
    const user = setupUser();
    const fixture = await setup((h) => h.initial.set(at(10, 30, 0)));
    await user.click(getInput());
    await settle(fixture);
    expect(getInput()).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(
      within(column("Hours")).getByRole("option", { name: "10" }),
    ).toHaveFocus();
  });

  it("Space picks; Enter / Space on disabled units do nothing", async () => {
    const user = setupUser();
    const fixture = await setup((h) => {
      h.initial.set(at(10, 30, 0));
      h.minTime.set(at(9, 0, 0));
    });
    const changed = fixture.componentInstance.changed;
    getInput().focus();
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    within(column("Hours")).getByRole("option", { name: "12" }).focus();
    await user.keyboard(" ");
    expect(lastDate(changed)?.getHours()).toBe(12);
    changed.mockClear();
    await settle(fixture);
    within(column("Hours")).getByRole("option", { name: "08" }).focus();
    await user.keyboard("{Enter} ");
    expect(changed).not.toHaveBeenCalled();
  });

  it("Tab moves between columns, then past the panel to the clear button and on", async () => {
    const { user, fixture } = await openWithKeyboard();
    await user.tab();
    expect(
      within(column("Minutes")).getByRole("option", { name: "30" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      within(column("Seconds")).getByRole("option", { name: "00" }),
    ).toHaveFocus();
    await user.tab();
    await settle(fixture);
    expect(screen.getByRole("button", { name: "Clear time" })).toHaveFocus();
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("Shift+Tab before the first column returns to the input", async () => {
    const { user, fixture } = await openWithKeyboard();
    await user.tab({ shift: true });
    await settle(fixture);
    expect(getInput()).toHaveFocus();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    const user = setupUser();
    document.documentElement.dir = "rtl";
    try {
      const fixture = await setup((h) => h.initial.set(at(10, 30, 0)));
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      await settle(fixture);
      await user.keyboard("{ArrowLeft}");
      expect(
        within(column("Minutes")).getByRole("option", { name: "30" }),
      ).toHaveFocus();
    } finally {
      document.documentElement.dir = "";
    }
  });
  it("inside a Modal, Escape closes only the panel and returns focus to the input", async () => {
    const user = setupUser();
    @Component({
      imports: [MnTimePicker, MnModal],
      template: `<mn-modal [(open)]="open" title="Schedule">
        <mn-time-picker aria-label="Start" [defaultValue]="value" />
      </mn-modal>`,
    })
    class InModal {
      open = signal(true);
      value = at(10, 30, 0);
    }
    const fixture = await render(InModal);
    await settle(fixture);
    getInput().focus();
    await user.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(
      within(column("Hours")).getByRole("option", { name: "10" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}");
    await settle(fixture);
    expect(getInput()).toHaveValue("11:30:00");
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(screen.queryByRole("dialog", { name: "Start" })).toBeNull();
    expect(getInput()).toHaveFocus();
    expect(fixture.componentInstance.open()).toBe(true);
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(fixture.componentInstance.open()).toBe(false);
  });
});

describe("MnTimePicker forms", () => {
  it("works with ngModel", async () => {
    const user = setupUser();
    @Component({
      imports: [MnTimePicker, FormsModule],
      template: `<mn-time-picker aria-label="T" [(ngModel)]="time" />`,
    })
    class NgModelHost {
      time: Date | null = at(9, 0, 0);
    }
    const fixture = await render(NgModelHost);
    await settle(fixture);
    expect(getInput()).toHaveValue("09:00:00");
    await user.click(getInput());
    await settle(fixture);
    await user.click(within(column("Hours")).getByText("13"));
    await settle(fixture);
    expect(fixture.componentInstance.time).toEqual(at(13, 0, 0));
  });

  it("works with Reactive Forms (value, invalid after touch, disabled)", async () => {
    const user = setupUser();
    @Component({
      imports: [MnTimePicker, ReactiveFormsModule],
      template: `<mn-time-picker aria-label="T" [formControl]="control" />`,
    })
    class ReactiveHost {
      control = new FormControl<Date | null>(null, Validators.required);
    }
    const fixture = await render(ReactiveHost);
    const control = fixture.componentInstance.control;
    expect(getInput()).not.toHaveAttribute("aria-invalid");
    getInput().focus();
    getInput().blur();
    await settle(fixture);
    expect(control.touched).toBe(true);
    expect(getInput()).toHaveAttribute("aria-invalid", "true");
    expect(document.querySelector("mn-time-picker")).toHaveAttribute(
      "data-invalid",
      "",
    );
    await user.type(getInput(), "10:15:00");
    await settle(fixture);
    expect(control.value).toBeInstanceOf(Date);
    expect(control.value?.getMinutes()).toBe(15);
    expect(getInput()).not.toHaveAttribute("aria-invalid");
    control.setValue(at(6, 0, 0));
    await settle(fixture);
    expect(getInput()).toHaveValue("06:00:00");
    control.disable();
    await settle(fixture);
    expect(getInput()).toBeDisabled();
  });

  it("takes the field id, label, helper, invalid and required from <mn-form-control>", async () => {
    @Component({
      imports: [
        MnTimePicker,
        MnFormControl,
        MnFormLabel,
        MnFormHelperText,
        MnFormErrorMessage,
      ],
      template: `<mn-form-control id="f" [invalid]="invalid()" required>
        <mn-form-label>Start</mn-form-label>
        <mn-time-picker aria-describedby="extra" />
        <mn-form-helper-text>Help</mn-form-helper-text>
        <mn-form-error-message>Required</mn-form-error-message>
      </mn-form-control>`,
    })
    class FieldHost {
      invalid = signal(false);
    }
    const fixture = await render(FieldHost);
    await settle(fixture);
    const input = getInput();
    expect(input).toHaveAttribute("id", "f");
    expect(input).toHaveAttribute("aria-labelledby", "f-label");
    expect(input).toBeRequired();
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual(
      expect.arrayContaining(["f-helper", "extra"]),
    );
    fixture.componentInstance.invalid.set(true);
    await settle(fixture);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain("f-error");
  });

  it("lets explicit inputs win over the field; read-only blocks everything", async () => {
    const user = setupUser();
    @Component({
      imports: [MnTimePicker, MnFormControl, MnFormLabel],
      template: `<mn-form-control disabled required>
          <mn-form-label>A</mn-form-label>
          <mn-time-picker [disabled]="false" [required]="false" id="own" />
        </mn-form-control>
        <mn-form-control readOnly>
          <mn-form-label>B</mn-form-label>
          <mn-time-picker [defaultValue]="value" />
        </mn-form-control>
        <mn-form-control>
          <mn-form-label>C</mn-form-label>
          <mn-time-picker aria-label="Departure" />
        </mn-form-control>`,
    })
    class Explicit {
      value = at(9, 30, 0);
    }
    const fixture = await render(Explicit);
    await settle(fixture);
    const [a, b, c] = screen.getAllByRole<HTMLInputElement>("textbox");
    expect(a.disabled).toBe(false); // (jest-dom: the disabled <mn-form-control> host)
    expect(a).not.toBeRequired();
    expect(a).toHaveAttribute("id", "own");
    expect(b).toHaveAttribute("readonly");
    expect(b).toHaveAttribute("aria-readonly", "true");
    await user.click(b);
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.type(b, "1");
    expect(b).toHaveValue("09:30:00");
    expect(screen.queryByRole("button", { name: /clear/i })).toBeNull();
    expect(c).toHaveAccessibleName("Departure");
    expect(c).not.toHaveAttribute("aria-labelledby");
  });
});
