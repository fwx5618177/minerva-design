import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

const pageButton = (page: number) =>
  screen.getByRole("button", { name: `Page ${page}` });

describe("Pagination", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("rendering", () => {
    it("renders a labelled navigation landmark", () => {
      render(<Pagination total={50} />);
      expect(
        screen.getByRole("navigation", { name: "Pagination" }),
      ).toBeInTheDocument();
    });

    it("renders one button per page when pages fit in the window", () => {
      render(<Pagination total={50} />);
      [1, 2, 3, 4, 5].forEach((page) => {
        expect(pageButton(page)).toBeInTheDocument();
      });
      expect(
        screen.queryByRole("button", { name: "Page 6" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Previous page" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Next page" }),
      ).toBeInTheDocument();
    });

    it("marks the current page with aria-current and the active class", () => {
      render(<Pagination total={50} current={3} />);
      expect(pageButton(3)).toHaveAttribute("aria-current", "page");
      expect(pageButton(3)).toHaveClass("active");
      expect(pageButton(2)).not.toHaveAttribute("aria-current");
    });

    it("renders first/last pages and jump items when there are many pages", () => {
      render(<Pagination total={200} current={10} />);
      [1, 8, 9, 10, 11, 12, 20].forEach((page) => {
        expect(pageButton(page)).toBeInTheDocument();
      });
      expect(
        screen.queryByRole("button", { name: "Page 7" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Previous 5 pages" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Next 5 pages" }),
      ).toBeInTheDocument();
    });

    it("omits jump items near the edges", () => {
      render(<Pagination total={200} current={1} />);
      expect(
        screen.queryByRole("button", { name: "Previous 5 pages" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Next 5 pages" }),
      ).toBeInTheDocument();
    });

    it("disables prev on the first page and next on the last page", () => {
      const { rerender } = render(<Pagination total={50} current={1} />);
      const prev = screen.getByRole("button", { name: "Previous page" });
      expect(prev).toHaveAttribute("aria-disabled", "true");
      expect(prev).toHaveAttribute("tabindex", "-1");
      expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute(
        "aria-disabled",
        "false",
      );

      rerender(<Pagination total={50} current={5} />);
      expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("applies size, shape, variant, responsive and custom classes", () => {
      render(
        <Pagination
          total={50}
          size="small"
          shape="circle"
          variant="outlined"
          responsive
          className="custom"
          style={{ margin: 4 }}
        />,
      );
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass(
        "pagination",
        "small",
        "circle",
        "outlined",
        "responsive",
        "custom",
      );
      expect(nav).toHaveStyle({ margin: "4px" });
    });

    it("applies large/square/text classes", () => {
      render(
        <Pagination total={50} size="large" shape="square" variant="text" />,
      );
      expect(screen.getByRole("navigation")).toHaveClass(
        "large",
        "square",
        "text",
      );
    });

    it("uses itemRender for custom content", () => {
      render(
        <Pagination
          total={30}
          itemRender={(page, type) => `${type}:${page}`}
        />,
      );
      expect(pageButton(2)).toHaveTextContent("page:2");
      expect(
        screen.getByRole("button", { name: "Previous page" }),
      ).toHaveTextContent("prev:0");
      expect(
        screen.getByRole("button", { name: "Next page" }),
      ).toHaveTextContent("next:2");
    });

    it("renders custom icons", () => {
      render(
        <Pagination
          total={30}
          icons={{ prev: <span>PREV</span>, next: <span>NEXT</span> }}
        />,
      );
      expect(screen.getByText("PREV")).toBeInTheDocument();
      expect(screen.getByText("NEXT")).toBeInTheDocument();
    });
  });

  describe("total display", () => {
    it("shows the default total text", () => {
      render(<Pagination total={95} showTotal />);
      expect(screen.getByText("Total 95 items")).toBeInTheDocument();
    });

    it("calls totalRender with total and the current range", () => {
      const totalRender = vi.fn(
        (total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total}`,
      );
      render(
        <Pagination
          total={95}
          current={10}
          showTotal
          totalRender={totalRender}
        />,
      );
      expect(totalRender).toHaveBeenCalledWith(95, [91, 95]);
      expect(screen.getByText("91-95 of 95")).toBeInTheDocument();
    });

    it("does not render total when showTotal is false", () => {
      render(<Pagination total={95} />);
      expect(screen.queryByText("Total 95 items")).not.toBeInTheDocument();
    });
  });

  describe("click interactions", () => {
    it("calls onChange with page and pageSize when a page is clicked", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} pageSize={10} onChange={onChange} />);
      await user.click(pageButton(3));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(3, 10);
    });

    it("does not call onChange when clicking the current page", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} onChange={onChange} />);
      await user.click(pageButton(2));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("navigates with prev and next buttons", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={3} onChange={onChange} />);
      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(onChange).toHaveBeenLastCalledWith(4, 10);
      await user.click(screen.getByRole("button", { name: "Previous page" }));
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });

    it("does not call onChange when clicking a disabled prev button", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={1} onChange={onChange} />);
      await user.click(screen.getByRole("button", { name: "Previous page" }));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("jumps 5 pages with the jump items", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={200} current={10} onChange={onChange} />);
      await user.click(screen.getByRole("button", { name: "Next 5 pages" }));
      expect(onChange).toHaveBeenLastCalledWith(15, 10);
      await user.click(
        screen.getByRole("button", { name: "Previous 5 pages" }),
      );
      expect(onChange).toHaveBeenLastCalledWith(5, 10);
    });

    it("clamps jump targets to the valid page range", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(
        <Pagination total={200} current={5} onChange={onChange} />,
      );
      await user.click(
        screen.getByRole("button", { name: "Previous 5 pages" }),
      );
      expect(onChange).toHaveBeenLastCalledWith(1, 10);

      rerender(<Pagination total={200} current={16} onChange={onChange} />);
      await user.click(screen.getByRole("button", { name: "Next 5 pages" }));
      expect(onChange).toHaveBeenLastCalledWith(20, 10);
    });

    it("shows a ripple on click that is cleared after 1s", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const { container } = render(
        <Pagination total={50} onChange={vi.fn()} />,
      );
      await user.click(pageButton(2));
      expect(container.querySelectorAll(".ripple").length).toBeGreaterThan(0);
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(container.querySelectorAll(".ripple")).toHaveLength(0);
    });

    it("only renders the ripple inside the clicked item", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination total={50} onChange={vi.fn()} />,
      );
      await user.click(pageButton(3));
      expect(container.querySelectorAll(".ripple")).toHaveLength(1);
      expect(pageButton(3).querySelector(".ripple")).toBeInTheDocument();
      expect(pageButton(2).querySelector(".ripple")).not.toBeInTheDocument();
    });
  });

  describe("item keyboard activation", () => {
    it("activates page items with Enter and Space", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={1} onChange={onChange} />);
      pageButton(3).focus();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenLastCalledWith(3, 10);
      pageButton(4).focus();
      await user.keyboard(" ");
      expect(onChange).toHaveBeenLastCalledWith(4, 10);
      screen.getByRole("button", { name: "Next page" }).focus();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it("ignores Enter on disabled items", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={1} onChange={onChange} />);
      screen.getByRole("button", { name: "Previous page" }).focus();
      await user.keyboard("{Enter} ");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("disabled", () => {
    it("ignores clicks and marks all items disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Pagination total={50} current={2} disabled onChange={onChange} />,
      );
      expect(screen.getByRole("navigation")).toHaveClass("disabled");
      expect(pageButton(3)).toHaveAttribute("aria-disabled", "true");
      expect(pageButton(3)).toHaveAttribute("tabindex", "-1");
      await user.click(pageButton(3));
      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("ignores keyboard navigation", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Pagination total={50} current={2} disabled onChange={onChange} />,
      );
      screen.getByRole("navigation").focus();
      await user.keyboard("{ArrowRight}{ArrowLeft}{Home}{End}");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("keyboard navigation", () => {
    it("handles ArrowLeft, ArrowRight, Home and End", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={100} current={5} onChange={onChange} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("tabindex", "0");
      nav.focus();

      await user.keyboard("{ArrowRight}");
      expect(onChange).toHaveBeenLastCalledWith(6, 10);
      await user.keyboard("{ArrowLeft}");
      expect(onChange).toHaveBeenLastCalledWith(4, 10);
      await user.keyboard("{Home}");
      expect(onChange).toHaveBeenLastCalledWith(1, 10);
      await user.keyboard("{End}");
      expect(onChange).toHaveBeenLastCalledWith(10, 10);
      expect(onChange).toHaveBeenCalledTimes(4);
    });

    it("does not navigate past the boundaries", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={1} onChange={onChange} />);
      screen.getByRole("navigation").focus();
      await user.keyboard("{ArrowLeft}{Home}");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("quick jumper", () => {
    it("jumps to a valid page on Enter and clears the input", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={100} showQuickJumper onChange={onChange} />);
      const input = screen.getByRole("textbox", { name: "Jump to page" });
      await user.type(input, "7{Enter}");
      expect(onChange).toHaveBeenCalledWith(7, 10);
      expect(input).toHaveValue("");
    });

    it("ignores out-of-range or invalid values", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={100} showQuickJumper onChange={onChange} />);
      const input = screen.getByRole("textbox", { name: "Jump to page" });
      await user.type(input, "99{Enter}");
      await user.clear(input);
      await user.type(input, "abc{Enter}");
      await user.clear(input);
      await user.type(input, "0{Enter}");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("size changer", () => {
    it("renders page size options and calls onChange with page 1 and the new size", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Pagination
          total={100}
          current={3}
          showSizeChanger
          pageSizeOptions={[10, 25]}
          onChange={onChange}
        />,
      );
      const select = screen.getByRole("combobox", { name: "Items per page" });
      expect(screen.getAllByRole("option")).toHaveLength(2);
      expect(select).toHaveValue("10");

      await user.selectOptions(select, "25");
      expect(onChange).toHaveBeenCalledWith(1, 25);
      expect(select).toHaveValue("25");
      // 100 / 25 = 4 pages
      expect(pageButton(4)).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Page 5" }),
      ).not.toBeInTheDocument();
    });

    it("follows pageSize prop changes after mount", () => {
      const { rerender } = render(
        <Pagination total={100} pageSize={10} showSizeChanger />,
      );
      expect(screen.getByRole("button", { name: "Page 10" })).toBeVisible();
      rerender(<Pagination total={100} pageSize={50} showSizeChanger />);
      expect(
        screen.getByRole("combobox", { name: "Items per page" }),
      ).toHaveValue("50");
      expect(pageButton(2)).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Page 3" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("simple mode", () => {
    it("renders the current page input and total pages", () => {
      render(<Pagination total={50} current={2} simple />);
      expect(screen.getByRole("textbox")).toHaveValue("2");
      expect(screen.getByText("/")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Page 1" }),
      ).not.toBeInTheDocument();
    });

    it("jumps to a typed page on Enter", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={1} simple onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await user.type(input, "4{Enter}", {
        initialSelectionStart: 0,
        initialSelectionEnd: 1,
      });
      expect(onChange).toHaveBeenCalledWith(4, 10);
    });

    it("allows emptying the input while typing", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await user.clear(input);
      expect(input).toHaveValue("");
      await user.type(input, "3");
      expect(input).toHaveValue("3");
      expect(onChange).not.toHaveBeenCalled();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenCalledWith(3, 10);
    });

    it("clamps out-of-range values on commit", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "99{Enter}");
      expect(onChange).toHaveBeenLastCalledWith(5, 10);
      await user.clear(input);
      await user.type(input, "0{Enter}");
      expect(onChange).toHaveBeenLastCalledWith(1, 10);
    });

    it("reverts invalid or empty values on blur", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.tab();
      expect(input).toHaveValue("2");
      await user.clear(input);
      await user.type(input, "abc");
      await user.tab();
      expect(input).toHaveValue("2");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("commits the typed page on blur", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "4");
      await user.tab();
      expect(onChange).toHaveBeenCalledWith(4, 10);
    });

    it("does not change page with arrow keys while editing the input", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      await user.click(screen.getByRole("textbox"));
      await user.keyboard("{ArrowLeft}{ArrowRight}{Home}{End}");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("navigates with prev/next buttons", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination total={50} current={2} simple onChange={onChange} />);
      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(onChange).toHaveBeenLastCalledWith(3, 10);
      await user.click(screen.getByRole("button", { name: "Previous page" }));
      expect(onChange).toHaveBeenLastCalledWith(1, 10);
    });
  });
});
