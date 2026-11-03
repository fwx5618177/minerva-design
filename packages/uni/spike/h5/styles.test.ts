import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Styles from "./Styles.vue";
import { uniMock } from "../support/setup";
import { flush, getByRole, key, queryByRole } from "./dom";

// Port of the former Chromium styles spec on the Styles fixture: style axes
// as classes / inline values, theme and shell state, page and time pickers.
// Container-driven grid columns, overflow scrolling and popover flipping are
// covered by src/layout-parity, page-tabs-parity and popover-parity tests.
type Resize = (event: { size: { windowWidth: number } }) => void;
let width = 1440;
let resize: Resize | undefined;
let w: VueWrapper;
beforeEach(() => {
  width = 1440;
  vi.stubGlobal("uni", {
    ...uniMock,
    getSystemInfoSync: () => ({ windowWidth: width, theme: "light" }),
    onWindowResize: (handler: Resize) => (resize = handler),
    offWindowResize: () => (resize = undefined),
    onThemeChange() {},
    offThemeChange() {},
    pageScrollTo() {},
  });
  w = mount(Styles, {
    attachTo: document.body,
    global: { stubs: { picker: true } },
  });
});
afterEach(() => {
  w.unmount();
  vi.unstubAllGlobals();
  vi.stubGlobal("uni", uniMock);
});
const testId = (id: string) => w.find(`[data-testid="${id}"]`);
const navigation = () => w.findAll("[data-navigation]");

it("display samples carry their size, padding, color and pressed axes", () => {
  const avatar = testId("avatar").attributes("style");
  expect(avatar).toContain("width: 64px");
  expect(avatar).toContain("height: 64px");
  expect(testId("card").classes()).toEqual(
    expect.arrayContaining(["mn-padding-large", "mn-card-elevated"]),
  );
  const box = testId("box").element as HTMLElement;
  expect(box.style.paddingTop).toBe("var(--space-4)");
  expect(box.style.paddingRight).toBe("var(--space-2)");
  expect(box.style.paddingLeft).toBe("12px");
  const badge = w.find("[data-badge]");
  expect(badge.text()).toBe("Ready");
  expect(badge.classes().join(" ")).toMatch(/success/);
  expect(badge.classes().join(" ")).toMatch(/outline/);
  expect(getByRole("button", "Important").getAttribute("aria-pressed")).toBe(
    "true",
  );
});

it("Dark theme switches the provider and progress visuals keep their variant", async () => {
  const provider = testId("card").element.closest(".mn-provider")!;
  const light = provider.className + provider.getAttribute("style");
  getByRole("radio", "Dark").click();
  await flush();
  expect(getByRole("radio", "Dark").getAttribute("aria-checked")).toBe("true");
  expect(provider.className + provider.getAttribute("style")).not.toBe(light);
  const circle = w.find('[data-progress-visual="circle"]');
  expect(circle.attributes("style")).toContain("conic-gradient");
  expect(circle.attributes("style")).toContain("45%");
  expect(w.find('[data-progress-visual="spinner"]').exists()).toBe(true);
});

it("desktop shell collapses, floats over a fixed rail and mobile mounts one navigation", async () => {
  getByRole("button", "Collapse sidebar").click();
  await flush();
  expect(navigation().map((node) => node.text())).toEqual([
    "Compact navigation",
  ]);

  getByRole("button", "Enable floating sidebar").click();
  await flush();
  expect(w.find(".mn-uni-app-sidebar").classes()).toContain(
    "mn-uni-app-floating",
  );
  expect(w.find(".mn-uni-app-rail").attributes("style")).toContain(
    "width: 64px",
  );
  expect(navigation()[0].text()).toBe("Compact navigation");
  await w.find(".mn-uni-app-floating").trigger("mouseenter");
  expect(navigation()[0].text()).toBe("Full navigation");
  expect(w.find(".mn-uni-app-rail").attributes("style")).toContain(
    "width: 64px",
  );

  width = 390;
  resize?.({ size: { windowWidth: width } });
  await flush();
  expect(navigation()).toHaveLength(0);
  getByRole("button", "Open navigation").click();
  await flush();
  expect(navigation()).toHaveLength(1);
  getByRole("button", "Close navigation").click();
  await flush();
  expect(navigation()).toHaveLength(0);
});

it("committing the last page marks it current", async () => {
  w.find("[data-last-page]").element.dispatchEvent(new MouseEvent("click"));
  await flush();
  expect(getByRole("button", "Document 12").getAttribute("aria-current")).toBe(
    "page",
  );
  expect(
    getByRole("button", "Document 1").getAttribute("aria-current"),
  ).toBeNull();
});

it("TimePicker shows stepped columns, commits seconds and closes on Escape", async () => {
  const input = getByRole("textbox", "Time") as HTMLInputElement;
  input.click();
  await flush();
  expect(
    document.querySelectorAll('[data-time-column="minute"] [role="option"]'),
  ).toHaveLength(4);
  document
    .querySelector<HTMLElement>('[data-time-column="second"] [data-unit="40"]')!
    .click();
  await flush();
  expect(input.value).toBe("09:15:40");
  key(input, "Escape");
  await flush();
  expect(document.querySelector(".mn-uni-time-panel")).toBeNull();
});

it("Popover opens from its trigger and Escape dismisses it", async () => {
  getByRole("button", "Show anchored details").click();
  await flush();
  const panel = document.querySelector<HTMLElement>(".mn-uni-popover-panel")!;
  expect(panel.textContent).toContain("Anchored details");
  expect(panel.querySelector("[data-popover-arrow]")).not.toBeNull();
  key(panel, "Escape");
  await flush();
  expect(document.querySelector(".mn-uni-popover-panel")).toBeNull();
  expect(queryByRole("dialog")).toBeNull();
});
