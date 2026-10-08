import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { Radio, RadioGroup } from ".";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "../FormControl";

const fruits = () => [
  h(Radio, { value: "apple", label: "Apple" }),
  h(Radio, { value: "banana", label: "Banana", disabled: true }),
  h(Radio, { value: "cherry", label: "Cherry" }),
];
const radio = (name: string) => screen.getByRole("radio", { name });
const checkedValues = () =>
  screen
    .getAllByRole("radio")
    .filter((r) => (r as HTMLInputElement).checked)
    .map((r) => (r as HTMLInputElement).value);

describe("RadioGroup", () => {
  it("renders the parts and a shared generated name", () => {
    const { container } = render(RadioGroup, {
      props: { label: "Fruit", helperText: "Pick one", defaultValue: "apple" },
      attrs: { class: "mine", "data-x": "1", "aria-describedby": "extra" },
      slots: { default: fruits },
    });
    const root = container.querySelector('[data-minerva="radio-group"]')!;
    expect(root.className).toContain("radioGroupWrapper");
    expect(root.className).toContain("mine");
    expect(root.getAttribute("data-x")).toBe("1");
    expect(root.getAttribute("data-orientation")).toBe("vertical");
    const group = screen.getByRole("radiogroup", { name: "Fruit" });
    expect(group.className).toContain("vertical");
    expect(group).toHaveAttribute("data-part", "list");
    expect(group).toHaveAccessibleDescription("Pick one");
    expect(group.getAttribute("aria-describedby")).toMatch(/ extra$/);
    expect(group).toHaveAttribute("aria-required", "false");
    expect(group).toHaveAttribute("aria-invalid", "false");
    const names = new Set(
      screen.getAllByRole("radio").map((r) => r.getAttribute("name")),
    );
    expect(names.size).toBe(1);
    expect([...names][0]).toBeTruthy();
    expect(checkedValues()).toEqual(["apple"]);
    expect(
      container
        .querySelector('[data-minerva="radio"]')!
        .getAttribute("data-state"),
    ).toBe("checked");
  });

  it("uncontrolled: a press selects one radio and emits its value", async () => {
    const user = userEvent.setup();
    const { emitted } = render(RadioGroup, {
      props: { name: "fruit", defaultValue: "apple" },
      attrs: { "aria-label": "Fruit" },
      slots: { default: fruits },
    });
    await user.click(radio("Cherry"));
    expect(checkedValues()).toEqual(["cherry"]);
    await user.click(radio("Banana"));
    expect(checkedValues()).toEqual(["cherry"]);
    await user.click(radio("Apple"));
    expect(checkedValues()).toEqual(["apple"]);
    expect((emitted("change") as unknown[][]).map((e) => e[0])).toEqual([
      "cherry",
      "apple",
    ]);
    expect(emitted("update:modelValue")).toEqual([["cherry"], ["apple"]]);
    expect(radio("Apple")).toHaveAttribute("name", "fruit");
  });

  it("controlled: the value drives the selection", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(RadioGroup, {
      props: { modelValue: "apple" },
      attrs: { "aria-label": "Fruit" },
      slots: { default: fruits },
    });
    await user.click(radio("Cherry"));
    await nextTick();
    expect((emitted("change") as unknown[][]).at(-1)?.[0]).toBe("cherry");
    expect(checkedValues()).toEqual(["apple"]);
    await rerender({ modelValue: "cherry" });
    expect(checkedValues()).toEqual(["cherry"]);
    await rerender({ modelValue: null });
    expect(checkedValues()).toEqual([]);
  });

  it("v-model in a parent", async () => {
    const user = userEvent.setup();
    const value = ref<string | number | null>("apple");
    render(
      defineComponent({
        setup: () => () =>
          h(
            RadioGroup,
            {
              "aria-label": "Fruit",
              modelValue: value.value,
              "onUpdate:modelValue": (v: string | number) => (value.value = v),
            },
            fruits,
          ),
      }),
    );
    await user.click(radio("Cherry"));
    await nextTick();
    expect(value.value).toBe("cherry");
    expect(checkedValues()).toEqual(["cherry"]);
  });

  it("arrow keys move and select, skipping disabled radios and wrapping", async () => {
    const user = userEvent.setup();
    const { emitted } = render({
      render: () => [
        h(
          RadioGroup,
          {
            "aria-label": "Fruit",
            defaultValue: "apple",
            onChange: () => {},
          },
          fruits,
        ),
        h("button", { type: "button" }, "after"),
      ],
    });
    void emitted;
    await user.tab();
    expect(radio("Apple")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(radio("Cherry")).toHaveFocus();
    expect(radio("Cherry")).toBeChecked();
    await user.keyboard("{ArrowDown}");
    expect(radio("Apple")).toBeChecked();
    await user.keyboard("{ArrowUp}");
    expect(radio("Cherry")).toBeChecked();
    await user.keyboard("{ArrowLeft}");
    expect(radio("Apple")).toBeChecked();
    expect(radio("Banana")).not.toBeChecked();
    await user.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
  });

  it("a disabled group ignores presses and is not reachable", async () => {
    const user = userEvent.setup();
    const { emitted, container } = render(RadioGroup, {
      props: {
        disabled: true,
        defaultValue: "apple",
        error: true,
        required: true,
        direction: "horizontal",
        size: "small",
        color: "success",
      },
      attrs: { "aria-label": "Fruit" },
      slots: { default: fruits },
    });
    await user.tab();
    expect(document.body).toHaveFocus();
    await user.click(radio("Cherry"));
    expect(emitted("change")).toBeUndefined();
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group.className).toContain("horizontal");
    const first = container.querySelector('[data-minerva="radio"]')!;
    expect(first.getAttribute("data-size")).toBe("small");
    expect(first.getAttribute("data-color")).toBe("success");
  });

  it("a radio without value does not select", async () => {
    const wrapper = mount(RadioGroup, {
      slots: { default: () => h(Radio, { label: "None" }) },
    });
    await wrapper.get("input").trigger("change");
    expect(wrapper.emitted("change")).toBeUndefined();
  });

  it("label slot, aria-labelledby and FormControl wiring", async () => {
    const slotted = mount(RadioGroup, {
      slots: { label: () => "Slotted", default: fruits },
    });
    const list = slotted.get('[role="radiogroup"]');
    expect(slotted.get(`#${list.attributes("aria-labelledby")}`).text()).toBe(
      "Slotted",
    );
    const labelled = mount(RadioGroup, {
      props: { label: "Ignored" },
      attrs: { "aria-labelledby": "ext", "aria-label": "x" },
    });
    expect(
      labelled.get('[role="radiogroup"]').attributes("aria-labelledby"),
    ).toBe("ext");
    expect(
      labelled.get('[role="radiogroup"]').attributes("aria-label"),
    ).toBeUndefined();

    const invalid = ref(false);
    render(
      defineComponent({
        setup: () => () =>
          h(
            FormControl,
            { id: "fruit", invalid: invalid.value, required: true },
            () => [
              h(FormLabel, null, () => "Fruit"),
              h(RadioGroup, null, fruits),
              h(FormHelperText, null, () => "Help"),
              h(FormErrorMessage, null, () => "Error"),
            ],
          ),
      }),
    );
    await nextTick();
    const group = screen.getByRole("radiogroup", { name: "Fruit" });
    expect(group).toHaveAttribute("aria-describedby", "fruit-helper");
    expect(group).toHaveAttribute("aria-required", "true");
    invalid.value = true;
    await nextTick();
    await nextTick();
    expect(group).toHaveAttribute("aria-describedby", "fruit-error");
    expect(group).toHaveAttribute("aria-invalid", "true");
  });
});
