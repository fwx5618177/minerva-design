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
    expect(status).toHaveClass("spinner", "medium", "primary");
    expect(status.querySelector(".label")).toHaveTextContent("Loading…");
  });

  it.each<SpinnerSize>(["xsmall", "small", "medium", "large", "xlarge"])(
    "applies size class for %s",
    (size) => {
      render(<Spinner size={size} color="current" />);
      expect(screen.getByRole("status")).toHaveClass(size, "current");
    },
  );

  it("applies the neutral color class", () => {
    render(<Spinner color="neutral" />);
    expect(screen.getByRole("status")).toHaveClass("neutral");
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
    expect(el).toHaveClass("spinner", "x");
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
