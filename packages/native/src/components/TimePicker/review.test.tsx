import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { TimePicker } from "./index";
import { MinervaProvider } from "../../theme/MinervaProvider";

describe("TimePicker review regressions", () => {
  it("uses twelve hour choices and a separate period selector without changing minutes", async () => {
    const onChange = vi.fn();
    await render(
      <TimePicker
        label="Time"
        use12Hours
        defaultValue={new Date(2026, 0, 1, 9, 30)}
        showSecond={false}
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("combobox"));
    expect(
      screen
        .getAllByRole("button")
        .filter((node) =>
          String(node.props.accessibilityLabel).startsWith("Hours "),
        ),
    ).toHaveLength(12);
    await fireEvent.press(screen.getByRole("button", { name: "AM/PM PM" }));
    await fireEvent.press(screen.getByRole("button", { name: "Hours 12" }));
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange.mock.calls[0][0].getHours()).toBe(12);
    expect(onChange.mock.calls[0][0].getMinutes()).toBe(30);
  });
  it("localizes unit and clear labels through the provider", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <TimePicker defaultValue={new Date(2026, 0, 1, 9, 30)} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "清除时间" })).toBeTruthy();
    await fireEvent.press(screen.getByRole("combobox"));
    expect(screen.queryByText("Hour")).toBeNull();
    expect(screen.getByText("时")).toBeTruthy();
  });
});
