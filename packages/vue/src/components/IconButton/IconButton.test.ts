import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, ref } from "vue";
import { IconButton } from ".";

const Icon = () => h("svg", { class: "glyph-svg" });

describe("IconButton", () => {
  it("renders a named button with the icon hidden", () => {
    const wrapper = mount(IconButton, {
      props: { label: "Settings" },
      attrs: { class: "mine", "data-part": "x" },
      slots: { default: Icon },
    });
    const button = wrapper.get("button");
    expect(button.attributes("type")).toBe("button");
    expect(button.attributes("aria-label")).toBe("Settings");
    expect(button.attributes("tabindex")).toBe("0");
    expect(button.attributes("aria-pressed")).toBeUndefined();
    expect(button.classes()).toEqual(
      expect.arrayContaining([
        "iconButton",
        "neutral",
        "variant-ghost",
        "medium",
        "circle",
        "mine",
      ]),
    );
    expect(button.attributes("data-part")).toBe("root");
    expect(button.attributes("data-state")).toBe("inactive");
    const icon = wrapper.get('[data-part="icon"]');
    expect(icon.attributes("aria-hidden")).toBe("true");
    expect(icon.find(".glyph-svg").exists()).toBe(true);
  });

  it("falls back to aria-label, then the localized default", () => {
    const aria = mount(IconButton, { attrs: { "aria-label": "Close" } });
    expect(aria.get("button").attributes("aria-label")).toBe("Close");
    const fallback = mount(IconButton);
    expect(fallback.get("button").attributes("aria-label")).toBe("icon button");
  });

  it("emits click; not while disabled or loading", async () => {
    const wrapper = mount(IconButton, { props: { label: "Go" } });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
    await wrapper.setProps({ disabled: true });
    expect(wrapper.get("button").attributes("tabindex")).toBe("-1");
    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    await wrapper.setProps({ disabled: false, loading: true });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
    const button = wrapper.get("button");
    expect(button.attributes("aria-busy")).toBe("true");
    expect(button.attributes("aria-disabled")).toBe("true");
    const spinner = wrapper.get('[data-part="spinner"]');
    expect(spinner.find('[role="progressbar"]').attributes("aria-label")).toBe(
      "Loading",
    );
    expect(wrapper.find('[data-part="icon"]').exists()).toBe(false);
  });

  it("uncontrolled toggle with defaultPressed", async () => {
    const user = userEvent.setup();
    const { emitted } = render(IconButton, {
      props: { label: "Mute", defaultPressed: false },
    });
    const button = screen.getByRole("button", { name: "Mute" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("data-state", "active");
    expect(button.className).toContain("pressed");
    expect(emitted("pressedChange")).toEqual([[true]]);
    expect(emitted("update:pressed")).toEqual([[true]]);
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("controlled toggle only requests the change", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(IconButton, {
      props: { label: "Bold", pressed: false },
    });
    const button = screen.getByRole("button");
    await user.click(button);
    expect(emitted("pressedChange")).toEqual([[true]]);
    expect(button).toHaveAttribute("aria-pressed", "false");
    await rerender({ pressed: true });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("a pressedChange / update:pressed listener makes it a toggle; v-model:pressed", async () => {
    const listener = mount(IconButton, {
      props: { label: "Star", onPressedChange: () => {} },
    });
    expect(listener.get("button").attributes("aria-pressed")).toBe("false");
    const pressed = ref(false);
    const parent = mount(
      defineComponent({
        setup: () => () =>
          h(IconButton, {
            label: "Fav",
            pressed: pressed.value,
            "onUpdate:pressed": (v: boolean) => (pressed.value = v),
          }),
      }),
    );
    await parent.get("button").trigger("click");
    expect(pressed.value).toBe(true);
    expect(parent.get("button").attributes("aria-pressed")).toBe("true");
  });

  it("a click listener can prevent the toggle", async () => {
    const wrapper = mount(IconButton, {
      props: {
        label: "X",
        defaultPressed: false,
        onClick: (e: MouseEvent) => e.preventDefault(),
      },
    });
    await wrapper.get("button").trigger("click");
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("false");
  });

  it("renders every key and a custom tabindex / type", () => {
    const wrapper = mount(IconButton, {
      props: {
        label: "Del",
        color: "danger",
        variant: "solid",
        size: "small",
        shape: "square",
      },
      attrs: { tabindex: 2, type: "submit" },
    });
    const button = wrapper.get("button");
    expect(button.attributes("tabindex")).toBe("2");
    expect(button.attributes("type")).toBe("submit");
    expect(button.attributes("data-color")).toBe("danger");
    expect(button.attributes("data-variant")).toBe("solid");
    expect(button.attributes("data-size")).toBe("small");
    expect(button.attributes("data-shape")).toBe("square");
  });

  it("renders the button as its root element", () => {
    const wrapper = mount(IconButton, { props: { label: "X" } });
    expect((wrapper.vm.$el as HTMLElement).tagName).toBe("BUTTON");
  });
});
