import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import ProgressIndicator from "./ProgressIndicator";

describe("ProgressIndicator", () => {
  it("renders a labelled progressbar with a spinner by default", () => {
    render(<ProgressIndicator aria-label="Loading data" />);

    const progressbar = screen.getByRole("progressbar", {
      name: "Loading data",
    });
    expect(progressbar).toHaveClass("progressIndicator", "primary");
    expect(progressbar).not.toHaveClass("defaultWidth");
    expect(progressbar.querySelector("svg.spinner")).toHaveClass("medium");
  });

  it.each(["bar", "dottedBar"] as const)(
    "gives the %s variant a default width",
    (variant) => {
      render(<ProgressIndicator variant={variant} />);
      expect(screen.getByRole("progressbar")).toHaveClass("defaultWidth");
    },
  );

  it.each([
    ["spinner", "svg.spinner"],
    ["circle", "svg.circle"],
    ["bar", ".barContainer > .bar"],
    ["wave", ".waveContainer svg.wave"],
    ["dottedBar", ".dottedBarContainer > .dottedBar"],
  ] as const)("renders the %s variant", (variant, selector) => {
    render(<ProgressIndicator variant={variant} />);

    expect(
      screen.getByRole("progressbar").querySelector(selector),
    ).toBeInTheDocument();
  });

  it.each(["xsmall", "small", "medium", "large", "xlarge"] as const)(
    "applies the %s size class to the indicator",
    (size) => {
      const { rerender } = render(
        <ProgressIndicator variant="bar" size={size} />,
      );
      expect(
        screen.getByRole("progressbar").querySelector(".barContainer"),
      ).toHaveClass(size);

      rerender(<ProgressIndicator size={size} />);
      expect(
        screen.getByRole("progressbar").querySelector("svg.spinner"),
      ).toHaveClass(size);
    },
  );

  it.each([
    "primary",
    "neutral",
    "current",
    "success",
    "warning",
    "danger",
    "info",
  ] as const)("applies the %s color class", (color) => {
    render(<ProgressIndicator color={color} />);
    expect(screen.getByRole("progressbar")).toHaveClass(color);
  });

  it("shows a visible label that names the progressbar", () => {
    const { rerender } = render(<ProgressIndicator label="Saving draft" />);
    const progressbar = screen.getByRole("progressbar", {
      name: "Saving draft",
    });
    expect(progressbar).not.toHaveAttribute("aria-label");
    expect(screen.getByText("Saving draft")).toHaveClass("label");

    // aria-label still wins over the visible label
    rerender(<ProgressIndicator label="Saving draft" aria-label="Saving" />);
    expect(screen.getByRole("progressbar", { name: "Saving" })).toBe(
      progressbar,
    );

    // An empty label falls back to the localized default name
    rerender(<ProgressIndicator label="" />);
    expect(
      screen.getByRole("progressbar", { name: "Loading" }),
    ).toBeInTheDocument();
    expect(progressbar.querySelector(".label")).toBeNull();
  });

  it("is hidden from assistive technologies when decorative", () => {
    render(<ProgressIndicator decorative data-testid="pi" label="Busy" />);
    const el = screen.getByTestId("pi");
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).not.toHaveAttribute("aria-label");
    expect(el).not.toHaveAttribute("role");
  });

  it("forwards native attributes and merges style with width", () => {
    render(
      <ProgressIndicator
        id="loader"
        data-testid="pi"
        title="Working"
        style={{ margin: 4 }}
        width="120px"
      />,
    );
    const el = screen.getByTestId("pi");
    expect(el).toBe(screen.getByRole("progressbar"));
    expect(el.id).toBe("loader");
    expect(el).toHaveAttribute("title", "Working");
    expect(el).toHaveStyle({ margin: "4px", width: "120px" });
  });

  it("renders an optional icon", () => {
    render(<ProgressIndicator icon={<span data-testid="custom-icon" />} />);

    const icon = screen.getByTestId("custom-icon");
    expect(icon.parentElement).toHaveClass("icon");
    expect(screen.getByRole("progressbar")).toContainElement(icon);
  });

  it("applies a custom width and drops the default width class", () => {
    render(<ProgressIndicator variant="bar" width="200px" />);

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

  it("is not a tab stop (it is not interactive and may sit inside a button)", async () => {
    const user = userEvent.setup();
    render(
      <button type="button">
        Save <ProgressIndicator />
      </button>,
    );

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.tab();
    expect(document.body).toHaveFocus();
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("tabindex");
  });

  it("has a default accessible name", () => {
    render(<ProgressIndicator />);
    expect(
      screen.getByRole("progressbar", { name: "Loading" }),
    ).toBeInTheDocument();
  });

  it("hides the decorative icon from assistive technologies", () => {
    render(<ProgressIndicator />);
    expect(
      screen.getByRole("progressbar").querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProgressIndicator ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("progressbar"));
  });
});

describe("ProgressIndicator determinate mode", () => {
  it("stays indeterminate without a value", () => {
    render(<ProgressIndicator variant="bar" showValue />);
    const progressbar = screen.getByRole("progressbar", { name: "Loading" });
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
    expect(progressbar).not.toHaveAttribute("aria-valuemax");
    expect(progressbar.querySelector(".value")).toBeNull();
    expect(progressbar.querySelector(".bar")).not.toHaveClass("determinate");
  });

  it("fills the bar and exposes the value", () => {
    render(<ProgressIndicator variant="bar" value={30} />);
    const progressbar = screen.getByRole("progressbar", { name: "Progress" });
    expect(progressbar).toHaveAttribute("aria-valuenow", "30");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).not.toHaveAttribute("aria-valuetext");
    const fill = progressbar.querySelector(".bar") as HTMLElement;
    expect(fill).toHaveClass("determinate");
    expect(fill.style.width).toBe("30%");
  });

  it("honours max and clamps the value", () => {
    const { rerender } = render(
      <ProgressIndicator variant="bar" value={3} max={4} showValue />,
    );
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuemax", "4");
    expect(progressbar).toHaveAttribute("aria-valuenow", "3");
    expect(progressbar.querySelector(".value")).toHaveTextContent("75%");

    rerender(<ProgressIndicator variant="bar" value={150} showValue />);
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
    expect(progressbar.querySelector(".value")).toHaveTextContent("100%");

    rerender(<ProgressIndicator variant="bar" value={-5} showValue />);
    expect(progressbar).toHaveAttribute("aria-valuenow", "0");

    rerender(<ProgressIndicator variant="bar" value={Number.NaN} />);
    expect(progressbar).toHaveAttribute("aria-valuenow", "0");

    // An invalid max falls back to 100
    rerender(<ProgressIndicator variant="bar" value={50} max={0} />);
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect((progressbar.querySelector(".bar") as HTMLElement).style.width).toBe(
      "50%",
    );
  });

  it("formats the shown value and uses it as aria-valuetext", () => {
    const format = vi.fn((value: number, max: number) => `${value} of ${max}`);
    render(
      <ProgressIndicator
        variant="bar"
        value={2}
        max={5}
        showValue
        format={format}
        label="Lessons"
      />,
    );
    const progressbar = screen.getByRole("progressbar", { name: "Lessons" });
    expect(format).toHaveBeenCalledWith(2, 5);
    expect(progressbar).toHaveAttribute("aria-valuetext", "2 of 5");
    const valueText = progressbar.querySelector(".value");
    expect(valueText).toHaveTextContent("2 of 5");
    // the value comes before the label
    expect(valueText?.nextElementSibling).toHaveClass("label");
  });

  it("skips aria-valuetext when format returns an element", () => {
    render(
      <ProgressIndicator
        variant="bar"
        value={40}
        showValue
        format={(value) => <b>{value}</b>}
      />,
    );
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).not.toHaveAttribute("aria-valuetext");
    expect(progressbar.querySelector(".value b")).toHaveTextContent("40");
  });

  it("draws an arc for the circle variant", () => {
    render(<ProgressIndicator variant="circle" value={25} size="large" />);
    const progressbar = screen.getByRole("progressbar");
    const ring = progressbar.querySelector("svg.ring");
    expect(ring).toHaveClass("large");
    expect(ring).toHaveAttribute("aria-hidden", "true");
    expect(progressbar.querySelector("svg.circle")).toBeNull();
    expect(progressbar.querySelector(".ringArc")).toHaveAttribute(
      "stroke-dasharray",
      "25 100",
    );
    expect(progressbar).toHaveAttribute("aria-valuenow", "25");
  });

  it.each(["spinner", "wave", "dottedBar"] as const)(
    "ignores value for the %s variant",
    (variant) => {
      render(<ProgressIndicator variant={variant} value={50} showValue />);
      const progressbar = screen.getByRole("progressbar", { name: "Loading" });
      expect(progressbar).not.toHaveAttribute("aria-valuenow");
      expect(progressbar.querySelector(".value")).toBeNull();
    },
  );

  it("stays hidden from assistive technologies when decorative", () => {
    render(
      <ProgressIndicator
        variant="bar"
        value={10}
        decorative
        data-testid="pi"
      />,
    );
    const el = screen.getByTestId("pi");
    expect(el).not.toHaveAttribute("aria-valuenow");
    expect(el).not.toHaveAttribute("role");
  });
});

describe("ProgressIndicator localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the default label and lets aria-label win", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    const { rerender } = render(<ProgressIndicator />);
    expect(
      screen.getByRole("progressbar", { name: "Chargement" }),
    ).toBeInTheDocument();

    rerender(<ProgressIndicator aria-label="Uploading" />);
    expect(
      screen.getByRole("progressbar", { name: "Uploading" }),
    ).toBeInTheDocument();
  });

  it("translates the default label in Chinese", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<ProgressIndicator />);
    expect(
      screen.getByRole("progressbar", { name: "加载中" }),
    ).toBeInTheDocument();
  });
});
