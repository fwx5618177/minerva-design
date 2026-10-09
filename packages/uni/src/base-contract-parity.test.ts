import { mount } from "@vue/test-utils";
import { h, ref, nextTick } from "vue";
import { it, expect, vi } from "vitest";
import Select from "./Select.vue";
import Switch from "./Switch.vue";
import ModalRoot from "./ModalRoot.vue";
import ModalClose from "./ModalClose.vue";
import DrawerRoot from "./DrawerRoot.vue";
import DrawerClose from "./DrawerClose.vue";
it("Select applies field identity, validity, size and user styles to the real combobox and submits the selected native field", async () => {
  const w = mount(Select, {
    props: {
      id: "plan",
      name: "plan",
      required: true,
      invalid: true,
      size: "large",
      ariaLabel: "Plan",
      defaultValue: "a",
      options: [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
      ],
    },
    attrs: { style: { backgroundColor: "red" }, "data-test": "trigger" },
  });
  const trigger = w.get('[role="combobox"]');
  expect(trigger.attributes("id")).toBe("plan");
  expect(trigger.attributes("aria-required")).toBe("true");
  expect(trigger.attributes("aria-invalid")).toBe("true");
  expect(trigger.attributes("aria-label")).toBe("Plan");
  expect(trigger.classes()).toContain("mn-size-large");
  expect(trigger.attributes("style")).toContain("background-color: red");
  expect(trigger.attributes("data-test")).toBe("trigger");
  expect((w.get('input[name="plan"]').element as HTMLInputElement).value).toBe(
    "a",
  );
  await trigger.trigger("click");
  await w.get('[data-value="b"]').trigger("click");
  expect((w.get('input[name="plan"]').element as HTMLInputElement).value).toBe(
    "b",
  );
  expect(trigger.attributes("aria-expanded")).toBe("false");
});
it("Switch passes the original native event to change and handles Enter", async () => {
  const change = vi.fn();
  const w = mount(Switch, { props: { onChange: change } });
  await w.get('input[role="switch"]').setValue(true);
  expect(change.mock.calls[0][0]).toBe(true);
  expect(change.mock.calls[0][1].detail.value).toBe(true);
  await w.get('[role="switch"]').trigger("keydown", { key: "Enter" });
  expect(change.mock.calls[1][0]).toBe(false);
});
for (const [name, Root, Close] of [
  ["Modal", ModalRoot, ModalClose],
  ["Drawer", DrawerRoot, DrawerClose],
] as const)
  it(`${name} close consumers can cancel before root state changes and disabled guards callbacks`, async () => {
    const disabled = ref(false);
    const onClick = vi.fn((event: Event) => event.preventDefault());
    const w = mount(Root, {
      props: { defaultOpen: true },
      slots: {
        default: () =>
          h(Close, { onClick, disabled: disabled.value }, () => "Close"),
      },
    });
    await w.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(w.emitted("openChange")).toBeUndefined();
    disabled.value = true;
    await nextTick();
    await w.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
it("Select flips a measured popup above a bottom-edge trigger and restores focus after selection", async () => {
  const w = mount(Select, {
    props: { options: [{ value: "a", label: "Alpha" }] },
    attachTo: document.body,
  });
  const trigger = w.get('[role="combobox"]');
  (trigger.element as HTMLElement).getBoundingClientRect = () =>
    ({
      left: 20,
      right: 120,
      top: 750,
      bottom: 780,
      width: 100,
      height: 30,
    }) as DOMRect;
  await trigger.trigger("click");
  await nextTick();
  expect(w.get(".mn-uni-popover-panel").attributes("data-side")).toBe("top");
  await w.get('[role="option"]').trigger("click");
  await nextTick();
  await nextTick();
  expect(document.activeElement).toBe(trigger.element);
  w.unmount();
});
it("segmented Switch retains a native named checked field and RadioGroup supplies its selected form value", async () => {
  const toggle = mount(Switch, {
    props: {
      name: "alerts",
      checked: true,
      variant: "segmented",
      onLabel: "On",
      offLabel: "Off",
    },
  });
  expect(
    (toggle.get('input[name="alerts"]').element as HTMLInputElement).checked,
  ).toBe(true);
  const { default: RadioGroup } = await import("./RadioGroup.vue");
  const radio = mount(RadioGroup, {
    props: { name: "plan", value: 2, options: [{ value: 2, label: "Team" }] },
  });
  expect(
    (radio.get('input[name="plan"]').element as HTMLInputElement).value,
  ).toBe("2");
});
it("loading Button stays focusable but blocks click and native form submission", async () => {
  const { default: Button } = await import("./Button.vue");
  const click = vi.fn();
  const w = mount(Button, {
    props: { loading: true, type: "submit", onClick: click },
    attachTo: document.body,
  });
  const button = w.get("button");
  expect(button.attributes("disabled")).toBeUndefined();
  expect(button.attributes("aria-disabled")).toBe("true");
  expect(button.attributes("aria-busy")).toBe("true");
  expect(button.attributes("form-type")).toBeUndefined();
  (button.element as HTMLButtonElement).focus();
  expect(document.activeElement).toBe(button.element);
  await button.trigger("click");
  expect(click).not.toHaveBeenCalled();
  w.unmount();
});
