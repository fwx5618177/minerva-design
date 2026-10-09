// @vitest-environment happy-dom
import { afterEach, expect, it } from "vitest";
import { createApp, h, nextTick, type App } from "vue";
import { within, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import {
  ConfigProvider,
  provideEmbeddedScope,
  toast,
} from "minerva-design/vue";
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
afterEach(async () => {
  toast.dismiss();
  await nextTick();
  app?.unmount();
  root?.remove();
});
it("controlled autocomplete reports selected option and text", async () => {
  const { user, view } = await mount("auto-complete", "controlled");
  await user.type(view.getByRole("combobox"), "Tok");
  await user.click(await screen.findByRole("option", { name: "Tokyo" }));
  expect(view.getByRole("combobox")).toHaveProperty("value", "Tokyo");
  expect(view.getByText(/Selected: tyo/)).toBeTruthy();
});
it("cascader displays an external controlled path update", async () => {
  const { user, view } = await mount("cascader", "controlled");
  await user.click(
    view.getByRole("button", { name: "Choose Tokyo externally" }),
  );
  expect(view.getByRole("combobox")).toHaveProperty(
    "value",
    "Japan / Kantō / Tokyo",
  );
  expect(view.getByText("jp / kanto / tokyo")).toBeTruthy();
});
it("controlled menu actually opens and selects a command", async () => {
  const { user, view } = await mount("menu", "controlled");
  await user.click(view.getByRole("button", { name: "Open actions" }));
  await user.click(await screen.findByRole("menuitem", { name: /Duplicate/ }));
  expect(view.getByText("Duplicate")).toBeTruthy();
  expect(screen.queryByRole("menu")).toBeNull();
});
it("data-table paginates owned rows and retries an error", async () => {
  const { user, view } = await mount("table", "data-table");
  await user.click(view.getByRole("button", { name: "Next page" }));
  expect(view.getByText("Project 6")).toBeTruthy();
  expect(view.queryByText("Project 1")).toBeNull();
  await user.click(
    view.getByRole("button", { name: "Simulate request failure" }),
  );
  expect(view.getByRole("alert")).toHaveProperty(
    "textContent",
    expect.stringContaining("request failed"),
  );
  await user.click(view.getByRole("button", { name: "Retry" }));
  expect(view.getByText("Project 6")).toBeTruthy();
});
it("toast Undo action changes the consumer result", async () => {
  const { user, view } = await mount("toast", "action");
  await user.click(view.getByRole("button", { name: "Archive with Undo" }));
  await user.click(await screen.findByRole("button", { name: "Undo" }));
  expect(view.getByText("Conversation restored")).toBeTruthy();
});
it("dedupe updates one toast rather than adding another", async () => {
  const { user, view } = await mount("toast", "dedupe");
  await user.click(view.getByRole("button", { name: "Fail again" }));
  await user.click(view.getByRole("button", { name: "Fail again" }));
  expect(await screen.findByText("Sync failed, attempt 2")).toBeTruthy();
  expect(screen.queryByText("Sync failed, attempt 1")).toBeNull();
});
it("confirmation returns the chosen decision to the caller", async () => {
  const { user, view } = await mount("confirm", "colors");
  await user.click(view.getByRole("button", { name: "Reset" }));
  const dialog = await screen.findByRole("alertdialog");
  await user.click(within(dialog).getByRole("button", { name: "Reset" }));
  await waitFor(() => expect(view.getByText("Reset: confirmed")).toBeTruthy());
});
