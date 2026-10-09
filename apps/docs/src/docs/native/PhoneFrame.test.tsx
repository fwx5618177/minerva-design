// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, expect, it } from "vitest";
import { Text } from "react-native";
import { useTheme } from "minerva-design/native";
import { themes } from "minerva-design";
import { SiteProviders, setupI18n } from "../../test/utils";
import PhoneFrame from "./PhoneFrame";

beforeAll(setupI18n);
beforeEach(() => localStorage.clear());
function Probe() {
  const { colors } = useTheme();
  return <Text role="status">{colors["primary-color"]}</Text>;
}
it.each(["light", "dark", "github-dark"] as const)(
  "uses the selected %s theme inside the native preview",
  (theme) => {
    localStorage.setItem("minerva-docs-theme", theme);
    render(
      <SiteProviders>
        <PhoneFrame label="Theme preview">
          <Probe />
        </PhoneFrame>
      </SiteProviders>,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      themes[theme]["primary-color"],
    );
  },
);
