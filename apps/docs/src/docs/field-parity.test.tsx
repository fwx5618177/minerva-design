// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import VueDemo from "./components/VueDemo";
import PhoneFrame from "./native/PhoneFrame";
import { vueDemosOf } from "./vueDemos";
import { loadNativeDemos } from "./nativeDemos";
import ReactInput from "./pages/input/demos/basic";
import ReactSwitch from "./pages/switch/demos/basic";

beforeAll(setupI18n);
async function example(page: string, framework: string) {
  if (framework === "React")
    return page === "input" ? <ReactInput /> : <ReactSwitch />;
  if (framework === "Vue") {
    const demo = vueDemosOf(page).basic;
    expect(demo).toBeDefined();
    return <VueDemo demo={demo} />;
  }
  const demo = (await loadNativeDemos(page)).basic;
  expect(demo).toBeDefined();
  const Demo = demo.Component;
  return (
    <PhoneFrame label="Basic usage">
      <Demo />
    </PhoneFrame>
  );
}
describe.each(["React", "Vue", "React Native"])(
  "%s input examples",
  (framework) => {
    it("edits both uncontrolled and controlled text inputs", async () => {
      const user = userEvent.setup();
      render(
        <SiteProviders>{await example("input", framework)}</SiteProviders>,
      );
      const input = await screen.findByRole(
        "textbox",
        { name: "Name" },
        { timeout: 10000 },
      );
      await user.type(input, "Ada");
      expect(input).toHaveValue("Ada");
      const controlled = screen.getByRole("textbox", { name: "Controlled" });
      await user.type(controlled, "Grace");
      expect(controlled).toHaveValue("Grace");
    });
    it("starts Wi-Fi on and Bluetooth off and toggles both", async () => {
      const user = userEvent.setup();
      render(
        <SiteProviders>{await example("switch", framework)}</SiteProviders>,
      );
      const wifi = await screen.findByRole(
        "switch",
        { name: "Wi-Fi" },
        { timeout: 10000 },
      );
      const bluetooth = screen.getByRole("switch", { name: "Bluetooth" });
      expect(wifi).toBeChecked();
      expect(bluetooth).not.toBeChecked();
      await user.click(wifi);
      await user.click(bluetooth);
      expect(wifi).not.toBeChecked();
      expect(bluetooth).toBeChecked();
    });
  },
);
