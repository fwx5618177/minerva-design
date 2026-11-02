import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";

const thumbs = () => screen.getAllByRole("slider");
const control = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(".mn-slider__control")!;

function mockTrack(el: HTMLElement) {
  el.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 24,
      width: 200,
      height: 24,
    }) as DOMRect;
}

const touch = (clientX: number) => ({ touches: [{ clientX }] });

describe("Taro Slider", () => {
  it("renders role=slider thumbs with the root classes and hooks", () => {
    const { container } = render(
      <M.Slider
        aria-label="Volume"
        defaultValue={30}
        size="small"
        color="success"
      />,
    );
    const root = container.querySelector(".mn-slider")!;
    expect(root).toHaveClass("mn-size-small", "mn-color-success");
    expect(root).toHaveAttribute("data-minerva", "slider");
    expect(root).toHaveAttribute("data-variant", "single");
    const [thumb] = thumbs();
    expect(thumb).toHaveAttribute("aria-label", "Volume");
    expect(thumb).toHaveAttribute("aria-valuenow", "30");
    expect(thumb.style.left).toBe("30%");
  });

  it("touch: the closest thumb jumps, drags and commits on release", () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    const { container } = render(
      <M.Slider
        aria-label="v"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        tooltip
      />,
    );
    const el = control(container);
    mockTrack(el);
    fireEvent.touchStart(el, touch(50));
    expect(thumbs()[0]).toHaveAttribute("data-dragging");
    expect(container.querySelector(".mn-slider__tooltip")).toHaveTextContent(
      "25",
    );
    fireEvent.touchMove(el, touch(150));
    expect(onChangeEnd).not.toHaveBeenCalled();
    fireEvent.touchEnd(el, { changedTouches: [{ clientX: 150 }] });
    expect(onChange.mock.calls.map((c) => c[0])).toEqual([25, 75]);
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith(75);
  });

  it("range: thumbs cannot cross; hidden inputs and value label", () => {
    const onChange = vi.fn();
    const { container } = render(
      <M.Slider
        aria-label="Price"
        range
        defaultValue={[20, 60]}
        onChange={onChange}
        name="price"
        showValue
      />,
    );
    expect(thumbs()[0]).toHaveAttribute("aria-label", "Price Minimum");
    expect(thumbs()[1]).toHaveAttribute("aria-valuemin", "20");
    const el = control(container);
    mockTrack(el);
    fireEvent.touchStart(el, touch(180));
    fireEvent.touchMove(el, touch(0));
    fireEvent.touchEnd(el, {});
    expect(onChange).toHaveBeenLastCalledWith([20, 20]);
    expect(container.querySelector(".mn-slider__value")).toHaveTextContent(
      "20 – 20",
    );
    expect(container.querySelectorAll('[data-part="input"]')).toHaveLength(2);
  });

  it("H5 keys step and commit; marks-only snapping", () => {
    const onChangeEnd = vi.fn();
    const { container } = render(
      <M.Slider
        aria-label="v"
        step={null}
        marks={[{ value: 0, label: "Low" }, { value: 40 }, { value: 100 }]}
        onChangeEnd={onChangeEnd}
      />,
    );
    expect(container.querySelectorAll(".mn-slider__mark")).toHaveLength(3);
    expect(container.querySelector(".mn-slider__mark")).toHaveClass(
      "mn-active",
    );
    fireEvent.keyDown(thumbs()[0], { key: "ArrowRight" });
    expect(onChangeEnd).toHaveBeenLastCalledWith(40);
    fireEvent.keyDown(thumbs()[0], { key: "End" });
    expect(onChangeEnd).toHaveBeenLastCalledWith(100);
  });

  it("FormControl disabled / readOnly block touches and keys", () => {
    const onChange = vi.fn();
    const { container } = render(
      <M.FormControl disabled invalid>
        <M.Slider aria-label="v" defaultValue={10} onChange={onChange} />
      </M.FormControl>,
    );
    const [thumb] = thumbs();
    expect(thumb).toHaveAttribute("aria-disabled", "true");
    expect(thumb).toHaveAttribute("aria-invalid", "true");
    const el = control(container);
    mockTrack(el);
    fireEvent.touchStart(el, touch(150));
    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  describe("vertical", () => {
    /** A 200px-high track at y = 100 */
    function mockVerticalTrack(el: HTMLElement) {
      el.getBoundingClientRect = () =>
        ({
          left: 0,
          right: 24,
          top: 100,
          bottom: 300,
          width: 24,
          height: 200,
        }) as DOMRect;
    }
    const touchY = (clientY: number) => ({
      touches: [{ clientX: 12, clientY }],
    });

    it("positions from the bottom and exposes the orientation", () => {
      const { container } = render(
        <M.Slider
          aria-label="Level"
          orientation="vertical"
          defaultValue={30}
        />,
      );
      const root = container.querySelector(".mn-slider")!;
      expect(root).toHaveClass("mn-vertical");
      expect(root).toHaveAttribute("data-orientation", "vertical");
      const [thumb] = thumbs();
      expect(thumb).toHaveAttribute("aria-orientation", "vertical");
      expect(thumb.style.bottom).toBe("30%");
      expect(thumb.style.left).toBe("");
      const fill = container.querySelector<HTMLElement>(".mn-slider__range")!;
      expect(fill.style.bottom).toBe("0%");
      expect(fill.style.height).toBe("30%");
    });

    it("tap at the bottom = min, drag up increases, commit on release", () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      const { container } = render(
        <M.Slider
          aria-label="v"
          orientation="vertical"
          defaultValue={50}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        />,
      );
      const el = control(container);
      mockVerticalTrack(el);
      fireEvent.touchStart(el, touchY(300));
      fireEvent.touchMove(el, touchY(250));
      fireEvent.touchMove(el, touchY(120));
      fireEvent.touchMove(el, touchY(40));
      fireEvent.touchEnd(el, { changedTouches: [{ clientY: 40 }] });
      expect(onChange.mock.calls.map((c) => c[0])).toEqual([0, 25, 90, 100]);
      expect(onChangeEnd).toHaveBeenCalledTimes(1);
      expect(onChangeEnd).toHaveBeenCalledWith(100);
    });

    it("range: the closest thumb follows; H5 ArrowUp steps", () => {
      const onChange = vi.fn();
      const { container } = render(
        <M.Slider
          aria-label="Band"
          orientation="vertical"
          range
          defaultValue={[20, 60]}
          onChange={onChange}
          marks={[{ value: 0, label: "Low" }, { value: 100 }]}
        />,
      );
      const marks = container.querySelectorAll<HTMLElement>(".mn-slider__mark");
      expect(marks[1].style.bottom).toBe("100%");
      const el = control(container);
      mockVerticalTrack(el);
      // 80% up: the end thumb, then dragged below the start thumb
      fireEvent.touchStart(el, touchY(140));
      fireEvent.touchMove(el, touchY(290));
      fireEvent.touchEnd(el, {});
      expect(onChange.mock.calls.map((c) => c[0])).toEqual([
        [20, 80],
        [20, 20],
      ]);
      fireEvent.keyDown(thumbs()[1], { key: "ArrowUp" });
      expect(onChange).toHaveBeenLastCalledWith([20, 21]);
    });
  });
});
