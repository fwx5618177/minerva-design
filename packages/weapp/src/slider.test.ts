import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { slider } from "./index";

type Root = simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>;
const mounted: Root[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
});
function mount(
  props: Record<string, unknown>,
  rect: object = { left: 0, width: 200, top: 0, height: 24 },
) {
  const id = simulate.load({
    tagName: "slider-case",
    template: slider.template,
    ...slider.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  // A 200px-wide track at x = 0 (by default)
  const query = {
    select() {
      return this;
    },
    boundingClientRect(cb: (rect: object) => void) {
      cb(rect);
      return this;
    },
    exec() {},
  };
  vi.spyOn(w.instance, "createSelectorQuery").mockReturnValue(
    query as unknown as WechatMiniprogram.SelectorQuery,
  );
  return w;
}
type Thumb = {
  value: number;
  ariaLabel: string;
  ariaValueText: string;
  min: number;
  max: number;
  style: string;
  dragging: boolean;
};
const tick = () => simulate.sleep(0);
const thumbs = (w: Root) => w.data.thumbs as Thumb[];
const control = (w: Root) => w.querySelector(".mn-slider__control")!;
const touch = (x: number) => ({ touches: [{ x, y: 0 }] });

it("slider renders thumbs with aria values, classes and marks", () => {
  const w = mount({
    ariaLabel: "Volume",
    defaultValue: 30,
    size: "small",
    color: "success",
    marks: [{ value: 0, label: "Low" }, { value: 50 }],
  });
  expect(thumbs(w)).toEqual([
    expect.objectContaining({
      value: 30,
      ariaLabel: "Volume",
      ariaValueText: "30",
      style: "left:30%",
    }),
  ]);
  const root = w.querySelector(".mn-slider")!.dom!;
  expect(root.className).toContain("mn-size-small");
  expect(root.className).toContain("mn-color-success");
  expect(root.className).toContain("mn-labelled");
  expect(w.querySelectorAll(".mn-slider__mark")).toHaveLength(2);
  expect(w.data.marksView[0].active).toBe(true);
});

it("slider touch drag emits change while moving and changeend on release", async () => {
  const w = mount({ ariaLabel: "v", tooltip: true });
  const changes: unknown[] = [];
  const ends: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("changeend", (e) => ends.push(e.detail));
  control(w).dispatchEvent("touchstart", touch(50));
  await tick();
  expect(thumbs(w)[0]!.dragging).toBe(true);
  expect(w.querySelector(".mn-slider__tooltip")).toBeTruthy();
  control(w).dispatchEvent("touchmove", touch(150));
  await tick();
  expect(ends).toEqual([]);
  control(w).dispatchEvent("touchend", { changedTouches: [{ x: 150, y: 0 }] });
  await tick();
  expect(changes).toEqual([{ value: 25 }, { value: 75 }]);
  expect(ends).toEqual([{ value: 75 }]);
  expect(thumbs(w)[0]!.value).toBe(75);
  expect(thumbs(w)[0]!.dragging).toBe(false);
});

it("slider range keeps thumbs from crossing and a controlled value", async () => {
  const w = mount({
    ariaLabel: "Price",
    range: true,
    value: [20, 60],
    showValue: true,
  });
  expect(thumbs(w).map((t) => t.ariaLabel)).toEqual([
    "Price Minimum",
    "Price Maximum",
  ]);
  expect(thumbs(w)[1]!.min).toBe(20);
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  control(w).dispatchEvent("touchstart", touch(180));
  await tick();
  control(w).dispatchEvent("touchmove", touch(0));
  await tick();
  expect(changes).toEqual([{ value: [20, 90] }, { value: [20, 20] }]);
  // controlled: the published prop wins
  expect(thumbs(w).map((t) => t.value)).toEqual([20, 60]);
  w.setData({ value: [20, 20] });
  await tick();
  expect(w.data.valueText).toBe("20 – 20");
});

it("slider configure, stepThumb and disabled", async () => {
  const w = mount({ ariaLabel: "v", defaultValue: 3, max: 5 });
  w.instance.configure({
    formatValue: (v: number) => `${v}★`,
    getAriaValueText: (v: number) => `${v} stars`,
  });
  await tick();
  expect(thumbs(w)[0]!.ariaValueText).toBe("3 stars");
  const ends: unknown[] = [];
  w.addEventListener("changeend", (e) => ends.push(e.detail));
  w.instance.stepThumb("ArrowRight");
  await tick();
  expect(ends).toEqual([{ value: 4 }]);
  w.setData({ disabled: true });
  await tick();
  w.instance.stepThumb("ArrowRight");
  control(w).dispatchEvent("touchstart", touch(0));
  await tick();
  expect(ends).toHaveLength(1);
  expect(thumbs(w)[0]!.value).toBe(4);
});

// A 200px-high vertical track at y = 100
const verticalTrack = { left: 0, width: 24, top: 100, height: 200 };
const touchY = (y: number) => ({ touches: [{ x: 12, y }] });

it("vertical slider positions from the bottom and exposes the orientation", () => {
  const w = mount(
    {
      ariaLabel: "Level",
      orientation: "vertical",
      defaultValue: 30,
      marks: [{ value: 0, label: "Low" }, { value: 100 }],
    },
    verticalTrack,
  );
  expect(thumbs(w)[0]!.style).toBe("bottom:30%");
  expect(w.data.rangeStyle).toBe("bottom:0%;height:30%");
  expect(w.data.marksView.map((m: { style: string }) => m.style)).toEqual([
    "bottom:0%",
    "bottom:100%",
  ]);
  expect(w.data.marksView[0].labelClass).toBe("");
  const root = w.querySelector(".mn-slider")!.dom!;
  expect(root.className).toContain("mn-vertical");
  expect(root.getAttribute("data-orientation")).toBe("vertical");
  expect(slider.template).toContain('aria-orientation="{{orientation}}"');
});

it("vertical slider: tap at the bottom = min, drag up increases", async () => {
  const w = mount(
    { ariaLabel: "v", orientation: "vertical", defaultValue: 50 },
    verticalTrack,
  );
  const changes: unknown[] = [];
  const ends: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("changeend", (e) => ends.push(e.detail));
  control(w).dispatchEvent("touchstart", touchY(300));
  await tick();
  for (const y of [250, 120, 40]) {
    control(w).dispatchEvent("touchmove", touchY(y));
    await tick();
  }
  control(w).dispatchEvent("touchend", { changedTouches: [{ x: 12, y: 40 }] });
  await tick();
  expect(changes).toEqual([
    { value: 0 },
    { value: 25 },
    { value: 90 },
    { value: 100 },
  ]);
  expect(ends).toEqual([{ value: 100 }]);
});

it("vertical range moves the closest thumb without crossing", async () => {
  const w = mount(
    {
      ariaLabel: "Band",
      orientation: "vertical",
      range: true,
      defaultValue: [20, 60],
    },
    verticalTrack,
  );
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  control(w).dispatchEvent("touchstart", touchY(140));
  await tick();
  control(w).dispatchEvent("touchmove", touchY(290));
  await tick();
  control(w).dispatchEvent("touchend", {});
  await tick();
  expect(changes).toEqual([{ value: [20, 80] }, { value: [20, 20] }]);
  w.instance.stepThumb("ArrowUp", 1);
  await tick();
  expect(thumbs(w).map((t) => t.value)).toEqual([20, 21]);
});
