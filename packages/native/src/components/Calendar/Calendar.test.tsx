import { fireEvent, render, screen } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import {
  getByRoleDeep,
  queryAllByRoleDeep,
  queryPart,
} from "../../../test/queries";
import { Calendar } from "./Calendar";

const light = resolveTokens({ design: { preset: "touch" } });
const jan = new Date(2026, 0, 1);
const day = (d: number, m = 0) => new Date(2026, m, d);
/** The day button whose accessible name starts with "<Month> <d>," */
const dayButton = (d: number, month = "January") =>
  screen.getByRole("button", { name: new RegExp(`${month} ${d}, 2026`) });

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 0, 15, 10, 30));
});

describe("Calendar", () => {
  it("renders a labelled group: month title, weekdays, day buttons", async () => {
    await render(<Calendar defaultMonth={jan} />);
    expect(getByRoleDeep("group", { name: "Month calendar" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "1/2026" })).toBeTruthy();
    expect(
      screen.getByText("Sun", { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: /January \d+, 2026/ }),
    ).toHaveLength(31);
    expect(dayButton(1)).toHaveAccessibleName("Thursday, January 1, 2026");
    expect(dayButton(15)).toHaveAccessibleName(
      "Thursday, January 15, 2026, Today",
    );
    // Sunday first: 4 empty cells before Thursday the 1st
    expect(queryPart("week", "calendar")?.children).toHaveLength(7);
  });

  it("navigates months, reporting the month", async () => {
    const onMonthChange = vi.fn();
    await render(<Calendar defaultMonth={jan} onMonthChange={onMonthChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Next month" }));
    expect(onMonthChange).toHaveBeenLastCalledWith(day(1, 1));
    expect(screen.getByRole("header", { name: "2/2026" })).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Previous month" }),
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Previous month" }),
    );
    expect(screen.getByRole("header", { name: "12/2025" })).toBeTruthy();
  });

  it("single: selects a day (uncontrolled)", async () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();
    await render(
      <Calendar defaultMonth={jan} onChange={onChange} onSelect={onSelect} />,
    );
    await fireEvent.press(dayButton(20));
    expect(onSelect).toHaveBeenCalledWith(day(20));
    expect(onChange).toHaveBeenCalledWith(day(20));
    expect(dayButton(20)).toBeSelected();
    await fireEvent.press(dayButton(21));
    expect(dayButton(20)).not.toBeSelected();
    expect(dayButton(21)).toBeSelected();
  });

  it("single: controlled value", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <Calendar value={day(5)} onChange={onChange} />,
    );
    // shows the month of the value
    expect(dayButton(5)).toBeSelected();
    await fireEvent.press(dayButton(6));
    expect(onChange).toHaveBeenCalledWith(day(6));
    expect(dayButton(5)).toBeSelected();
    await rerender(<Calendar value={day(6)} onChange={onChange} />);
    expect(dayButton(6)).toBeSelected();
  });

  it("multiple: toggles days", async () => {
    const onChange = vi.fn();
    await render(
      <Calendar type="multiple" defaultMonth={jan} onChange={onChange} />,
    );
    await fireEvent.press(dayButton(3));
    await fireEvent.press(dayButton(9));
    expect(onChange).toHaveBeenLastCalledWith([day(3), day(9)]);
    await fireEvent.press(dayButton(3));
    expect(onChange).toHaveBeenLastCalledWith([day(9)]);
    expect(dayButton(3)).not.toBeSelected();
    expect(dayButton(9)).toBeSelected();
  });

  it("range: start, end, middle tint and labels", async () => {
    const onChange = vi.fn();
    await render(
      <Calendar type="range" defaultMonth={jan} onChange={onChange} />,
    );
    await fireEvent.press(dayButton(10));
    expect(onChange).not.toHaveBeenCalled();
    expect(dayButton(10)).toHaveAccessibleName(
      "Saturday, January 10, 2026, Start",
    );
    // an earlier day restarts the range
    await fireEvent.press(dayButton(8));
    await fireEvent.press(dayButton(12));
    expect(onChange).toHaveBeenCalledWith([day(8), day(12)]);
    expect(dayButton(8)).toHaveAccessibleName(
      "Thursday, January 8, 2026, Start",
    );
    expect(dayButton(12)).toHaveAccessibleName("Monday, January 12, 2026, End");
    expect(dayButton(10)).toBeSelected();
    expect(dayButton(10)).toHaveStyle({
      backgroundColor: light.colors["primary-color-subtle"],
    });
    expect(dayButton(13)).not.toBeSelected();
    expect(screen.getByText("Start")).toBeTruthy();
    expect(screen.getByText("End")).toBeTruthy();
  });

  it("min / max dates and disabledDate disable days and navigation", async () => {
    const onChange = vi.fn();
    await render(
      <Calendar
        defaultMonth={jan}
        minDate={day(5)}
        maxDate={day(25)}
        disabledDate={(d) => d.getDate() === 10}
        onChange={onChange}
      />,
    );
    expect(dayButton(4)).toBeDisabled();
    expect(dayButton(26)).toBeDisabled();
    expect(dayButton(10)).toBeDisabled();
    expect(dayButton(5)).toBeEnabled();
    await fireEvent.press(dayButton(4));
    await fireEvent.press(dayButton(10));
    expect(onChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("disabled blocks everything", async () => {
    await render(<Calendar defaultMonth={jan} disabled />);
    expect(dayButton(15)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("firstDayOfWeek rotates the weekday header", async () => {
    await render(<Calendar defaultMonth={jan} firstDayOfWeek={1} />);
    const header = queryPart("weekdays", "calendar")!;
    const labels = header.children.map((c) =>
      typeof c === "string" ? c : c.children.join(""),
    );
    expect(labels).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  });

  it("today ring and selected fill use the tokens", async () => {
    await render(<Calendar defaultValue={day(20)} />);
    const ring = dayButton(15).children[0] as never;
    expect(ring).toHaveStyle({
      borderWidth: 1,
      borderColor: light.colors["primary-color"],
    });
    expect(dayButton(20).children[0] as never).toHaveStyle({
      backgroundColor: light.colors["primary-color"],
    });
    expect(screen.getByText("20")).toHaveStyle({
      color: light.colors["text-inverse-color"],
    });
  });

  it("translates titles, weekdays and labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Calendar defaultMonth={jan} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("header", { name: "2026年1月" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "下个月" })).toBeTruthy();
    expect(getByRoleDeep("group", { name: "月历" })).toBeTruthy();
    expect(
      screen.getByText("日", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  describe("poppable", () => {
    it("bottom sheet: title, confirm with the value, close", async () => {
      const onConfirm = vi.fn();
      const onOpenChange = vi.fn();
      await render(
        <Calendar
          poppable
          defaultOpen
          defaultMonth={jan}
          onConfirm={onConfirm}
          onOpenChange={onOpenChange}
        />,
      );
      expect(getByRoleDeep("dialog", { name: "Select date" })).toBeTruthy();
      const confirm = screen.getByRole("button", { name: "Confirm" });
      expect(confirm).toBeDisabled();
      await fireEvent.press(dayButton(7));
      await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
      expect(onConfirm).toHaveBeenCalledWith(day(7));
      expect(onOpenChange).toHaveBeenCalledWith(false, "confirm");
    });

    it("closed by default; close button; translated", async () => {
      const onOpenChange = vi.fn();
      const { rerender } = await render(<Calendar poppable />);
      expect(queryAllByRoleDeep("dialog")).toEqual([]);
      await rerender(
        <MinervaProvider locale={{ language: "zh" }}>
          <Calendar poppable open onOpenChange={onOpenChange} />
        </MinervaProvider>,
      );
      expect(getByRoleDeep("dialog", { name: "选择日期" })).toBeTruthy();
      expect(screen.getByRole("button", { name: "确定" })).toBeTruthy();
      await fireEvent.press(screen.getByRole("button", { name: "关闭" }));
      expect(onOpenChange).toHaveBeenCalledWith(false, "close-button");
    });
  });
});
