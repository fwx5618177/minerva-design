import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { FormControl, FormLabel } from "../FormControl";
import { Slider, type SliderValue } from ".";
import styles from "./slider.module.scss";

const controlOf = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[data-part="control"]')!;

/** A 200px-wide track at x = 0 */
function mockTrack(control: HTMLElement) {
  control.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 20,
      width: 200,
      height: 20,
      x: 0,
      y: 0,
      toJSON() {},
    }) as DOMRect;
}

describe("Slider", () => {
  it("renders a thumb with role=slider and its aria values", () => {
    render(<Slider aria-label="Volume" defaultValue={30} />);
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuenow", "30");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "100");
    expect(thumb).toHaveAttribute("aria-valuetext", "30");
    expect(thumb).toHaveAttribute("aria-orientation", "horizontal");
    expect(thumb).toHaveAttribute("tabindex", "0");
  });

  it("clamps and snaps the value", () => {
    render(<Slider aria-label="v" value={47} step={10} onChange={vi.fn()} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });

  it("steps with the keyboard and commits each key press", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    render(
      <Slider
        aria-label="v"
        defaultValue={50}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />,
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "51");
    await user.keyboard("{ArrowDown}{PageUp}");
    expect(thumb).toHaveAttribute("aria-valuenow", "60");
    await user.keyboard("{End}");
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await user.keyboard("{End}");
    await user.keyboard("{Home}");
    expect(thumb).toHaveAttribute("aria-valuenow", "0");
    expect(onChange.mock.calls.map((c) => c[0])).toEqual([51, 50, 60, 100, 0]);
    expect(onChangeEnd).toHaveBeenCalledTimes(5);
    expect(onChangeEnd).toHaveBeenLastCalledWith(0);
  });

  it("mirrors the arrows in RTL", async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <Slider aria-label="v" defaultValue={50} />
      </div>,
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowLeft}");
    expect(thumb).toHaveAttribute("aria-valuenow", "51");
  });

  it("jumps on a track click and drags with onChangeEnd on release", () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    const { container } = render(
      <Slider
        aria-label="v"
        defaultValue={10}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        tooltip
      />,
    );
    const control = controlOf(container);
    mockTrack(control);
    fireEvent.pointerDown(control, { button: 0, clientX: 100, pointerId: 1 });
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
    expect(thumb).toHaveAttribute("data-dragging");
    expect(container.firstChild).toHaveAttribute("data-dragging");
    fireEvent.pointerMove(control, { clientX: 150, pointerId: 1 });
    expect(thumb).toHaveAttribute("aria-valuenow", "75");
    expect(onChangeEnd).not.toHaveBeenCalled();
    fireEvent.pointerUp(control, { clientX: 150, pointerId: 1 });
    expect(onChange.mock.calls.map((c) => c[0])).toEqual([50, 75]);
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith(75);
    expect(thumb).not.toHaveAttribute("data-dragging");
    expect(container.querySelector('[data-part="tooltip"]')).toHaveTextContent(
      "75",
    );
  });

  it("range: two thumbs that cannot cross, the closest one moves", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Slider
        aria-label="Price"
        range
        defaultValue={[20, 60]}
        onChange={onChange}
        name="price"
        showValue
      />,
    );
    const [start, end] = screen.getAllByRole("slider");
    expect(start).toHaveAccessibleName("Price Minimum");
    expect(end).toHaveAccessibleName("Price Maximum");
    expect(start).toHaveAttribute("aria-valuemax", "60");
    expect(end).toHaveAttribute("aria-valuemin", "20");
    start.focus();
    await user.keyboard("{End}");
    expect(start).toHaveAttribute("aria-valuenow", "60");
    expect(onChange).toHaveBeenLastCalledWith([60, 60]);
    const control = controlOf(container);
    mockTrack(control);
    fireEvent.pointerDown(control, { button: 0, clientX: 180, pointerId: 1 });
    fireEvent.pointerUp(control, { pointerId: 1 });
    expect(end).toHaveAttribute("aria-valuenow", "90");
    const inputs = container.querySelectorAll<HTMLInputElement>(
      'input[name="price"]',
    );
    expect([...inputs].map((i) => i.value)).toEqual(["60", "90"]);
    expect(container.querySelector('[data-part="value"]')).toHaveTextContent(
      "60 – 90",
    );
  });

  it("controlled: follows value, onChange requests changes", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState<SliderValue>(5);
      return (
        <>
          <Slider aria-label="v" value={value} onChange={setValue} />
          <output>{String(value)}</output>
        </>
      );
    }
    render(<Controlled />);
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("status")).toHaveTextContent("6");
  });

  it("renders marks with labels and snaps to them", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Slider
        aria-label="v"
        defaultValue={0}
        step={null}
        marks={[
          { value: 0, label: "Low" },
          { value: 50, label: "Mid" },
          { value: 100, label: "High" },
        ]}
        formatValue={(v) => `${v}%`}
      />,
    );
    const marks = container.querySelectorAll('[data-part="mark"]');
    expect(marks).toHaveLength(3);
    expect(marks[0]).toHaveAttribute("data-state", "active");
    expect(marks[1]).toHaveAttribute("data-state", "inactive");
    expect(container).toHaveTextContent("Mid");
    const labels = container.querySelectorAll('[data-part="mark-label"]');
    expect(labels[0]).toHaveClass(styles.markLabelStart!);
    expect(labels[1]).not.toHaveClass(styles.markLabelStart!);
    expect(labels[1]).not.toHaveClass(styles.markLabelEnd!);
    expect(labels[2]).toHaveClass(styles.markLabelEnd!);
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
    expect(thumb).toHaveAttribute("aria-valuetext", "50%");
  });

  it("disabled and readOnly ignore interaction", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Slider aria-label="v" defaultValue={10} disabled onChange={onChange} />,
    );
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-disabled", "true");
    expect(thumb).toHaveAttribute("tabindex", "-1");
    const control = controlOf(container);
    mockTrack(control);
    fireEvent.pointerDown(control, { button: 0, clientX: 100 });
    rerender(
      <Slider aria-label="v" defaultValue={10} readOnly onChange={onChange} />,
    );
    expect(thumb).toHaveAttribute("aria-readonly", "true");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
    expect(thumb).toHaveAttribute("aria-valuenow", "10");
  });

  it("uses getAriaValueText and vertical orientation", async () => {
    const user = userEvent.setup();
    render(
      <Slider
        aria-label="v"
        orientation="vertical"
        defaultValue={3}
        max={5}
        getAriaValueText={(v) => `${v} stars`}
      />,
    );
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-orientation", "vertical");
    expect(thumb).toHaveAttribute("aria-valuetext", "3 stars");
    thumb.focus();
    await user.keyboard("{ArrowUp}");
    expect(thumb).toHaveAttribute("aria-valuenow", "4");
  });

  it("integrates with FormControl label, invalid and disabled", () => {
    render(
      <FormControl invalid disabled>
        <FormLabel>Brightness</FormLabel>
        <Slider defaultValue={40} />
      </FormControl>,
    );
    const thumb = screen.getByRole("slider", { name: "Brightness" });
    expect(thumb).toHaveAttribute("aria-invalid", "true");
    expect(thumb).toHaveAttribute("aria-disabled", "true");
    expect(thumb.closest('[data-part="root"]')).toHaveAttribute("data-invalid");
  });
});
