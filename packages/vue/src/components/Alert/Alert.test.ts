import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { Alert } from ".";

describe("Alert", () => {
  it("renders a polite info alert with an icon", () => {
    const wrapper = mount(Alert, {
      attrs: { class: "mine", "data-part": "x" },
      slots: { default: "Saved." },
    });
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("data-part")).toBe("root");
    expect(wrapper.attributes("data-state")).toBeUndefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        "alert",
        "info",
        "medium",
        "withAnimation",
        "animation-slideIn",
        "rounded",
        "expanded",
        "mine",
      ]),
    );
    const icon = wrapper.get('[data-part="icon"]');
    expect(icon.attributes("role")).toBe("img");
    expect(icon.attributes("aria-label")).toBe("info icon");
    expect(icon.find("svg").exists()).toBe(true);
    expect(wrapper.get('[data-part="description"]').text()).toBe("Saved.");
    expect(wrapper.find('[data-part="title"]').exists()).toBe(false);
  });

  it.each([
    ["danger", "alert"],
    ["warning", "alert"],
    ["success", "status"],
  ] as const)("uses role for %s", (color, role) => {
    const wrapper = mount(Alert, { props: { color } });
    expect(wrapper.attributes("role")).toBe(role);
    expect(wrapper.classes()).toContain(color);
  });

  it("supports a custom role, icon, action and visual options", () => {
    const wrapper = mount(Alert, {
      props: {
        role: "note",
        title: "Title",
        banner: true,
        elevation: true,
        rounded: false,
        borderRadius: 4,
        animation: false,
        iconLabel: "Note",
        variant: "solid",
        size: "large",
      },
      slots: {
        icon: () => h("i", { id: "icon" }),
        action: () => h("button", "Undo"),
      },
    });
    expect(wrapper.attributes("role")).toBe("note");
    expect(wrapper.find("#icon").exists()).toBe(true);
    expect(wrapper.get('[data-part="icon"]').attributes("aria-label")).toBe(
      "Note",
    );
    expect(wrapper.get('[data-part="action"]').text()).toBe("Undo");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["banner", "withElevation", "solid", "large"]),
    );
    expect(wrapper.classes()).not.toContain("rounded");
    expect(wrapper.classes()).not.toContain("withAnimation");
    expect((wrapper.element as HTMLElement).style.borderRadius).toBe("4px");
    expect(wrapper.find('[data-part="description"]').exists()).toBe(false);
    const css = mount(Alert, {
      props: { borderRadius: "1rem", showIcon: false },
    });
    expect((css.element as HTMLElement).style.borderRadius).toBe("1rem");
    expect(css.find('[data-part="icon"]').exists()).toBe(false);
  });

  it("closes, emits close and moves focus to the next focusable element", async () => {
    const Host = defineComponent({
      setup: () => () =>
        h("div", [
          h(Alert, { closable: true, closeLabel: "Dismiss" }, () => "Body"),
          h("button", { id: "next" }, "Next"),
        ]),
    });
    const wrapper = mount(Host, { attachTo: document.body });
    const close = wrapper.get('[data-part="close-button"]');
    expect(close.attributes("aria-label")).toBe("Dismiss");
    (close.element as HTMLElement).focus();
    await close.trigger("click");
    expect(wrapper.find('[data-minerva="alert"]').exists()).toBe(false);
    expect(document.activeElement?.id).toBe("next");
    const alert = wrapper.findComponent(Alert);
    expect(alert.emitted("close")).toHaveLength(1);
  });

  it("returns focus to returnFocus and keeps focus moved by the listener", async () => {
    const target = ref<HTMLElement | null>(null);
    const Host = defineComponent({
      setup: () => () =>
        h("div", [
          h("input", { ref: target, id: "target" }),
          h(
            Alert,
            { closable: true, returnFocus: target },
            {
              default: () => "Body",
              "close-icon": () => h("i", { id: "ci" }),
            },
          ),
        ]),
    });
    const wrapper = mount(Host, { attachTo: document.body });
    expect(wrapper.find("#ci").exists()).toBe(true);
    const close = wrapper.get('[data-part="close-button"]');
    (close.element as HTMLElement).focus();
    await close.trigger("click");
    expect(document.activeElement?.id).toBe("target");

    const Other = defineComponent({
      setup: () => () =>
        h("div", [
          h("input", { id: "elsewhere" }),
          h(Alert, {
            closable: true,
            onClose: () => document.getElementById("elsewhere")?.focus(),
          }),
          h("button", { id: "after" }),
        ]),
    });
    const other = mount(Other, { attachTo: document.body });
    await other.get('[data-part="close-button"]').trigger("click");
    expect(document.activeElement?.id).toBe("elsewhere");
  });

  it("collapses and expands (uncontrolled)", async () => {
    const wrapper = mount(Alert, {
      props: { title: "Details", collapsible: true },
      slots: { default: "More" },
    });
    expect(wrapper.attributes("data-state")).toBe("open");
    const trigger = wrapper.get('[data-part="trigger"]');
    expect(trigger.attributes("aria-expanded")).toBe("true");
    expect(trigger.attributes("aria-label")).toBe("Collapse");
    const content = wrapper.get('[data-part="description"]');
    expect(trigger.attributes("aria-controls")).toBe(content.attributes("id"));
    await trigger.trigger("click");
    expect(wrapper.attributes("data-state")).toBe("closed");
    expect(trigger.attributes("aria-expanded")).toBe("false");
    expect(trigger.attributes("aria-label")).toBe("Expand");
    expect(trigger.attributes("aria-controls")).toBeUndefined();
    expect(wrapper.find('[data-part="description"]').exists()).toBe(false);
    expect(wrapper.emitted("expand")).toEqual([[false]]);
    expect(wrapper.emitted("update:expanded")).toEqual([[false]]);
  });

  it("is controlled with v-model:expanded and custom labels", async () => {
    const wrapper = mount(Alert, {
      props: {
        expanded: false,
        collapsible: true,
        expandLabel: "Show",
        collapseLabel: "Hide",
      },
      slots: { title: () => "T", default: "Body" },
    });
    const trigger = wrapper.get('[data-part="trigger"]');
    expect(trigger.attributes("aria-label")).toBe("Show");
    await trigger.trigger("click");
    expect(wrapper.emitted("expand")).toEqual([[true]]);
    // still collapsed until the parent updates the prop
    expect(wrapper.find('[data-part="description"]').exists()).toBe(false);
    await wrapper.setProps({ expanded: true });
    expect(trigger.attributes("aria-label")).toBe("Hide");
    expect(wrapper.find('[data-part="description"]').exists()).toBe(true);
  });

  it("is not collapsible without a title", async () => {
    const wrapper = mount(Alert, {
      props: { collapsible: true, defaultExpanded: false },
      slots: { default: "Body" },
    });
    expect(wrapper.find('[data-part="trigger"]').exists()).toBe(false);
    expect(wrapper.attributes("data-state")).toBeUndefined();
    expect(wrapper.find('[data-part="description"]').exists()).toBe(true);
    await nextTick();
  });
});
