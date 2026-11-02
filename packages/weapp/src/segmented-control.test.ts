import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { segmentedControl } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "segmented-control-case",
    template: segmentedControl.template,
    ...segmentedControl.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
type Segment = {
  value: string;
  icon: string;
  label: string;
  ariaLabel: string;
  selected: boolean;
  disabled: boolean;
  tabindex: number;
};
const tick = () => simulate.sleep(0);
const segments = (w: ReturnType<typeof mount>) => w.data.segments as Segment[];
const item = (w: ReturnType<typeof mount>, index: number) =>
  w.querySelectorAll(".mn-segmented-control__item")[index]!;

it("segmented control renders segments with the selection and a thumb", () => {
  const w = mount({
    ariaLabel: "View",
    options: [
      "day",
      { value: "week", label: "Week" },
      { value: "grid", icon: "▦", "aria-label": "Grid" },
    ],
    defaultValue: "week",
    color: "primary",
  });
  expect(segments(w)).toEqual([
    expect.objectContaining({ value: "day", label: "day", selected: false }),
    expect.objectContaining({ value: "week", label: "Week", selected: true }),
    expect.objectContaining({
      value: "grid",
      icon: "▦",
      label: "",
      ariaLabel: "Grid",
    }),
  ]);
  expect(w.data.thumbStyle).toContain("translateX(100%)");
  expect(w.data.thumbStyle).toContain("/ 3");
  expect(item(w, 1).dom!.className).toContain("mn-selected");
  expect(w.querySelector(".mn-segmented-control")!.dom!.className).toContain(
    "mn-color-primary",
  );
});

it("segmented control selects on tap (uncontrolled) and skips disabled segments", async () => {
  const w = mount({
    options: ["a", { value: "b", disabled: true }, "c"],
    defaultValue: "a",
  });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  item(w, 1).dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([]);
  item(w, 2).dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "c" }]);
  expect(segments(w)[2]!.selected).toBe(true);
  expect(w.data.thumbStyle).toContain("translateX(200%)");
});

it("segmented control keeps a controlled value and blocks when disabled", async () => {
  const w = mount({ options: ["a", "b"], value: "a" });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  item(w, 1).dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "b" }]);
  expect(segments(w)[0]!.selected).toBe(true);
  w.setData({ value: "b" });
  await tick();
  expect(segments(w)[1]!.selected).toBe(true);
  w.setData({ disabled: true });
  await tick();
  item(w, 0).dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
  expect(segments(w).every((segment) => segment.disabled)).toBe(true);
});
