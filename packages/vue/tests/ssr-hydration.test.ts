// Server rendering (vue/server-renderer) and hydration (createSSRApp): a page
// using components of every group renders on the server with its classes,
// hooks and translated texts, then hydrates in the browser without any
// hydration mismatch warning, and is interactive afterwards.
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSSRApp, h, nextTick, ref, type Component } from "vue";
import { renderToString } from "vue/server-renderer";
import * as Minerva from "../src";

const C = Minerva as unknown as Record<string, Component>;
const has = (name: string) => name in C;

/** A page with components of every group (the ones present) */
function Page() {
  const checked = ref(false);
  const tab = ref("a");
  const text = ref("Ada");
  const page = ref(2);
  const optional = (
    name: string,
    props: Record<string, unknown>,
    children?: unknown,
  ) => (has(name) ? h(C[name], props, children as never) : null);
  return () =>
    h(C.ConfigProvider, { locale: { language: "fr" } }, () => [
      h(C.Button, { variant: "outline" }, () => "Enregistrer"),
      h(C.Input, {
        modelValue: text.value,
        "onUpdate:modelValue": (v: string) => (text.value = v),
        "aria-label": "Nom",
      }),
      h(C.Checkbox, {
        modelValue: checked.value,
        "onUpdate:modelValue": (v: boolean) => (checked.value = v),
        label: "Accepter",
      }),
      h(C.Switch, { label: "Wi-Fi", defaultChecked: true }),
      h(C.RadioGroup, { defaultValue: "a", name: "r" }, () => [
        h(C.Radio, { value: "a", label: "A" }),
        h(C.Radio, { value: "b", label: "B" }),
      ]),
      h(C.Select, { ariaLabel: "Fruit", placeholder: "Choisir" }, () => [
        h(C.SelectItem, { value: "a" }, () => "Pomme"),
      ]),
      h(
        C.Tabs,
        {
          modelValue: tab.value,
          "onUpdate:modelValue": (v: string) => (tab.value = v),
        },
        () => [
          h(C.TabList, { "aria-label": "Onglets" }, () => [
            h(C.Tab, { value: "a" }, () => "Alpha"),
            h(C.Tab, { value: "b" }, () => "Bêta"),
          ]),
          h(C.TabPanel, { value: "a" }, () => "Panneau A"),
          h(C.TabPanel, { value: "b" }, () => "Panneau B"),
        ],
      ),
      h(C.Pagination, {
        total: 50,
        current: page.value,
        "onUpdate:current": (p: number) => (page.value = p),
      }),
      h(C.DataTable, {
        columns: [{ key: "name", header: "Nom", sortable: true }],
        data: [{ name: "Ada" }, { name: "Linus" }],
        rowKey: (row: { name: string }) => row.name,
      }),
      h(C.ConfigProvider, { theme: "dark" }, () => [
        optional("Card", {}, () => "Carte"),
        optional("Alert", { title: "Info" }),
        optional("Badge", { count: 3 }),
        optional("Tag", {}, () => "Étiquette"),
        optional("Avatar", { name: "Ada Lovelace" }),
        optional("Skeleton", {}),
        optional("ProgressIndicator", { value: 40 }),
      ]),
      h(
        C.Modal,
        { title: "Fermé" },
        { trigger: () => h(C.Button, null, () => "Ouvrir") },
      ),
      optional("Tooltip", { content: "Astuce" }, () =>
        h(C.Button, null, () => "Survol"),
      ),
      optional("Rating", { modelValue: 3 }),
      optional("Steps", { items: [{ title: "Un" }, { title: "Deux" }] }),
    ]);
}

const App = { setup: Page };

describe("SSR + hydration", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders on the server and hydrates without mismatch", async () => {
    const html = await renderToString(createSSRApp(App));
    expect(html).toContain('data-minerva="button"');
    expect(html).toContain("Enregistrer");
    expect(html).toContain('data-minerva="tabs"');
    expect(html).toContain("Panneau A");
    expect(html).toContain("data-minerva-theme-scope");
    // pagination labels in the provider's language (French)
    expect(html).toMatch(/aria-label="[^"]*[Pp]age[^"]*"/);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const app = createSSRApp(App);
    app.mount(container);
    await nextTick();
    await new Promise((r) => setTimeout(r, 10));
    const messages = [...warn.mock.calls, ...error.mock.calls]
      .map((args) => args.map(String).join(" "))
      .filter((m) => /hydrat|mismatch/i.test(m));
    expect(messages).toEqual([]);

    // interactive after hydration
    const tabB = Array.from(container.querySelectorAll('[role="tab"]')).find(
      (t) => t.textContent?.includes("Bêta"),
    ) as HTMLElement;
    tabB.click();
    await nextTick();
    expect(container.textContent).toContain("Panneau B");
    app.unmount();
  });
});
