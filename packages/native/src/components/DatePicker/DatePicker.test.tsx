import { fireEvent, render, screen } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as Native from "../../index";
import { getByRoleDeep } from "../../../test/queries";

const day = (n: number) =>
  screen.getByRole("button", { name: new RegExp(`January ${n}, 2026`) });
const open = () => fireEvent.press(screen.getByRole("combobox"));
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 0, 15, 12));
});

describe("DatePicker", () => {
  it("exports a usable date picker from the native entry", () => {
    expect(Native).toHaveProperty("DatePicker");
  });

  it("opens an accessible calendar and commits a local YYYY-MM-DD day immediately", async () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <Native.DatePicker
        label="Departure"
        defaultValue="2026-01-10"
        onChange={onChange}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByText("Departure")).toBeTruthy();
    await open();
    expect(getByRoleDeep("dialog", { name: "Departure" })).toBeTruthy();
    expect(day(10)).toBeSelected();
    await fireEvent.press(day(20));
    expect(onChange).toHaveBeenCalledExactlyOnceWith("2026-01-20");
    expect(screen.getByRole("combobox").props.accessibilityValue.text).toBe(
      "2026-01-20",
    );
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    expect(screen.getByRole("combobox").props.accessibilityState.expanded).toBe(
      false,
    );
  });

  it.each([null, "", "2026-01-10"])(
    "keeps controlled value %s until parent changes it",
    async (value) => {
      const onChange = vi.fn();
      const { rerender } = await render(
        <Native.DatePicker
          value={value}
          defaultValue="2025-12-01"
          onChange={onChange}
        />,
      );
      const original = value || "Select date";
      expect(screen.getByRole("combobox").props.accessibilityValue.text).toBe(
        original,
      );
      await open();
      await fireEvent.press(day(20));
      expect(onChange).toHaveBeenLastCalledWith("2026-01-20");
      expect(screen.getByRole("combobox").props.accessibilityValue.text).toBe(
        original,
      );
      await rerender(
        <Native.DatePicker value="2026-02-03" onChange={onChange} />,
      );
      await open();
      expect(
        screen.getByRole("button", { name: /February 3, 2026/ }),
      ).toBeSelected();
    },
  );

  it("enforces inclusive min/max bounds and prevents out-of-range Today", async () => {
    const onChange = vi.fn();
    await render(
      <Native.DatePicker
        minDate="2026-01-10"
        maxDate="2026-01-12"
        onChange={onChange}
      />,
    );
    await open();
    expect(day(9)).toBeDisabled();
    expect(day(10)).not.toBeDisabled();
    expect(day(12)).not.toBeDisabled();
    expect(day(13)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Today" })).toBeDisabled();
    await fireEvent.press(day(9));
    await fireEvent.press(screen.getByRole("button", { name: "Today" }));
    expect(onChange).not.toHaveBeenCalled();
    await fireEvent.press(day(12));
    expect(onChange).toHaveBeenCalledExactlyOnceWith("2026-01-12");
  });

  it("clears to an empty string and honors clearable=false", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <Native.DatePicker defaultValue="2026-01-10" onChange={onChange} />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Clear date" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith("");
    expect(screen.getByRole("combobox").props.accessibilityValue.text).toBe(
      "Select date",
    );
    await rerender(<Native.DatePicker value="2026-01-10" clearable={false} />);
    expect(screen.queryByRole("button", { name: "Clear date" })).toBeNull();
  });

  it.each(["disabled", "readOnly"] as const)(
    "blocks opening and clearing when %s",
    async (prop) => {
      const onChange = vi.fn();
      const onOpenChange = vi.fn();
      await render(
        <Native.DatePicker
          {...{ [prop]: true }}
          defaultValue="2026-01-10"
          onChange={onChange}
          onOpenChange={onOpenChange}
        />,
      );
      expect(screen.getByRole("combobox")).toBeDisabled();
      await open();
      expect(screen.queryByRole("button", { name: "Clear date" })).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      expect(onOpenChange).not.toHaveBeenCalled();
    },
  );

  it("dismisses without changing the date", async () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <Native.DatePicker
        defaultValue="2026-01-10"
        onChange={onChange}
        onOpenChange={onOpenChange}
      />,
    );
    await open();
    await fireEvent.press(screen.getByRole("button", { name: "Close" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it("inherits FormControl label and read-only state with explicit override", async () => {
    const { rerender } = await render(
      <Native.FormControl readOnly>
        <Native.FormLabel>Travel date</Native.FormLabel>
        <Native.DatePicker />
      </Native.FormControl>,
    );
    expect(
      screen.getByRole("combobox", { name: "Travel date" }),
    ).toBeDisabled();
    await rerender(
      <Native.FormControl readOnly>
        <Native.FormLabel>Travel date</Native.FormLabel>
        <Native.DatePicker readOnly={false} />
      </Native.FormControl>,
    );
    expect(
      screen.getByRole("combobox", { name: "Travel date" }),
    ).not.toBeDisabled();
  });

  it("formats month and date names using the requested locale", async () => {
    await render(<Native.DatePicker defaultValue="2026-01-10" locale="fr" />);
    await open();
    expect(screen.getByRole("header", { name: "janvier 2026" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /10 janvier 2026/ }),
    ).toBeSelected();
  });
});
