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

/** Lays a vertical track out at 200 dp high */
async function layoutVertical() {
  await act(async () => {
    partOf("control")[0].props.onLayout({
      nativeEvent: { layout: { x: 0, y: 0, width: 24, height: 200 } },
    });
  });
}

const touch = (locationX: number) => ({ nativeEvent: { locationX } });
/** A touch at `locationY` dp from the top of a vertical track */
const touchY = (locationY: number) => ({
  nativeEvent: { locationX: 12, locationY },
});
const flat = (style: unknown) =>
  Object.assign({}, ...[style].flat(Infinity).filter(Boolean));

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

  describe("vertical", () => {
    it("runs bottom (min) to top (max) with a 160 dp default length", async () => {
      await render(
        <Slider
          accessibilityLabel="Level"
          orientation="vertical"
          defaultValue={25}
          showValue
        />,
      );
      expect(partOf("root")[0].props.dataSet.orientation).toBe("vertical");
      const rootStyle = flat(partOf("root")[0].props.style);
      expect(rootStyle.flexDirection).toBe("column-reverse");
      expect(flat(partOf("control")[0].props.style).flexBasis).toBe(160);
      await layoutVertical();
      const thumb = screen.getByRole("adjustable", { name: "Level" });
      expect(thumb.props["aria-orientation"]).toBe("vertical");
      // 25% of 200 dp from the bottom, centered (24 dp thumb)
      const thumbStyle = flat(thumb.props.style);
      expect(thumbStyle.bottom).toBe(38);
      expect(thumbStyle.start).toBeUndefined();
      expect(flat(partOf("range")[0].props.style)).toMatchObject({
        bottom: 0,
        height: 50,
      });
    });

    it("tap at the bottom = min, drag up increases, onChangeEnd on release", async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      await render(
        <Slider
          accessibilityLabel="v"
          orientation="vertical"
          defaultValue={50}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
          tooltip
        />,
      );
      await layoutVertical();
      const control = partOf("control")[0];
      await fireEvent(control, "responderGrant", touchY(200));
      expect(partOf("tooltip")).toHaveLength(1);
      expect(flat(partOf("tooltip")[0].props.style).bottom).toBeUndefined();
      await fireEvent(control, "responderMove", touchY(150));
      await fireEvent(control, "responderMove", touchY(20));
      // past the top end: clamped to max
      await fireEvent(control, "responderMove", touchY(-30));
      await fireEvent(control, "responderRelease", touchY(-30));
      expect(onChange.mock.calls.map((c) => c[0])).toEqual([0, 25, 90, 100]);
      expect(onChangeEnd).toHaveBeenCalledTimes(1);
      expect(onChangeEnd).toHaveBeenCalledWith(100);
    });

    it("range: the closest thumb follows the vertical position", async () => {
      const onChange = vi.fn();
      await render(
        <Slider
          accessibilityLabel="Band"
          orientation="vertical"
          range
          defaultValue={[20, 60]}
          onChange={onChange}
          marks={[
            { value: 0, label: "Low" },
            { value: 100, label: "High" },
          ]}
        />,
      );
      await layoutVertical();
      const control = partOf("control")[0];
      // 80 dp from the top = 60: the end thumb; drag it below the start
      await fireEvent(control, "responderGrant", touchY(40));
      await fireEvent(control, "responderMove", touchY(190));
      await fireEvent(control, "responderRelease", touchY(190));
      expect(onChange.mock.calls.map((c) => c[0])).toEqual([
        [20, 80],
        [20, 20],
      ]);
      // the bottom of the track moves the start thumb down
      await fireEvent(control, "responderGrant", touchY(200));
      await fireEvent(control, "responderRelease", touchY(200));
      expect(onChange).toHaveBeenLastCalledWith([0, 20]);
      const label = screen.getByText("High");
      expect(flat(label.props.style).start).toBeDefined();
      expect(flat(partOf("mark")[1].props.style).bottom).toBe(198);
    });

    it("increment / decrement still step", async () => {
      const onChange = vi.fn();
      await render(
        <Slider
          accessibilityLabel="v"
          orientation="vertical"
          defaultValue={10}
          onChange={onChange}
        />,
      );
      const thumb = screen.getByRole("adjustable");
      await fireEvent(thumb, "accessibilityAction", {
        nativeEvent: { actionName: "increment" },
      });
      await fireEvent(thumb, "accessibilityAction", {
        nativeEvent: { actionName: "decrement" },
      });
      expect(onChange.mock.calls.map((c) => c[0])).toEqual([11, 10]);
    });
  });
});
