import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

const jan = new Date(2026, 0, 1);

describe("Calendar (react-native-web)", () => {
  it("renders a DOM group of day buttons with styling hooks", () => {
    render(<Calendar defaultMonth={jan} />);
    expect(
      screen.getByRole("group", { name: "Month calendar" }),
    ).toHaveAttribute("data-minerva", "calendar");
    const day = screen.getByRole("button", { name: /January 9, 2026/ });
    expect(day).toHaveAttribute("data-part", "day");
    expect(screen.getByRole("heading", { name: "1/2026" })).toBeInTheDocument();
  });

  it("clicks select a range and navigate months", () => {
    const onChange = vi.fn();
    render(<Calendar type="range" defaultMonth={jan} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /January 9, 2026/ }));
    fireEvent.click(screen.getByRole("button", { name: /January 11, 2026/ }));
    expect(onChange).toHaveBeenCalledWith([
      new Date(2026, 0, 9),
      new Date(2026, 0, 11),
    ]);
    const middle = screen.getByRole("button", { name: /January 10, 2026/ });
    expect(middle).toHaveAttribute("aria-selected", "true");
    expect(middle).toHaveAttribute("data-range-middle", "");
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("heading", { name: "2/2026" })).toBeInTheDocument();
  });

  it("disabled days are aria-disabled and ignore clicks", () => {
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth={jan}
        minDate={new Date(2026, 0, 5)}
        onChange={onChange}
      />,
    );
    const day = screen.getByRole("button", { name: /January 4, 2026/ });
    expect(day).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(day);
    expect(onChange).not.toHaveBeenCalled();
  });
});
