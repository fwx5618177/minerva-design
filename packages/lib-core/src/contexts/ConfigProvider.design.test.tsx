// Design axes (preset / density / radius / shadow / fontScale): the root
// provider writes the non-standard ones on <html>, nested providers scope
// overrides to their subtree (wrapper element + portal host).
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import { Modal } from "../components/Modal";
import { mockColorScheme } from "../test-utils/matchMedia";

const html = document.documentElement;
const DESIGN = [
  "data-density",
  "data-radius",
  "data-shadow",
  "data-font-scale",
];
const designOf = (element: Element) =>
  Object.fromEntries(
    DESIGN.filter((name) => element.hasAttribute(name)).map((name) => [
      name,
      element.getAttribute(name),
    ]),
  );

const ShowDesign = ({ id }: { id: string }) => {
  const { design, palette } = useConfig();
  return (
    <output data-testid={id}>
      {[
        design?.preset,
        design?.density,
        design?.radius,
        design?.shadow,
        design?.fontScale,
        palette ?? "none",
      ].join("|")}
    </output>
  );
};

beforeEach(() => mockColorScheme(false));

afterEach(() => {
  for (const name of [...DESIGN, "style", "data-theme", "data-palette"]) {
    html.removeAttribute(name);
  }
});

describe("ConfigProvider design axes", () => {
  it("writes nothing for the default design", () => {
    render(
      <ConfigProvider>
        <ShowDesign id="root" />
      </ConfigProvider>,
    );
    expect(designOf(html)).toEqual({});
    expect(screen.getByTestId("root")).toHaveTextContent(
      "minerva|standard|medium|standard|standard|none",
    );
  });

  it("applies a preset (with its palette) on <html> and restores on unmount", () => {
    html.setAttribute("data-radius", "large");
    const { unmount } = render(
      <ConfigProvider preset="editorial" density="compact">
        <ShowDesign id="root" />
      </ConfigProvider>,
    );
    expect(designOf(html)).toEqual({
      "data-density": "compact",
      "data-radius": "small",
      "data-shadow": "subtle",
      "data-font-scale": "large",
    });
    expect(html.dataset.palette).toBe("editorial");
    expect(screen.getByTestId("root")).toHaveTextContent(
      "editorial|compact|small|subtle|large|editorial",
    );
    unmount();
    expect(designOf(html)).toEqual({ "data-radius": "large" });
  });

  it("an explicit palette wins over the preset's", () => {
    render(
      <ConfigProvider preset="editorial" palette={null}>
        <ShowDesign id="root" />
      </ConfigProvider>,
    );
    expect(html.hasAttribute("data-palette")).toBe(false);
    expect(screen.getByTestId("root")).toHaveTextContent(/\|none$/);
  });

  it("follows prop changes", () => {
    const { rerender } = render(
      <ConfigProvider radius="none">x</ConfigProvider>,
    );
    expect(html.getAttribute("data-radius")).toBe("none");
    rerender(<ConfigProvider radius="medium">x</ConfigProvider>);
    expect(html.hasAttribute("data-radius")).toBe(false);
  });

  it("nested: inherits the parent's design and scopes overrides", () => {
    render(
      <ConfigProvider preset="compact">
        <ShowDesign id="outer" />
        <ConfigProvider>
          <ShowDesign id="inherit" />
        </ConfigProvider>
        <ConfigProvider density="standard" radius="large">
          <ShowDesign id="override" />
        </ConfigProvider>
        <ConfigProvider preset="editorial">
          <ShowDesign id="preset" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("inherit")).toHaveTextContent(
      "compact|compact|small|standard|small|none",
    );
    // a provider that overrides nothing renders no scope element
    expect(
      screen.getByTestId("inherit").closest("[data-minerva-theme-scope]"),
    ).toBeNull();

    const override = screen
      .getByTestId("override")
      .closest("[data-minerva-theme-scope]")!;
    expect(screen.getByTestId("override")).toHaveTextContent(
      "compact|standard|large|standard|small|none",
    );
    // every axis on the scope element, so "standard" wins over <html>
    expect(designOf(override)).toEqual({
      "data-density": "standard",
      "data-radius": "large",
      "data-shadow": "standard",
      "data-font-scale": "small",
    });
    // <html> keeps the root design
    expect(html.getAttribute("data-density")).toBe("compact");

    const preset = screen
      .getByTestId("preset")
      .closest("[data-minerva-theme-scope]")!;
    expect(preset.getAttribute("data-palette")).toBe("editorial");
    expect(preset.getAttribute("data-font-scale")).toBe("large");
  });

  it("nested: portalled content gets the scoped design", () => {
    render(
      <ConfigProvider>
        <ConfigProvider density="comfortable">
          <Modal open onOpenChange={() => {}} title="Scoped">
            body
          </Modal>
        </ConfigProvider>
      </ConfigProvider>,
    );
    const host = screen
      .getByRole("dialog")
      .closest("[data-minerva-portal-host]")!;
    expect(host).not.toBeNull();
    expect(host.getAttribute("data-density")).toBe("comfortable");
    expect(host.getAttribute("data-radius")).toBe("medium");
  });

  it("server-renders the scope attributes of a nested provider", () => {
    const markup = renderToString(
      <ConfigProvider>
        <ConfigProvider preset="editorial">
          <span>content</span>
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(markup).toContain('data-density="comfortable"');
    expect(markup).toContain('data-palette="editorial"');
  });
});
