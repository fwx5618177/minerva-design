import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { FormControl, FormLabel } from "../FormControl";
import { Slider } from ".";
import type { SliderValue } from "./types";

type Props = Record<string, unknown>;
const renderSlider = (props: Props = {}, attrs: Props = {}) =>
  render(Slider, {
    props: props as never,
    attrs: { "aria-label": "Volume", ...attrs },
  });

const thumbs = () => screen.getAllByRole("slider");
const control = (container: Element) =>
  container.querySelector<HTMLElement>('[data-part="control"]')!;

function mockTrack(el: HTMLElement) {
  el.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 20,
      width: 200,
      height: 20,
    }) as DOMRect;
}

describe("Slider (Vue)", () => {
  it("renders role=slider with its aria values", () => {
    renderSlider({ defaultValue: 30 });
    const [thumb] = thumbs();
    expect(thumb.getAttribute("aria-label")).toBe("Volume");
    expect(thumb.getAttribute("aria-valuenow")).toBe("30");
    expect(thumb.getAttribute("aria-valuemin")).toBe("0");
    expect(thumb.getAttribute("aria-valuemax")).toBe("100");
    expect(thumb.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("steps with the keys and emits change + changeEnd", async () => {
    const { emitted } = renderSlider({ defaultValue: 50 });
    const [thumb] = thumbs();
    await fireEvent.keyDown(thumb, { key: "ArrowRight" });
    await fireEvent.keyDown(thumb, { key: "PageDown" });
    await fireEvent.keyDown(thumb, { key: "End" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("100");
    expect(emitted().change).toEqual([[51], [41], [100]]);
    expect(emitted().changeEnd).toEqual([[51], [41], [100]]);
    expect(emitted()["update:modelValue"]).toHaveLength(3);
  });

  it("drags: change while moving, changeEnd once on release", async () => {
    const { emitted, container } = renderSlider({ defaultValue: 0 });
    const el = control(container);
    mockTrack(el);
    await fireEvent.pointerDown(el, { button: 0, clientX: 50, pointerId: 1 });
    expect(thumbs()[0].hasAttribute("data-dragging")).toBe(true);
    await fireEvent.pointerMove(el, { clientX: 120, pointerId: 1 });
    expect(emitted().changeEnd).toBeUndefined();
    await fireEvent.pointerUp(el, { pointerId: 1 });
    expect(emitted().change).toEqual([[25], [60]]);
    expect(emitted().changeEnd).toEqual([[60]]);
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("60");
  });

  it("range: thumbs cannot cross; hidden inputs and value label", async () => {
    const { container } = renderSlider({
      range: true,
      defaultValue: [20, 60],
      name: "price",
      showValue: true,
    });
    const [start, end] = thumbs();
    expect(start.getAttribute("aria-label")).toBe("Volume Minimum");
    expect(end.getAttribute("aria-label")).toBe("Volume Maximum");
    await fireEvent.keyDown(start, { key: "End" });
    expect(start.getAttribute("aria-valuenow")).toBe("60");
    const inputs = container.querySelectorAll<HTMLInputElement>(
      'input[name="price"]',
    );
    expect([...inputs].map((i) => i.value)).toEqual(["60", "60"]);
    expect(container.querySelector('[data-part="value"]')?.textContent).toBe(
      "60 – 60",
    );
  });

  it("v-model: controlled value", async () => {
    const value = ref<SliderValue>(5);
    render(
      defineComponent({
        setup: () => () =>
          h(Slider, {
            modelValue: value.value,
            "onUpdate:modelValue": (v: SliderValue) => (value.value = v),
            "aria-label": "v",
          }),
      }),
    );
    await fireEvent.keyDown(thumbs()[0], { key: "ArrowUp" });
    expect(value.value).toBe(6);
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("6");
  });

  it("marks snap with step null", async () => {
    const { container } = renderSlider({
      step: null,
      marks: [{ value: 0, label: "Low" }, { value: 40 }, { value: 100 }],
    });
    expect(container.querySelectorAll('[data-part="mark"]')).toHaveLength(3);
    expect(container.textContent).toContain("Low");
    await fireEvent.keyDown(thumbs()[0], { key: "ArrowRight" });
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("40");
  });

  it("disabled / readOnly ignore keys and pointer", async () => {
    const { emitted, container } = renderSlider({
      defaultValue: 10,
      disabled: true,
    });
    expect(thumbs()[0].getAttribute("tabindex")).toBe("-1");
    await fireEvent.keyDown(thumbs()[0], { key: "ArrowRight" });
    const el = control(container);
    mockTrack(el);
    await fireEvent.pointerDown(el, { button: 0, clientX: 100 });
    expect(emitted().change).toBeUndefined();
  });

  it("integrates with FormControl", () => {
    render(
      defineComponent({
        setup: () => () =>
          h(FormControl, { invalid: true, readOnly: true }, () => [
            h(FormLabel, null, () => "Brightness"),
            h(Slider, { defaultValue: 40 }),
          ]),
      }),
    );
    const thumb = screen.getByRole("slider", { name: "Brightness" });
    expect(thumb.getAttribute("aria-invalid")).toBe("true");
    expect(thumb.getAttribute("aria-readonly")).toBe("true");
  });
});
