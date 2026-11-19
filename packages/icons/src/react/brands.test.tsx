import { createRef } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as icons from "../index";

afterEach(cleanup);

describe("SVG brand marks", () => {
  it.each([
    "Github",
    "React",
    "Vue",
    "Angular",
    "Wechat",
    "Svelte",
    "Solid",
    "Html5",
    "Apple",
    "Android",
    "Linux",
    "Windows",
  ] as const)(
    "renders the authentic filled %s mark through the public icon entry",
    (name) => {
      const Brand = icons[`Brand${name}Icon`];
      const { container } = render(<Brand size="1em" />);
      const svg = container.querySelector("svg")!;
      expect(svg?.getAttribute("width")).toBe("1em");
      expect(svg?.getAttribute("height")).toBe("1em");
      expect(svg?.getAttribute("fill")).toBe("currentColor");
      expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
      expect(svg?.getAttribute("aria-hidden")).toBe("true");
      expect(
        svg.querySelector("path")?.getAttribute("d")?.length,
      ).toBeGreaterThan(20);
    },
  );
  it("supports labelled marks, native styling, and refs without an extra accessible name for decoration", () => {
    const ref = createRef<SVGSVGElement>();
    const { container, getByRole, rerender } = render(
      <icons.BrandReactIcon
        ref={ref}
        title="React"
        className="brand"
        color="#0898bb"
        size={20}
      />,
    );
    expect(ref.current).toBe(getByRole("img", { name: "React" }));
    expect(ref.current?.hasAttribute("aria-hidden")).toBe(false);
    expect(ref.current?.getAttribute("fill")).toBe("#0898bb");
    expect(ref.current?.classList.contains("brand")).toBe(true);
    rerender(<icons.BrandReactIcon aria-label="React framework" />);
    expect(getByRole("img", { name: "React framework" })).toBe(
      container.querySelector("svg"),
    );
  });
});
