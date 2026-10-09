import simulate from "miniprogram-simulate";
import { expect, it } from "vitest";
import { toggle } from "./index";

// The simulator's built-in switch has no interactive state. Model the documented
// native boundary: tapping first mutates the widget, then emits detail.value.
const nativeSwitch = simulate.load({
  tagName: "test-native-switch",
  template:
    '<view class="native-switch" bindtap="activate"><text>{{nativeChecked}}</text></view>',
  properties: { checked: Boolean, disabled: Boolean },
  data: { nativeChecked: false },
  observers: {
    checked(
      this: WechatMiniprogram.Component.TrivialInstance,
      checked: boolean,
    ) {
      this.setData({ nativeChecked: checked });
    },
  },
  methods: {
    activate(this: WechatMiniprogram.Component.TrivialInstance) {
      if (this.data.disabled) return;
      const value = !this.data.nativeChecked;
      this.setData({ nativeChecked: value });
      this.triggerEvent("change", { value });
    },
  },
});
function mount(props: Record<string, unknown>) {
  const component = simulate.load({
    ...toggle.definition,
    tagName: "test-switch-control",
    // Only the platform widget is replaced; production props and handler stay real.
    template: toggle.template.replace("<switch ", "<test-native-switch "),
    usingComponents: { "test-native-switch": nativeSwitch },
  });
  const wrapper = simulate.render(component, props);
  wrapper.attach(document.createElement("div"));
  return wrapper;
}
it("restores the actual switch widget after its controlled owner rejects", async () => {
  const wrapper = mount({ checked: false });
  const widget = wrapper.querySelector(".mn-switch")!;
  widget.querySelector(".native-switch")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(wrapper.data.effectiveChecked).toBe(false);
  expect(widget.data.nativeChecked).toBe(false);
  wrapper.detach();
});
it("accepts owner changes, preserves uncontrolled toggles and blocks disabled taps", async () => {
  const owner = mount({ checked: false });
  owner.addEventListener("change", (event) =>
    owner.setData({ checked: (event.detail as { checked: boolean }).checked }),
  );
  const controlledWidget = owner.querySelector(".mn-switch")!;
  controlledWidget.querySelector(".native-switch")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(controlledWidget.data.nativeChecked).toBe(true);
  owner.detach();
  const local = mount({ defaultChecked: true });
  const widget = local.querySelector(".mn-switch")!;
  widget.querySelector(".native-switch")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(widget.data.nativeChecked).toBe(false);
  local.setData({ disabled: true });
  await simulate.sleep(0);
  widget.querySelector(".native-switch")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(widget.data.nativeChecked).toBe(false);
  local.detach();
});
