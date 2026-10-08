import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import type { SupportedLanguage } from "@minerva/core";
import { Pagination } from ".";
import ConfigProvider from "../../config/ConfigProvider.vue";

const pageButton = (page: number) =>
  screen.getByRole("button", { name: `Page ${page}` });
const button = (name: string) => screen.getByRole("button", { name });

describe("Pagination rendering", () => {
  it("renders a labelled navigation landmark with root hooks", () => {
    render(Pagination, { props: { total: 50 } });
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav).toHaveClass("pagination");
    expect(nav).toHaveAttribute("data-minerva", "pagination");
    expect(nav).toHaveAttribute("data-part", "root");
    expect(nav).toHaveAttribute("data-size", "medium");
    expect(nav).toHaveAttribute("data-shape", "rounded");
    expect(nav).toHaveAttribute("data-variant", "solid");
  });

  it("renders one button per page when pages fit in the window", () => {
    render(Pagination, { props: { total: 50 } });
    [1, 2, 3, 4, 5].forEach((page) =>
      expect(pageButton(page)).toHaveClass("item"),
    );
    expect(screen.queryByRole("button", { name: "Page 6" })).toBeNull();
    expect(button("Previous page")).toBeDisabled();
    expect(button("Previous page")).toHaveClass("prev", "disabled");
    expect(button("Previous page")).toHaveAttribute("data-disabled", "");
    expect(button("Next page")).toBeEnabled();
    expect(button("Next page")).toHaveClass("next");
  });

  it("marks the current page with aria-current, the active class and hooks", () => {
    render(Pagination, { props: { total: 50, current: 3 } });
    expect(pageButton(3)).toHaveAttribute("aria-current", "page");
    expect(pageButton(3)).toHaveClass("active");
    expect(pageButton(3)).toHaveAttribute("data-current", "");
    expect(pageButton(3)).toHaveAttribute("data-part", "item");
    expect(pageButton(2)).not.toHaveAttribute("aria-current");
  });

  it("renders first/last pages and jump items when there are many pages", () => {
    render(Pagination, { props: { total: 200, current: 10 } });
    [1, 8, 9, 10, 11, 12, 20].forEach((page) =>
      expect(pageButton(page)).toBeInTheDocument(),
    );
    expect(screen.queryByRole("button", { name: "Page 7" })).toBeNull();
    expect(button("Previous 5 pages")).toHaveClass("jump");
    expect(button("Next 5 pages")).toHaveTextContent("Next 5 pages");
  });

  it("disables next on the last page", async () => {
    const { rerender } = render(Pagination, {
      props: { total: 50, current: 1 },
    });
    expect(button("Next page")).toBeEnabled();
    await rerender({ total: 50, current: 5 });
    expect(button("Next page")).toBeDisabled();
  });

  it("applies size, shape, variant, responsive classes and attributes", () => {
    render(Pagination, {
      props: {
        total: 50,
        size: "small",
        shape: "circle",
        variant: "outline",
        responsive: true,
      },
      attrs: { class: "custom", style: "margin: 4px", "data-part": "x" },
    });
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "pagination",
      "small",
      "circle",
      "outline",
      "responsive",
      "custom",
    );
    expect(nav).toHaveStyle({ margin: "4px" });
    expect(nav).toHaveAttribute("data-part", "root");
  });

  it("applies large/square/ghost classes", () => {
    render(Pagination, {
      props: { total: 50, size: "large", shape: "square", variant: "ghost" },
    });
    expect(screen.getByRole("navigation")).toHaveClass(
      "large",
      "square",
      "ghost",
    );
  });

  it("uses itemRender or the item slot for custom content", () => {
    const { unmount } = render(Pagination, {
      props: {
        total: 30,
        itemRender: (page: number, type: string) => `${type}:${page}`,
      },
    });
    expect(pageButton(2)).toHaveTextContent("page:2");
    expect(button("Previous page")).toHaveTextContent("prev:0");
    expect(button("Next page")).toHaveTextContent("next:2");
    unmount();
    render(Pagination, {
      props: { total: 30 },
      slots: {
        item: ({ page, type }: { page: number; type: string }) =>
          `${type}#${page}`,
      },
    });
    expect(pageButton(3)).toHaveTextContent("page#3");
  });

  it("renders custom icons (prop or slots) and keeps the default for the others", () => {
    const { unmount } = render(Pagination, {
      props: {
        total: 200,
        current: 10,
        icons: {
          prev: h("i", "P"),
          jumpPrev: h("i", "JP"),
        },
      },
    });
    expect(button("Previous page")).toHaveTextContent("P");
    expect(button("Previous 5 pages")).toHaveTextContent("JP");
    expect(button("Next page").querySelector("svg")).not.toBeNull();
    expect(button("Next 5 pages").querySelector("svg")).not.toBeNull();
    unmount();
    render(Pagination, {
      props: { total: 200, current: 10, icons: { next: "N", jumpNext: "JN" } },
      slots: {
        "prev-icon": () => "<",
        "jump-prev-icon": () => "<<",
      },
    });
    expect(button("Previous page")).toHaveTextContent("<");
    expect(button("Previous 5 pages")).toHaveTextContent("<<");
    expect(button("Next page")).toHaveTextContent("N");
    expect(button("Next 5 pages")).toHaveTextContent("JN");
  });
});

