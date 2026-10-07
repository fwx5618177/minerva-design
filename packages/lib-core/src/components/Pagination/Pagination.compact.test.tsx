import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";
import type { PaginationProps } from "./types";
import styles from "./pagination.module.scss";

describe("Pagination totals", () => {
  it("renders an optional total without leaking the prop to the DOM", () => {
    const html = renderToStaticMarkup(
      <Pagination total={27} pageSize={10} current={2} showTotal />,
    );
    expect(html).toContain("Total 27 items");
    expect(html).toContain('aria-live="polite"');
    expect(html).not.toContain("showTotal=");
  });

  it("supplies a bounded visible range to a showTotal function and supports empty results", () => {
    const format = (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} / ${total}`;
    const html = (total: number, page: number) =>
      renderToStaticMarkup(
        <Pagination
          total={total}
          pageSize={10}
          current={page}
          showTotal={format}
        />,
      );
    expect(html(27, 3)).toContain("21-27 / 27");
    expect(html(0, 1)).toContain("0-0 / 0");
    expect(html(5, 3)).toContain("1-5 / 5");
  });

  it("announces the total politely", () => {
    render(<Pagination total={27} showTotal />);
    const totalEl = screen.getByText("Total 27 items");
    expect(totalEl).toHaveAttribute("aria-live", "polite");
    expect(totalEl).toHaveAttribute("aria-atomic", "true");
  });

  it("keeps existing pagination unchanged unless requested", () => {
    const html = renderToStaticMarkup(
      <Pagination total={27} pageSize={10} current={1} />,
    );
    expect(html).not.toContain("Total 27 items");
    expect(html).not.toContain('aria-live="polite"');
  });
});

function renderPager(props: Partial<PaginationProps> = {}) {
  const onChange = vi.fn();
  const utils = render(
    <Pagination
      total={100}
      pageSize={10}
      current={1}
      siblingCount={1}
      boundaryCount={1}
      onChange={onChange}
      {...props}
    />,
  );
  return { ...utils, onChange };
}

/** Visible page sequence, with gaps as "…". */
function sequence(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll(
      `.${styles.item}:not(.${styles.prev}):not(.${styles.next}), .${styles.ellipsis}`,
    ),
    (node) => node.textContent,
  );
}

describe("Pagination compact page list", () => {
  it("lists every page when they fit", () => {
    const { container } = renderPager({ total: 70 });
    expect(sequence(container)).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });

  it.each([
    [1, ["1", "2", "3", "4", "5", "…", "10"]],
    [5, ["1", "…", "4", "5", "6", "…", "10"]],
    [10, ["1", "…", "6", "7", "8", "9", "10"]],
  ])("collapses ranges around page %i", (page, expected) => {
    const { container } = renderPager({ current: page });
    expect(sequence(container)).toEqual(expected);
  });

  it("honours siblingCount and boundaryCount", () => {
    const { container } = renderPager({
      total: 200,
      current: 10,
      siblingCount: 2,
      boundaryCount: 2,
    });
    expect(sequence(container)).toEqual([
      "1",
      "2",
      "…",
      "8",
      "9",
      "10",
      "11",
      "12",
      "…",
      "19",
      "20",
    ]);
  });

  it("uses default sibling / boundary counts when only one is set", () => {
    const { container } = render(
      <Pagination total={100} current={5} siblingCount={1} />,
    );
    expect(sequence(container)).toEqual(["1", "…", "4", "5", "6", "…", "10"]);
    const { container: other } = render(
      <Pagination total={100} current={5} boundaryCount={1} />,
    );
    expect(sequence(other)).toEqual(["1", "…", "4", "5", "6", "…", "10"]);
  });

  it("hides gaps from assistive tech and marks the current page", () => {
    const { container } = renderPager({ current: 5 });
    const gaps = container.querySelectorAll(`.${styles.ellipsis}`);
    expect(gaps).toHaveLength(2);
    for (const gap of gaps) {
      expect(gap).toHaveAttribute("aria-hidden", "true");
    }
    const current = screen.getByRole("button", { name: "Page 5" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass(styles.active);
    expect(screen.getByRole("button", { name: "Page 4" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("button", { name: "Page 4" })).not.toHaveClass(
      styles.active,
    );
  });

  it("always renders at least one page for zero results", () => {
    const { container } = renderPager({ total: 0 });
    expect(sequence(container)).toEqual(["1"]);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });
});

describe("Pagination compact interaction", () => {
  it("navigates with page buttons and prev/next", async () => {
    const user = userEvent.setup();
    const { onChange } = renderPager({ current: undefined, defaultCurrent: 5 });
    await user.click(screen.getByRole("button", { name: "Page 6" }));
    expect(onChange).toHaveBeenLastCalledWith(6, 10);
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onChange).toHaveBeenLastCalledWith(5, 10);
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenLastCalledWith(6, 10);
  });

  it("does not emit a change when the current page is clicked", async () => {
    const user = userEvent.setup();
    const { onChange } = renderPager({ current: 3 });
    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is keyboard operable", async () => {
    const user = userEvent.setup();
    const { onChange } = renderPager({ current: 1 });
    await user.tab();
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveFocus();
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });
});

describe("Pagination modes and attributes", () => {
  it("hideNumbers shows a live counter instead of page numbers", () => {
    const { container } = renderPager({ hideNumbers: true, current: 2 });
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(sequence(container)).toEqual([]);
    const counter = container.querySelector(`.${styles.counter}`);
    expect(counter).toHaveTextContent("2 / 10");
    expect(counter).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });

  it("hideEdges removes prev/next in every mode", () => {
    const { rerender } = renderPager({ hideEdges: true });
    expect(screen.queryByRole("button", { name: "Previous page" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
    rerender(<Pagination total={100} hideEdges simple />);
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
    rerender(<Pagination total={100} hideEdges hideNumbers />);
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
    rerender(<Pagination total={500} hideEdges />);
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
  });

  it("renders the page-size selector as a native select", () => {
    renderPager({ showSizeChanger: true, pageSizeOptions: [10, 20] });
    const select = screen.getByRole("combobox", { name: "Items per page" });
    expect(select.tagName).toBe("SELECT");
    expect(select.parentElement).toHaveClass(styles.sizeChanger);
  });

  it("is a labelled navigation landmark that forwards ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    renderPager({ ref, className: "consumer", id: "pager", title: "pages" });
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(ref.current).toBe(nav);
    expect(nav).toHaveClass(styles.pagination, "consumer");
    expect(nav).toHaveAttribute("id", "pager");
    expect(nav).toHaveAttribute("title", "pages");
    expect(nav).not.toHaveAttribute("pagesize");
  });

  it("lets aria-label override the localized landmark name", () => {
    renderPager({ "aria-label": "Results pages" });
    expect(
      screen.getByRole("navigation", { name: "Results pages" }),
    ).toBeInTheDocument();
  });

  it("gives every page item the item class", () => {
    const { container } = renderPager();
    const items = container.querySelectorAll("button");
    expect(items.length).toBeGreaterThan(2);
    items.forEach((item) => expect(item).toHaveClass(styles.item));
  });
});
