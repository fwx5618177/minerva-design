import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
  useFormControlProps,
} from ".";

/** A bare control wired with useFormControlProps */
const Control = defineComponent({
  props: { describedBy: String, invalid: String },
  setup(props) {
    const field = useFormControlProps(() => ({
      "aria-describedby": props.describedBy,
      "aria-invalid": props.invalid,
    }));
    return () =>
      h("input", {
        id: field.value.id,
        disabled: field.value.disabled,
        readonly: field.value.readOnly,
        "aria-describedby": field.value["aria-describedby"],
        "aria-invalid": field.value["aria-invalid"],
        "aria-required": field.value["aria-required"],
        "aria-readonly": field.value["aria-readonly"],
      });
  },
});

describe("FormControl", () => {
  it("wires the label, the control and the helper text", async () => {
    const wrapper = mount(FormControl, {
      props: { id: "email", required: true },
      attrs: { class: "mine", "data-part": "x" },
      slots: {
        default: () => [
          h(FormLabel, null, () => "Email"),
          h(Control),
          h(FormHelperText, null, () => "Never shared"),
        ],
      },
    });
    await nextTick();
    const root = wrapper.get('[data-minerva="form-control"]');
    expect(root.classes()).toEqual(expect.arrayContaining(["root", "mine"]));
    expect(root.attributes("data-part")).toBe("root");
    expect(root.attributes("data-required")).toBe("");
    const label = wrapper.get("label");
    expect(label.attributes("for")).toBe("email");
    expect(label.attributes("id")).toBe("email-label");
    expect(label.get('[data-part="required-indicator"]').text()).toBe("*");
    const input = wrapper.get("input");
    expect(input.attributes("id")).toBe("email");
    expect(input.attributes("aria-required")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe("email-helper");
    expect(wrapper.get("#email-helper").text()).toBe("Never shared");
  });

  it("swaps the helper text for the error message while invalid", async () => {
    const invalid = ref(false);
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(FormControl, { invalid: invalid.value }, () => [
            h(FormLabel, { requiredIndicator: "!" }, () => "Name"),
            h(Control, { describedBy: "extra" }),
            h(FormHelperText, null, () => "Help"),
            h(FormErrorMessage, null, () => "Wrong"),
          ]),
      }),
    );
    await nextTick();
    const input = () => wrapper.get("input");
    const id = input().attributes("id")!;
    expect(id).toMatch(/^field-/);
    expect(input().attributes("aria-describedby")).toBe(`${id}-helper extra`);
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.find('[data-part="required-indicator"]').exists()).toBe(
      false,
    );

    invalid.value = true;
    await nextTick();
    await nextTick();
    expect(wrapper.find('[data-part="helper-text"]').exists()).toBe(false);
    const alert = wrapper.get('[role="alert"]');
    expect(alert.attributes("id")).toBe(`${id}-error`);
    expect(alert.attributes("data-part")).toBe("error-message");
    expect(input().attributes("aria-describedby")).toBe(`${id}-error extra`);
    expect(input().attributes("aria-invalid")).toBe("true");

    invalid.value = false;
    await nextTick();
    await nextTick();
    expect(input().attributes("aria-describedby")).toBe(`${id}-helper extra`);
  });

  it("passes disabled and read-only to the control", () => {
    const wrapper = mount(FormControl, {
      props: { disabled: true, readOnly: true },
      slots: { default: () => h(Control, { invalid: "false" }) },
    });
    const input = wrapper.get("input");
    expect(input.attributes("disabled")).toBeDefined();
    expect(input.attributes("readonly")).toBeDefined();
    expect(input.attributes("aria-readonly")).toBe("true");
    expect(input.attributes("aria-invalid")).toBe("false");
    const root = wrapper.get('[data-minerva="form-control"]');
    expect(root.attributes("data-disabled")).toBe("");
    expect(root.attributes("data-readonly")).toBe("");
  });

  it("parts render outside a FormControl", () => {
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h("div", [
            h(FormLabel, { htmlFor: "x" }, () => "Label"),
            h(FormHelperText, null, () => "Help"),
            h(FormErrorMessage, null, () => "Error"),
            h(Control, { invalid: "true", describedBy: "d" }),
          ]),
      }),
    );
    expect(wrapper.get("label").attributes("for")).toBe("x");
    expect(wrapper.text()).toContain("Help");
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.get("input").attributes("aria-invalid")).toBe("true");
    expect(wrapper.get("input").attributes("aria-describedby")).toBe("d");
  });

  it("custom required indicator slot and native for", () => {
    const wrapper = mount(FormControl, {
      props: { required: true },
      slots: {
        default: () =>
          h(
            FormLabel,
            { for: "other" },
            { default: () => "Name", "required-indicator": () => "(req)" },
          ),
      },
    });
    expect(wrapper.get("label").attributes("for")).toBe("other");
    expect(wrapper.get('[data-part="required-indicator"]').text()).toBe(
      "(req)",
    );
  });
});

describe("FormField", () => {
  it("renders label, control, helper text", async () => {
    const wrapper = mount(FormField, {
      props: { label: "Email", helperText: "Help", id: "f" },
      slots: { default: () => h(Control) },
    });
    await nextTick();
    expect(wrapper.get("label").text()).toBe("Email");
    expect(wrapper.get("input").attributes("aria-describedby")).toBe(
      "f-helper",
    );
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });

  it("an error message makes it invalid unless invalid is set", async () => {
    const wrapper = mount(FormField, {
      props: { label: "Email", errorMessage: "Bad", helperText: "Help" },
      slots: { default: () => h(Control) },
    });
    await nextTick();
    expect(wrapper.get('[role="alert"]').text()).toBe("Bad");
    expect(wrapper.find('[data-part="helper-text"]').exists()).toBe(false);
    await wrapper.setProps({ invalid: false });
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.get('[data-part="helper-text"]').text()).toBe("Help");
  });

  it("accepts slots for its texts", () => {
    const wrapper = mount(FormField, {
      props: { required: true, disabled: true, readOnly: true },
      slots: {
        label: () => "Slot label",
        "error-message": () => "Slot error",
        default: () => h(Control),
      },
    });
    expect(wrapper.get("label").text()).toContain("Slot label");
    expect(wrapper.get('[role="alert"]').text()).toBe("Slot error");
    const helper = mount(FormField, {
      slots: { "helper-text": () => "Slot help", default: () => h(Control) },
    });
    expect(helper.get('[data-part="helper-text"]').text()).toBe("Slot help");
  });
});
