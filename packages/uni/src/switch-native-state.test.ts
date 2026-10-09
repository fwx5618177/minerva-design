import { mount } from "@vue/test-utils";
import { h, nextTick, ref } from "vue";
import { expect, it } from "vitest";
import Switch from "./Switch.vue";

it("restores the native widget after a controlled owner rejects a user toggle", async () => {
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: { checked: false },
  });
  const native = wrapper.get('input[role="switch"]')
    .element as HTMLInputElement;
  native.click();
  // Native state changes before the callback: no test driver writes the answer.
  expect(native.checked).toBe(true);
  await nextTick();
  await nextTick();
  expect(wrapper.emitted("change")).toEqual([[true, expect.any(Object)]]);
  expect((wrapper.get("input").element as HTMLInputElement).checked).toBe(
    false,
  );
  wrapper.unmount();
});

it("keeps native state when accepted and when uncontrolled; disabled blocks interaction", async () => {
  const checked = ref(false);
  const owner = mount(
    {
      render: () =>
        h(Switch, {
          checked: checked.value,
          onChange: (value: boolean) => {
            checked.value = value;
          },
        }),
    },
    { attachTo: document.body },
  );
  (owner.get("input").element as HTMLInputElement).click();
  await nextTick();
  await nextTick();
  expect(checked.value).toBe(true);
  expect((owner.get("input").element as HTMLInputElement).checked).toBe(true);
  owner.unmount();
  const local = mount(Switch, {
    attachTo: document.body,
    props: { defaultChecked: true },
  });
  (local.get("input").element as HTMLInputElement).click();
  await nextTick();
  expect((local.get("input").element as HTMLInputElement).checked).toBe(false);
  await local.setProps({ disabled: true });
  (local.get("input").element as HTMLInputElement).click();
  await nextTick();
  expect(local.emitted("change")).toEqual([[false, expect.any(Object)]]);
  local.unmount();
});
