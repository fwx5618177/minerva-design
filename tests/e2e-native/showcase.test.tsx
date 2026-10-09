import { afterEach, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { MinervaProvider } from "../../packages/native/src";
import { NavigationProvider } from "../../apps/expo-example/src/navigation";
import { FormsScreen } from "../../apps/expo-example/src/screens/FormsScreen";
import { OverlaysScreen } from "../../apps/expo-example/src/screens/OverlaysScreen";
import { NavigationScreen } from "../../apps/expo-example/src/screens/NavigationScreen";

// The RN host shim has no device back-button module. Preserve every other
// native export and provide only its event subscription boundary.
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
afterEach(async () => {
  await cleanup();
});
const wrap = (child: React.ReactNode) => (
  <MinervaProvider>
    <NavigationProvider>{child}</NavigationProvider>
  </MinervaProvider>
);
it("edits profile controls and submits their current values", async () => {
  await render(wrap(<FormsScreen />));
  await fireEvent.changeText(screen.getByLabelText("Name"), "Ada");
  await userEvent
    .setup()
    .press(screen.getByRole("button", { name: "Save profile" }));
  expect(screen.getByText("Saved Ada")).toBeTruthy();
});
it("opens a dialog, confirms and shows the result outside the overlay", async () => {
  await render(wrap(<OverlaysScreen />));
  const user = userEvent.setup();
  await user.press(screen.getByRole("button", { name: "Show dialog" }));
  await user.press(screen.getByRole("button", { name: "Confirm" }));
  expect(screen.getByText("Confirmed")).toBeTruthy();
});
it("switches tabs and exposes the selected content", async () => {
  await render(wrap(<NavigationScreen />));
  await userEvent.setup().press(screen.getByRole("tab", { name: "History" }));
  expect(screen.getByText("Past orders")).toBeTruthy();
});
