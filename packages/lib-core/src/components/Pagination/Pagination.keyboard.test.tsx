import type { FormEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

const pageButton = (page: number) =>
  screen.getByRole("button", { name: `Page ${page}` });

describe("Pagination keyboard", () => {
  it("reaches every enabled control in DOM order with Tab, skipping disabled ones", async () => {
    const user = userEvent.setup();
    render(<Pagination total={30} showQuickJumper showSizeChanger showTotal />);
    // Previous is disabled on the first page: not a tab stop
    await user.tab();
    expect(pageButton(1)).toHaveFocus();
    await user.tab();
    expect(pageButton(2)).toHaveFocus();
    await user.tab();
    expect(pageButton(3)).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Next page" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Jump to page" })).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("combobox", { name: "Items per page" }),
    ).toHaveFocus();
  });

  it("operates Previous / Next with Space and Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination total={50} defaultCurrent={3} onChange={onChange} />);
    const prev = screen.getByRole("button", { name: "Previous page" });
    prev.focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
    screen.getByRole("button", { name: "Next page" }).focus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(3, 10);
  });

  it("jumps with Enter in the quick jumper without submitting an enclosing form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: FormEvent) => e.preventDefault());
    const onChange = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Pagination total={100} showQuickJumper onChange={onChange} />
      </form>,
    );
    const input = screen.getByRole("textbox", { name: "Jump to page" });
    await user.type(input, "4{Enter}");
    expect(onChange).toHaveBeenCalledWith(4, 10);
    expect(onSubmit).not.toHaveBeenCalled();
    // focus stays in the jumper for another jump
    expect(input).toHaveFocus();
    expect(pageButton(4)).toHaveAttribute("aria-current", "page");
  });

  it("commits the simple-mode input with Enter without submitting an enclosing form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: FormEvent) => e.preventDefault());
    const onChange = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Pagination total={100} simple onChange={onChange} />
      </form>,
    );
    const input = screen.getByRole("textbox", { name: "Current page" });
    await user.clear(input);
    await user.type(input, "6{Enter}");
    expect(onChange).toHaveBeenCalledWith(6, 10);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("changes the page size from the keyboard-focused native select and keeps focus there", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination total={100} showSizeChanger onChange={onChange} />);
    const select = screen.getByRole("combobox", { name: "Items per page" });
    select.focus();
    await user.selectOptions(select, "20");
    expect(onChange).toHaveBeenCalledWith(1, 20);
    expect(select).toHaveFocus();
  });

  it("keeps keyboard focus inside the navigation when a focused jump item disappears", async () => {
    const user = userEvent.setup();
    render(<Pagination total={100} defaultCurrent={4} />);
    const jumpNext = screen.getByRole("button", { name: "Next 5 pages" });
    jumpNext.focus();
    await user.keyboard("{Enter}");
    // page 9 of 10: no more jump-next item, focus goes to the current page
    expect(
      screen.queryByRole("button", { name: "Next 5 pages" }),
    ).not.toBeInTheDocument();
    expect(pageButton(9)).toHaveFocus();
  });
});
