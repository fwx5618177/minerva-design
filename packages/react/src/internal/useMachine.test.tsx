import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { useState } from "react";
import { createSwitchMachine, createTabsMachine } from "@minerva/core";
import { useMachine } from "./useMachine";

function Switch(props: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const [state, send] = useMachine(createSwitchMachine, props);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={state.checked}
      onClick={() => send({ type: "TOGGLE" })}
    />
  );
}

describe("useMachine", () => {
  it("runs uncontrolled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    const button = screen.getByRole("switch");
    act(() => button.click());
    expect(button).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders controlled values in the same render and syncs them", () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={onCheckedChange} />,
    );
    const button = screen.getByRole("switch");
    act(() => button.click());
    // rejected by the owner
    expect(button).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
    rerender(<Switch checked onCheckedChange={onCheckedChange} />);
    expect(button).toHaveAttribute("aria-checked", "true");
    // the latest props (and callbacks) are used by later events
    const next = vi.fn();
    rerender(<Switch checked onCheckedChange={next} />);
    act(() => button.click());
    expect(next).toHaveBeenCalledWith(false);
  });

  it("follows a controlling parent", () => {
    function Parent() {
      const [checked, setChecked] = useState(false);
      return <Switch checked={checked} onCheckedChange={setChecked} />;
    }
    render(<Parent />);
    const button = screen.getByRole("switch");
    act(() => button.click());
    expect(button).toHaveAttribute("aria-checked", "true");
    act(() => button.click());
    expect(button).toHaveAttribute("aria-checked", "false");
  });

  it("renders on the server", () => {
    expect(renderToString(<Switch defaultChecked />)).toContain(
      'aria-checked="true"',
    );
  });
});

describe("useMachine selected snapshots", () => {
  it("keeps manual-focus updates out of a selected-value subscriber", () => {
    const machine = createTabsMachine({
      defaultValue: "a",
      activationMode: "manual",
    });
    const renderValue = vi.fn();
    function Value() {
      const [value] = useMachine(
        () => machine,
        { activationMode: "manual" as const },
        (state) => state.value,
      );
      renderValue(value);
      return <output>{String(value)}</output>;
    }
    const { container } = render(<Value />);
    expect(container.textContent).toBe("a");
    renderValue.mockClear();
    act(() => machine.send({ type: "FOCUS", value: "b" }));
    expect(container.textContent).toBe("a");
    expect(renderValue).not.toHaveBeenCalled();
    act(() => machine.send({ type: "SELECT", value: "b" }));
    expect(container.textContent).toBe("b");
    expect(renderValue).toHaveBeenCalledTimes(1);
  });

  it("projects current controlled props and a replaced selector in the same render", () => {
    function Value({ value, prefix }: { value: string; prefix: string }) {
      const [selected] = useMachine(
        createTabsMachine,
        { value },
        (state) => `${prefix}:${state.value}`,
      );
      return <output>{String(selected)}</output>;
    }
    const { container, rerender } = render(<Value value="a" prefix="one" />);
    expect(container.textContent).toBe("one:a");
    rerender(<Value value="b" prefix="two" />);
    expect(container.textContent).toBe("two:b");
    expect(renderToString(<Value value="c" prefix="ssr" />)).toContain("ssr:c");
  });

  it("reuses an equal object selection when unrelated state changes", () => {
    const machine = createTabsMachine({
      defaultValue: "a",
      activationMode: "manual",
    });
    const renderValue = vi.fn();
    function Value() {
      const [selected] = useMachine(
        () => machine,
        {},
        (state) => ({ value: state.value }),
        (a, b) => a.value === b.value,
      );
      renderValue(selected);
      return <output>{String(selected.value)}</output>;
    }
    const { container } = render(<Value />);
    renderValue.mockClear();
    act(() => machine.send({ type: "FOCUS", value: "b" }));
    expect(renderValue).not.toHaveBeenCalled();
    act(() => machine.send({ type: "SELECT", value: "b" }));
    expect(container.textContent).toBe("b");
    expect(renderValue).toHaveBeenCalledTimes(1);
  });
});
