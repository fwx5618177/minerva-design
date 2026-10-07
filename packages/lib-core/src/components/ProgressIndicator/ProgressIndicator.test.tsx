import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProgressIndicator from "./ProgressIndicator";

describe("ProgressIndicator", () => {
  it("renders a labelled progressbar with a spinner by default", () => {
    render(<ProgressIndicator ariaLabel="Loading data" />);

    const progressbar = screen.getByRole("progressbar", {
      name: "Loading data",
    });
    expect(progressbar).toHaveClass("progressIndicator", "defaultWidth");
    expect(progressbar.querySelector("svg.spinner")).toHaveClass("medium");
  });

  it.each([
    ["spinner", "svg.spinner"],
    ["circle", "svg.circle"],
    ["bar", ".barContainer > .bar"],
    ["wave", ".waveContainer svg.wave"],
    ["dottedBar", ".dottedBarContainer > .dottedBar"],
  ] as const)("renders the %s type", (type, selector) => {
    render(<ProgressIndicator type={type} />);

    expect(
      screen.getByRole("progressbar").querySelector(selector),
    ).toBeInTheDocument();
  });

  it.each(["small", "medium", "large"] as const)(
    "applies the %s size class to the indicator",
    (size) => {
      render(<ProgressIndicator type="bar" size={size} />);

      expect(
        screen.getByRole("progressbar").querySelector(".barContainer"),
      ).toHaveClass(size);
    },
  );

  it("renders an optional icon", () => {
    render(<ProgressIndicator icon={<span data-testid="custom-icon" />} />);

    const icon = screen.getByTestId("custom-icon");
    expect(icon.parentElement).toHaveClass("icon");
    expect(screen.getByRole("progressbar")).toContainElement(icon);
  });

  it("applies a custom width and drops the default width class", () => {
    render(<ProgressIndicator width="200px" />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveStyle({ width: "200px" });
    expect(progressbar).not.toHaveClass("defaultWidth");
    expect(progressbar).not.toHaveClass("fullWidth");
  });

  it("uses full width and ignores width when full is set", () => {
    render(<ProgressIndicator full width="200px" />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("fullWidth");
    expect(progressbar.style.width).toBe("");
  });

  it("applies a custom className", () => {
    render(<ProgressIndicator className="mine" />);

    expect(screen.getByRole("progressbar")).toHaveClass("mine");
  });

  it("is reachable via keyboard focus", async () => {
    const user = userEvent.setup();
    render(<ProgressIndicator ariaLabel="Loading" />);

    await user.tab();

    expect(screen.getByRole("progressbar", { name: "Loading" })).toHaveFocus();
  });
});
