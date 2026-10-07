import React, { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Rating, RatingScale } from ".";
import styles from "./rating.module.scss";

/** Fill of each star ("full" | "half" | "empty"), in order. */
const fills = (container: HTMLElement) =>
  Array.from(container.querySelectorAll(`.${styles.star}`)).map((el) =>
    el.classList.contains(styles.half)
      ? "half"
      : el.classList.contains(styles.empty)
        ? "empty"
        : "full",
  );

function starButton(container: HTMLElement, index: number): HTMLButtonElement {
  const el = container.querySelectorAll<HTMLButtonElement>(
    `.${styles.starButton}`,
  )[index];
  if (!el) throw new Error(`star button ${index} not found`);
  return el;
}

describe("Rating (read-only)", () => {
  it('renders 5 aria-hidden stars labelled "value / max" as an image', () => {
    const { container } = render(<Rating value={8} data-testid="r" />);
    const r = screen.getByTestId("r");
    expect(r).toHaveAttribute("aria-label", "8.0 / 10");
    expect(r).toHaveAttribute("role", "img");
    expect(r).not.toHaveAttribute("tabindex");
    expect(r).toHaveClass(styles.rating, styles.medium);
    expect(r).not.toHaveClass(styles.interactive);
    expect(container.querySelector(`.${styles.stars}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(fills(container)).toEqual(["full", "full", "full", "full", "empty"]);
  });

  it.each([
    [4.4, 10, ["full", "full", "empty", "empty", "empty"]],
    [5.6, 10, ["full", "full", "full", "empty", "empty"]],
    [3, 5, ["full", "full", "full", "empty", "empty"]],
    [0, 10, ["empty", "empty", "empty", "empty", "empty"]],
    [10, 10, ["full", "full", "full", "full", "full"]],
  ])(
    "value=%s max=%s normalizes to 5 stars, rounding fractions outside 0.25..0.75",
    (value, max, expected) => {
      const { container } = render(<Rating value={value} max={max} />);
      expect(fills(container)).toEqual(expected);
    },
  );

  it("renders a half star for fractions in 0.25..0.75", () => {
    const { container } = render(<Rating value={5} max={10} />);
    expect(fills(container)).toEqual([
      "full",
      "full",
      "half",
      "empty",
      "empty",
    ]);
    expect(container.querySelectorAll(`.${styles.half} svg`)).toHaveLength(2);
  });

  it("shows value and formatted rating count", () => {
    const { container } = render(
      <Rating value={8.64} showValue ratingCount={3214} />,
    );
    expect(
      container.querySelector(`.${styles.value} strong`),
    ).toHaveTextContent("8.6");
    expect(screen.getByText("(3,214)")).toHaveClass(styles.count);
  });

  it("shows the value without a count", () => {
    const { container } = render(<Rating value={8} showValue />);
    expect(container.querySelector(`.${styles.value}`)).toHaveTextContent(
      "8.0",
    );
    expect(container.querySelector(`.${styles.count}`)).toBeNull();
  });

  it("hides the value by default", () => {
    const { container } = render(<Rating value={8} ratingCount={3} />);
    expect(container.querySelector(`.${styles.value}`)).toBeNull();
  });

  it("uses a custom aria-label, size and className, and forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Rating
        ref={ref}
        value={4}
        aria-label="Four"
        size="large"
        className="c"
        style={{ margin: 4 }}
      />,
    );
    const r = screen.getByLabelText("Four");
    expect(ref.current).toBe(r);
    expect(r).toHaveClass(styles.large, "c");
    expect(r).toHaveStyle({ margin: "4px" });
    expect(r.querySelector("svg")).toHaveAttribute("width", "20");
  });

  it("uses 12px stars when small", () => {
    const { container } = render(<Rating value={4} size="small" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "12");
    expect(container.firstElementChild).toHaveClass(styles.small);
  });
});

describe("Rating (interactive)", () => {
  it("exposes a focusable slider with value range when onChange is set", () => {
    render(<Rating value={6} onChange={vi.fn()} />);
    const slider = screen.getByRole("slider", { name: "6.0 / 10" });
    expect(slider).toHaveAttribute("aria-valuenow", "6");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "10");
    expect(slider).toHaveAttribute("tabindex", "0");
    expect(slider).toHaveClass(styles.interactive);
  });

  it("readOnly forces display mode even with onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Rating value={6} onChange={onChange} readOnly data-testid="r" />,
    );
    expect(screen.queryByRole("slider")).toBeNull();
    expect(container.querySelectorAll("button")).toHaveLength(0);
    screen.getByTestId("r").focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("adjusts with arrow keys by max/10 and clamps; Home/End jump to bounds", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function App() {
      const [value, setValue] = useState(9.5);
      return (
        <Rating
          value={value}
          onChange={(v) => {
            onChange(v);
            setValue(v);
          }}
        />
      );
    }
    render(<App />);
    await user.tab();
    const slider = screen.getByRole("slider");
    expect(slider).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(10);
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenLastCalledWith(10);
    await user.keyboard("{ArrowLeft}{ArrowDown}");
    expect(onChange).toHaveBeenLastCalledWith(8);
    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(slider).toHaveAttribute("aria-valuenow", "10");
  });

  it("uses a 0.5 step on a 5-point scale", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={3} max={5} onChange={onChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
  });

  it("ignores unrelated keys", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={3} onChange={onChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("a{Enter}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders non-tabbable star buttons; clicking the right half sets a full star", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Rating value={0} onChange={onChange} />);
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      `.${styles.starButton}`,
    );
    expect(buttons).toHaveLength(5);
    buttons.forEach((b) => expect(b).toHaveAttribute("tabindex", "-1"));
    const third = starButton(container, 2);
    vi.spyOn(third, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 20, height: 20 }),
    );
    await user.pointer({
      keys: "[MouseLeft]",
      target: third,
      coords: { clientX: 15 },
    });
    expect(onChange).toHaveBeenLastCalledWith(6);
  });

  it("clicking the left half of a star sets a half star", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Rating value={0} max={5} onChange={onChange} />,
    );
    const star = starButton(container, 3);
    vi.spyOn(star, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 100, y: 0, width: 20, height: 20 }),
    );
    fireEvent.click(star, { clientX: 105 });
    expect(onChange).toHaveBeenLastCalledWith(3.5);
  });

  it("previews on hover and restores on mouse leave", async () => {
    const user = userEvent.setup();
    const { container } = render(<Rating value={2} onChange={vi.fn()} />);
    expect(fills(container)).toEqual([
      "full",
      "empty",
      "empty",
      "empty",
      "empty",
    ]);
    await user.hover(starButton(container, 3));
    expect(fills(container)).toEqual(["full", "full", "full", "full", "empty"]);
    await user.unhover(screen.getByRole("slider"));
    expect(fills(container)).toEqual([
      "full",
      "empty",
      "empty",
      "empty",
      "empty",
    ]);
  });
});

describe("RatingScale", () => {
  const dims = [
    { key: "plot", label: "Plot", value: 8.2, hint: "Story quality" },
    { key: "writing", label: "Writing", value: 7.5 },
  ] as const;

  it("renders one labelled read-only row per dimension with values shown", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <RatingScale ref={ref} dimensions={dims} className="c" />,
    );
    expect(container.firstElementChild).toHaveClass(styles.scale, "c");
    expect(ref.current).toBe(container.firstElementChild);
    const rows = container.querySelectorAll(`.${styles.scaleRow}`);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute("title", "Story quality");
    expect(rows[1]).not.toHaveAttribute("title");
    expect(screen.getByText("Plot")).toHaveClass(styles.scaleLabel);
    expect(screen.getByLabelText("Plot 8.2 / 10")).toBeInTheDocument();
    expect(screen.getByLabelText("Writing 7.5 / 10")).toBeInTheDocument();
    expect(container.querySelectorAll(`.${styles.value}`)).toHaveLength(2);
    expect(screen.queryByRole("slider")).toBeNull();
  });

  it("reports changes with the dimension key when interactive", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RatingScale
        dimensions={dims}
        onChange={onChange}
        showValue={false}
        max={10}
        size="small"
      />,
    );
    const slider = screen.getByRole("slider", { name: "Writing 7.5 / 10" });
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("writing", 8.5);
  });

  it("readOnly disables interaction for all rows", () => {
    render(<RatingScale dimensions={dims} onChange={vi.fn()} readOnly />);
    expect(screen.queryByRole("slider")).toBeNull();
  });
});

describe("onKeyDown composition (regression)", () => {
  it("calls the consumer handler and keeps built-in stepping unless it prevents default", () => {
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    const { rerender } = render(
      <Rating value={4} onChange={onChange} onKeyDown={onKeyDown} />,
    );
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(5);
    onChange.mockClear();
    rerender(
      <Rating
        value={4}
        onChange={onChange}
        onKeyDown={(e) => e.preventDefault()}
      />,
    );
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });
});
