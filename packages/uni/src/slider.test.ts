import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Slider from "./Slider.vue";

type Wrapper = ReturnType<typeof mount>;
const thumbs = (w: Wrapper) => w.findAll('[role="slider"]');

function mockTrack(w: Wrapper) {
  const control = w.find(".mn-slider__control").element as HTMLElement;
  control.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 24,
      width: 200,
      height: 24,
    }) as DOMRect;
  return w.find(".mn-slider__control");
}

describe("uni Slider", () => {
  it("renders role=slider thumbs with classes and hooks", () => {
    const w = mount(Slider, {
      props: {
        ariaLabel: "Volume",
        defaultValue: 30,
        size: "small",
        color: "info",
      },
    });
    const root = w.find(".mn-slider");
    expect(root.classes()).toEqual(
      expect.arrayContaining(["mn-size-small", "mn-color-info"]),
    );
    expect(root.attributes("data-variant")).toBe("single");
    const thumb = thumbs(w)[0]!;
    expect(thumb.attributes("aria-label")).toBe("Volume");
    expect(thumb.attributes("aria-valuenow")).toBe("30");
    expect(thumb.attributes("style")).toContain("left: 30%");
  });

  it("touch drag emits change while moving and changeEnd on release", async () => {
    const w = mount(Slider, { props: { ariaLabel: "v", tooltip: true } });
    const control = mockTrack(w);
    await control.trigger("touchstart", { touches: [{ clientX: 50 }] });
    expect(thumbs(w)[0]!.attributes("data-dragging")).toBe("");
    expect(w.find(".mn-slider__tooltip").text()).toBe("25");
    await control.trigger("touchmove", { touches: [{ clientX: 150 }] });
    expect(w.emitted("changeEnd")).toBeUndefined();
    await control.trigger("touchend", { changedTouches: [{ clientX: 150 }] });
    expect(w.emitted("change")).toEqual([[25], [75]]);
    expect(w.emitted("update:modelValue")).toEqual([[25], [75]]);
    expect(w.emitted("changeEnd")).toEqual([[75]]);
  });

  it("range: thumbs cannot cross; keys step and commit (RTL-aware)", async () => {
    const w = mount(Slider, {
      props: {
        ariaLabel: "Price",
        range: true,
        defaultValue: [20, 60],
        showValue: true,
        name: "price",
      },
    });
    expect(thumbs(w)[0]!.attributes("aria-label")).toBe("Price Minimum");
    expect(thumbs(w)[1]!.attributes("aria-valuemin")).toBe("20");
    await thumbs(w)[0]!.trigger("keydown", { key: "End" });
    expect(w.emitted("changeEnd")).toEqual([[[60, 60]]]);
    expect(w.find(".mn-slider__value").text()).toBe("60 – 60");
    expect(w.findAll('[data-part="input"]')).toHaveLength(2);
  });

  it("marks-only snapping and disabled", async () => {
    const w = mount(Slider, {
      props: {
        ariaLabel: "v",
        step: null,
        marks: [{ value: 0, label: "Low" }, { value: 40 }, { value: 100 }],
      },
    });
    expect(w.findAll(".mn-slider__mark")).toHaveLength(3);
    expect(w.text()).toContain("Low");
    await thumbs(w)[0]!.trigger("keydown", { key: "ArrowRight" });
    expect(w.emitted("change")).toEqual([[40]]);
    await w.setProps({ disabled: true });
    await thumbs(w)[0]!.trigger("keydown", { key: "ArrowRight" });
    const control = mockTrack(w);
    await control.trigger("touchstart", { touches: [{ clientX: 180 }] });
    expect(w.emitted("change")).toHaveLength(1);
    expect(thumbs(w)[0]!.attributes("aria-disabled")).toBe("true");
  });
});
