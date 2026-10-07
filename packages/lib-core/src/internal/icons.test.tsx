import { createRef, type ComponentType } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as icons from "./icons";
import { IconStar, IconX, type IconProps } from "./icons";

const entries = Object.entries(icons).filter(([name]) =>
  name.startsWith("Icon"),
) as [string, ComponentType<IconProps>][];

describe("internal icons", () => {
  it("exports the icon set", () => {
    expect(entries.length).toBeGreaterThan(30);
  });

  it.each(entries)(
    "%s renders a decorative 1em svg with geometry",
    (_, Icon) => {
      const { container } = render(<Icon />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(svg).toHaveAttribute("width", "1em");
      expect(svg).toHaveAttribute("height", "1em");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).toHaveAttribute("focusable", "false");
      const shapes = svg!.querySelectorAll("path, circle, rect");
      expect(shapes.length).toBeGreaterThan(0);
      for (const path of svg!.querySelectorAll("path")) {
        expect(path.getAttribute("d")?.trim()).toBeTruthy();
      }
    },
  );

  it("strokes outline icons with currentColor", () => {
    const { container } = render(<IconX />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("stroke-width", "2");
  });

  it("fills solid icons with currentColor", () => {
    const { container } = render(<icons.IconCircleInfoFilled />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveAttribute("fill-rule", "evenodd");
  });

  it("forwards size, className, style, aria and svg attributes", () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(
      <IconStar
        ref={ref}
        size={20}
        className="custom"
        style={{ color: "red" }}
        fill="currentColor"
        strokeWidth={1.5}
        aria-hidden={false}
        aria-label="Star"
        data-testid="star"
      />,
    );
    const svg = container.querySelector("svg")!;
    expect(ref.current).toBe(svg);
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
    expect(svg).toHaveClass("custom");
    expect(svg.style.color).toBe("red");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveAttribute("stroke-width", "1.5");
    expect(svg).toHaveAttribute("aria-hidden", "false");
    expect(svg).toHaveAttribute("aria-label", "Star");
    expect(svg).toHaveAttribute("data-testid", "star");
  });
});
