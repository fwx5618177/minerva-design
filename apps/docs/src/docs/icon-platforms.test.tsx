// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import IconDoc from "./pages/icon";
beforeAll(setupI18n);
it("documents the React Native and Taro icon entries", async () => {
  render(
    <SiteProviders>
      <MemoryRouter>
        <IconDoc />
      </MemoryRouter>
    </SiteProviders>,
  );
  const section = (
    await screen.findByRole(
      "heading",
      { name: "React Native and mini programs" },
      { timeout: 5000 },
    )
  ).closest("section")!;
  expect(section).toHaveTextContent("npx expo install react-native-svg");
  expect(section).toHaveTextContent('from "minerva-design/native/icons"');
  expect(section).toHaveTextContent('from "minerva-design/taro/icons"');
  expect(section).toHaveTextContent("toSvgBase64DataUri");
  expect(section).toHaveTextContent("tabBar");
});
