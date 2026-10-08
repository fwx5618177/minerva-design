// useToast() renders in the caller's ConfigProvider scope (portal host,
// theme, palette, language); toast() keeps the owning provider's (root)
// scope. Port of the React Toast.scope.test.tsx.
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, type VNodeChild } from "vue";
import { mount } from "@vue/test-utils";
import { screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ToastProvider, toast, useToast } from ".";
import { toastStore } from "./store";
import type { ToastApi } from "./types";
import ConfigProvider from "../../config/ConfigProvider.vue";

const html = document.documentElement;

afterEach(() => {
  toastStore.reset();
  html.removeAttribute("style");
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
});

const flush = async () => {
  await nextTick();
  await nextTick();
};

const hostOf = (element: HTMLElement) =>
  element.closest<HTMLElement>("[data-minerva-portal-host]");

const toastOf = (text: string) =>
  screen.getByText(text).closest<HTMLElement>("[role=status], [role=alert]")!;

const Notify = defineComponent({
  setup() {
    const scopedToast = useToast();
    return () => [
      h(
        "button",
        {
          type: "button",
          onClick: () => scopedToast.success("Scoped saved", { duration: 0 }),
        },
        "scoped",
      ),
      h(
        "button",
        {
          type: "button",
          onClick: () => toast.success("Root saved", { duration: 0 }),
        },
        "root",
      ),
    ];
  },
});

const renderTree = async (render: () => VNodeChild) => {
  const wrapper = mount(defineComponent({ setup: () => render }), {
    attachTo: document.body,
  });
  await flush();
  return wrapper;
};

const renderApp = (provider: { closeLabel?: string } = {}) =>
  renderTree(() =>
    h(ConfigProvider, { theme: "light", locale: { language: "en" } }, () =>
      h(ToastProvider, provider, () =>
        h(
          ConfigProvider,
          { theme: "dark", palette: "tech", locale: { language: "zh" } },
          () => h(Notify),
        ),
      ),
    ),
  );

const click = async (name: string) => {
  await userEvent.click(screen.getByRole("button", { name }));
  await flush();
};

describe("useToast() follows the calling scope", () => {
  it("renders the toast in the scoped portal host with the scoped theme and language", async () => {
    await renderApp();
    await click("scoped");
    const item = toastOf("Scoped saved");
    const host = hostOf(item);
    expect(host).not.toBeNull();
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toHaveAttribute("data-palette", "tech");
    expect(
      within(item).getByRole("button", { name: "关闭" }),
    ).toBeInTheDocument();
    expect(item.closest("[role=region]")).toHaveAccessibleName("通知（F8）");
  });

  it("toast() called from the same place renders at the root, in the root language", async () => {
    await renderApp();
    await click("root");
    const item = toastOf("Root saved");
    expect(hostOf(item)).toBeNull();
    expect(item.closest("[role=region]")?.parentElement).toBe(document.body);
    expect(
      within(item).getByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
    expect(item.closest("[role=region]")).toHaveAccessibleName(
      "Notifications (F8)",
    );
  });

  it("groups toasts per scope: one viewport each, same position", async () => {
    await renderApp();
    await click("scoped");
    await click("root");
    const regions = screen.getAllByRole("region");
    expect(regions).toHaveLength(2);
    expect(regions[0].className).toBe(regions[1].className);
    expect(toastOf("Scoped saved").closest("[role=region]")).not.toBe(
      toastOf("Root saved").closest("[role=region]"),
    );
  });

  it("keeps the scope on update and closes from the scoped viewport", async () => {
    let api!: ToastApi;
    const Capture = defineComponent({
      setup() {
        api = useToast();
        return () => null;
      },
    });
    await renderTree(() =>
      h(ConfigProvider, { theme: "light", locale: { language: "en" } }, () =>
        h(ToastProvider, null, () =>
          h(ConfigProvider, { theme: "dark", locale: { language: "zh" } }, () =>
            h(Capture),
          ),
        ),
      ),
    );
    const id = api.loading("Uploading");
    await flush();
    expect(hostOf(toastOf("Uploading"))).not.toBeNull();
    api.update(id, { title: "Uploaded", loading: false });
    await flush();
    const item = toastOf("Uploaded");
    expect(hostOf(item)).toHaveAttribute("data-theme", "dark");
    await userEvent.click(within(item).getByRole("button", { name: "关闭" }));
    expect(toastStore.peek()[0]?.state).toBe("closing");
  });

  it("falls back to the provider's viewport once the scope went away", async () => {
    let api!: ToastApi;
    const Capture = defineComponent({
      setup() {
        api = useToast();
        return () => null;
      },
    });
    await renderTree(() =>
      h(ToastProvider, null, () =>
        h(ConfigProvider, { theme: "dark" }, () =>
          h(ConfigProvider, { theme: "light" }, () => h(Capture)),
        ),
      ),
    );
    api.info("Moved", { duration: 0 });
    const scoped = toastStore.peek()[0]!.scope!.portalContainer!;
    scoped.remove();
    toast.info("Root", { duration: 0 });
    await flush();
    expect(hostOf(toastOf("Moved"))).toBeNull();
    expect(toastOf("Moved").closest("[role=region]")).toBe(
      toastOf("Root").closest("[role=region]"),
    );
  });

  it("an explicit provider closeLabel still wins in scoped viewports", async () => {
    await renderApp({ closeLabel: "Dismiss" });
    await click("scoped");
    expect(
      within(toastOf("Scoped saved")).getByRole("button", { name: "Dismiss" }),
    ).toBeInTheDocument();
  });

  it("returns the toast export itself outside a nested scope", async () => {
    let api: unknown;
    const Capture = defineComponent({
      setup() {
        api = useToast();
        return () => null;
      },
    });
    await renderTree(() =>
      h(ConfigProvider, { theme: "light" }, () => h(Capture)),
    );
    expect(api).toBe(toast);
  });

  it("portals into the theme scope of a nested ConfigProvider", async () => {
    await renderTree(() =>
      h(ConfigProvider, { theme: "light" }, () => [
        h(ConfigProvider, { theme: "dark" }, () =>
          h(ToastProvider, { "aria-label": "Scoped" }),
        ),
        h(ToastProvider, { "aria-label": "Later" }),
      ]),
    );
    toast.success("Themed", { duration: 0 });
    await flush();
    expect(screen.getAllByText("Themed")).toHaveLength(1);
    const region = screen.getByRole("region", { name: "Scoped" });
    const host = region.closest("[data-minerva-portal-host]");
    expect(host).not.toBeNull();
    expect(host).toHaveAttribute("data-theme", "dark");
  });
});
