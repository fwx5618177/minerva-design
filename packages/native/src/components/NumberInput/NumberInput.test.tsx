import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { NumberInput, Stepper } from "./NumberInput";

const t = resolveTokens({ design: { preset: "touch" } });

const field = () => screen.getByRole("adjustable");
const type = async (text: string) => {
  await fireEvent.changeText(field(), text);
  await fireEvent(field(), "blur");
};

describe("NumberInput", () => {
  it("renders an adjustable field with its value and range", async () => {
    await render(<NumberInput label="Qty" defaultValue={3} min={0} max={10} />);
    const input = screen.getByRole("adjustable", { name: "Qty" });
    expect(input).toHaveDisplayValue("3");
    expect(input).toHaveAccessibilityValue({ min: 0, max: 10, now: 3 });
    expect(input.props.keyboardType).toBe("decimal-pad");
    // no stepper buttons by default (web parity)
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("empty by default", async () => {
    await render(<NumberInput accessibilityLabel="n" />);
    expect(field()).toHaveDisplayValue("");
  });

  it("commits typed text on blur (clamped and rounded)", async () => {
    const onChange = vi.fn();
    await render(
      <NumberInput
        accessibilityLabel="n"
        max={100}
        precision={1}
        onChange={onChange}
      />,
    );
    await fireEvent.changeText(field(), "12.34");
    expect(onChange).not.toHaveBeenCalled();
    expect(field()).toHaveDisplayValue("12.34");
    await fireEvent(field(), "blur");
    expect(onChange).toHaveBeenLastCalledWith(12.3);
    expect(field()).toHaveDisplayValue("12.3");
    await type("500");
    expect(onChange).toHaveBeenLastCalledWith(100);
  });

  it("commits on submit editing", async () => {
    const onChange = vi.fn();
    await render(<NumberInput accessibilityLabel="n" onChange={onChange} />);
    await fireEvent.changeText(field(), "7");
    await fireEvent(field(), "submitEditing");
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it("invalid draft: hint, invalid state, back to the value on blur", async () => {
    await render(
      <NumberInput accessibilityLabel="n" defaultValue={2} min={1} max={5} />,
    );
    await fireEvent.changeText(field(), "abc");
    expect(field().props.accessibilityHint).toBe("Enter a number");
    expect(queryPart("root", "number-input")!.props.dataSet.invalid).toBe("");
    await fireEvent.changeText(field(), "9");
    expect(field().props.accessibilityHint).toBe("Maximum 5");
    await fireEvent.changeText(field(), "0");
    expect(field().props.accessibilityHint).toBe("Minimum 1");
    await fireEvent.changeText(field(), "x");
    await fireEvent(field(), "blur");
    expect(field()).toHaveDisplayValue("2");
    expect(field().props.accessibilityHint).toBeUndefined();
  });

  it("clearing commits null, or min when allowEmpty is false", async () => {
    const onChange = vi.fn();
    await render(
      <>
        <NumberInput
          accessibilityLabel="a"
          defaultValue={4}
          onChange={onChange}
        />
        <NumberInput
          accessibilityLabel="b"
          defaultValue={4}
          min={2}
          allowEmpty={false}
          onChange={onChange}
        />
      </>,
    );
    await fireEvent.changeText(screen.getByLabelText("a"), "");
    await fireEvent(screen.getByLabelText("a"), "blur");
    expect(onChange).toHaveBeenLastCalledWith(null);
    await fireEvent.changeText(screen.getByLabelText("b"), " ");
    await fireEvent(screen.getByLabelText("b"), "blur");
    expect(onChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByLabelText("b")).toHaveDisplayValue("2");
  });

  it("stepper buttons move by step and disable at the bounds", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <NumberInput
        accessibilityLabel="n"
        showStepper
        defaultValue={0.5}
        step={0.5}
        min={0}
        max={1}
        onChange={onChange}
      />,
    );
    const plus = screen.getByRole("button", { name: "Increase" });
    const minus = screen.getByRole("button", { name: "Decrease" });
    await user.press(plus);
    expect(onChange).toHaveBeenLastCalledWith(1);
    expect(field()).toHaveDisplayValue("1.0");
    expect(plus).toBeDisabled();
    await user.press(minus);
    await user.press(minus);
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(minus).toBeDisabled();
    expect(plus).toBeEnabled();
  });

  it("holding a button repeats the step", async () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    await render(
      <NumberInput
        accessibilityLabel="n"
        showStepper
        defaultValue={0}
        onChange={onChange}
      />,
    );
    const plus = screen.getByRole("button", { name: "Increase" });
    await fireEvent(plus, "longPress");
    await act(() => vi.advanceTimersByTime(360));
    await fireEvent(plus, "pressOut");
    await act(() => vi.advanceTimersByTime(500));
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it("screen reader increment / decrement actions", async () => {
    const onChange = vi.fn();
    await render(
      <NumberInput
        accessibilityLabel="n"
        defaultValue={5}
        onChange={onChange}
      />,
    );
    expect(
      field().props.accessibilityActions.map((a: { name: string }) => a.name),
    ).toEqual(["increment", "decrement"]);
    await fireEvent(field(), "accessibilityAction", {
      nativeEvent: { actionName: "increment" },
    });
    expect(onChange).toHaveBeenLastCalledWith(6);
    await fireEvent(field(), "accessibilityAction", {
      nativeEvent: { actionName: "decrement" },
    });
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it("controlled: buttons request, the prop decides", async () => {
    const onChange = vi.fn();
    await render(
      <NumberInput
        accessibilityLabel="n"
        showStepper
        value={3}
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(field()).toHaveDisplayValue("3");
  });

  it("disabled and read-only ignore input", async () => {
    const onChange = vi.fn();
    await render(
      <NumberInput
        accessibilityLabel="n"
        showStepper
        disabled
        defaultValue={1}
        onChange={onChange}
      />,
    );
    expect(field()).toBeDisabled();
    expect(field().props.accessibilityActions).toBeUndefined();
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    await fireEvent.press(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("translates the button labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <NumberInput accessibilityLabel="n" showStepper />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "增加" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "减少" })).toBeTruthy();
  });

  it.each(["small", "medium", "large"] as const)("size %s", async (size) => {
    await render(<NumberInput accessibilityLabel="n" size={size} />);
    const step = { small: "sm", medium: "md", large: "lg" } as const;
    expect(queryPart("wrapper", "number-input")).toHaveStyle({
      minHeight: t.sizes[`control-height-${step[size]}`],
    });
  });

  it("invalid prop uses the danger border", async () => {
    await render(<NumberInput accessibilityLabel="n" invalid />);
    expect(queryPart("wrapper", "number-input")).toHaveStyle({
      borderColor: t.colors["danger-color"],
    });
  });
});

describe("Stepper", () => {
  it("compact stepper starting at min with buttons reaching 44pt", async () => {
    const onChange = vi.fn();
    await render(
      <Stepper
        accessibilityLabel="Guests"
        min={1}
        max={3}
        onChange={onChange}
      />,
    );
    expect(field()).toHaveDisplayValue("1");
    expect(queryPart("root", "number-input")!.props.dataSet.layout).toBe(
      "compact",
    );
    const minus = screen.getByRole("button", { name: "Decrease" });
    expect(minus).toBeDisabled();
    const size = Math.round(t.sizes["control-height-md"] * 0.72);
    const slop = Math.ceil((44 - size) / 2);
    expect(minus.props.hitSlop).toEqual({
      top: slop,
      bottom: slop,
      left: slop,
      right: slop,
    });
    await fireEvent.press(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("starts at 0 without min, keeps an explicit defaultValue", async () => {
    await render(
      <>
        <Stepper accessibilityLabel="a" />
        <Stepper accessibilityLabel="b" defaultValue={5} />
      </>,
    );
    expect(screen.getByLabelText("a")).toHaveDisplayValue("0");
    expect(screen.getByLabelText("b")).toHaveDisplayValue("5");
  });
});
