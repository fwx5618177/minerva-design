// Keyboard audit (WAI-ARIA checkbox): Tab reachability and Space toggling.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormControl } from "../FormControl";
import Checkbox from "./Checkbox";

describe("Checkbox keyboard", () => {
  it("toggles back and forth with Space; Enter does nothing (native checkbox)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Terms" onChange={onChange} />);
    await user.tab();
    const box = screen.getByRole("checkbox", { name: "Terms" });
    expect(box).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(box).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
    await user.keyboard(" ");
    await user.keyboard(" ");
    expect(box).not.toBeChecked();
    expect(onChange.mock.calls.map(([checked]) => checked)).toEqual([
      true,
      false,
    ]);
  });

  it("keeps aria-checked=mixed while indeterminate and toggled with Space", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="All" indeterminate onChange={onChange} />);
    await user.tab();
    await user.keyboard(" ");
    const box = screen.getByRole("checkbox", { name: "All" });
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(box).toHaveAttribute("aria-checked", "mixed");
  });

  it("is skipped by Tab when disabled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox label="A" disabled />
        <Checkbox label="B" />
      </>,
    );
    await user.tab();
    expect(screen.getByRole("checkbox", { name: "B" })).toHaveFocus();
  });

  it("does not toggle with Space inside a read-only FormControl", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormControl readOnly>
        <Checkbox label="Locked" onChange={onChange} />
      </FormControl>,
    );
    await user.tab();
    const box = screen.getByRole("checkbox", { name: "Locked" });
    expect(box).toHaveFocus();
    await user.keyboard(" ");
    expect(box).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });
});
