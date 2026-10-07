// Ported from @novel-isr/ui src/components/Spinner/__test__/Spinner.test.tsx
import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import i18n from "../../config/i18n";
import Spinner from "./Spinner";
import type { SpinnerSize } from "./types";

describe("Spinner", () => {
  it("renders a polite status with the default accessible label and classes", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status.tagName).toBe("SPAN");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Loading…");
    expect(status).toHaveClass(
      "spinner",
      "medium",
      "primary",
      "ui-spinner",
      "ui-spinner-size-md",
      "ui-spinner-color-brand",
    );
    expect(status.querySelector(".ui-spinner-label")).toHaveTextContent(
      "Loading…",
    );
  });

  it.each<[SpinnerSize, string]>([
    ["xsmall", "xs"],
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
    ["xlarge", "xl"],
  ])("applies size class for %s", (size, hook) => {
    render(<Spinner size={size} color="current" />);
    expect(screen.getByRole("status")).toHaveClass(
      size,
      `ui-spinner-size-${hook}`,
      "current",
      "ui-spinner-color-current",
    );
  });

  it("maps the neutral color to the gray hook", () => {
    render(<Spinner color="neutral" />);
    expect(screen.getByRole("status")).toHaveClass(
      "neutral",
      "ui-spinner-color-gray",
    );
  });

  it("uses a custom label, including an empty one", () => {
    const { rerender } = render(<Spinner label="Saving draft" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saving draft");
    expect(screen.getByText("Saving draft")).toBeInTheDocument();
    rerender(<Spinner label="" />);
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("forwards ref and native attributes, allowing role/aria overrides", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Spinner
        ref={ref}
        className="x"
        data-testid="sp"
        role="presentation"
        aria-hidden="true"
      />,
    );
    const el = screen.getByTestId("sp");
    expect(ref.current).toBe(el);
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("ui-spinner", "x");
    expect(el).toHaveAttribute("role", "presentation");
    expect(screen.queryByRole("status")).toBeNull();
  });
});

describe("Spinner localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the default label", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("加载中…");
  });
});
