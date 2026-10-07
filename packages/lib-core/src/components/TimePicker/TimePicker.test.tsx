import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TimePicker from "./TimePicker";
import type { TimePickerProps } from "./types";

const at = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);

const renderTimePicker = (props: Partial<TimePickerProps> = {}) =>
  render(<TimePicker {...props} />);

const getInput = () => screen.getByRole("textbox");

const getColumns = () =>
  Array.from(
    screen.getByRole("dialog").querySelectorAll<HTMLElement>(".timeColumn"),
  );

const openPanel = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(getInput());
  return getColumns();
};

const lastDate = (fn: ReturnType<typeof vi.fn>) =>
  fn.mock.lastCall?.[0] as Date | undefined;

describe("TimePicker", () => {
  it("renders an empty input with the default placeholder", () => {
    renderTimePicker();

    const input = getInput();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Select time");
    expect(input).toHaveAttribute("name", "time-picker");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("formats defaultValue and value with the default format", () => {
    const { unmount } = renderTimePicker({ defaultValue: at(9, 5, 7) });
    expect(getInput()).toHaveValue("09:05:07");
    unmount();

    renderTimePicker({ value: at(23, 59, 0) });
    expect(getInput()).toHaveValue("23:59:00");
  });

  it("supports custom format, placeholder and className", () => {
    const { container } = renderTimePicker({
      defaultValue: at(14, 30, 0),
      format: "HH:mm",
      placeholder: "Pick",
      className: "custom",
    });

    expect(getInput()).toHaveValue("14:30");
    expect(container.firstChild).toHaveClass("timePicker", "custom");
  });

  it("applies the size to the input", () => {
    const { container } = renderTimePicker({ size: "small" });

    expect(container.querySelector(".textField")).toHaveClass("small");
  });

  it("opens the panel when the input is clicked and toggles closed on a second click", async () => {
    const user = userEvent.setup();
    renderTimePicker({ defaultValue: at(10, 30, 45) });

    const columns = await openPanel(user);
    expect(columns).toHaveLength(3);
    expect(within(columns[0]).getAllByText(/^\d\d$/)).toHaveLength(24);
    expect(within(columns[1]).getAllByText(/^\d\d$/)).toHaveLength(60);
    expect(within(columns[2]).getAllByText(/^\d\d$/)).toHaveLength(60);

    expect(within(columns[0]).getByText("10")).toHaveClass("selected");
    expect(within(columns[1]).getByText("30")).toHaveClass("selected");
    expect(within(columns[2]).getByText("45")).toHaveClass("selected");

    await user.click(getInput());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onChange and updates the input when hour, minute and second are clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ defaultValue: at(10, 30, 45), onChange });

    const columns = await openPanel(user);

    await user.click(within(columns[0]).getByText("08"));
    expect(lastDate(onChange)?.getHours()).toBe(8);
    expect(getInput()).toHaveValue("08:30:45");

    await user.click(within(getColumns()[1]).getByText("15"));
    expect(lastDate(onChange)?.getMinutes()).toBe(15);
    expect(getInput()).toHaveValue("08:15:45");

    await user.click(within(getColumns()[2]).getByText("05"));
    const date = lastDate(onChange);
    expect(date).toBeInstanceOf(Date);
    expect([date?.getHours(), date?.getMinutes(), date?.getSeconds()]).toEqual([
      8, 15, 5,
    ]);
    expect(getInput()).toHaveValue("08:15:05");
    expect(within(getColumns()[2]).getByText("05")).toHaveClass("selected");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("hides the seconds column when showSecond is false", async () => {
    const user = userEvent.setup();
    renderTimePicker({ showSecond: false, format: "HH:mm" });

    const columns = await openPanel(user);
    expect(columns).toHaveLength(2);
  });

  it("respects hour, minute and second steps", async () => {
    const user = userEvent.setup();
    renderTimePicker({ hourStep: 2, minuteStep: 15, secondStep: 30 });

    const [hours, minutes, seconds] = await openPanel(user);
    expect(
      within(hours)
        .getAllByText(/^\d\d$/)
        .map((el) => el.textContent),
    ).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i * 2).padStart(2, "0")),
    );
    expect(
      within(minutes)
        .getAllByText(/^\d\d$/)
        .map((el) => el.textContent),
    ).toEqual(["00", "15", "30", "45"]);
    expect(
      within(seconds)
        .getAllByText(/^\d\d$/)
        .map((el) => el.textContent),
    ).toEqual(["00", "30"]);
  });

  it("disables units outside minTime/maxTime and ignores clicks on them", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({
      defaultValue: at(9, 30, 0),
      minTime: at(9, 15, 0),
      maxTime: at(17, 0, 0),
      onChange,
    });

    const [hours, minutes] = await openPanel(user);
    expect(within(hours).getByText("08")).toHaveClass("disabled");
    expect(within(hours).getByText("09")).not.toHaveClass("disabled");
    expect(within(hours).getByText("17")).not.toHaveClass("disabled");
    expect(within(hours).getByText("18")).toHaveClass("disabled");
    // Current hour is the min boundary hour, so earlier minutes are disabled
    expect(within(minutes).getByText("14")).toHaveClass("disabled");
    expect(within(minutes).getByText("15")).not.toHaveClass("disabled");

    await user.click(within(hours).getByText("08"));
    await user.click(within(minutes).getByText("14"));
    expect(onChange).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("09:30:00");
  });

  it("supports 12-hour mode with AM/PM switching", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({
      defaultValue: at(10, 30, 45),
      use12Hours: true,
      format: "hh:mm:ss a",
      onChange,
    });

    expect(getInput()).toHaveValue("10:30:45 AM");

    const columns = await openPanel(user);
    expect(columns).toHaveLength(4);
    expect(
      within(columns[0])
        .getAllByText(/^\d\d$/)
        .map((el) => el.textContent),
    ).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
    expect(within(columns[3]).getByText("AM")).toHaveClass("selected");

    await user.click(within(columns[3]).getByText("PM"));
    expect(lastDate(onChange)?.getHours()).toBe(22);
    expect(getInput()).toHaveValue("10:30:45 PM");
    expect(within(getColumns()[3]).getByText("PM")).toHaveClass("selected");
    expect(within(getColumns()[0]).getByText("10")).toHaveClass("selected");

    // Picking an hour keeps the PM period
    await user.click(within(getColumns()[0]).getByText("03"));
    expect(lastDate(onChange)?.getHours()).toBe(15);
    expect(getInput()).toHaveValue("03:30:45 PM");
    expect(within(getColumns()[0]).getByText("03")).toHaveClass("selected");

    await user.click(within(getColumns()[0]).getByText("12"));
    expect(lastDate(onChange)?.getHours()).toBe(12);
    expect(getInput()).toHaveValue("12:30:45 PM");

    await user.click(within(getColumns()[3]).getByText("AM"));
    expect(lastDate(onChange)?.getHours()).toBe(0);
    expect(getInput()).toHaveValue("12:30:45 AM");
  });

  it("parses typed input and calls onChange for valid times", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });

    await user.type(getInput(), "12:34:56");

    expect(getInput()).toHaveValue("12:34:56");
    const date = lastDate(onChange);
    expect([date?.getHours(), date?.getMinutes(), date?.getSeconds()]).toEqual([
      12, 34, 56,
    ]);
  });

  it("does not call onChange for invalid input and clears it on blur", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });

    await user.type(getInput(), "ab");
    expect(onChange).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("ab");

    await user.tab();
    expect(getInput()).toHaveValue("");
  });

  it("normalizes the input to the format on blur", async () => {
    const user = userEvent.setup();
    renderTimePicker();

    await user.type(getInput(), "1:2:3");
    await user.tab();

    expect(getInput()).toHaveValue("01:02:03");
  });

  it("clears the value via the suffix button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      onChange,
    });

    expect(container.querySelector(".clearButton")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "icon button" }));

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(getInput()).toHaveValue("");
    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();
    expect(container.querySelector(".clockIcon")).toBeInTheDocument();
  });

  it("does not render a clear button when clearable is false", () => {
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      clearable: false,
    });

    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();
    expect(container.querySelector(".clockIcon")).toBeInTheDocument();
  });

  it("disables the input and never opens the panel when disabled", async () => {
    const user = userEvent.setup();
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      disabled: true,
    });

    expect(getInput()).toBeDisabled();
    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();

    await user.click(getInput());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
