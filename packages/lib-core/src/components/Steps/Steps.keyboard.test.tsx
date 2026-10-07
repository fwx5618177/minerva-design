// Keyboard audit: steps are native buttons (Space activates too); read-only
// steps are not tab stops.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Steps from "./Steps";

const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
];

describe("Steps keyboard", () => {
  it("activates a step with Space and marks it current", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Steps items={items} defaultValue="draft" onChange={onChange} />);
    await user.tab();
    await user.tab();
    const review = screen.getByRole("button", { name: "Review" });
    expect(review).toHaveFocus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith("review");
    expect(review).toHaveAttribute("aria-current", "step");
    // the current step does not re-emit
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("has no tab stops as a read-only progress indicator", async () => {
    const user = userEvent.setup();
    render(<Steps items={items} value="review" />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
