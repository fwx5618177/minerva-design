// @vitest-environment happy-dom
import { afterEach, expect, it } from "vitest";
import { createApp, h, nextTick, type App } from "vue";
import { within, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { ConfigProvider, provideEmbeddedScope } from "minerva-design/vue";
import { vueDemosOf } from "./vueDemos";
let app: App | undefined;
let root: HTMLDivElement | undefined;
async function mount(page: string, demo: string) {
  const component = await vueDemosOf(page)[demo]!.load();
  root = document.createElement("div");
  document.body.append(root);
  app = createApp({
    render: () => h(ConfigProvider, { theme: "light" }, () => h(component)),
  });
  provideEmbeddedScope(app, { language: "en" });
  app.mount(root);
  await nextTick();
  return { user: userEvent.setup(), view: within(root) };
}
afterEach(() => {
  app?.unmount();
  root?.remove();
});
it("select-all synchronizes child selections and exposes partial state", async () => {
  const { user, view } = await mount("checkbox", "select-all");
  const all = view.getByRole("checkbox", {
    name: "Select all",
  }) as HTMLInputElement;
  expect(all.indeterminate).toBe(true);
  await user.click(all);
  for (const checkbox of view.getAllByRole("checkbox"))
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  await user.click(view.getByRole("checkbox", { name: "Option 2" }));
  expect(all.indeterminate).toBe(true);
});
it("table selection updates the consumer-owned row keys", async () => {
  const { user, view } = await mount("table", "selection");
  await user.click(view.getAllByRole("checkbox")[1]!);
  expect(view.getByText("Selected IDs: 1")).toBeTruthy();
});
it("table sorting changes visible row order and reports its direction", async () => {
  const { user, view } = await mount("table", "sorting");
  await user.click(view.getByRole("button", { name: /Name/ }));
  expect(view.getAllByRole("row")[1]!.textContent).toContain("Ada");
  expect(view.getByText("name: ascend")).toBeTruthy();
  await user.click(view.getByRole("button", { name: /Name/ }));
  expect(view.getAllByRole("row")[1]!.textContent).toContain("Grace");
});
it("command palette filters commands and runs a keyboard selection", async () => {
  const { user, view } = await mount("command", "basic");
  await user.click(view.getByRole("button", { name: "Open command palette" }));
  await user.type(screen.getByRole("combobox"), "settings");
  await user.keyboard("{Enter}");
  expect(view.getByText("Open settings")).toBeTruthy();
  expect(screen.queryByRole("dialog")).toBeNull();
});
it("JSON formatting edits the bound text through the public toolbar", async () => {
  const { user, view } = await mount("json-field", "basic");
  await user.click(view.getByRole("button", { name: "Format JSON" }));
  const text = (view.getByRole("textbox") as HTMLTextAreaElement).value;
  expect(text).toContain('\n  "name": "Minerva"');
  expect(JSON.parse(text)).toEqual({ name: "Minerva", enabled: true });
});
it("a page-tab action appends and activates a real document", async () => {
  const { user, view } = await mount("page-tabs", "actions");
  await user.click(view.getByRole("button", { name: "New page" }));
  expect(
    view.getByRole("button", { name: "Page 4" }).getAttribute("aria-current"),
  ).toBe("page");
  expect(view.getByText("4 open pages")).toBeTruthy();
});
