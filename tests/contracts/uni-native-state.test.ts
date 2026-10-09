import { createApp, h, nextTick, ref, type App, type Component } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import * as Uni from "../../packages/uni/src/index";

const apps: App[] = [];
const hosts: HTMLElement[] = [];
function mount(render: () => ReturnType<typeof h>) {
  const host = document.createElement("div");
  document.body.append(host);
  const app = createApp({ render });
  app.mount(host);
  hosts.push(host);
  apps.push(app);
  return host;
}
async function tap(host: HTMLElement, selector: string) {
  const target = host.querySelector(selector);
  expect(target, selector).not.toBeNull();
  target!.dispatchEvent(new Event("tap", { bubbles: true }));
  await nextTick();
}
afterEach(() => {
  apps.splice(0).forEach((app) => app.unmount());
  hosts.splice(0).forEach((host) => host.remove());
  vi.unstubAllGlobals();
});

it("uni nested ConfigProvider inherits the parent theme and palette while overriding density", async () => {
  vi.stubGlobal("uni", {
    getSystemInfoSync: () => ({ theme: "light" }),
    onThemeChange: vi.fn(),
    offThemeChange: vi.fn(),
  });
  const mode = ref<"light" | "dark">("dark");
  const palette = ref<"tech" | "editorial">("tech");
  const host = mount(() =>
    h(
      Uni.ConfigProvider,
      { mode: mode.value, palette: palette.value, design: { radius: "none" } },
      () => [
        h(
          Uni.ConfigProvider,
          { design: { density: "compact" } },
          () => "Scoped",
        ),
        h(Uni.ConfigProvider, { palette: null }, () => "Default palette"),
      ],
    ),
  );
  await nextTick();
  const providers = host.querySelectorAll(".mn-provider");
  expect(providers).toHaveLength(3);
  expect(providers[0].classList.contains("mn-palette-tech-dark")).toBe(true);
  expect(providers[1].classList.contains("mn-palette-tech-dark")).toBe(true);
  expect(providers[1].classList.contains("mn-density-compact")).toBe(true);
  expect(providers[1].classList.contains("mn-radius-none")).toBe(true);
  expect(providers[2].classList.contains("mn-palette-tech-dark")).toBe(false);
  expect(providers[2].classList.contains("mn-theme-dark")).toBe(true);
  mode.value = "light";
  palette.value = "editorial";
  await nextTick();
  expect(providers[1].classList.contains("mn-palette-editorial")).toBe(true);
  expect(providers[1].classList.contains("mn-palette-tech-dark")).toBe(false);
  expect(providers[2].classList.contains("mn-palette-editorial")).toBe(false);
});

it.each([
  ["Modal", Uni.ModalRoot, Uni.ModalTrigger, Uni.ModalContent, Uni.ModalClose],
  [
    "Drawer",
    Uni.DrawerRoot,
    Uni.DrawerTrigger,
    Uni.DrawerContent,
    Uni.DrawerClose,
  ],
] as const)(
  "uni %s compound children share open state and retain default backdrop dismissal",
  async (name, Root, Trigger, Content, Close) => {
    const onOpen = vi.fn();
    const host = mount(() =>
      h(Root, { onOpenChange: onOpen }, () => [
        h(Trigger, null, () => "Open"),
        h(Content, { title: name }, () =>
          h(Close, { class: "test-close" }, () => "Done"),
        ),
      ]),
    );
    expect(host.querySelector(".mn-dialog")).toBeNull();
    await tap(host, `.mn-${name.toLowerCase()}-trigger`);
    expect(host.querySelector(".mn-dialog")).not.toBeNull();
    await tap(host, ".test-close");
    expect(host.querySelector(".mn-dialog")).toBeNull();
    await tap(host, `.mn-${name.toLowerCase()}-trigger`);
    await tap(host, ".mn-backdrop");
    expect(host.querySelector(".mn-dialog")).toBeNull();
    expect(onOpen.mock.calls.map((call) => call[0])).toEqual([
      true,
      false,
      true,
      false,
    ]);
  },
);

