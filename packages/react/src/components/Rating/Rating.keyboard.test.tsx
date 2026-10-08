import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Rating } from ".";

// Interactive Rating as a slider: half-star arrows, whole-star PageUp /
// PageDown, clamped, RTL-aware horizontal arrows.
const Controlled = ({
  initial,
  max,
  onChange,
}: {
  initial: number;
  max?: number;
  onChange: (value: number) => void;
}) => {
  const [value, setValue] = useState(initial);
  return (
    <Rating
      aria-label="Score"
      value={value}
      max={max}
      onChange={(v) => {
        onChange(v);
        setValue(v);
      }}
    />
  );
};

describe("Rating keyboard", () => {
  it("PageUp / PageDown move by one whole star (max / 5) and clamp", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Controlled initial={5} onChange={onChange} />);
    await user.tab();
    const slider = screen.getByRole("slider", { name: "Score" });
    expect(slider).toHaveFocus();
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(7);
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(9);
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    await user.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(8);
    await user.keyboard("{Home}{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("PageUp on a 5-point scale adds one star while arrows add half a star", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Controlled initial={2} max={5} onChange={onChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(3);
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
    await user.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(2.5);
  });

  it("RTL: ArrowLeft increases and ArrowRight decreases", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <div dir="rtl">
        <Controlled initial={5} onChange={onChange} />
      </div>,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(6);
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(4);
    // vertical arrows and paging are direction-independent
    await user.keyboard("{ArrowUp}{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(7);
  });
});
