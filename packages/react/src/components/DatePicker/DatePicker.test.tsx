import { createRef } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DatePicker from "./DatePicker";
import { FormControl, FormField, FormLabel } from "../FormControl";

describe("DatePicker", () => {
  it("renders an empty input with the default placeholder and name", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox", { name: "Date" });
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Select date");
    expect(input).toHaveAttribute("name", "date-picker");
  });

  it("supports controlled and uncontrolled YYYY-MM-DD values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker defaultValue="2026-10-17" onChange={onChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("2026-10-17");

    await user.clear(input);
    expect(onChange).toHaveBeenLastCalledWith("");

    await user.type(input, "2026-12-31");
    expect(onChange).toHaveBeenLastCalledWith("2026-12-31");
    expect(input).toHaveValue("2026-12-31");
  });

  it("opens the popup calendar on click and selects a day", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker defaultValue="2026-10-15" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const cell = within(dialog).getByRole("gridcell", { name: "2026-10-20" });
    await user.click(cell);

    expect(onChange).toHaveBeenCalledWith("2026-10-20");
    expect(input).toHaveValue("2026-10-20");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("supports keyboard navigation and clearing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker defaultValue="2026-10-15" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    input.focus();
    await user.keyboard("{ArrowDown}");
    const dialog = screen.getByRole("dialog");
    await waitFor(() =>
      expect(
        within(dialog).getByRole("gridcell", { name: "2026-10-15" }),
      ).toHaveFocus(),
    );

    await user.keyboard("{ArrowRight}{Enter}");
    expect(onChange).toHaveBeenCalledWith("2026-10-16");
    expect(input).toHaveValue("2026-10-16");

    await user.click(screen.getByRole("button", { name: "Clear date" }));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(input).toHaveValue("");
  });

  it("integrates with FormField / FormControl", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormField id="deadline" label="截止日期（选填）">
        <DatePicker onChange={onChange} />
      </FormField>,
    );
    const input = screen.getByLabelText("截止日期（选填）");
    expect(input).toHaveAttribute("id", "deadline");
    await user.type(input, "2026-12-31");
    expect(onChange).toHaveBeenLastCalledWith("2026-12-31");
  });

  it("respects disabled and readOnly states and forwards ref", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(
      <FormControl readOnly>
        <FormLabel>Start</FormLabel>
        <DatePicker ref={ref} defaultValue="2026-10-15" />
      </FormControl>,
    );
    const input = screen.getByLabelText("Start");
    expect(ref.current).toBe(input);
    await user.click(input);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
