import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";

const radios = () => screen.getAllByRole("radio");

describe("Taro SegmentedControl", () => {
  it("renders a radiogroup of radio segments with a thumb", () => {
    const { container } = render(
      <M.SegmentedControl
        aria-label="View"
        options={["day", { value: "week", label: "Week" }, "month"]}
        defaultValue="week"
        size="small"
        color="primary"
      />,
    );
    const group = screen.getByRole("radiogroup", { name: "View" });
    expect(group).toHaveClass(
      "mn-segmented-control",
      "mn-size-small",
      "mn-color-primary",
    );
    expect(group).toHaveAttribute("data-minerva", "segmented-control");
    expect(radios().map((radio) => radio.textContent)).toEqual([
      "day",
      "Week",
      "month",
    ]);
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
    expect(radios()[1]).toHaveClass("mn-selected");
    const thumb = container.querySelector<HTMLElement>(
      ".mn-segmented-control__indicator",
    )!;
    expect(thumb.style.transform).toBe("translateX(100%)");
    expect(thumb.style.width).toContain("/ 3");
  });

  it("selects on click and ignores disabled segments", () => {
    const onChange = vi.fn();
    render(
      <M.SegmentedControl
        aria-label="View"
        options={["a", { value: "b", disabled: true }, "c"]}
        defaultValue="a"
        onChange={onChange}
      />,
    );
    fireEvent.click(radios()[1]!);
    expect(onChange).not.toHaveBeenCalled();
    expect(radios()[1]).toHaveClass("mn-disabled");
    fireEvent.click(radios()[2]!);
    expect(onChange).toHaveBeenCalledWith("c");
    expect(radios()[2]).toHaveAttribute("aria-checked", "true");
  });

  it("keeps a controlled value and blocks a disabled control", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <M.SegmentedControl
        aria-label="View"
        options={["a", "b"]}
        value="a"
        onChange={onChange}
      />,
    );
    fireEvent.click(radios()[1]!);
    expect(onChange).toHaveBeenCalledWith("b");
    expect(radios()[0]).toHaveAttribute("aria-checked", "true");
    rerender(
      <M.SegmentedControl
        aria-label="View"
        options={["a", "b"]}
        value="a"
        onChange={onChange}
        disabled
        fullWidth
      />,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("mn-full-width");
    fireEvent.click(radios()[1]!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("moves and selects with the arrow keys on H5", () => {
    const onChange = vi.fn();
    render(
      <M.SegmentedControl
        aria-label="View"
        options={["a", { value: "b", disabled: true }, "c"]}
        defaultValue="a"
        onChange={onChange}
      />,
    );
    expect(radios()[0]).toHaveAttribute("tabindex", "0");
    radios()[0]!.focus();
    fireEvent.keyDown(radios()[0]!, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("c");
    expect(radios()[2]).toHaveFocus();
  });
});
