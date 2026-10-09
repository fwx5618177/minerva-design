import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect, vi, afterEach } from "vitest";
import Tooltip from "./Tooltip.vue";
import IconButton from "./IconButton.vue";
afterEach(() => vi.useRealTimers());
it("Tooltip delayed hover, hoverable content, appearance and imperative toggle use a measured layer", async () => {
  vi.useFakeTimers();
  const w = mount(Tooltip, {
    props: {
      content: "Details",
      enterDelay: 100,
      leaveDelay: 50,
      color: "warning",
      variant: "subtle",
      shape: "rounded",
      arrow: true,
    },
    slots: { default: () => h("button", "Help") },
    attachTo: document.body,
  });
  await w.find(".mn-popover-trigger").trigger("mouseenter");
  vi.advanceTimersByTime(99);
  await nextTick();
  expect(w.find('[role="tooltip"]').exists()).toBe(false);
  vi.advanceTimersByTime(1);
  await nextTick();
  await nextTick();
  expect(w.find('[role="tooltip"]').classes()).toEqual(
    expect.arrayContaining([
      "mn-tooltip-warning",
      "mn-tooltip-subtle",
      "mn-tooltip-rounded",
    ]),
  );
  await w.find(".mn-popover-trigger").trigger("mouseleave");
  await w.find('[role="tooltip"]').trigger("mouseenter");
  vi.advanceTimersByTime(60);
  await nextTick();
  expect(w.find('[role="tooltip"]').exists()).toBe(true);
  (w.vm as unknown as { toggle: () => void }).toggle();
  await nextTick();
  expect(w.find('[role="tooltip"]').exists()).toBe(false);
  w.unmount();
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});
it("IconButton controlled pressed state, labels, sizes and loading focusability follow React", async () => {
  const w = mount(IconButton, {
    props: {
      label: "Favorite",
      pressed: false,
      size: "large",
      color: "danger",
      shape: "square",
      variant: "outline",
      icon: "★",
      showTooltip: false,
    },
  });
  const button = w.find("button");
  expect(button.classes()).toEqual(
    expect.arrayContaining([
      "mn-icon-large",
      "mn-icon-square",
      "mn-icon-danger",
      "mn-icon-outline",
    ]),
  );
  expect(button.attributes("aria-label")).toBe("Favorite");
  await button.trigger("click");
  expect(w.emitted("pressedChange")).toEqual([[true]]);
  expect(button.attributes("aria-pressed")).toBe("false");
  await w.setProps({ loading: true });
  expect(button.attributes("disabled")).toBeUndefined();
  expect(button.attributes("aria-busy")).toBe("true");
  await button.trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
  expect(w.find('[role="progressbar"]').exists()).toBe(true);
});
it("IconButton default label tooltip has actual content, and custom content wins", async () => {
  const w = mount(IconButton, {
    props: {
      label: "Settings",
      tooltip: { content: "Configure", color: "info" },
    },
    slots: { default: "⚙" },
  });
  await w.find("button").trigger("focusin");
  await new Promise((resolve) => setTimeout(resolve, 220));
  await nextTick();
  expect(w.find('[role="tooltip"]').text()).toContain("Configure");
  w.unmount();
});

it("clicking an already focused tooltip trigger keeps its description available", async () => {
  const w = mount(IconButton, { props: { label: "Details" } });
  await w.find("button").trigger("focusin");
  expect(w.find("[role=tooltip]").exists()).toBe(true);
  await w.find("button").trigger("click");
  expect(w.find("[role=tooltip]").exists()).toBe(true);
  w.unmount();
});
