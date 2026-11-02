import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { getByRoleDeep } from "../../../test/queries";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl (native)", () => {
  it("renders a labelled radiogroup of radio segments", async () => {
    await render(
      <SegmentedControl
        aria-label="View"
        options={[
          "Day",
          { value: "week", label: "Week" },
          { value: "grid", icon: <Text>#</Text>, "aria-label": "Grid" },
        ]}
        defaultValue="week"
      />,
    );
    expect(getByRoleDeep("radiogroup", { name: "View" })).toBeTruthy();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Day" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Grid" })).toBeTruthy();
  });

  it("selects a segment and reports it (uncontrolled)", async () => {
    const onChange = vi.fn();
    await render(
      <SegmentedControl
        aria-label="View"
        options={["list", "grid"]}
        defaultValue="list"
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("radio", { name: "grid" }));
    expect(onChange).toHaveBeenCalledWith("grid");
    expect(screen.getByRole("radio", { name: "grid" })).toBeChecked();
    // pressing the selection again does not report
    await fireEvent.press(screen.getByRole("radio", { name: "grid" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("keeps a controlled value", async () => {
    const onChange = vi.fn();
    await render(
      <SegmentedControl
        aria-label="View"
        options={["list", "grid"]}
        value="list"
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("radio", { name: "grid" }));
    expect(onChange).toHaveBeenCalledWith("grid");
    expect(screen.getByRole("radio", { name: "list" })).toBeChecked();
  });

  it("ignores disabled segments and a disabled control", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <SegmentedControl
        aria-label="View"
        options={["a", { value: "b", disabled: true }]}
        defaultValue="a"
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("radio", { name: "b" })).toBeDisabled();
    await fireEvent.press(screen.getByRole("radio", { name: "b" }));
    await rerender(
      <SegmentedControl
        aria-label="View"
        options={["a", "b"]}
        defaultValue="a"
        onChange={onChange}
        disabled
      />,
    );
    expect(screen.getByRole("radio", { name: "a" })).toBeDisabled();
    await fireEvent.press(screen.getByRole("radio", { name: "b" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
