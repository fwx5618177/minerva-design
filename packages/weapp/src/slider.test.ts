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
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "slider-case",
    template: slider.template,
    ...slider.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  // A 200px-wide track at x = 0
  const query = {
    select() {
      return this;
    },
    boundingClientRect(cb: (rect: object) => void) {
      cb({ left: 0, width: 200, top: 0, height: 24 });
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
