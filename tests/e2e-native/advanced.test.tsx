import { afterEach, expect, it, vi } from "vitest";
import { createContext } from "react";
import { ScrollView } from "react-native";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  userEvent,
  within,
} from "@testing-library/react-native";
import { MinervaProvider } from "../../packages/native/src";
import { NavigationProvider } from "../../apps/expo-example/src/navigation";
import { AdvancedScreen } from "../../apps/expo-example/src/screens/AdvancedScreen";
import { VirtualListScreen } from "../../apps/expo-example/src/screens/VirtualListScreen";
import { DocumentPreviewScreen } from "../../apps/expo-example/src/screens/DocumentPreviewScreen";

// Replaces the former browser smoke of the exported Expo web example: the
// same advanced, virtual-list and document flows on the React Native
// renderer. Expo platform modules and the WebView host are replaced at their
// module boundary; the document host records the props HtmlPreview gives it.
const documents = vi.hoisted(
  () =>
    [] as {
      source: { html: string };
      onShouldStartLoadWithRequest: (request: { url: string }) => boolean;
    }[],
);
vi.mock("react-native", async (original) => {
  const actual = await original<
    typeof import("react-native") & { default?: typeof import("react-native") }
  >();
  const result = Object.create(
    null,
    Object.getOwnPropertyDescriptors(actual.default ?? actual),
  );
  Object.defineProperty(result, "BackHandler", {
    value: { addEventListener: () => ({ remove() {} }) },
    configurable: true,
  });
  return result;
});
// Expo modules are dependencies of the example app only: mock them through
// its node_modules so the ids match the screens' resolved imports.
vi.mock("../../apps/expo-example/node_modules/expo-clipboard", () => ({
  setStringAsync: vi.fn(async () => true),
}));
vi.mock("../../apps/expo-example/node_modules/expo-document-picker", () => ({
  getDocumentAsync: vi.fn(async () => ({
    canceled: false,
    assets: [{ uri: "file:///example.txt", name: "example.txt", size: 26 }],
  })),
}));
vi.mock("../../apps/expo-example/node_modules/react-native-webview", () => ({
  WebView: (props: (typeof documents)[number]) => {
    documents.push(props);
    return null;
  },
}));
afterEach(async () => {
  await cleanup();
  documents.length = 0;
});
// RN 0.86 FlatList reads ScrollView.Context, which the native-host mock lacks
// (same supplement as packages/native/test/setup.ts).
if (!("Context" in ScrollView))
  Object.defineProperty(ScrollView, "Context", {
    value: createContext(null),
    configurable: true,
  });
const wrap = (child: React.ReactNode) => (
  <MinervaProvider>
    <NavigationProvider>{child}</NavigationProvider>
  </MinervaProvider>
);

it("advanced screen sorts and selects table rows, completes, cascades and keeps JSON precision", async () => {
  await render(wrap(<AdvancedScreen />));
  const user = userEvent.setup();
  await user.press(screen.getByRole("button", { name: "Name" }));
  await user.press(screen.getByRole("checkbox", { name: "Select row a" }));
  expect(screen.getByText("Selected a")).toBeTruthy();

  // The test host's ScrollView mock remounts its children whenever the screen
  // re-renders, so uncontrolled fields are read before the screen's result
  // state changes, and committed selections through that result line.
  await fireEvent.changeText(screen.getByLabelText("Component search"), "But");
  expect(screen.queryByRole("button", { name: "Table" })).toBeNull();
  await fireEvent.press(screen.getByRole("button", { name: "Button" }));
  expect(screen.getByText("Button")).toBeTruthy();
  expect(screen.queryByText("Selected a")).toBeNull();

  await user.press(screen.getByRole("combobox", { name: "Region" }));
  await user.press(screen.getByRole("button", { name: "China" }));
  await user.press(screen.getByRole("button", { name: "Shanghai" }));
  expect(screen.getByText("China / Shanghai")).toBeTruthy();

  await user.press(screen.getByRole("button", { name: "Format JSON" }));
  expect(screen.getByLabelText("JSON settings").props.value).toMatch(
    /\n\s+"version": 9007199254740993\n/,
  );
});

it("advanced screen runs menu, popover, command search, confirmation and file selection", async () => {
  await render(wrap(<AdvancedScreen />));
  const user = userEvent.setup();
  await user.press(screen.getByRole("button", { name: "Open menu" }));
  await user.press(screen.getByRole("button", { name: "More" }));
  await user.press(screen.getByRole("button", { name: "Archive" }));
  expect(screen.getByText("archive")).toBeTruthy();

  await user.press(screen.getByRole("button", { name: "Details" }));
  expect(screen.getByText("Signed in as Ada.")).toBeTruthy();
  await user.press(screen.getByRole("button", { name: "Done" }));
  expect(screen.queryByText("Signed in as Ada.")).toBeNull();

  const settings = screen.getAllByText("Settings").length;
  await user.press(screen.getByRole("button", { name: "Commands" }));
  await fireEvent.changeText(screen.getByLabelText("Search commands"), "pref");
  const palette = within(screen.getByLabelText("Command results"));
  expect(palette.queryByRole("button", { name: "Profile" })).toBeNull();
  await user.press(palette.getByRole("button", { name: "Settings" }));
  expect(screen.queryByLabelText("Command results")).toBeNull();
  expect(screen.getAllByText("Settings")).toHaveLength(settings + 1);

  await user.press(screen.getByRole("button", { name: "Confirm archive" }));
  await user.press(screen.getByRole("button", { name: "Archive" }));
  expect(await screen.findByText("Archived")).toBeTruthy();

  await user.press(screen.getByRole("button", { name: "Select files" }));
  expect(await screen.findByText("example.txt")).toBeTruthy();
  await user.press(screen.getByRole("button", { name: "Remove example.txt" }));
  expect(screen.queryByText("example.txt")).toBeNull();
  expect(
    documents.some((props) => props.source.html.includes("<h1>Welcome</h1>")),
  ).toBe(true);
});

it("virtual list renders a window of its 10,000 rows and reports the selected row", async () => {
  await render(wrap(<VirtualListScreen />));
  await userEvent
    .setup()
    .press(screen.getByRole("button", { name: "Record 0" }));
  expect(screen.getByText("Selected row 0")).toBeTruthy();
  expect(screen.queryByText("Record 9999")).toBeNull();
});

it("document preview updates its local document and rejects external navigation", async () => {
  await render(wrap(<DocumentPreviewScreen />));
  expect(documents.at(-1)!.source.html).toContain("Preview loaded");
  expect(
    documents.at(-1)!.onShouldStartLoadWithRequest({
      url: "https://example.com/",
    }),
  ).toBe(false);
  await userEvent
    .setup()
    .press(screen.getByRole("button", { name: "Update document" }));
  expect(documents.at(-1)!.source.html).toContain("Updated document");
});
