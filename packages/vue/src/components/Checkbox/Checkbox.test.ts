import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { Checkbox } from ".";
import { FormControl, FormHelperText } from "../FormControl";

describe("Checkbox", () => {
  it("renders the parts, classes and hooks", () => {
    const wrapper = mount(Checkbox, {
      props: { label: "Accept", helperText: "Needed" },
      attrs: { class: "mine", style: "color: red", "data-test": "x" },
    });
    const root = wrapper.get('[data-minerva="checkbox"][data-part="root"]');
    expect(root.classes()).toContain("checkboxWrapper");
    expect(root.attributes("data-state")).toBe("unchecked");
    const label = wrapper.get("label");
    expect(label.classes()).toEqual(
      expect.arrayContaining(["checkbox", "square", "mine"]),
    );
    expect(label.attributes("style")).toContain("color: red");
    expect(label.attributes("data-test")).toBe("x");
    const input = wrapper.get("input");
    expect(input.attributes("type")).toBe("checkbox");
    expect(input.attributes("data-part")).toBe("input");
    const helper = wrapper.get('[data-part="helper-text"]');
    expect(input.attributes("aria-describedby")).toBe(helper.attributes("id"));
    expect(wrapper.get('[data-part="label"]').text()).toBe("Accept");
    expect(wrapper.find('[data-part="control"]').exists()).toBe(true);
  });

  it("uncontrolled: a press toggles and emits change(checked, event)", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Checkbox, { props: { label: "Wi-Fi" } });
    const box = screen.getByRole("checkbox", { name: "Wi-Fi" });
    expect(box).not.toBeChecked();
    await user.click(box);
    expect(box).toBeChecked();
    expect(emitted("update:modelValue")).toEqual([[true]]);
    const change = emitted("change") as [boolean, Event][];
    expect(change[0][0]).toBe(true);
    expect(change[0][1]).toBeInstanceOf(Event);
    await user.click(screen.getByText("Wi-Fi"));
    expect(box).not.toBeChecked();
    await user.keyboard(" ");
    expect(box).toBeChecked();
  });

  it("controlled: a press only requests the change", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(Checkbox, {
      props: { label: "Wi-Fi", modelValue: false },
    });
    const box = screen.getByRole("checkbox");
    await user.click(box);
    expect((emitted("change") as unknown[][]).at(-1)?.[0]).toBe(true);
    expect(box).not.toBeChecked();
    await rerender({ modelValue: true });
    expect(box).toBeChecked();
    await rerender({ modelValue: false });
    expect(box).not.toBeChecked();
  });

  it("works with v-model in a parent", async () => {
    const checked = ref(false);
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(Checkbox, {
            "aria-label": "A",
            modelValue: checked.value,
            "onUpdate:modelValue": (v: boolean) => (checked.value = v),
          }),
      }),
    );
    await wrapper.get("input").setValue(true);
    expect(checked.value).toBe(true);
    expect((wrapper.get("input").element as HTMLInputElement).checked).toBe(
      true,
    );
  });

  it("keeps the indeterminate state", async () => {
    const wrapper = mount(Checkbox, {
      props: { indeterminate: true, "aria-label": "All" } as never,
      slots: { icon: () => h("i", { class: "icon" }) },
    });
    await nextTick();
    const input = wrapper.get("input").element as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute("aria-checked")).toBe("mixed");
    expect(wrapper.get('[data-part="root"]').attributes("data-state")).toBe(
      "indeterminate",
    );
    await wrapper.get("input").setValue(true);
    expect(input.indeterminate).toBe(true);
    expect(wrapper.find(".icon").exists()).toBe(false);
    await wrapper.setProps({ indeterminate: false } as never);
    expect(input.indeterminate).toBe(false);
    expect(wrapper.find(".icon").exists()).toBe(true);
  });

  it("disabled ignores presses; error shows the icon", async () => {
    const user = userEvent.setup();
    const { emitted, container } = render(Checkbox, {
      props: {
        label: "A",
        disabled: true,
        error: true,
        helperText: "Bad",
        size: "large",
        color: "danger",
        shape: "circle",
        labelPlacement: "top",
        required: true,
      },
    });
    await user.click(screen.getByRole("checkbox"));
    expect(emitted("change")).toBeUndefined();
    const root = container.querySelector('[data-part="root"]')!;
    expect(root.getAttribute("data-disabled")).toBe("");
    expect(root.getAttribute("data-invalid")).toBe("");
    expect(root.getAttribute("data-required")).toBe("");
    expect(root.getAttribute("data-color")).toBe("danger");
    expect(container.querySelector("label")!.className).toContain(
      "colorDanger",
    );
    expect(container.querySelector(".errorIcon svg")).not.toBeNull();
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("checkbox")).toBeRequired();
  });

  it("renders the label from the default and label slots", () => {
    const fromDefault = mount(Checkbox, { slots: { default: () => "Kids" } });
    expect(fromDefault.get('[data-part="label"]').text()).toBe("Kids");
    const fromSlot = mount(Checkbox, {
      props: { error: true, helperText: "x" },
      slots: { label: () => "Slot", "error-icon": () => h("b", "!") },
    });
    expect(fromSlot.get('[data-part="label"]').text()).toBe("Slot");
    expect(fromSlot.get(".errorIcon").text()).toBe("!");
    const none = mount(Checkbox);
    expect(none.find('[data-part="label"]').exists()).toBe(false);
  });

  it("inherits the FormControl state; explicit props win", async () => {
    const user = userEvent.setup();
    const { container, emitted } = render(FormControl, {
      props: { id: "terms", invalid: true, required: true, readOnly: true },
      slots: {
        default: () => [
          h(Checkbox, { label: "Terms" }),
          h(FormHelperText, null, () => "Help"),
        ],
      },
    });
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("id", "terms");
    expect(box).toHaveAttribute("aria-invalid", "true");
    expect(box).toHaveAttribute("aria-readonly", "true");
    expect(box).toBeRequired();
    await user.click(box);
    expect(box).not.toBeChecked();
    expect(emitted("change")).toBeUndefined();
    const root = container.querySelector('[data-minerva="checkbox"]')!;
    expect(root.getAttribute("data-readonly")).toBe("");

    const optOut = mount(FormControl, {
      props: { disabled: true },
      slots: { default: () => h(Checkbox, { disabled: false, label: "X" }) },
    });
    expect(optOut.get("input").attributes("disabled")).toBeUndefined();
    const inherited = mount(FormControl, {
      props: { disabled: true },
      slots: { default: () => h(Checkbox, { label: "X" }) },
    });
    expect(inherited.get("input").attributes("disabled")).toBeDefined();
  });

  it("forwards name, value and aria attributes to the input", () => {
    const wrapper = mount(Checkbox, {
      props: { name: "n", value: "v", id: "c" },
      attrs: { "aria-label": "L", "aria-describedby": "d" },
    });
    const input = wrapper.get("input");
    expect(input.attributes("name")).toBe("n");
    expect(input.attributes("value")).toBe("v");
    expect(input.attributes("id")).toBe("c");
    expect(input.attributes("aria-label")).toBe("L");
    expect(input.attributes("aria-describedby")).toBe("d");
  });
});