describe("Pagination total", () => {
  it("shows the default total text politely", () => {
    render(Pagination, { props: { total: 50, showTotal: true } });
    const total = screen.getByText("Total 50 items");
    expect(total).toHaveClass("total");
    expect(total).toHaveAttribute("aria-live", "polite");
    expect(total).toHaveAttribute("data-part", "total");
  });

  it("renders totalRender, a showTotal function or the total slot with the range", () => {
    const totalRender = vi.fn(
      (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total}`,
    );
    const { unmount } = render(Pagination, {
      props: { total: 45, current: 5, showTotal: true, totalRender },
    });
    expect(screen.getByText("41-45 of 45")).toBeInTheDocument();
    unmount();
    const r2 = render(Pagination, {
      props: {
        total: 0,
        showTotal: (total: number, range: [number, number]) =>
          `${total}:${range.join(",")}`,
      },
    });
    expect(screen.getByText("0:0,0")).toBeInTheDocument();
    r2.unmount();
    render(Pagination, {
      props: { total: 20, showTotal: true, labels: { total: (n) => `#${n}` } },
      slots: {
        total: ({ total }: { total: number }) => `slot ${total}`,
      },
    });
    expect(screen.getByText("slot 20")).toBeInTheDocument();
  });

  it("uses labels.total and does not render the total when showTotal is false", () => {
    const { unmount } = render(Pagination, {
      props: { total: 20, showTotal: true, labels: { total: (n) => `#${n}` } },
    });
    expect(screen.getByText("#20")).toBeInTheDocument();
    unmount();
    const { container } = render(Pagination, { props: { total: 20 } });
    expect(container.querySelector('[data-part="total"]')).toBeNull();
  });
});

describe("Pagination compact page list", () => {
  it("honours siblingCount and boundaryCount with hidden gaps", () => {
    const { container } = render(Pagination, {
      props: { total: 200, current: 10, siblingCount: 1, boundaryCount: 1 },
    });
    const labels = screen
      .getAllByRole("button")
      .map((b) => b.getAttribute("aria-label"));
    expect(labels).toEqual([
      "Previous page",
      "Page 1",
      "Page 9",
      "Page 10",
      "Page 11",
      "Page 20",
      "Next page",
    ]);
    const gaps = container.querySelectorAll(".ellipsis");
    expect(gaps).toHaveLength(2);
    expect(gaps[0]).toHaveAttribute("aria-hidden", "true");
  });

  it("always renders at least one page for zero results", () => {
    render(Pagination, { props: { total: 0, siblingCount: 1 } });
    expect(pageButton(1)).toHaveAttribute("aria-current", "page");
    expect(button("Next page")).toBeDisabled();
  });

  it("hideNumbers shows a live counter instead of page numbers", () => {
    const { container } = render(Pagination, {
      props: { total: 50, defaultCurrent: 2, hideNumbers: true },
    });
    expect(screen.queryByRole("button", { name: "Page 1" })).toBeNull();
    const counter = container.querySelector(".counter")!;
    expect(counter).toHaveTextContent("2 / 5");
    expect(counter).toHaveAttribute("aria-live", "polite");
  });

  it("hideEdges removes prev/next in every mode", async () => {
    const { rerender } = render(Pagination, {
      props: { total: 50, hideEdges: true },
    });
    expect(screen.queryByRole("button", { name: "Previous page" })).toBeNull();
    await rerender({ total: 50, hideEdges: true, simple: true });
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
    await rerender({ total: 50, hideEdges: true, hideNumbers: true });
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
  });
});

