// @vitest-environment node
// Nested ConfigProviders render on the server: scoped theme attributes /
// tokens are part of the markup and locale overrides apply to the subtree.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Empty } from "../components/Empty";
import { light } from "../styles/themes";

const Show = () => {
  const { resolvedMode, palette, locale } = useConfig();
  return <i>{`${resolvedMode}/${palette ?? "none"}/${locale?.language}`}</i>;
};

describe("nested ConfigProvider (SSR)", () => {
  it("renders inherited values without a scope wrapper", () => {
    const markup = renderToString(
      <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
        <ConfigProvider>
          <Show />
          <Empty />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(markup).toContain("dark/tech/zh");
    expect(markup).not.toContain("data-minerva-theme-scope");
  });

  it("renders scoped theme / palette / locale overrides into the markup", () => {
    const markup = renderToString(
      <ThemeProvider defaultTheme="dark" defaultPalette="tech">
        <ConfigProvider
          theme="light"
          palette={null}
          locale={{ language: "ja" }}
        >
          <Show />
          <Empty />
        </ConfigProvider>
        <ConfigProvider palette="editorial">
          <Show />
        </ConfigProvider>
      </ThemeProvider>,
    );
    expect(markup).toContain("light/none/ja");
    expect(markup).toContain("データがありません");
    expect(markup).toContain(`--background-color:${light["background-color"]}`);
    expect(markup).toMatch(
      /<div data-minerva-theme-scope="" data-theme="light" style="display:contents;color-scheme:light;/,
    );
    expect(markup).toContain(
      '<div data-minerva-theme-scope="" data-theme="dark" data-palette="editorial" style="display:contents;color-scheme:dark">',
    );
    expect(markup).toContain("dark/editorial/en");
  });
});
