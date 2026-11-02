import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnAnswerSheet, type AnswerSheetItem } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const ITEMS: AnswerSheetItem[] = [
  { key: "a1", status: "answered", group: "single" },
  { key: "a2", status: "correct", group: "single", flagged: true },
  { key: "a3", status: "wrong", group: "single" },
  { key: "b1", status: "skipped", group: "short" },
  { key: "b2", group: "short", disabled: true },
  { key: "x", label: "Intro" },
];
const GROUPS = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];

const root = () => document.querySelector<HTMLElement>("mn-answer-sheet")!;
const pills = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-key]"));
const pill = (key: string) =>
  document.querySelector<HTMLElement>(`[data-key="${key}"]`)!;
const keys = () => pills().map((button) => button.dataset["key"]);

describe("MnAnswerSheet", () => {
  it("renders a navigation of numbered pills, ungrouped first", async () => {
    @Component({
      imports: [MnAnswerSheet],
      template: `<mn-answer-sheet [items]="items" [groups]="groups" />`,
    })
    class Host {
      items = ITEMS;
      groups = GROUPS;
    }
    await render(Host);
    expect(root().getAttribute("role")).toBe("navigation");
    expect(root().getAttribute("aria-label")).toBe("Questions");
    expect(root().getAttribute("data-part")).toBe("root");
    expect(root().getAttribute("data-layout")).toBe("wrap");
    expect(keys()).toEqual(["x", "a1", "a2", "a3", "b1", "b2"]);
    expect(pills().map((button) => button.textContent?.trim())).toEqual([
      "Intro",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    const group = document.querySelector('[role="group"]')!;
    expect(
      document.getElementById(group.getAttribute("aria-labelledby")!)
        ?.textContent,
    ).toContain("Single choice");
    expect(pill("a1").getAttribute("aria-label")).toBe("Question 2, answered");
    expect(pill("a2").getAttribute("aria-label")).toBe(
      "Question 3, correct, flagged",
    );
    expect(pill("a2").hasAttribute("data-flagged")).toBe(true);
    expect(pill("a3").getAttribute("data-status")).toBe("wrong");
    expect(pill("b2").getAttribute("aria-disabled")).toBe("true");
    expect(pill("x").tabIndex).toBe(0);
    expect(pill("a1").tabIndex).toBe(-1);
  });

  it("selects a question ([(value)])", async () => {
    @Component({
      imports: [MnAnswerSheet],
      template: `<mn-answer-sheet [items]="items" [(value)]="value" />`,
    })
    class Host {
      items = ITEMS;
      value = signal<string | null>("a1");
    }
    const fixture = await render(Host);
    expect(pill("a1").getAttribute("aria-current")).toBe("step");
    fireEvent.click(pill("a3"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("a3");
    expect(pill("a3").getAttribute("aria-current")).toBe("step");
    fireEvent.click(pill("b2"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("a3");
  });

  it("moves focus with the keyboard and selects with Enter / Space", async () => {
    @Component({
      imports: [MnAnswerSheet],
      template: `<mn-answer-sheet
        [items]="items"
        [groups]="groups"
        [(value)]="value"
      />`,
    })
    class Host {
      items = ITEMS;
      groups = GROUPS;
      value = signal<string | null>(null);
    }
    const fixture = await render(Host);
    pill("x").focus();
    fireEvent.keyDown(pill("x"), { key: "ArrowRight" });
    await settle(fixture);
    expect(document.activeElement).toBe(pill("a1"));
    fireEvent.keyDown(pill("a1"), { key: "End" });
    await settle(fixture);
    expect(document.activeElement).toBe(pill("b2"));
    fireEvent.keyDown(pill("b2"), { key: "Enter" });
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBeNull();
    fireEvent.keyDown(pill("b2"), { key: "Home" });
    await settle(fixture);
    expect(document.activeElement).toBe(pill("x"));
    fireEvent.keyDown(pill("x"), { key: " " });
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("x");
  });

  it("moves by rows with columns", async () => {
    @Component({
      imports: [MnAnswerSheet],
      template: `<mn-answer-sheet [items]="items" columns="3" />`,
    })
    class Host {
      items = Array.from({ length: 8 }, (_, i) => ({ key: `q${i + 1}` }));
    }
    const fixture = await render(Host);
    const grid = document.querySelector<HTMLElement>('[data-part="grid"]')!;
    expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
    pill("q2").focus();
    fireEvent.keyDown(pill("q2"), { key: "ArrowDown" });
    await settle(fixture);
    expect(document.activeElement).toBe(pill("q5"));
    fireEvent.keyDown(pill("q5"), { key: "ArrowUp" });
    await settle(fixture);
    expect(document.activeElement).toBe(pill("q2"));
  });

  it("shows the summary and the legend; custom labels; disabled", async () => {
    @Component({
      imports: [MnAnswerSheet],
      template: `<mn-answer-sheet
        [items]="items"
        showSummary
        showLegend
        disabled
        size="small"
        layout="scroll"
        aria-label="Exam"
        [getItemLabel]="label"
      />`,
    })
    class Host {
      items = ITEMS;
      label = (item: AnswerSheetItem, index: number) => `${item.key}#${index}`;
    }
    await render(Host);
    expect(root().getAttribute("aria-label")).toBe("Exam");
    expect(root().hasAttribute("data-disabled")).toBe(true);
    expect(root().getAttribute("data-size")).toBe("small");
    expect(root().getAttribute("data-layout")).toBe("scroll");
    expect(
      document.querySelector('[data-part="total"]')!.textContent?.trim(),
    ).toBe("3 / 6 answered");
    expect(
      Array.from(document.querySelectorAll("li")).map((li) =>
        li.textContent?.trim(),
      ),
    ).toEqual([
      "Unanswered",
      "Answered",
      "Correct",
      "Wrong",
      "Skipped",
      "Flagged",
    ]);
    expect(pill("a1").getAttribute("aria-label")).toBe("a1#0");
    expect(pill("a1").getAttribute("aria-disabled")).toBe("true");
  });

  it("scrolls the row (not the page) to center the current pill", async () => {
    const restore = stubScrollRow();
    try {
      @Component({
        imports: [MnAnswerSheet],
        template: `<mn-answer-sheet
          [items]="items"
          [layout]="layout()"
          [(value)]="value"
        />`,
      })
      class Host {
        items = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
        layout = signal<"wrap" | "scroll">("scroll");
        value = signal<string | null>("q16");
      }
      const fixture = await render(Host);
      const row = pill("q1").parentElement!;
      // pill 16 at 600..632 in a 200px row of 800px: centered
      expect(row.scrollLeft).toBe(516);
      fixture.componentInstance.value.set("q2");
      await settle(fixture);
      expect(row.scrollLeft).toBe(0);
      fixture.componentInstance.value.set("q20");
      await settle(fixture);
      expect(row.scrollLeft).toBe(600);
      // wrapping rows never scroll
      fixture.componentInstance.layout.set("wrap");
      fixture.componentInstance.value.set("q10");
      await settle(fixture);
      expect(row.scrollLeft).toBe(600);
    } finally {
      restore();
    }
  });
});

/**
 * Fake layout of a 200px-wide scroll row of 32px pills every 40px: the
 * pills' rects follow the row's scrollLeft.
 */
function stubScrollRow() {
  const spies = [
    vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        const row = this.parentElement;
        const isPill = this.hasAttribute("data-key") && row;
        const left = isPill
          ? Array.from(row.children).indexOf(this) * 40 - row.scrollLeft
          : 0;
        const width = isPill ? 32 : 200;
        return {
          left,
          width,
          right: left + width,
          x: left,
          top: 0,
          y: 0,
          height: 32,
          bottom: 32,
        } as DOMRect;
      }),
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200),
    vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockImplementation(function (this: HTMLElement) {
        return this.children.length * 40;
      }),
  ];
  return () => spies.forEach((spy) => spy.mockRestore());
}