describe("Pagination interactions", () => {
  it("emits change, update:current with page and pageSize on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Pagination, { props: { total: 50 } });
    await user.click(pageButton(3));
    expect(emitted("change")).toEqual([[3, 10]]);
    expect(emitted("update:current")).toEqual([[3]]);
    expect(emitted("update:pageSize")).toBeUndefined();
    expect(pageButton(3)).toHaveAttribute("aria-current", "page");
    await user.click(pageButton(3));
    expect(emitted("change")).toHaveLength(1);
    await user.click(button("Previous page"));
    await user.click(button("Next page"));
    expect(emitted("change")).toEqual([
      [3, 10],
      [2, 10],
      [3, 10],
    ]);
  });

  it("jumps 5 pages with the jump items, clamped to the range", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Pagination, {
      props: { total: 200, defaultCurrent: 10 },
    });
    await user.click(button("Next 5 pages"));
    expect(pageButton(15)).toHaveAttribute("aria-current", "page");
    await user.click(button("Previous 5 pages"));
    expect(pageButton(10)).toHaveAttribute("aria-current", "page");
    await user.click(pageButton(20));
    await user.click(button("Previous 5 pages"));
    expect(emitted("change")!.at(-1)).toEqual([15, 10]);
  });

  it("shows a ripple on pointer clicks, cleared after 1s, only in the clicked item", async () => {
    vi.useFakeTimers();
    render(Pagination, { props: { total: 50 } });
    await fireEvent.click(pageButton(2), { detail: 1, clientX: 5, clientY: 6 });
    expect(pageButton(2).querySelector(".ripple")).not.toBeNull();
    expect(pageButton(3).querySelector(".ripple")).toBeNull();
    await fireEvent.click(pageButton(3), { detail: 0 });
    expect(pageButton(3).querySelector(".ripple")).toBeNull();
    vi.advanceTimersByTime(1000);
    await nextTick();
    expect(document.querySelector(".ripple")).toBeNull();
  });

  it("supports v-model:current and v-model:pageSize", async () => {
    const user = userEvent.setup();
    const current = ref(2);
    const pageSize = ref(10);
    render(
      defineComponent({
        setup: () => () =>
          h(Pagination, {
            total: 100,
            showSizeChanger: true,
            current: current.value,
            pageSize: pageSize.value,
            "onUpdate:current": (v: number) => (current.value = v),
            "onUpdate:pageSize": (v: number) => (pageSize.value = v),
          }),
      }),
    );
    await user.click(pageButton(4));
    expect(current.value).toBe(4);
    await user.selectOptions(screen.getByRole("combobox"), "20");
    expect(pageSize.value).toBe(20);
    expect(current.value).toBe(1);
    expect(screen.getAllByRole("button", { name: /^Page / })).toHaveLength(5);
    current.value = 3;
    await nextTick();
    expect(pageButton(3)).toHaveAttribute("aria-current", "page");
  });

  it("honors a controlled current / pageSize that the parent does not update", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Pagination, {
      props: { total: 100, current: 2, pageSize: 10, showSizeChanger: true },
    });
    await user.click(pageButton(4));
    expect(emitted("change")).toEqual([[4, 10]]);
    expect(pageButton(2)).toHaveAttribute("aria-current", "page");
    await user.selectOptions(screen.getByRole("combobox"), "50");
    expect(emitted("change")!.at(-1)).toEqual([1, 50]);
    expect(emitted("update:pageSize")).toEqual([[50]]);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
      "10",
    );
  });

  it("starts at defaultCurrent and defaultPageSize; adds a missing size option", () => {
    render(Pagination, {
      props: {
        total: 100,
        defaultCurrent: 3,
        defaultPageSize: 25,
        showSizeChanger: true,
        pageSizeOptions: [10, 50],
      },
    });
    expect(pageButton(3)).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("button", { name: /^Page / })).toHaveLength(4);
    expect(
      screen.getAllByRole("option").map((o) => o.textContent?.trim()),
    ).toEqual(["10 / page", "25 / page", "50 / page"]);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("data-part", "size-changer");
    expect((select as HTMLSelectElement).value).toBe("25");
  });

  it("disabled: ignores clicks, keys and marks every item disabled", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Pagination, {
      props: {
        total: 50,
        disabled: true,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    });
    screen.getAllByRole("button").forEach((b) => expect(b).toBeDisabled());
    await fireEvent.click(pageButton(2));
    await fireEvent.keyDown(pageButton(1), { key: "End" });
    expect(emitted("change")).toBeUndefined();
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(screen.getByRole("navigation")).toHaveAttribute("data-disabled", "");
    void user;
  });
});

