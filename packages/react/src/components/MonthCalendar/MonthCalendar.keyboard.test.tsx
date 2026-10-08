import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MonthCalendar } from ".";

// WAI-ARIA APG date grid: a single tab stop (roving tabindex on the
// gridcells themselves), arrows / Home / End / PageUp / PageDown move,
// Enter / Space select (aria-selected on the cell, no inner button).
function Controlled() {
  const [month, setMonth] = useState(new Date(2024, 1, 1));
  const [value, setValue] = useState<string | undefined>("2024-02-14");
  return (
    <>
      <MonthCalendar
        month={month}
        onMonthChange={setMonth}
        value={value}
        onChange={setValue}
      />
      <button type="button">After</button>
    </>
  );
}

const day = (key: string) =>
  document.querySelector<HTMLElement>(`[data-date="${key}"]`)!;

describe("MonthCalendar keyboard (APG grid)", () => {
  it("the grid is a single tab stop on the selected day", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    // Previous month, Today, Next month, then the grid.
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(day("2024-02-14")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(day("2024-02-14")).toHaveFocus();
  });

  it("moves with arrows / Home / End / PageDown and selects with Enter and Space", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    day("2024-02-14").focus();
    await user.keyboard("{ArrowRight}");
    expect(day("2024-02-15")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(day("2024-02-22")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(day("2024-02-19")).toHaveFocus();
    await user.keyboard("{End}");
    expect(day("2024-02-25")).toHaveFocus();
    // focus alone does not select
    expect(day("2024-02-25")).not.toHaveAttribute("data-selected");
    expect(day("2024-02-14")).toHaveAttribute("data-selected", "");
    await user.keyboard("{Enter}");
    expect(day("2024-02-25")).toHaveAttribute("aria-selected", "true");
    expect(day("2024-02-25")).toHaveAttribute("data-selected", "");
    expect(day("2024-02-14")).toHaveAttribute("aria-selected", "false");
    expect(day("2024-02-14")).not.toHaveAttribute("data-selected");
    // The roving tab stop follows focus.
    expect(day("2024-02-25")).toHaveAttribute("tabindex", "0");
    expect(day("2024-02-14")).toHaveAttribute("tabindex", "-1");
    await user.keyboard("{PageDown}");
    expect(day("2024-03-25")).toHaveFocus();
    expect(
      screen.getByRole("heading", { name: /March 2024/ }),
    ).toBeInTheDocument();
    await user.keyboard("{ArrowUp} ");
    expect(day("2024-03-18")).toHaveAttribute("aria-selected", "true");
  });

  it("marks today with the public today hook", () => {
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    render(<MonthCalendar />);
    expect(day(key)).toHaveAttribute("data-today", "");
    expect(day(key)).toHaveAttribute("aria-current", "date");
    expect(document.querySelectorAll("[data-today]")).toHaveLength(1);
  });

  it("focuses the gridcell itself; PageUp / Shift+PageDown move by month / year", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    day("2024-02-14").focus();
    expect(document.activeElement).toHaveAttribute("role", "gridcell");
    expect(
      screen.getByRole("gridcell", { name: "2024-02-14", selected: true }),
    ).toHaveFocus();
    await user.keyboard("{PageUp}");
    expect(day("2024-01-14")).toHaveFocus();
    expect(
      screen.getByRole("heading", { name: /January 2024/ }),
    ).toBeInTheDocument();
    await user.keyboard("{Shift>}{PageDown}{/Shift}");
    expect(day("2025-01-14")).toHaveFocus();
    await user.keyboard(" ");
    expect(
      screen.getByRole("gridcell", { name: "2025-01-14", selected: true }),
    ).toHaveFocus();
    expect(screen.queryAllByRole("button", { pressed: true })).toHaveLength(0);
  });
});
