import { act, fireEvent, render, screen } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as M from "./index";

afterEach(() => {
  vi.restoreAllMocks();
});

const items: M.AnswerSheetItem[] = [
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
const pills = () => screen.getAllByRole("button");
const pill = (key: string) =>
  pills().find((button) => button.getAttribute("data-key") === key)!;

describe("Taro AnswerSheet", () => {
  it("renders a navigation of numbered pills, ungrouped first", () => {
    render(<M.AnswerSheet items={items} groups={groups} />);
    const nav = screen.getByRole("navigation", { name: "Questions" });
    expect(nav).toHaveAttribute("data-minerva", "answer-sheet");
    expect(pills().map((button) => button.getAttribute("data-key"))).toEqual([
      "x",
      "a1",
      "a2",
      "a3",
      "b1",
      "b2",
    ]);
    expect(pills().map((button) => button.textContent)).toEqual([
      "Intro",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    expect(
      screen.getByRole("group", { name: "Single choice" }),
    ).toContainElement(pill("a1"));
    expect(pill("a1")).toHaveAccessibleName("Question 2, answered");
    expect(pill("a2")).toHaveAccessibleName("Question 3, correct, flagged");
    expect(pill("a2")).toHaveClass("mn-status-correct", "mn-flagged");
    expect(pill("b2")).toHaveAttribute("aria-disabled", "true");
  });

  it("selects on tap and marks the current step", () => {
    const onChange = vi.fn();
    render(
      <M.AnswerSheet items={items} defaultValue="a1" onChange={onChange} />,
    );
    expect(pill("a1")).toHaveAttribute("aria-current", "step");
    fireEvent.click(pill("a3"));
    expect(onChange).toHaveBeenCalledWith("a3");
    expect(pill("a3")).toHaveAttribute("aria-current", "step");
    expect(pill("a3")).toHaveClass("mn-current");
    fireEvent.click(pill("b2"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("keeps a controlled value", () => {
    const onChange = vi.fn();
    render(<M.AnswerSheet items={items} value="a1" onChange={onChange} />);
    fireEvent.click(pill("b1"));
    expect(onChange).toHaveBeenCalledWith("b1");
    expect(pill("a1")).toHaveAttribute("aria-current", "step");
  });

  it("shows the summary, the legend, columns and layout classes", () => {
    render(
      <M.AnswerSheet
        items={items}
        showSummary
        showLegend
        columns={3}
        size="small"
        aria-label="Exam"
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Exam" });
    expect(nav).toHaveClass("mn-size-small", "mn-layout-wrap");
    expect(screen.getByText("3 / 6 answered")).toBeInTheDocument();
    expect(
      screen.getAllByRole("listitem").map((entry) => entry.textContent),
    ).toEqual([
      "Unanswered",
      "Answered",
      "Correct",
      "Wrong",
      "Skipped",
      "Flagged",
    ]);
    const grid = nav.querySelector<HTMLElement>(".mn-answer-sheet__grid")!;
    expect(grid).toHaveClass("mn-columns");
    expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
  });

  it("disables the sheet and uses getItemLabel", () => {
    const onChange = vi.fn();
    render(
      <M.AnswerSheet
        items={items}
        disabled
        layout="scroll"
        getItemLabel={(item, index) => `${item.key}#${index}`}
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("navigation")).toHaveClass("mn-layout-scroll");
    fireEvent.click(pill("a1"));
    expect(onChange).not.toHaveBeenCalled();
    expect(pill("a1")).toHaveAccessibleName("a1#0");
  });

  it("scrolls the row (scrollLeft, not scroll-into-view) to center the current pill", async () => {
    // a 200px row of 32px pills every 40px, scrolled by `scrolled`
    let scrolled = 0;
    vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
      let selector = "";
      const query = {
        select: (s: string) => {
          selector = s;
          return query;
        },
        boundingClientRect: (cb: (rect: unknown) => void) => {
          const index = Number(/-q-(\d+)$/.exec(selector)?.[1] ?? -1);
          cb(
            index < 0
              ? { left: 0, width: 200 }
              : { left: index * 40 - scrolled, width: 32 },
          );
          return query;
        },
        scrollOffset: (cb: (offset: unknown) => void) => {
          cb({ scrollLeft: scrolled, scrollWidth: 800 });
          return query;
        },
        exec: (cb?: () => void) => cb?.(),
      };
      return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
    });
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
    const sheet = (value: string) => (
      <M.AnswerSheet
        items={many}
        value={value}
        onChange={() => {}}
        layout="scroll"
      />
    );
    const settle = async () => {
      await act(async () => {});
      await act(() => new Promise((resolve) => setTimeout(resolve, 20)));
    };
    const { rerender } = render(sheet("q16"));
    await settle();
    const row = pill("q1").closest<HTMLElement>(".mn-answer-sheet__scroller")!;
    expect(row.querySelector("[data-part=grid]")).toContainElement(pill("q1"));
    // pill 16 at 600..632: centered
    expect(row.scrollLeft).toBe(516);
    scrolled = 516;
    rerender(sheet("q2"));
    await settle();
    expect(row.scrollLeft).toBe(0);
    scrolled = 0;
    rerender(sheet("q20"));
    await settle();
    expect(row.scrollLeft).toBe(600);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