describe("Pagination keyboard and focus", () => {
  it("handles ArrowLeft, ArrowRight, Home and End and focuses the current page", async () => {
    const user = userEvent.setup();
    render(Pagination, { props: { total: 50, defaultCurrent: 3 } });
    pageButton(3).focus();
    await user.keyboard("{ArrowRight}");
    expect(pageButton(4)).toHaveFocus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(pageButton(2)).toHaveFocus();
    await user.keyboard("{End}");
    expect(pageButton(5)).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(pageButton(5)).toHaveFocus();
    await user.keyboard("{Home}");
    expect(pageButton(1)).toHaveFocus();
    await user.keyboard("{ArrowLeft}a");
    expect(pageButton(1)).toHaveAttribute("aria-current", "page");
  });

  it("swaps the arrows in RTL", async () => {
    const user = userEvent.setup();
    render(Pagination, {
      props: { total: 50, defaultCurrent: 3 },
      attrs: { dir: "rtl" },
    });
    pageButton(3).focus();
    await user.keyboard("{ArrowLeft}");
    expect(pageButton(4)).toHaveFocus();
  });

  it("activates items with Enter and Space and keeps focus on Next", async () => {
    const user = userEvent.setup();
    render(Pagination, { props: { total: 50 } });
    button("Next page").focus();
    await user.keyboard("{Enter}");
    expect(pageButton(2)).toHaveAttribute("aria-current", "page");
    expect(button("Next page")).toHaveFocus();
    await user.keyboard(" ");
    expect(pageButton(3)).toHaveAttribute("aria-current", "page");
  });

  it("moves focus to the active page when the focused button becomes disabled", async () => {
    const user = userEvent.setup();
    render(Pagination, { props: { total: 20 } });
    button("Next page").focus();
    await user.keyboard("{Enter}");
    expect(button("Next page")).toBeDisabled();
    expect(pageButton(2)).toHaveFocus();
  });

  it("keeps focus inside the navigation when a focused jump item disappears", async () => {
    const user = userEvent.setup();
    render(Pagination, { props: { total: 100, defaultCurrent: 4 } });
    button("Next 5 pages").focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("button", { name: "Next 5 pages" })).toBeNull();
    expect(pageButton(9)).toHaveFocus();
  });

  it("is not a tab stop itself", () => {
    render(Pagination, { props: { total: 50 } });
    expect(screen.getByRole("navigation")).not.toHaveAttribute("tabindex");
  });
});

