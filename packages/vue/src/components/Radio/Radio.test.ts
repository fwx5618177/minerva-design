import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { h } from "vue";
import { Radio } from ".";
import { FormControl } from "../FormControl";

describe("Radio (standalone)", () => {
  it("renders the parts and routes attributes", () => {
    const wrapper = mount(Radio, {
      props: { label: "Card", helperText: "Visa", value: "card", name: "pay" },
      attrs: {
        class: "mine",
        style: "color: red",
        "data-x": "1",
        "aria-describedby": "extra",
      },
    });
    const root = wrapper.get('[data-minerva="radio"][data-part="root"]');
    expect(root.classes()).toEqual(
      expect.arrayContaining(["radioWrapper", "primary", "mine"]),
    );
    expect(root.attributes("data-x")).toBe("1");
    expect(root.attributes("style")).toContain("color: red");
    // uncontrolled: the DOM holds the state
    expect(root.attributes("data-state")).toBeUndefined();
    const input = wrapper.get("input");
    expect(input.attributes("type")).toBe("radio");
    expect(input.attributes("name")).toBe("pay");
    expect(input.attributes("value")).toBe("card");
    const helper = wrapper.get('[data-part="helper-text"]');
    expect(input.attributes("aria-describedby")).toBe(
      `${helper.attributes("id")} extra`,
    );
    expect(wrapper.get('[data-part="label"]').text()).toBe("Card");
    expect(wrapper.find('[data-part="control"]').exists()).toBe(true);
  });

  it("uncontrolled with defaultChecked emits change(checked)", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Radio, { props: { label: "Yes" } });
    const radio = screen.getByRole("radio", { name: "Yes" });
    expect(radio).not.toBeChecked();
    await user.click(radio);
    expect(radio).toBeChecked();
    expect((emitted("change") as unknown[][])[0][0]).toBe(true);
    expect(emitted("update:modelValue")).toEqual([[true]]);
    const preset = mount(Radio, { props: { defaultChecked: true } });
    expect((preset.get("input").element as HTMLInputElement).checked).toBe(
      true,
    );
  });

  it("controlled: the prop drives the state", async () => {
    const user = userEvent.setup();
    const { emitted, rerender, container } = render(Radio, {
      props: { label: "Yes", modelValue: false },
    });
    const radio = screen.getByRole("radio");
    await user.click(radio);
    expect(emitted("change")).toHaveLength(1);
    expect(radio).not.toBeChecked();
    await rerender({ modelValue: true });
    expect(radio).toBeChecked();
    expect(
      container.querySelector('[data-part="root"]')!.getAttribute("data-state"),
    ).toBe("checked");
  });

  it("error shows the message and its icon; disabled", async () => {
    const wrapper = mount(Radio, {
      props: {
        error: true,
        errorMessage: "Pick one",
        helperText: "Help",
        disabled: true,
        size: "large",
        color: "danger",
        required: true,
      },
      slots: { default: () => "Cash" },
    });
    const root = wrapper.get('[data-part="root"]');
    expect(root.attributes("data-invalid")).toBe("");
    expect(root.attributes("data-disabled")).toBe("");
    expect(root.classes()).toEqual(
      expect.arrayContaining(["error", "large", "danger"]),
    );
    expect(wrapper.get('[data-part="helper-text"]').text()).toBe("Pick one");
    expect(wrapper.find(".errorIcon svg").exists()).toBe(true);
    expect(wrapper.get("input").attributes("required")).toBeDefined();
    expect(wrapper.get("input").attributes("disabled")).toBeDefined();
    expect(wrapper.get('[data-part="label"]').text()).toBe("Cash");
    const custom = mount(Radio, {
      props: { error: true, errorMessage: "E" },
      slots: { label: () => "L", "error-icon": () => h("b", "!") },
    });
    expect(custom.get(".errorIcon").text()).toBe("!");
    expect(custom.get('[data-part="label"]').text()).toBe("L");
  });

  it("omits aria-describedby and id without them; external label", () => {
    const wrapper = mount(Radio, { attrs: { "aria-label": "Yes" } });
    expect(wrapper.get("input").attributes("aria-describedby")).toBeUndefined();
    expect(wrapper.get("input").attributes("id")).toBeUndefined();
    expect(wrapper.find('[data-part="label"]').exists()).toBe(false);
    render({
      render: () => [
        h("label", { for: "r-yes" }, "External"),
        h(Radio, { id: "r-yes", value: "yes" }),
      ],
    });
    expect(screen.getByRole("radio", { name: "External" })).toHaveAttribute(
      "id",
      "r-yes",
    );
  });

  it("inherits disabled from a FormControl unless set", () => {
    const inherited = mount(FormControl, {
      props: { disabled: true },
      slots: { default: () => h(Radio, { label: "A" }) },
    });
    expect(inherited.get("input").attributes("disabled")).toBeDefined();
    const optOut = mount(FormControl, {
      props: { disabled: true },
      slots: { default: () => h(Radio, { label: "A", disabled: false }) },
    });
    expect(optOut.get("input").attributes("disabled")).toBeUndefined();
  });
});
