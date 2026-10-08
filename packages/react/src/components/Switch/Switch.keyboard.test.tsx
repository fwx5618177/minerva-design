// Keyboard audit: tab stops of every variant and Enter / Space activation.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Switch from "./Switch";

describe("Switch keyboard", () => {
  it.each([
    ["disabled", { disabled: true }],
    ["loading", { loading: true }],
  ] as const)("is not a tab stop when %s", async (_, props) => {
    const user = userEvent.setup();
    render(<Switch label="Wi-Fi" {...props} />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("segmented: the hidden input is skipped and each segment activates with Enter / Space", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch
        variant="segmented"
        aria-label="Billing"
        offLabel="Monthly"
        onLabel="Yearly"
        onChange={onChange}
      />,
    );
    const monthly = screen.getByRole("button", { name: "Monthly" });
    const yearly = screen.getByRole("button", { name: "Yearly" });
    await user.tab();
    expect(monthly).toHaveFocus();
    await user.tab();
    expect(yearly).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(true, expect.anything());
    expect(yearly).toHaveAttribute("aria-pressed", "true");
    // the hidden input is not a tab stop
    await user.tab();
    expect(document.body).toHaveFocus();

    monthly.focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
    expect(monthly).toHaveAttribute("aria-pressed", "true");
    // re-activating the active segment does nothing
    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("bilateral: side labels and the switch are reachable and keyboard-operable", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch
        aria-label="Mode"
        offLabel="Off"
        onLabel="On"
        onChange={onChange}
      />,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Off" })).toHaveFocus();
    await user.tab();
    const control = screen.getByRole("switch", { name: "Mode" });
    expect(control).toHaveFocus();
    await user.keyboard(" ");
    expect(control).toBeChecked();
    await user.tab();
    expect(screen.getByRole("button", { name: "On" })).toHaveFocus();
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Off" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(control).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
