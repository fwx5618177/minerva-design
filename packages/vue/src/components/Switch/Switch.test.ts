import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { h, nextTick } from "vue";
import { Switch } from ".";
import { FormControl, FormErrorMessage, FormLabel } from "../FormControl";

describe("Switch", () => {
  it("renders a label root with the slider parts", () => {
    const wrapper = mount(Switch, {
      props: { label: "Wi-Fi" },
      attrs: { class: "mine", style: "color: red", "data-x": "1" },
    });
    const root = wrapper.get('[data-minerva="switch"][data-part="root"]');
    expect(root.element.tagName).toBe("LABEL");
    expect(root.classes()).toEqual(
      expect.arrayContaining(["switch", "labelEnd", "primary", "mine"]),
    );
    expect(root.attributes("data-x")).toBe("1");
    expect(root.attributes("data-state")).toBe("unchecked");
    expect(root.attributes("data-variant")).toBe("slider");
    for (const part of ["control", "track", "thumb", "label", "input"]) {
      expect(wrapper.find(`[data-part="${part}"]`).exists()).toBe(true);
    }
    const input = wrapper.get("input");
    expect(input.attributes("role")).toBe("switch");
    expect(input.attributes("aria-checked")).toBe("false");
    // label after the control
    expect(root.element.lastElementChild?.getAttribute("data-part")).toBe(
      "label",
    );
  });

  it("uncontrolled: a press toggles and emits change(checked, event)", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Switch, { props: { label: "Wi-Fi" } });
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(control).toBeChecked();
    expect(emitted("update:modelValue")).toEqual([[true]]);
    const change = emitted("change") as [boolean, Event][];
    expect(change[0][0]).toBe(true);
    // Enter toggles too
    await user.keyboard("{Enter}");
    expect(control).toHaveAttribute("aria-checked", "false");
    await user.keyboard(" ");
    expect(control).toHaveAttribute("aria-checked", "true");
  });

  it("controlled: a press only requests the change", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(Switch, {
      props: { label: "Wi-Fi", modelValue: false },
    });
    const control = screen.getByRole("switch");
    await user.click(control);
    expect((emitted("change") as unknown[][]).at(-1)?.[0]).toBe(true);
    expect(control).not.toBeChecked();
    expect(control).toHaveAttribute("aria-checked", "false");
    await rerender({ modelValue: true });
    expect(control).toBeChecked();
    expect(control).toHaveAttribute("aria-checked", "true");
  });

  it("disabled and loading block interaction", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(Switch, {
      props: { "aria-label": "S", disabled: true } as never,
    });
    const control = screen.getByRole("switch");
    await user.click(control);
    control.focus();
    await user.keyboard("{Enter}");
    expect(emitted("change")).toBeUndefined();
    expect(control).toHaveAttribute("aria-disabled", "true");
    await rerender({ disabled: false, loading: true });
    expect(control).toHaveAttribute("aria-busy", "true");
    await user.click(control);
    expect(emitted("change")).toBeUndefined();
  });

  it("shows the ripple after a press", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Switch, { props: { "aria-label": "S" } as never });
    await wrapper.get("input").trigger("click");
    expect(wrapper.get('[data-part="root"]').classes()).toContain("ripple");
    await wrapper.get("input").trigger("click");
    vi.advanceTimersByTime(400);
    await nextTick();
    expect(wrapper.get('[data-part="root"]').classes()).not.toContain("ripple");
    const none = mount(Switch, { props: { ripple: false } });
    await none.get("input").trigger("click");
    expect(none.find(".rippleEffect").exists()).toBe(false);
    expect(none.get('[data-part="root"]').classes()).not.toContain("ripple");
    wrapper.unmount();
  });

  it("renders the label first, icons and styles", () => {
    const wrapper = mount(Switch, {
      props: {
        labelPlacement: "start",
        size: "large",
        shape: "square",
        defaultChecked: true,
        trackStyle: { width: "40px" },
        thumbStyle: { color: "red" },
      },
      slots: { default: () => "Dark", icon: () => h("i", "*") },
    });
    const root = wrapper.get('[data-part="root"]');
    expect(root.classes()).toEqual(
      expect.arrayContaining([
        "labelStart",
        "checked",
        "checkedLarge",
        "square",
      ]),
    );
    expect(root.element.firstElementChild?.getAttribute("data-part")).toBe(
      "label",
    );
    expect(wrapper.get('[data-part="thumb"] [data-part="icon"]').text()).toBe(
      "*",
    );
    expect(wrapper.get('[data-part="track"]').attributes("style")).toContain(
      "40px",
    );
    expect(wrapper.get('[data-part="thumb"]').attributes("style")).toContain(
      "red",
    );
    const end = mount(Switch, {
      props: { iconPlacement: "end" },
      slots: { label: () => "L", icon: () => h("i", "*") },
    });
    expect(end.find('[data-part="thumb"] [data-part="icon"]').exists()).toBe(
      false,
    );
    expect(end.get('[data-part="root"] > [data-part="icon"]').text()).toBe("*");
    expect(end.get('[data-part="label"]').text()).toBe("L");
  });

  it("side labels set the state", async () => {
    const user = userEvent.setup();
    const { container, emitted } = render(Switch, {
      props: { "aria-label": "Mode", offLabel: "Off", onLabel: "On" } as never,
    });
    const root = container.querySelector('[data-part="root"]')!;
    expect(root.tagName).toBe("SPAN");
    expect(root.className).toContain("bilateral");
    const [off, on] = screen.getAllByRole("button");
    expect(off.className).toContain("sideActive");
    await user.click(on);
    expect(screen.getByRole("switch")).toBeChecked();
    expect(on.className).toContain("sideActive");
    await user.click(on);
    expect(emitted("change")).toHaveLength(1);
    await user.click(off);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("segmented variant: a group of two segments", async () => {
    const user = userEvent.setup();
    const { container, emitted } = render(Switch, {
      props: {
        "aria-label": "Source",
        variant: "segmented",
        id: "src",
      } as never,
      slots: { "off-label": () => "A", "on-label": () => "B" },
    });
    const group = screen.getByRole("group", { name: "Source" });
    expect(group).toHaveAttribute("id", "src");
    expect(group).toHaveAttribute("data-variant", "segmented");
    const input = container.querySelector("input")!;
    expect(input).toHaveAttribute("aria-hidden", "true");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input.getAttribute("role")).toBeNull();
    const [a, b] = screen.getAllByRole("button");
    expect(a).toHaveAttribute("aria-pressed", "true");
    await user.click(b);
    expect(b).toHaveAttribute("aria-pressed", "true");
    expect((emitted("change") as unknown[][])[0][0]).toBe(true);
    await user.click(a);
    expect(a).toHaveAttribute("aria-pressed", "true");
  });

  it("segmented: the hidden input forwards focus and blur", async () => {
    const wrapper = mount(Switch, {
      props: { variant: "segmented", offLabel: "A", onLabel: "B" },
    });
    await wrapper.get("input").trigger("focus");
    await wrapper.get("input").trigger("blur");
    expect(wrapper.emitted("focus")).toHaveLength(1);
    expect(wrapper.emitted("blur")).toHaveLength(1);
  });

  it("segmented inside a FormControl is named by its label", () => {
    render(FormControl, {
      props: { invalid: true, required: true, readOnly: true },
      slots: {
        default: () => [
          h(FormLabel, null, () => "Source"),
          h(Switch, { variant: "segmented", offLabel: "A", onLabel: "B" }),
          h(FormErrorMessage, null, () => "Pick"),
        ],
      },
    });
    const group = screen.getByRole("group", { name: "Source" });
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("data-invalid", "");
    expect(group).toHaveAttribute("data-required", "");
    expect(group).toHaveAttribute("data-readonly", "");
    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeDisabled();
    }
  });

  it("read-only FormControl keeps the state; wiring and focus events", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(FormControl, {
      props: { id: "wifi", readOnly: true, required: true },
      slots: {
        default: () => [
          h(FormLabel, null, () => "Wi-Fi"),
          h(Switch, { onFocus, onBlur, name: "w", value: "on" }),
        ],
      },
    });
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveAttribute("id", "wifi");
    expect(control).toHaveAttribute("aria-readonly", "true");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("name", "w");
    await user.click(control);
    expect(control).not.toBeChecked();
    expect(onFocus).toHaveBeenCalled();
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it("an explicit disabled=false opts out of the FormControl", () => {
    const wrapper = mount(FormControl, {
      props: { disabled: true },
      slots: { default: () => h(Switch, { disabled: false }) },
    });
    expect(wrapper.get("input").attributes("disabled")).toBeUndefined();
  });
});
