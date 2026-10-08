import { describe, it, expect } from "vitest";
import simulate from "miniprogram-simulate";
import { template, definition, type PressDetail } from "./button/definition";

function mount(props: Record<string, unknown> = {}) {
  const id = simulate.load({ tagName: "mn-button", template, ...definition });
  const comp = simulate.render(id, props);
  const parent = document.createElement("parent-wrapper");
  comp.attach(parent);
  return comp;
}

describe("mn-button (object-form load)", () => {
  it("renders label and class", () => {
    const comp = mount({ label: "Hello" });
    const btn = comp.querySelector(".mn-button")!;
    expect(btn).toBeTruthy();
    expect(btn.dom!.textContent).toBe("Hello");
    expect(comp.dom!.innerHTML).toContain("Hello");
    expect(comp.dom!.innerHTML).not.toContain("mn-button--disabled");
    expect(comp.dom!.tagName.toLowerCase()).toBe("mn-button");
    expect(comp.toJSON()).toMatchObject({ tagName: "mn-button" });
  });

  it("emits press with count on tap", async () => {
    const comp = mount({ label: "Go" });
    const details: PressDetail[] = [];
    comp.addEventListener("press", (e) => details.push(e.detail));
    const btn = comp.querySelector(".mn-button")!;
    btn.dispatchEvent("tap");
    await simulate.sleep(10);
    btn.dispatchEvent("tap");
    await simulate.sleep(10);
    expect(details).toEqual([{ count: 1 }, { count: 2 }]);
    expect(comp.data.count).toBe(2);
    expect(comp.instance.data.count).toBe(2);
  });

  it("ignores tap when disabled", async () => {
    const comp = mount({ label: "No", disabled: true });
    const handler = { calls: 0 };
    comp.addEventListener("press", () => handler.calls++);
    expect(comp.dom!.innerHTML).toContain("mn-button--disabled");
    comp.querySelector(".mn-button")!.dispatchEvent("tap");
    await simulate.sleep(10);
    expect(handler.calls).toBe(0);
  });

  it("reacts to setData (property update)", async () => {
    const comp = mount({ label: "A" });
    comp.setData({ label: "B", disabled: true });
    await simulate.sleep(0);
    expect(comp.querySelector(".mn-button")!.dom!.textContent).toBe("B");
    expect(comp.dom!.innerHTML).toContain("mn-button--disabled");
    expect(
      simulate.match(
        comp.dom!,
        '<wx-view class="mn-button mn-button--disabled">B</wx-view>',
      ),
    ).toBe(true);
  });
});

describe("globals injected by miniprogram-simulate on import", () => {
  it("provides Component / Behavior / wx", () => {
    const g = globalThis as any;
    expect(typeof g.Component).toBe("function");
    expect(typeof g.Behavior).toBe("function");
    expect(typeof g.wx).toBe("object");
    expect(typeof g.wx.getSystemInfoSync).toBe("function");
  });

  it("supports behaviors in object-form load", async () => {
    const pressable = simulate.behavior({
      data: { pressed: false },
      methods: {
        markPressed(this: any) {
          this.setData({ pressed: true });
        },
      },
    });
    const id = simulate.load({
      template: `<view class="b" bindtap="markPressed">{{pressed ? 'yes' : 'no'}}</view>`,
      behaviors: [pressable],
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement("parent-wrapper"));
    comp.querySelector(".b")!.dispatchEvent("tap");
    await simulate.sleep(0);
    expect(comp.dom!.textContent).toBe("yes");
  });

  it("usingComponents with object-form children (ids returned by load)", async () => {
    const childId = simulate.load({
      tagName: "mn-button",
      template,
      ...definition,
    });
    const id = simulate.load({
      template: `<mn-button class="child" label="{{text}}" bind:press="onPress" /><view class="out">{{n}}</view>`,
      usingComponents: { "mn-button": childId },
      data: { text: "Child", n: 0 },
      methods: {
        onPress(this: any, e: any) {
          this.setData({ n: e.detail.count });
        },
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement("parent-wrapper"));
    const child = comp.querySelector(".child")!;
    expect(child.dom!.textContent).toBe("Child");
    child.querySelector(".mn-button")!.dispatchEvent("tap");
    await simulate.sleep(0);
    expect(comp.querySelector(".out")!.dom!.textContent).toBe("1");
  });
});
