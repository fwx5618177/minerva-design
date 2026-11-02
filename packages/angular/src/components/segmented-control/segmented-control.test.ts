import { Component, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnSegmentedControl } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const root = () => document.querySelector<HTMLElement>("mn-segmented-control")!;
const radios = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="radio"]'));
const checked = () =>
  radios().map((radio) => radio.getAttribute("aria-checked"));

describe("MnSegmentedControl", () => {
  it("renders a radiogroup of radio segments from strings and objects", async () => {
    @Component({
      imports: [MnSegmentedControl],
      template: `<mn-segmented-control
        aria-label="View"
        defaultValue="week"
        [options]="[
          'day',
          { value: 'week', label: 'Week' },
          { value: 'grid', icon: '≡', 'aria-label': 'Grid' },
        ]"
      />`,
    })
    class Host {}
    await render(Host);
    expect(root().getAttribute("role")).toBe("radiogroup");
    expect(root().getAttribute("aria-label")).toBe("View");
    expect(root().getAttribute("data-minerva")).toBe("segmented-control");
    expect(radios().map((radio) => radio.textContent?.trim())).toEqual([
      "day",
      "Week",
      "≡",
    ]);
    expect(radios()[2]!.getAttribute("aria-label")).toBe("Grid");
    expect(radios()[2]!.querySelector('[data-part="label"]')).toBeNull();
    expect(checked()).toEqual(["false", "true", "false"]);
    expect(radios().map((radio) => radio.tabIndex)).toEqual([-1, 0, -1]);
    expect(root().style.getPropertyValue("--_segmented-control-index")).toBe(
      "1",
    );
  });

  it("selects by click and the arrow keys with [(value)] and (change), skipping disabled segments", async () => {
    @Component({
      imports: [MnSegmentedControl],
      template: `<mn-segmented-control
        aria-label="View"
        [options]="['a', { value: 'b', disabled: true }, 'c']"
        [(value)]="value"
        (change)="changes.push($event)"
      />`,
    })
    class Host {
      readonly value = signal<string | null | undefined>("a");
      readonly changes: string[] = [];
    }
    const fixture = await render(Host);
    const host = fixture.componentInstance;
    fireEvent.click(radios()[1]!);
    await settle(fixture);
    expect(host.value()).toBe("a");
    fireEvent.click(radios()[2]!);
    await settle(fixture);
    expect(host.value()).toBe("c");
    expect(checked()).toEqual(["false", "false", "true"]);
    radios()[2]!.focus();
    fireEvent.keyDown(radios()[2]!, { key: "ArrowRight" });
    await settle(fixture);
    expect(host.value()).toBe("a");
    expect(document.activeElement).toBe(radios()[0]);
    fireEvent.keyDown(radios()[0]!, { key: "End" });
    await settle(fixture);
    expect(host.value()).toBe("c");
    expect(host.changes).toEqual(["c", "a", "c"]);
  });

  it("works with Reactive Forms and blocks everything when disabled", async () => {
    @Component({
      imports: [MnSegmentedControl, ReactiveFormsModule],
      template: `<mn-segmented-control
        aria-label="View"
        name="view"
        [options]="['list', 'grid']"
        [formControl]="control"
      />`,
    })
    class Host {
      readonly control = new FormControl<string | null>("grid");
    }
    const fixture = await render(Host);
    const host = fixture.componentInstance;
    expect(checked()).toEqual(["false", "true"]);
    fireEvent.click(radios()[0]!);
    await settle(fixture);
    expect(host.control.value).toBe("list");
    expect(
      document.querySelector<HTMLInputElement>('input[name="view"]')!.value,
    ).toBe("list");
    host.control.disable();
    await settle(fixture);
    expect(root().getAttribute("aria-disabled")).toBe("true");
    expect(root().hasAttribute("data-disabled")).toBe(true);
    expect(radios().every((radio) => radio.tabIndex === -1)).toBe(true);
    fireEvent.click(radios()[1]!);
    await settle(fixture);
    expect(host.control.value).toBe("list");
  });
});
