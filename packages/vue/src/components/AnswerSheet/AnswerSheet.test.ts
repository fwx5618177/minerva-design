import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { AnswerSheet, type AnswerSheetItem } from ".";

const items: AnswerSheetItem[] = [
  { key: "a1", status: "answered", group: "single" },
  { key: "a2", status: "correct", group: "single", flagged: true },
  { key: "a3", status: "wrong", group: "single" },
  { key: "b1", status: "skipped", group: "short" },
  { key: "b2", group: "short", disabled: true },
  { key: "x", label: "Intro" },
];
const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];

type Props = Record<string, unknown>;
const renderSheet = (props: Props = {}, attrs: Props = {}) =>
  render(AnswerSheet, { props: { items, ...props } as never, attrs });

const pills = () =>
  Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
const pill = (key: string) =>
  pills().find((button) => button.dataset.key === key)!;
const keys = () => pills().map((button) => button.dataset.key);

describe("AnswerSheet (Vue)", () => {
  it("renders a nav of numbered pills, ungrouped first then groups", () => {
    renderSheet({ groups });
    const nav = document.querySelector("nav")!;
    expect(nav.getAttribute("aria-label")).toBe("Questions");
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
    const title = document.getElementById(
      group.getAttribute("aria-labelledby")!,
    );
    expect(title?.textContent?.trim()).toBe("Single choice");
    expect(group.contains(pill("a1"))).toBe(true);
    expect(pill("a1").getAttribute("aria-label")).toBe("Question 2, answered");
    expect(pill("a2").getAttribute("aria-label")).toBe(
      "Question 3, correct, flagged",
    );
    expect(pill("a2").hasAttribute("data-flagged")).toBe(true);
    expect(pill("a3").dataset.status).toBe("wrong");
    expect(pill("b2").getAttribute("aria-disabled")).toBe("true");
    expect(pill("x").tabIndex).toBe(0);
    expect(pill("a1").tabIndex).toBe(-1);
  });

  it("selects on click and emits update:modelValue and change", async () => {
    const { emitted } = renderSheet({ defaultValue: "a1" });
    expect(pill("a1").getAttribute("aria-current")).toBe("step");
    await fireEvent.click(pill("a3"));
    expect(emitted()["update:modelValue"]).toEqual([["a3"]]);
    expect(emitted().change).toEqual([["a3"]]);
    expect(pill("a3").getAttribute("aria-current")).toBe("step");
    await fireEvent.click(pill("b2"));
    expect(emitted().change).toHaveLength(1);
  });

  it("supports v-model", async () => {
    const Controlled = defineComponent({
      setup() {
        const value = ref("a1");
        return () => [
          h(AnswerSheet, {
            items,
            modelValue: value.value,
            "onUpdate:modelValue": (next: string) => (value.value = next),
          }),
          h("output", value.value),
        ];
      },
    });
    render(Controlled);
    await fireEvent.click(pill("b1"));
    expect(document.querySelector("output")!.textContent).toBe("b1");
    expect(pill("b1").getAttribute("aria-current")).toBe("step");
  });

  it("moves focus with the keyboard and selects with Enter / Space", async () => {
    const { emitted } = renderSheet({ groups });
    pill("x").focus();
    await fireEvent.keyDown(pill("x"), { key: "ArrowRight" });
    await nextTick();
    expect(document.activeElement).toBe(pill("a1"));
    expect(pill("a1").tabIndex).toBe(0);
    await fireEvent.keyDown(pill("a1"), { key: "End" });
    await nextTick();
    expect(document.activeElement).toBe(pill("b2"));
    await fireEvent.keyDown(pill("b2"), { key: "Enter" });
    expect(emitted().change).toBeUndefined();
    await fireEvent.keyDown(pill("b2"), { key: "Home" });
    await nextTick();
    expect(document.activeElement).toBe(pill("x"));
    await fireEvent.keyDown(pill("x"), { key: " " });
    expect(emitted().change).toEqual([["x"]]);
  });

  it("moves by rows with columns", async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({ key: `q${i + 1}` }));
    renderSheet({ items: many, columns: 3 });
    expect(
      document.querySelector<HTMLElement>('[data-part="grid"]')!.style
        .gridTemplateColumns,
    ).toBe("repeat(3, minmax(0, 1fr))");
    pill("q2").focus();
    await fireEvent.keyDown(pill("q2"), { key: "ArrowDown" });
    await nextTick();
    expect(document.activeElement).toBe(pill("q5"));
    await fireEvent.keyDown(pill("q5"), { key: "ArrowUp" });
    await nextTick();
    expect(document.activeElement).toBe(pill("q2"));
  });

  it("shows the summary, the legend and the state hooks", () => {
    renderSheet(
      {
        showSummary: true,
        showLegend: true,
        size: "small",
        layout: "scroll",
        disabled: true,
        "aria-label": "Exam",
      },
      { class: "custom" },
    );
    const nav = document.querySelector("nav")!;
    expect(nav.getAttribute("aria-label")).toBe("Exam");
    expect(nav.classList.contains("custom")).toBe(true);
    expect(nav.dataset.size).toBe("small");
    expect(nav.dataset.layout).toBe("scroll");
    expect(nav.hasAttribute("data-disabled")).toBe(true);
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
  });

  it("uses getItemLabel", () => {
    renderSheet({
      getItemLabel: (item: AnswerSheetItem, i: number) => `${item.key}#${i}`,
    });
    expect(pill("a1").getAttribute("aria-label")).toBe("a1#0");
  });

  it("scrolls the row (not the page) to center the current pill", async () => {
    const restore = stubScrollRow();
    try {
      const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
      const { rerender } = renderSheet({
        items: many,
        modelValue: "q16",
        layout: "scroll",
      });
      const row = pill("q1").parentElement!;
      // pill 16 at 600..632 in a 200px row of 800px: centered
      expect(row.scrollLeft).toBe(516);
      await rerender({ items: many, modelValue: "q2", layout: "scroll" });
      expect(row.scrollLeft).toBe(0);
      await rerender({ items: many, modelValue: "q20", layout: "scroll" });
      expect(row.scrollLeft).toBe(600);
      // wrapping rows never scroll
      await rerender({ items: many, modelValue: "q10", layout: "wrap" });
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