it("uni Tabs children update the controlled parent and follow programmatic changes", async () => {
  const value = ref("a");
  const host = mount(() =>
    h(
      Uni.Tabs,
      {
        value: value.value,
        onChange: (next: string) => {
          value.value = next;
        },
      },
      () => [
        h(Uni.TabList, null, () => [
          h(Uni.Tab, { value: "a" }, () => "Alpha"),
          h(Uni.Tab, { value: "b" }, () => "Beta"),
        ]),
        h(Uni.TabPanel, { value: "a" }, () => "Panel A"),
        h(Uni.TabPanel, { value: "b" }, () => "Panel B"),
      ],
    ),
  );
  expect(host.textContent).toContain("Panel A");
  await tap(host, ".mn-tab:nth-child(2) button");
  expect(value.value).toBe("b");
  expect(host.textContent).not.toContain("Panel A");
  expect(host.textContent).toContain("Panel B");
  value.value = "a";
  await nextTick();
  expect(host.textContent).toContain("Panel A");
  expect(host.textContent).not.toContain("Panel B");
});

it("uni composed Select registers labels, updates its parent and filters slotted options", async () => {
  const value = ref("a");
  const host = mount(() =>
    h(
      Uni.Select,
      {
        value: value.value,
        searchable: true,
        onChange: (next: string) => {
          value.value = next;
        },
      },
      () => [
        h(Uni.SelectItem, { value: "a" }, () => "Alpha"),
        h(Uni.SelectItem, { value: "b" }, () => "Beta"),
      ],
    ),
  );
  await nextTick();
  expect(host.querySelector('[data-action="trigger"]')?.textContent).toContain(
    "Alpha",
  );
  await tap(host, '[data-action="trigger"]');
  await tap(host, '[data-value="b"]');
  expect(value.value).toBe("b");
  expect(host.querySelector('[data-action="trigger"]')?.textContent).toContain(
    "Beta",
  );
  value.value = "a";
  await nextTick();
  expect(host.querySelector('[data-action="trigger"]')?.textContent).toContain(
    "Alpha",
  );
  await tap(host, '[data-action="trigger"]');
  host
    .querySelector("input")!
    .dispatchEvent(
      new CustomEvent("input", { bubbles: true, detail: { value: "bet" } }),
    );
  await nextTick();
  const alpha = host.querySelector('[data-value="a"]');
  expect(alpha === null || getComputedStyle(alpha).display === "none").toBe(
    true,
  );
  const beta = host.querySelector('[data-value="b"]');
  expect(beta).not.toBeNull();
  expect(getComputedStyle(beta!).display).not.toBe("none");
});

it.each([
  ["Radio", Uni.Radio, ".mn-choice", { value: "a", label: "Alpha" }],
  ["Rating", Uni.Rating, ".mn-rating-target-right", { value: 0 }],
] as const)(
  "uni standalone %s inherits a FormControl's disabled and readOnly state",
  async (_name, Control, selector, props) => {
    const disabled = ref(true);
    const readOnly = ref(false);
    const onChange = vi.fn();
    const host = mount(() =>
      h(
        Uni.FormControl,
        { disabled: disabled.value, readOnly: readOnly.value },
        () => h(Control as Component, { ...props, onChange }),
      ),
    );
    async function expectInheritedBlocked() {
      if (_name === "Rating") {
        const rating = host.querySelector(".mn-rating")!;
        expect(rating.getAttribute("role")).toBe("img");
        expect(host.querySelector(selector)).toBeNull();
        rating.dispatchEvent(
          new KeyboardEvent("keydown", { key: "End", bubbles: true }),
        );
        await tap(host, ".mn-rating");
      } else await tap(host, selector);
      expect(onChange).not.toHaveBeenCalled();
    }
    await expectInheritedBlocked();
    disabled.value = false;
    readOnly.value = true;
    await nextTick();
    await expectInheritedBlocked();
    readOnly.value = false;
    await nextTick();
    if (_name === "Rating")
      expect(host.querySelector(".mn-rating")?.getAttribute("role")).toBe(
        "slider",
      );
    await tap(host, selector);
    expect(onChange).toHaveBeenCalledOnce();
  },
);
