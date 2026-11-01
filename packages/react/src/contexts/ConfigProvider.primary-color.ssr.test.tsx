// @vitest-environment node
// `primaryColor` on the server: the root brand color is a style sheet of the
// markup (both modes, keyed on data-theme -> no flash before hydration) and
// nested overrides are inline tokens of the scope wrapper.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";

const Show = () => {
  const { mode, resolvedMode } = useConfig();
  return <i>{`${mode}/${resolvedMode}`}</i>;
};

describe("ConfigProvider primaryColor (SSR)", () => {
  it("renders the brand color variables into the markup", () => {
    const markup = renderToString(
      <ConfigProvider theme="dark" primaryColor="#4f46e5">
        <Show />
      </ConfigProvider>,
    );
    expect(markup).toContain('<style data-minerva-primary-color="">');
    expect(markup).toContain(
      ":root:not([data-theme=dark]){--primary-color:#4f46e5;",
    );
    expect(markup).toContain(":root[data-theme=dark]{--primary-color:#7b85f2;");
    expect(markup).toContain("--primary-color-hover:");
    expect(markup).toContain("dark/dark");
    // the CSS is not HTML-escaped
    expect(markup).not.toContain("&gt;");
    expect(markup).not.toContain("&quot;");
  });

  it("renders a nested brand color as inline scope tokens", () => {
    const markup = renderToString(
      <ConfigProvider theme="light">
        <ConfigProvider primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}>
          <Show />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(markup).toMatch(
      /<div data-minerva-theme-scope="" data-theme="light"[^>]*style="display:contents;color-scheme:light;[^"]*--primary-color:#4f46e5/,
    );
    expect(markup).not.toContain("data-minerva-primary-color");
  });
});
