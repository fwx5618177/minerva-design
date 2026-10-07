// Keyboard audit: WAI-ARIA spinbutton keys with real user-event keys.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from ".";

const spin = () => screen.getByRole("spinbutton");

describe("NumberInput keyboard", () => {
  it("is a single tab stop (the stepper buttons are pointer-only) and skipped when disabled", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <NumberInput aria-label="Qty" showStepper />
        <button type="button">after</button>
      </>,
    );
    await user.tab();
    expect(spin()).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();

    rerender(
      <>
        <NumberInput aria-label="Qty" showStepper disabled />
        <button type="button">after</button>
      </>,
    );
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    expect(spin()).not.toHaveFocus();
  });

  it("steps by ten with PageUp / PageDown, clamped to the bounds", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput
        aria-label="Qty"
        defaultValue={5}
        min={0}
        max={30}
        onChange={onChange}
      />,
    );
    await user.click(spin());
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(15);
    expect(spin()).toHaveValue("15");
    await user.keyboard("{PageUp}{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(30);
    await user.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(20);
    await user.keyboard("{PageDown}{PageDown}{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(spin()).toHaveAttribute("aria-valuenow", "0");
  });

  it("uses the step size for PageUp / PageDown", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput
        aria-label="Qty"
        defaultValue={1}
        step={0.5}
        onChange={onChange}
      />,
    );
    await user.click(spin());
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(6);
    expect(spin()).toHaveValue("6.0");
  });

  it("jumps to min / max with Home / End when bounded", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput
        aria-label="Qty"
        defaultValue={5}
        min={-2}
        max={9}
        onChange={onChange}
      />,
    );
    await user.click(spin());
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(9);
    expect(spin()).toHaveAttribute("aria-valuenow", "9");
    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(-2);
    expect(spin()).toHaveValue("-2");
  });

  it("leaves Home / End to the caret when unbounded", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput aria-label="Qty" defaultValue={5} onChange={onChange} />,
    );
    await user.click(spin());
    await user.keyboard("{Home}{End}");
    expect(onChange).not.toHaveBeenCalled();
    expect(spin()).toHaveValue("5");
  });

  it("ignores the stepping keys when read-only", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput
        aria-label="Qty"
        defaultValue={5}
        min={0}
        max={10}
        readOnly
        onChange={onChange}
      />,
    );
    await user.click(spin());
    await user.keyboard("{PageUp}{PageDown}{Home}{End}{ArrowUp}");
    expect(onChange).not.toHaveBeenCalled();
    expect(spin()).toHaveValue("5");
  });
});
