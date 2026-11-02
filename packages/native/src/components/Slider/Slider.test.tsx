import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { hostElements } from "../../../test/queries";
import { Slider } from "./Slider";

const partOf = (name: string) =>
  hostElements().filter(
    (n) =>
      n.props.dataSet?.minerva === "slider" && n.props.dataSet?.part === name,
  );

/** Lays the track out at 200 dp */
async function layout() {
  await act(async () => {
    partOf("control")[0].props.onLayout({
      nativeEvent: { layout: { x: 0, y: 0, width: 200, height: 24 } },
    });
  });
}

const touch = (locationX: number) => ({ nativeEvent: { locationX } });

describe("Slider (native)", () => {
  it("is an adjustable control with its value", async () => {
    await render(<Slider accessibilityLabel="Volume" defaultValue={30} />);
    const thumb = screen.getByRole("adjustable", { name: "Volume" });
    expect(thumb).toHaveAccessibilityValue({
      min: 0,
      max: 100,
      now: 30,
      text: "30",
    });
  });

  it("increment / decrement actions step and commit", async () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    await render(
      <Slider
        accessibilityLabel="v"
        defaultValue={50}
        step={5}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />,
    );
    const thumb = screen.getByRole("adjustable");
    await fireEvent(thumb, "accessibilityAction", {
      nativeEvent: { actionName: "increment" },
    });
    await fireEvent(thumb, "accessibilityAction", {
      nativeEvent: { actionName: "decrement" },
    });
    await fireEvent(thumb, "accessibilityAction", {
      nativeEvent: { actionName: "decrement" },
    });
    expect(onChange.mock.calls.map((c) => c[0])).toEqual([55, 50, 45]);
    expect(onChangeEnd).toHaveBeenLastCalledWith(45);
  });

  it("drags: onChange while moving, onChangeEnd once on release", async () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    await render(
      <Slider
        accessibilityLabel="v"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        tooltip
      />,
    );
    await layout();
    const control = partOf("control")[0];
    await fireEvent(control, "responderGrant", touch(50));
    expect(partOf("root")[0].props.dataSet.dragging).toBe("");
    expect(partOf("tooltip")).toHaveLength(1);
    await fireEvent(control, "responderMove", touch(150));
    expect(onChangeEnd).not.toHaveBeenCalled();
    await fireEvent(control, "responderRelease", touch(150));
    expect(onChange.mock.calls.map((c) => c[0])).toEqual([25, 75]);
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith(75);
    expect(screen.getByRole("adjustable")).toHaveAccessibilityValue({
      now: 75,
    });
  });

  it("range: the closest thumb moves and cannot cross", async () => {
    const onChange = vi.fn();
    await render(
      <Slider
        accessibilityLabel="Price"
        range
        defaultValue={[20, 60]}
        onChange={onChange}
        showValue
      />,
    );
    await layout();
    const [start, end] = screen.getAllByRole("adjustable");
    expect(start).toHaveAccessibleName("Price Minimum");
    expect(end).toHaveAccessibleName("Price Maximum");
    const control = partOf("control")[0];
    await fireEvent(control, "responderGrant", touch(180));
    await fireEvent(control, "responderMove", touch(0));
    await fireEvent(control, "responderRelease", touch(0));
    expect(onChange).toHaveBeenLastCalledWith([20, 20]);
    expect(
      screen.getByText("20 – 20", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("marks and disabled", async () => {
    const onChange = vi.fn();
    await render(
      <Slider
        accessibilityLabel="v"
        disabled
        marks={[{ value: 0, label: "Low" }, { value: 50 }, { value: 100 }]}
        onChange={onChange}
      />,
    );
    expect(partOf("mark")).toHaveLength(3);
    expect(screen.getByText("Low")).toBeTruthy();
    expect(partOf("control")[0].props.onStartShouldSetResponder()).toBe(false);
    await fireEvent(screen.getByRole("adjustable"), "accessibilityAction", {
      nativeEvent: { actionName: "increment" },
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
