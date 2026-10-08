import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { useState } from "react";
import { createSwitchMachine } from "@minerva/core";
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
