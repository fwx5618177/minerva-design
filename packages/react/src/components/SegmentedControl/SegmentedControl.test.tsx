import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from ".";

const radios = () => screen.getAllByRole("radio");

describe("SegmentedControl", () => {
  it("renders a radiogroup of radio segments from strings and objects", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <SegmentedControl
        ref={ref}
        aria-label="View"
        options={[
          "Day",
          { value: "week", label: "Week" },
          {
            value: "grid",
            icon: <svg data-testid="icon" />,
            "aria-label": "Grid",
          },
        ]}
        defaultValue="week"
      />,
    );
    const group = screen.getByRole("radiogroup", { name: "View" });
    expect(ref.current).toBe(group);
    expect(radios().map((radio) => radio.textContent)).toEqual([
      "Day",
      "Week",
      "",
    ]);
    expect(radios()[2]).toHaveAccessibleName("Grid");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
      "data-part",
      "icon",
    );
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
    expect(radios()[0]).toHaveAttribute("aria-checked", "false");
    // roving tab stop on the selection
    expect(radios().map((radio) => radio.tabIndex)).toEqual([-1, 0, -1]);
    expect(group.style.getPropertyValue("--_segmented-control-index")).toBe(
      "1",
    );
    expect(group.style.getPropertyValue("--_segmented-control-count")).toBe(
      "3",
    );
  });

  it("puts the tab stop on the first enabled segment without a selection and hides the thumb", () => {
    const { container } = render(
      <SegmentedControl
        aria-label="View"
        options={[{ value: "a", disabled: true }, "b", "c"]}
      />,
    );
    expect(radios().map((radio) => radio.tabIndex)).toEqual([-1, 0, -1]);
    expect(radios()[0]).toHaveAttribute("aria-disabled", "true");
    expect(container.querySelector('[data-part="indicator"]')).toHaveAttribute(
      "hidden",
    );
  });

  it("selects by click (uncontrolled) and reports it, ignoring disabled segments", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="View"
        options={["a", "b", { value: "c", disabled: true }]}
        defaultValue="a"
        onChange={onChange}
      />,
    );
    await user.click(radios()[1]);
    expect(onChange).toHaveBeenCalledWith("b");
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
    await user.click(radios()[2]);
    expect(onChange).toHaveBeenCalledTimes(1);
    // clicking the selection again does not report
    await user.click(radios()[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("moves and selects with the arrow keys, skipping disabled segments, wrapping around, Home / End", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="View"
        options={["a", { value: "b", disabled: true }, "c", "d"]}
        defaultValue="a"
        onChange={onChange}
      />,
    );
    await user.tab();
    expect(radios()[0]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(radios()[2]).toHaveFocus();
    expect(radios()[2]).toHaveAttribute("aria-checked", "true");
    await user.keyboard("{ArrowDown}");
    expect(radios()[3]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(radios()[0]).toHaveFocus();
    await user.keyboard("{End}");
    expect(radios()[3]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(radios()[0]).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(radios()[3]).toHaveFocus();
    expect(onChange.mock.calls.map(([value]) => value)).toEqual([
      "c",
      "d",
      "a",
      "d",
      "a",
      "d",
    ]);
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <SegmentedControl
          aria-label="View"
          options={["a", "b", "c"]}
          defaultValue="a"
        />
      </div>,
    );
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(radios()[1]).toHaveFocus();
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
  });

  it("is controlled with value / onChange", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState<"list" | "grid">("list");
      return (
        <>
          <SegmentedControl<"list" | "grid">
            aria-label="View"
            options={["list", "grid"]}
            value={value}
            onChange={setValue}
          />
          <output>{value}</output>
        </>
      );
    };
    render(<Controlled />);
    await user.click(radios()[1]);
    expect(screen.getByRole("status")).toHaveTextContent("grid");
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
  });

  it("blocks everything when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="View"
        options={["a", "b"]}
        defaultValue="a"
        onChange={onChange}
        disabled
      />,
    );
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("data-disabled", "");
    expect(radios().every((radio) => radio.tabIndex === -1)).toBe(true);
    await user.click(radios()[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("carries the value in a form through a hidden input", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <SegmentedControl
          aria-label="View"
          name="view"
          options={["a", "b"]}
          defaultValue="a"
        />
      </form>,
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("view")).toBe("a");
    await user.click(radios()[1]);
    expect(new FormData(form).get("view")).toBe("b");
  });

  it("exposes the styling hooks", () => {
    render(
      <SegmentedControl
        aria-label="View"
        options={["a", "b"]}
        defaultValue="b"
        size="small"
        color="primary"
        fullWidth
      />,
    );
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("data-minerva", "segmented-control");
    expect(group).toHaveAttribute("data-size", "small");
    expect(group).toHaveAttribute("data-color", "primary");
    expect(radios()[1]).toHaveAttribute("data-part", "item");
    expect(radios()[1]).toHaveAttribute("data-selected", "");
    expect(radios()[0]).not.toHaveAttribute("data-selected");
  });
});