describe("Pagination quick jumper and simple mode", () => {
  it("jumps on Enter without submitting a form, ignores invalid values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    render(
      defineComponent({
        setup: () => () =>
          h("form", { onSubmit }, [
            h(Pagination, { total: 100, showQuickJumper: true }),
          ]),
      }),
    );
    const input = screen.getByRole("textbox", { name: "Jump to page" });
    expect(input.closest("label")).toHaveAttribute("data-part", "jumper");
    expect(screen.getByText("Go to")).toBeInTheDocument();
    await user.type(input, "99{Enter}");
    expect(input).toHaveValue("99");
    await user.clear(input);
    await user.type(input, "abc{Enter}");
    await user.clear(input);
    await user.type(input, "7{Tab}");
    await user.click(input);
    await user.keyboard("{Enter}");
    expect(pageButton(7)).toHaveAttribute("aria-current", "page");
    expect(input).toHaveValue("");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders the jump-to slot", () => {
    render(Pagination, {
      props: { total: 100, showQuickJumper: true },
      slots: { "jump-to": () => "Page:" },
    });
    expect(screen.getByText("Page:")).toBeInTheDocument();
  });

  it("simple mode: input with total pages, commit on Enter / blur, clamp and revert", async () => {
    const user = userEvent.setup();
    const { container, emitted } = render(Pagination, {
      props: { total: 50, simple: true },
    });
    const input = screen.getByRole("textbox", { name: "Current page" });
    expect(input).toHaveAttribute("data-part", "simple-input");
    expect(input).toHaveValue("1");
    expect(container.querySelector(".simpleInput")).toHaveTextContent("/5");
    await user.clear(input);
    expect(input).toHaveValue("");
    await user.type(input, "3{Enter}");
    expect(input).toHaveValue("3");
    await user.clear(input);
    await user.type(input, "99");
    await user.tab();
    expect(input).toHaveValue("5");
    await user.clear(input);
    await user.type(input, "x");
    input.blur();
    await nextTick();
    expect(input).toHaveValue("5");
    await user.click(input);
    await user.keyboard("{ArrowLeft}");
    expect(input).toHaveValue("5");
    await user.click(button("Previous page"));
    expect(input).toHaveValue("4");
    expect(emitted("change")).toEqual([
      [3, 10],
      [5, 10],
      [4, 10],
    ]);
  });
});

describe("Pagination localization", () => {
  const withLocale = (
    language: SupportedLanguage,
    props: Record<string, unknown>,
  ) =>
    render(
      defineComponent({
        setup: () => () =>
          h(ConfigProvider, { locale: { language } }, () =>
            h(Pagination, props),
          ),
      }),
    );

  it("translates the built-in labels with the ConfigProvider locale", () => {
    withLocale("zh", {
      total: 200,
      showTotal: true,
      showQuickJumper: true,
      showSizeChanger: true,
    });
    expect(screen.getByRole("navigation", { name: "分页" })).toBeVisible();
    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "下一页" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "第 2 页" })).toBeVisible();
    expect(screen.getByText("共 200 条")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "跳转到指定页" })).toBeVisible();
    expect(screen.getByRole("combobox", { name: "每页条数" })).toBeVisible();
  });

  it("lets the labels prop and aria-label win over the translation", () => {
    withLocale("zh", {
      total: 200,
      current: 10,
      showSizeChanger: true,
      simple: false,
      labels: {
        prev: "Back",
        next: "Forward",
        jumpPrev: "Back 5",
        jumpNext: "Forward 5",
        page: (page: number) => `Go to page ${page}`,
        pageSizeOption: (size: number) => `${size} rows`,
        pageSize: "Rows",
        jumpTo: "Go",
        nav: "Results pages",
      },
    });
    expect(
      screen.getByRole("navigation", { name: "Results pages" }),
    ).toBeVisible();
    expect(button("Back")).toBeVisible();
    expect(button("Forward")).toBeVisible();
    expect(button("Back 5")).toBeVisible();
    expect(button("Forward 5")).toBeVisible();
    expect(button("Go to page 9")).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Rows" })).toBeVisible();
    expect(screen.getByRole("option", { name: "10 rows" })).toBeInTheDocument();
  });

  it("uses labels.currentPage, labels.jumpToInput and lets aria-label override nav", () => {
    render(Pagination, {
      props: {
        total: 50,
        simple: true,
        labels: { currentPage: "Now" },
      },
      attrs: { "aria-label": "Mine" },
    });
    expect(screen.getByRole("navigation", { name: "Mine" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Now" })).toBeVisible();
  });
});
