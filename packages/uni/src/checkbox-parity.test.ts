import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { Checkbox, FormControl } from "./index";
import { h } from "vue";

it("renders checkbox semantic color, size, shape, placement, icon and helper", () => {
  const wrapper = mount(Checkbox, {
    props: {
      defaultChecked: true,
      color: "danger",
      size: "large",
      shape: "circle",
      label: "Terms",
      helperText: "Required",
      error: true,
      labelPlacement: "start",
    },
    slots: { icon: "OK" },
  });
  expect(wrapper.find('[role="checkbox"]').classes()).toEqual(
    expect.arrayContaining([
      "mn-choice-color-danger",
      "mn-choice-size-large",
      "mn-choice-shape-circle",
      "mn-choice-label-start",
      "mn-invalid",
    ]),
  );
  expect(wrapper.find(".mn-choice-indicator").text()).toBe("OK");
  expect(wrapper.find(".mn-choice-helper").text()).toBe("Required");
  expect(wrapper.find('[role="checkbox"]').attributes("aria-invalid")).toBe(
    "true",
  );
  wrapper.unmount();
});
it("inherits required/invalid fields but respects explicit error=false", () => {
  const wrapper = mount(FormControl, {
    props: { required: true, invalid: true },
    slots: {
      default: () => [
        h(Checkbox, { label: "Inherited" }),
        h(Checkbox, { label: "Override", error: false }),
      ],
    },
  });
  const controls = wrapper.findAll('[role="checkbox"]');
  expect(controls[0]!.attributes("aria-required")).toBe("true");
  expect(controls[0]!.attributes("aria-invalid")).toBe("true");
  expect(controls[1]!.attributes("aria-invalid")).toBe("false");
  wrapper.unmount();
});
