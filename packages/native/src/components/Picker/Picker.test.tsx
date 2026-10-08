import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import {
  getByRoleDeep,
  hostElements,
  queryAllByRoleDeep,
  queryPart,
} from "../../../test/queries";
import { Button } from "../Button";
import { Picker, PickerView, type PickerOption } from "./Picker";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));
const step = (el: ReturnType<typeof screen.getByRole>, name: string) =>
  fireEvent(el, "accessibilityAction", { nativeEvent: { actionName: name } });
const wheels = () =>
  hostElements().filter((el) => el.props.dataSet?.part === "wheel");

const fruits: PickerOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana", disabled: true },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

const regions: PickerOption[] = [
  {
    value: "zj",
    label: "Zhejiang",
    children: [
      { value: "hz", label: "Hangzhou" },
      { value: "nb", label: "Ningbo" },
    ],
  },
  {
    value: "js",
    label: "Jiangsu",
    children: [
      { value: "nj", label: "Nanjing" },
      { value: "sz", label: "Suzhou" },
    ],
  },
];

describe("PickerView", () => {
  it("one adjustable wheel per column, valued by the selection", async () => {
    await render(<PickerView options={fruits} />);
    const wheel = screen.getByRole("adjustable", { name: "Column 1" });
    expect(wheel).toHaveAccessibilityValue({ text: "Apple" });
    expect(wheel.props.accessibilityActions).toEqual([
      { name: "increment" },
      { name: "decrement" },
    ]);
    expect(queryPart("highlight", "picker")).toBeTruthy();
  });

  it("increment / decrement skip disabled options and call onChange", async () => {
    const onChange = vi.fn();
    await render(<PickerView options={fruits} onChange={onChange} />);
    const wheel = screen.getByRole("adjustable");
    await step(wheel, "increment");
    expect(onChange).toHaveBeenLastCalledWith(["cherry"], [fruits[2]]);
    expect(screen.getByRole("adjustable")).toHaveAccessibilityValue({
      text: "Cherry",
    });
    await step(screen.getByRole("adjustable"), "decrement");
    expect(onChange).toHaveBeenLastCalledWith(["apple"], [fruits[0]]);
  });

  it("tapping a row or ending a scroll selects (disabled rows land on the nearest)", async () => {
    const onChange = vi.fn();
    await render(
      <PickerView options={fruits} onChange={onChange} itemHeight={40} />,
    );
    await fireEvent.press(screen.getByText("Date"));
    expect(onChange).toHaveBeenLastCalledWith(["date"], [fruits[3]]);
    await fireEvent(wheels()[0], "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 0, y: 40 } },
    });
    // banana is disabled: lands on the next enabled row
    expect(onChange).toHaveBeenLastCalledWith(["cherry"], [fruits[2]]);
    await fireEvent(wheels()[0], "scrollEndDrag", {
      nativeEvent: { contentOffset: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
    });
    expect(onChange).toHaveBeenLastCalledWith(["apple"], [fruits[0]]);
  });

  it("cascading options recompute the next columns", async () => {
    const onChange = vi.fn();
    await render(
      <PickerView
        options={regions}
        defaultValue={["zj", "nb"]}
        onChange={onChange}
        columnLabels={["Province", "City"]}
      />,
    );
    expect(
      screen.getByRole("adjustable", { name: "City" }),
    ).toHaveAccessibilityValue({
      text: "Ningbo",
    });
    await step(
      screen.getByRole("adjustable", { name: "Province" }),
      "increment",
    );
    expect(onChange).toHaveBeenLastCalledWith(
      ["js", "nj"],
      [regions[1], regions[1].children![0]],
    );
    expect(screen.getByText("Suzhou")).toBeTruthy();
  });

  it("independent columns report their own options", async () => {
    const onChange = vi.fn();
    const am = [
      { value: "am", label: "AM" },
      { value: "pm", label: "PM" },
    ];
    const hours = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
    ];
    await render(<PickerView columns={[am, hours]} onChange={onChange} />);
    expect(screen.getAllByRole("adjustable")).toHaveLength(2);
    await step(
      screen.getByRole("adjustable", { name: "Column 2" }),
      "increment",
    );
    expect(onChange).toHaveBeenLastCalledWith(["am", 2], [am[0], hours[1]]);
  });

  it("controlled: requests only", async () => {
    const onChange = vi.fn();
    await render(
      <PickerView options={fruits} value={["date"]} onChange={onChange} />,
    );
    await step(screen.getByRole("adjustable"), "decrement");
    expect(onChange).toHaveBeenCalledWith(["cherry"], [fruits[2]]);
    expect(screen.getByRole("adjustable")).toHaveAccessibilityValue({
      text: "Date",
    });
  });
});

describe("Picker", () => {
  it("a bottom sheet with a cancel / title / confirm toolbar", async () => {
    await render(<Picker defaultOpen title="Fruit" options={fruits} />);
    expect(getByRoleDeep("dialog", { name: "Fruit" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "Fruit" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeTruthy();
    // single column named by the title
    expect(screen.getByRole("adjustable", { name: "Fruit" })).toBeTruthy();
  });

  it("confirm reports the picked values and closes", async () => {
    const onChange = vi.fn();
    const onPick = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <Picker
        defaultOpen
        options={fruits}
        onChange={onChange}
        onPick={onPick}
        onOpenChange={onOpenChange}
      />,
    );
    await step(screen.getByRole("adjustable"), "increment");
    expect(onPick).toHaveBeenCalledWith(["cherry"], [fruits[2]]);
    expect(onChange).not.toHaveBeenCalled();
    await user.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(["cherry"], [fruits[2]]);
    expect(onOpenChange).toHaveBeenCalledWith(false, "confirm");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it("confirm without scrolling resolves the default path", async () => {
    const onChange = vi.fn();
    await render(<Picker defaultOpen options={regions} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(
      ["zj", "hz"],
      [regions[0], regions[0].children![0]],
    );
  });

  it("cancel drops the pending choice; reopening starts from the value", async () => {
    const onChange = vi.fn();
    const onCancel = vi.fn();
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onPress={() => setOpen(true)}>Pick</Button>
          <Picker
            open={open}
            onOpenChange={setOpen}
            options={fruits}
            defaultValue={["date"]}
            onChange={onChange}
            onCancel={onCancel}
          />
        </>
      );
    }
    await render(<App />);
    await fireEvent.press(screen.getByRole("button", { name: "Pick" }));
    await step(screen.getByRole("adjustable"), "decrement");
    expect(screen.getByRole("adjustable")).toHaveAccessibilityValue({
      text: "Cherry",
    });
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    await fireEvent.press(screen.getByRole("button", { name: "Pick" }));
    expect(screen.getByRole("adjustable")).toHaveAccessibilityValue({
      text: "Date",
    });
  });

  it("mask closes it with reason mask", async () => {
    const onOpenChange = vi.fn();
    await render(
      <Picker defaultOpen options={fruits} onOpenChange={onOpenChange} />,
    );
    await fireEvent.press(queryPart("overlay", "picker")!);
    expect(onOpenChange).toHaveBeenCalledWith(false, "mask");
  });

  it("localized toolbar and dark tokens", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <Picker defaultOpen columns={[fruits, fruits]} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "确认" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "取消" })).toBeTruthy();
    expect(screen.getByRole("adjustable", { name: "第 2 列" })).toBeTruthy();
    expect(queryPart("highlight", "picker")).toHaveStyle({
      backgroundColor: dark.colors["surface-muted-color"],
    });
  });
});
