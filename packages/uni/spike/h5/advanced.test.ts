import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Advanced from "./Advanced.vue";
import { flush, getByRole, key, queryByRole } from "./dom";

// Port of the former Chromium advanced spec: interaction, ARIA and native
// classes of the Advanced fixture. Real geometry and computed colors are not
// asserted under happy-dom.
let w: VueWrapper;
beforeEach(() => {
  w = mount(Advanced, { attachTo: document.body });
});
afterEach(() => {
  w.unmount();
  vi.useRealTimers();
});

it("Drawer renders the bottom/small native classes and Escape restores the opener", async () => {
  const trigger = getByRole("button", "Open advanced drawer");
  trigger.focus();
  trigger.click();
  await flush();
  const drawer = getByRole("dialog", "Advanced details");
  expect(drawer.classList).toContain("mn-drawer-bottom");
  expect(drawer.classList).toContain("mn-drawer-small");
  key(drawer, "Escape");
  await flush();
  expect(queryByRole("dialog", "Advanced details")).toBeNull();
  expect(document.activeElement).toBe(trigger);
});

it("VirtualList scrolling swaps the rendered window and keeps the full scroll range", async () => {
  const list = w.find('[data-testid="advanced-virtual"]');
  expect(list.attributes("style")).toContain("max-height: 120px");
  expect((list.element.firstElementChild as HTMLElement).style.height).toBe(
    "4000px",
  );
  expect(list.find('[data-virtual-index="0"]').exists()).toBe(true);
  (list.element as HTMLElement).scrollTop = 800;
  await list.trigger("scroll");
  await new Promise((resolve) => setTimeout(resolve, 20));
  await flush();
  expect(list.find('[data-virtual-index="20"]').text()).toBe("Advanced row 20");
  expect(list.find('[data-virtual-index="0"]').exists()).toBe(false);
});

it("Switch, Radio, Alert and vertical Tabs respond to user interaction", async () => {
  const power = getByRole("switch", "Advanced power") as HTMLInputElement;
  const root = power.closest(".mn-uni-switch")!;
  expect([...root.classList]).toEqual(
    expect.arrayContaining([
      "mn-switch-large",
      "mn-switch-square",
      "mn-switch-success",
    ]),
  );
  power.click();
  await flush();
  expect(power.checked).toBe(true);
  expect(root.classList).toContain("mn-switch-checked");

  const professional = getByRole("radio", "Professional");
  professional.click();
  await flush();
  expect(professional.getAttribute("aria-checked")).toBe("true");
  expect(getByRole("radio", "Starter").getAttribute("aria-checked")).toBe(
    "false",
  );

  const alert = w.find('[data-testid="advanced-alert"]');
  await alert.find('[aria-label="Collapse"]').trigger("click");
  expect(
    (alert.find("[data-alert-content]").element as HTMLElement).style.display,
  ).toBe("none");

  const one = getByRole("tab", "Advanced tab one");
  one.focus();
  key(one, "ArrowDown");
  await flush();
  const two = getByRole("tab", "Advanced tab two");
  expect(document.activeElement).toBe(two);
  expect(two.getAttribute("aria-selected")).toBe("true");
  expect(getByRole("tabpanel").textContent?.trim()).toBe("Advanced panel two");
});

it("JSON formatting keeps raw lexemes, IconButton toggles with a tooltip and Ctrl+J runs the command palette", async () => {
  getByRole("button", "Format JSON").click();
  await flush();
  expect(
    (getByRole("textbox", "Advanced JSON") as HTMLTextAreaElement).value,
  ).toBe('{\n    "big": 9007199254740993,\n    "big": 1e+9\n}');

  vi.useFakeTimers();
  const icon = getByRole("button", "Advanced favorite");
  icon.click();
  await flush();
  expect(icon.getAttribute("aria-pressed")).toBe("true");
  icon
    .closest(".mn-popover-trigger")!
    .dispatchEvent(new MouseEvent("mouseenter"));
  await vi.runAllTimersAsync();
  await flush();
  expect(getByRole("tooltip").textContent?.trim()).toBe("Advanced favorite");
  vi.useRealTimers();

  key(document, "j", { ctrlKey: true });
  await flush();
  const palette = getByRole("dialog", "Command palette");
  const search = getByRole("combobox", undefined, palette);
  expect(document.activeElement).toBe(search);
  key(search, "ArrowDown");
  key(search, "Enter");
  await flush();
  expect(queryByRole("dialog", "Command palette")).toBeNull();
});

it("an explicit Tab color is applied before selection and kept once selected", async () => {
  const two = getByRole("tab", "Advanced tab two");
  expect(two.classList).toContain("mn-tab-color-danger");
  expect(two.style.getPropertyValue("--mn-tab-soft")).toBe(
    "var(--danger-color-subtle)",
  );
  expect(two.classList).not.toContain("mn-tab-selected");
  two.click();
  await flush();
  expect(two.classList).toContain("mn-tab-selected");
  expect(two.classList).toContain("mn-tab-color-danger");
  const tablist = getByRole("tablist", "Advanced tabs");
  expect(tablist.getAttribute("aria-orientation")).toBe("vertical");
  expect(tablist.closest(".mn-tabs-pills.mn-tabs-vertical")).not.toBeNull();
});
