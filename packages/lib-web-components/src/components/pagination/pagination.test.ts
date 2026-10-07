import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import { MinervaPagination } from "./pagination";
import "../../elements/pagination";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  resetDevWarnings();
});

const el = () =>
  document.querySelector<MinervaPagination>("minerva-pagination")!;
const root = () => el().shadowRoot!;
const button = (name: string) =>
  root().querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`);
const page = (n: number) => button(`Page ${n}`);
const focused = () => root().activeElement;
const labels = () =>
  Array.from(root().querySelectorAll("button.item")).map((b) =>
    b.getAttribute("aria-label"),
  );

/** Records `minerva-page-change` details as [page, pageSize]. */
const track = () => {
  const calls: [number, number][] = [];
  el().addEventListener("minerva-page-change", (e) => {
    const { page: p, pageSize } = (e as CustomEvent).detail;
    calls.push([p, pageSize]);
  });
  return calls;
};

describe("<minerva-pagination>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-pagination")).toBe(MinervaPagination);
  });

  it("renders a labelled navigation landmark with one button per page", async () => {
    await mount(`<minerva-pagination total="50"></minerva-pagination>`);
    const nav = $(el(), "nav");
    expect(nav).toHaveClass("pagination");
    expect(nav).toHaveClass("solid");
    expect(nav).toHaveAttribute("aria-label", "Pagination");
    expect(el()).not.toHaveAttribute("tabindex");
    expect(labels()).toEqual([
      "Previous page",
      "Page 1",
      "Page 2",
      "Page 3",
      "Page 4",
      "Page 5",
      "Next page",
    ]);
    expect(page(1)).toHaveAttribute("aria-current", "page");
    expect(page(1)).toHaveClass("active");
    expect(page(2)).not.toHaveAttribute("aria-current");
    expect(button("Previous page")).toBeDisabled();
  });

  it("renders first/last pages and jump items when there are many pages", async () => {
    await mount(
      `<minerva-pagination total="200" current="10"></minerva-pagination>`,
    );
    for (const n of [1, 8, 9, 10, 11, 12, 20]) expect(page(n)).toBeTruthy();
    expect(page(7)).toBe(null);
    expect(button("Previous 5 pages")).toBeTruthy();
    expect(button("Next 5 pages")).toBeTruthy();
    el().current = 1;
    await settle();
    expect(button("Previous 5 pages")).toBe(null);
  });

  it("applies size / shape / variant / responsive classes and reflects", async () => {
    await mount(
      `<minerva-pagination total="50" size="small" shape="circle" variant="ghost" responsive></minerva-pagination>`,
    );
    const nav = $(el(), "nav");
    for (const c of ["small", "circle", "ghost", "responsive"]) {
      expect(nav).toHaveClass(c);
    }
    el().size = "large";
    el().shape = "square";
    el().disabled = true;
    await settle();
    expect(el().getAttribute("size")).toBe("large");
    expect(nav).toHaveClass("large");
    expect(nav).toHaveClass("square");
    expect(nav).toHaveClass("disabled");
    expect(
      Array.from(root().querySelectorAll("button")).every((b) => b.disabled),
    ).toBe(true);
  });

  it("uses itemRender and icon slots for custom content", async () => {
    await mount(`<minerva-pagination total="30"></minerva-pagination>`);
    el().itemRender = (p, type) =>
      type === "page" ? html`<b>${p}</b>` : type.toUpperCase();
    await settle();
    expect(page(2)!.querySelector("b")?.textContent).toBe("2");
    expect(button("Previous page")!.textContent?.trim()).toBe("PREV");

    await mount(
      `<minerva-pagination total="30"><span slot="prev-icon">P</span></minerva-pagination>`,
    );
    expect(
      button("Previous page")!.querySelector("slot[name=prev-icon]"),
    ).toBeTruthy();
  });

  it("shows the total (default text or totalRender with the visible range)", async () => {
    await mount(
      `<minerva-pagination total="45" current="5" show-total></minerva-pagination>`,
    );
    expect($(el(), ".total").textContent?.trim()).toBe("Total 45 items");
    expect($(el(), ".total")).toHaveAttribute("aria-live", "polite");
    const render = vi.fn(
      (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total}`,
    );
    el().totalRender = render;
    await settle();
    expect(render).toHaveBeenCalledWith(45, [41, 45]);
    expect($(el(), ".total").textContent?.trim()).toBe("41-45 of 45");
    el().showTotal = false;
    await settle();
    expect(root().querySelector(".total")).toBe(null);
  });

  it("emits minerva-page-change {page, pageSize} and updates on click", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-pagination total="50"></minerva-pagination>`);
    const calls = track();
    await user.click(page(3)!);
    await settle();
    expect(calls).toEqual([[3, 10]]);
    expect(el().current).toBe(3);
    expect(el().getAttribute("current")).toBe("3");
    await user.click(page(3)!);
    expect(calls).toHaveLength(1); // current page: no event
    await user.click(button("Previous page")!);
    await settle();
    await user.click(button("Next page")!);
    await settle();
    expect(calls).toEqual([
      [3, 10],
      [2, 10],
      [3, 10],
    ]);
  });

  it("keeps the page when minerva-page-change is canceled (controlled)", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-pagination total="50"></minerva-pagination>`);
    el().addEventListener("minerva-page-change", (e) => e.preventDefault());
    await user.click(page(4)!);
    await settle();
    expect(el().current).toBe(1);
    expect(page(1)).toHaveAttribute("aria-current", "page");
  });

  it("does not emit when properties are set programmatically", async () => {
    await mount(`<minerva-pagination total="50"></minerva-pagination>`);
    const calls = track();
    el().current = 4;
    await settle();
    expect(calls).toEqual([]);
    expect(page(4)).toHaveAttribute("aria-current", "page");
  });

  it("jumps 5 pages with the jump items, clamped to the range", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-pagination total="200" current="16"></minerva-pagination>`,
    );
    const calls = track();
    await user.click(button("Next 5 pages")!);
    expect(calls.at(-1)).toEqual([20, 10]);
    await settle();
    el().current = 3;
    await settle();
    await user.click(button("Next 5 pages")!);
    expect(calls.at(-1)).toEqual([8, 10]);
  });

  it("shows a ripple on pointer clicks, inside the clicked item, cleared after 1s", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await mount(`<minerva-pagination total="50"></minerva-pagination>`);
    await user.click(page(3)!);
    await el().updateComplete;
    expect(root().querySelectorAll(".ripple")).toHaveLength(1);
    expect(page(3)!.querySelector(".ripple")).toBeTruthy();
    vi.advanceTimersByTime(1000);
    await el().updateComplete;
    expect(root().querySelectorAll(".ripple")).toHaveLength(0);
  });

  it("changes the page size from the select, back to page 1", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-pagination total="100" current="3" show-size-changer page-size-options="10,20,50"></minerva-pagination>`,
    );
    const calls = track();
    const select = $<HTMLSelectElement>(el(), "select");
    expect(select).toHaveAttribute("aria-label", "Items per page");
    expect(
      Array.from(select.options).map((o) => o.textContent?.trim()),
    ).toEqual(["10 / page", "20 / page", "50 / page"]);
    select.focus();
    await user.selectOptions(select, "20");
    await settle();
    expect(calls).toEqual([[1, 20]]);
    expect(el().pageSize).toBe(20);
    expect(el().current).toBe(1);
    expect(root().activeElement).toBe(select);
  });

  it("adds the current page size to the options when missing", async () => {
    await mount(
      `<minerva-pagination total="100" page-size="15" show-size-changer></minerva-pagination>`,
    );
    const select = $<HTMLSelectElement>(el(), "select");
    expect(Array.from(select.options).map((o) => o.value)).toEqual([
      "10",
      "15",
      "20",
      "50",
      "100",
    ]);
    expect(select.value).toBe("15");
  });

  describe("compact list", () => {
    it("honours sibling-count and boundary-count with hidden gaps", async () => {
      await mount(
        `<minerva-pagination total="200" current="10" sibling-count="1" boundary-count="1"></minerva-pagination>`,
      );
      expect(labels()).toEqual([
        "Previous page",
        "Page 1",
        "Page 9",
        "Page 10",
        "Page 11",
        "Page 20",
        "Next page",
      ]);
      const gaps = root().querySelectorAll(".ellipsis");
      expect(gaps).toHaveLength(2);
      expect(gaps[0]).toHaveAttribute("aria-hidden", "true");
    });

    it("lists every page when they fit and keeps one page for zero results", async () => {
      await mount(
        `<minerva-pagination total="50" sibling-count="1"></minerva-pagination>`,
      );
      expect(root().querySelectorAll(".ellipsis")).toHaveLength(0);
      el().total = 0;
      await settle();
      expect(labels()).toEqual(["Previous page", "Page 1", "Next page"]);
    });
  });

  it("hide-numbers shows a live counter; hide-edges removes prev / next", async () => {
    await mount(
      `<minerva-pagination total="50" current="2" hide-numbers></minerva-pagination>`,
    );
    expect($(el(), ".counter").textContent?.replace(/\s+/g, " ").trim()).toBe(
      "2 / 5",
    );
    expect($(el(), ".counter")).toHaveAttribute("aria-live", "polite");
    expect(page(2)).toBe(null);
    el().hideEdges = true;
    await settle();
    expect(button("Previous page")).toBe(null);
    expect(button("Next page")).toBe(null);
  });

  describe("simple mode", () => {
    it("renders the page input and total pages; Enter commits (clamped)", async () => {
      const user = userEvent.setup();
      await mount(
        `<form><minerva-pagination total="100" simple></minerva-pagination></form>`,
        "minerva-pagination",
      );
      const onSubmit = vi.fn((e: Event) => e.preventDefault());
      document.querySelector("form")!.addEventListener("submit", onSubmit);
      const calls = track();
      const input = $<HTMLInputElement>(el(), "input");
      expect(input).toHaveAttribute("aria-label", "Current page");
      expect(input.value).toBe("1");
      expect($(el(), ".simpleInput").textContent).toContain("10");
      input.focus();
      await user.keyboard("{Backspace}6{Enter}");
      await settle();
      expect(calls).toEqual([[6, 10]]);
      expect(onSubmit).not.toHaveBeenCalled();
      await user.keyboard("{Backspace}99{Enter}");
      await settle();
      expect(calls.at(-1)).toEqual([10, 10]);
    });

    it("reverts invalid values and commits on blur", async () => {
      const user = userEvent.setup();
      await mount(
        `<minerva-pagination total="100" simple></minerva-pagination>`,
      );
      const calls = track();
      const input = $<HTMLInputElement>(el(), "input");
      input.focus();
      await user.keyboard("{Backspace}4");
      input.blur();
      await settle();
      expect(calls).toEqual([[4, 10]]);
      // (user-event keeps its own copy of a typed value: one edit per focus)
      input.focus();
      await user.keyboard("{Backspace}abc");
      input.blur();
      await settle();
      expect(input.value).toBe("4");
      expect(calls).toEqual([[4, 10]]);
    });

    it("does not change page with arrow keys while editing", async () => {
      const user = userEvent.setup();
      await mount(
        `<minerva-pagination total="100" simple current="3"></minerva-pagination>`,
      );
      const calls = track();
      $<HTMLInputElement>(el(), "input").focus();
      await user.keyboard("{ArrowRight}{Home}");
      expect(calls).toEqual([]);
    });
  });

  it("warns in development when current is beyond the last page", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      `<minerva-pagination total="20" current="9"></minerva-pagination>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("current (9)"));
  });

  describe("localization", () => {
    it("translates the built-in labels with the lang of the scope", async () => {
      await mount(
        `<div lang="zh"><minerva-pagination total="200" show-total show-quick-jumper show-size-changer></minerva-pagination></div>`,
        "minerva-pagination",
      );
      expect($(el(), "nav")).toHaveAttribute("aria-label", "分页");
      expect(button("上一页")).toBeDisabled();
      expect(button("第 2 页")).toBeTruthy();
      expect($(el(), ".total").textContent?.trim()).toBe("共 200 条");
      expect($(el(), ".jumper input")).toHaveAttribute(
        "aria-label",
        "跳转到指定页",
      );
      expect($(el(), "select")).toHaveAttribute("aria-label", "每页条数");
      expect($(el(), "option").textContent?.trim()).toBe("10 条/页");
    });

    it("re-renders when the language changes and lets labels win", async () => {
      await mount(
        `<minerva-config locale="en"><minerva-pagination total="50"></minerva-pagination></minerva-config>`,
        "minerva-pagination",
      );
      document.querySelector("minerva-config")!.setAttribute("locale", "fr");
      await settle();
      expect(button("Page suivante")).toBeTruthy();
      el().labels = {
        prev: "Back",
        page: (p) => `Go to page ${p}`,
        nav: "Results pages",
      };
      await settle();
      expect($(el(), "nav")).toHaveAttribute("aria-label", "Results pages");
      expect(button("Back")).toBeTruthy();
      expect(button("Go to page 3")).toBeTruthy();
      expect(button("Page suivante")).toBeTruthy();
    });

    it("lets aria-label override the landmark name", async () => {
      await mount(
        `<minerva-pagination total="50" aria-label="Results"></minerva-pagination>`,
      );
      expect($(el(), "nav")).toHaveAttribute("aria-label", "Results");
    });
  });
});

describe("<minerva-pagination> keyboard", () => {
  it("operates Previous / Next with Space and Enter", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-pagination total="50" current="3"></minerva-pagination>`,
    );
    const calls = track();
    button("Previous page")!.focus();
    await user.keyboard(" ");
    expect(calls.at(-1)).toEqual([2, 10]);
    await settle();
    button("Next page")!.focus();
    await user.keyboard("{Enter}");
    expect(calls.at(-1)).toEqual([3, 10]);
  });

  it("handles ArrowLeft, ArrowRight, Home and End, focusing the new page", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-pagination total="100" current="5"></minerva-pagination>`,
    );
    page(5)!.focus();
    await user.keyboard("{ArrowRight}");
    await settle();
    expect(focused()).toBe(page(6));
    await user.keyboard("{End}");
    await settle();
    expect(focused()).toBe(page(10));
    await user.keyboard("{ArrowRight}");
    await settle();
    expect(el().current).toBe(10);
    await user.keyboard("{Home}");
    await settle();
    expect(focused()).toBe(page(1));
    await user.keyboard("{ArrowLeft}");
    await settle();
    expect(el().current).toBe(1);
  });

  it("swaps the arrow keys in RTL", async () => {
    const user = userEvent.setup();
    await mount(
      `<div dir="rtl"><minerva-pagination total="100" current="5"></minerva-pagination></div>`,
      "minerva-pagination",
    );
    page(5)!.focus();
    await user.keyboard("{ArrowRight}");
    await settle();
    expect(el().current).toBe(4);
    await user.keyboard("{ArrowLeft}");
    await settle();
    expect(el().current).toBe(5);
  });

  it("ignores keyboard navigation and clicks while disabled", async () => {
    await mount(
      `<minerva-pagination total="100" disabled></minerva-pagination>`,
    );
    const calls = track();
    // disabled buttons: pointer-events none / no click
    page(2)!.click();
    page(1)!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    expect(calls).toEqual([]);
  });

  it("keeps focus on the Next button across page changes", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-pagination total="100"></minerva-pagination>`);
    button("Next page")!.focus();
    await user.keyboard("{Enter}");
    await settle();
    await user.keyboard("{Enter}");
    await settle();
    expect(page(3)).toHaveAttribute("aria-current", "page");
    expect(focused()).toBe(button("Next page"));
  });

  it("moves focus to the active page when the focused button becomes disabled", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-pagination total="20"></minerva-pagination>`);
    button("Next page")!.focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(button("Next page")).toBeDisabled();
    expect(focused()).toBe(page(2));
  });

  it("keeps focus inside when a focused jump item disappears", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-pagination total="100" current="4"></minerva-pagination>`,
    );
    button("Next 5 pages")!.focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(button("Next 5 pages")).toBe(null);
    expect(focused()).toBe(page(9));
  });

  it("jumps with Enter in the quick jumper without submitting a form", async () => {
    const user = userEvent.setup();
    await mount(
      `<form><minerva-pagination total="100" show-quick-jumper></minerva-pagination></form>`,
      "minerva-pagination",
    );
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    document.querySelector("form")!.addEventListener("submit", onSubmit);
    const calls = track();
    const input = $<HTMLInputElement>(el(), ".jumper input");
    input.focus();
    await user.keyboard("4{Enter}");
    await settle();
    expect(calls).toEqual([[4, 10]]);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(focused()).toBe(input);
    expect(input.value).toBe("");
    expect(page(4)).toHaveAttribute("aria-current", "page");
    await user.keyboard("999{Enter}");
    expect(calls).toHaveLength(1);
  });
});
