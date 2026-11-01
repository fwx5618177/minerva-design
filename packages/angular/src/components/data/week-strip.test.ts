import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnWeekStrip, type WeekStripMarker } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const root = () => document.querySelector<HTMLElement>("mn-week-strip")!;
const days = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'));
const keys = () => days().map((cell) => cell.dataset["date"]);
const day = (key: string) =>
  document.querySelector<HTMLElement>(`[data-date="${key}"]`)!;
const button = (label: string) =>
  document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

describe("MnWeekStrip", () => {
  it("renders the Monday-first week of the value as a listbox", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip today="2026-01-07" value="2026-01-06" />`,
    })
    class Host {}
    await render(Host);
    expect(root().getAttribute("data-part")).toBe("root");
    const list = document.querySelector('[role="listbox"]')!;
    expect(list.getAttribute("aria-label")).toBe("Week");
    expect(list.getAttribute("aria-orientation")).toBe("horizontal");
    expect(keys()).toEqual([
      "2026-01-05",
      "2026-01-06",
      "2026-01-07",
      "2026-01-08",
      "2026-01-09",
      "2026-01-10",
      "2026-01-11",
    ]);
    expect(days()[0]!.textContent).toContain("Mon");
    expect(day("2026-01-06").getAttribute("aria-selected")).toBe("true");
    expect(day("2026-01-07").getAttribute("aria-current")).toBe("date");
    expect(day("2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026",
    );
    expect(days().filter((cell) => cell.tabIndex === 0)).toEqual([
      day("2026-01-06"),
    ]);
  });

  it("starts the week on firstDayOfWeek", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip today="2026-01-07" firstDayOfWeek="0" />`,
    })
    class Host {}
    await render(Host);
    expect(keys()[0]).toBe("2026-01-04");
    expect(days()[0]!.textContent).toContain("Sun");
  });

  it("selects a day ([(value)])", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip today="2026-01-07" [(value)]="value" />`,
    })
    class Host {
      value = signal<string | null>("2026-01-06");
    }
    const fixture = await render(Host);
    fireEvent.click(day("2026-01-09"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("2026-01-09");
    expect(day("2026-01-09").getAttribute("aria-selected")).toBe("true");
  });

  it("shows count badges and dots and labels them", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip today="2026-01-07" [markers]="markers" />`,
    })
    class Host {
      markers: Record<string, WeekStripMarker> = {
        "2026-01-05": 3,
        "2026-01-06": true,
        "2026-01-08": 120,
      };
    }
    await render(Host);
    const marker = (key: string) =>
      day(key).querySelector<HTMLElement>('[data-part="indicator"]')!;
    expect(marker("2026-01-05").textContent).toBe("3");
    expect(marker("2026-01-05").className).toContain("count");
    expect(marker("2026-01-08").textContent).toBe("99+");
    expect(marker("2026-01-06").className).toContain("dot");
    expect(day("2026-01-05").getAttribute("aria-label")).toBe(
      "Monday, January 5, 2026, 3 items",
    );
    expect(day("2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026, marked",
    );
  });

  it("moves by keyboard across weeks ([(week)])", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip
        today="2026-01-07"
        [(value)]="value"
        [(week)]="week"
      />`,
    })
    class Host {
      value = signal<string | null>("2026-01-06");
      week = signal<Date | null>(null);
    }
    const fixture = await render(Host);
    day("2026-01-06").focus();
    fireEvent.keyDown(day("2026-01-06"), { key: "End" });
    await settle(fixture);
    expect(document.activeElement).toBe(day("2026-01-11"));
    fireEvent.keyDown(day("2026-01-11"), { key: "ArrowRight" });
    await settle(fixture);
    expect(keys()[0]).toBe("2026-01-12");
    expect(document.activeElement).toBe(day("2026-01-12"));
    expect(fixture.componentInstance.week()).toEqual(new Date(2026, 0, 12));
    fireEvent.keyDown(day("2026-01-12"), { key: "PageUp" });
    await settle(fixture);
    expect(document.activeElement).toBe(day("2026-01-05"));
    fireEvent.keyDown(day("2026-01-05"), { key: "Enter" });
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("2026-01-05");
  });

  it("navigates weeks with the buttons and follows an outside value", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip
        today="2026-01-07"
        showNavigation
        previousWeekLabel="Back"
        [value]="value()"
      />`,
    })
    class Host {
      value = signal<string | null>("2026-01-28");
    }
    const fixture = await render(Host);
    const heading = () =>
      document.querySelector('[data-part="heading"]')!.textContent;
    expect(heading()).toBe("January – February 2026");
    expect(button("Next week")).not.toBeNull();
    fireEvent.click(button("Back"));
    await settle(fixture);
    expect(keys()[0]).toBe("2026-01-19");
    expect(heading()).toBe("January 2026");
    fixture.componentInstance.value.set("2026-03-04");
    await settle(fixture);
    expect(keys()[0]).toBe("2026-03-02");
  });

  it("blocks selection and navigation when disabled", async () => {
    @Component({
      imports: [MnWeekStrip],
      template: `<mn-week-strip
        today="2026-01-07"
        showNavigation
        disabled
        size="small"
        [(value)]="value"
      />`,
    })
    class Host {
      value = signal<string | null>("2026-01-06");
    }
    const fixture = await render(Host);
    fireEvent.click(day("2026-01-09"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("2026-01-06");
    expect(days().every((cell) => cell.tabIndex === -1)).toBe(true);
    expect(button("Previous week").disabled).toBe(true);
    expect(root().hasAttribute("data-disabled")).toBe(true);
    expect(root().getAttribute("data-size")).toBe("small");
    expect(root().className).toContain("small");
  });
});
