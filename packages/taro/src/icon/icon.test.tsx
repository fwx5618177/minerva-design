import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolveTokens } from "@minerva/core";
import { defineIcon, getIcon, searchIcon, toSvg } from "@minerva/icons/core";
import { ConfigProvider } from "../theme";
import {
  ArrowUpIcon,
  DynamicIcon,
  Icon,
  SearchIcon,
  createIcon,
} from "../icons";

const light = resolveTokens({ mode: "light" });
const dark = resolveTokens({ mode: "dark" });

const twoTone = defineIcon({
  name: "two-tone",
  paths: ["M4 12h16", "M12 4v16"],
  colors: [undefined, "#16a34a"],
});

const PREFIX = "data:image/svg+xml;base64,";

/** The images of the tree and the SVG their base64 src decodes to */
const images = () => [...document.querySelectorAll("img")];
const svgOf = (image: HTMLImageElement | undefined) => {
  const src = image?.getAttribute("src") ?? "";
  expect(src.startsWith(PREFIX)).toBe(true);
  return Buffer.from(src.slice(PREFIX.length), "base64").toString("utf8");
};
const strokeOf = (svg: string) => /<svg [^>]*stroke="([^"]+)"/.exec(svg)?.[1];

describe("Icon (Taro Image)", () => {
  it("is a base64 SVG of the icon, aspect-fit, 24px by default", () => {
    const { container } = render(<Icon icon={searchIcon} color="#123456" />);
    const svg = svgOf(images()[0]);
    expect(svg).toBe(
      toSvg(searchIcon, { size: 24, color: "#123456", strokeWidth: 2 }),
    );
    expect(svg).not.toContain("currentColor");
    // H5 Image: a .taro-img host around an <img>, mode as a class
    expect(images()[0]!.className).toContain("taro-img__mode-aspectfit");
    const host = container.querySelector(".taro-img") as HTMLElement;
    expect(host.style.width).toBe("24px");
    expect(host.style.height).toBe("24px");
  });

  it("follows size: numbers in px, strings as CSS lengths", () => {
    const { container, rerender } = render(
      <Icon icon={searchIcon} size={40} />,
    );
    const host = () => container.querySelector(".taro-img") as HTMLElement;
    expect(host().style.width).toBe("40px");
    expect(svgOf(images()[0])).toContain('width="40" height="40"');
    rerender(<Icon icon={searchIcon} size="3em" style={{ opacity: 0.5 }} />);
    expect(host().style.width).toBe("3em");
    expect(host().style.height).toBe("3em");
    expect(host().style.opacity).toBe("0.5");
    // the 24×24 grid, scaled by aspectFit
    expect(svgOf(images()[0])).toContain('width="24" height="24"');
  });

  it("uses the theme's text color of the active mode unless color is set", () => {
    expect(dark.colors["text-color"]).not.toBe(light.colors["text-color"]);
    const { rerender } = render(
      <ConfigProvider theme="light">
        <Icon icon={searchIcon} />
      </ConfigProvider>,
    );
    expect(strokeOf(svgOf(images()[0]))).toBe(light.colors["text-color"]);
    // the data URI is rebuilt when the mode changes
    rerender(
      <ConfigProvider theme="dark">
        <Icon icon={searchIcon} />
      </ConfigProvider>,
    );
    expect(strokeOf(svgOf(images()[0]))).toBe(dark.colors["text-color"]);
    rerender(
      <ConfigProvider theme="dark">
        <Icon icon={searchIcon} color="#e11d48" />
      </ConfigProvider>,
    );
    expect(strokeOf(svgOf(images()[0]))).toBe("#e11d48");
  });

  it("honours the per-path colors of the icon", () => {
    render(<Icon icon={twoTone} color="#111111" />);
    const svg = svgOf(images()[0]);
    expect(strokeOf(svg)).toBe("#111111");
    expect(svg).toContain('<path d="M4 12h16"/>');
    expect(svg).toContain('<path d="M12 4v16" stroke="#16a34a"/>');
  });

  it("strokeWidth scales with the grid; absoluteStrokeWidth keeps it in px", () => {
    const { rerender } = render(
      <Icon icon={searchIcon} size={48} strokeWidth={1.5} />,
    );
    expect(svgOf(images()[0])).toContain('stroke-width="1.5"');
    rerender(
      <Icon icon={searchIcon} size={48} strokeWidth={2} absoluteStrokeWidth />,
    );
    expect(svgOf(images()[0])).toContain('stroke-width="1"');
  });

  it("is hidden from assistive technologies without a title", () => {
    const { container } = render(<Icon icon={searchIcon} />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector(".taro-img")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("is an image named by its title", () => {
    render(<Icon icon={searchIcon} title="Search" />);
    expect(screen.getByRole("img", { name: "Search" })).toBeInTheDocument();
  });
});

describe("named components, createIcon and DynamicIcon", () => {
  it("SearchIcon is Icon with searchIcon", () => {
    expect(SearchIcon.displayName).toBe("SearchIcon");
    render(<SearchIcon size={32} title="Find" color="#000" />);
    expect(screen.getByRole("img", { name: "Find" })).toBeInTheDocument();
    expect(svgOf(images()[0])).toBe(
      toSvg(searchIcon, { size: 32, color: "#000", strokeWidth: 2 }),
    );
  });

  it("createIcon names the component after the icon", () => {
    const TwoTone = createIcon(twoTone);
    expect(TwoTone.displayName).toBe("TwoToneIcon");
    render(<TwoTone />);
    expect(svgOf(images()[0])).toContain('d="M12 4v16"');
  });

  it("DynamicIcon draws a built-in icon by name", () => {
    render(<DynamicIcon name="arrow-up" color="#2563eb" />);
    expect(svgOf(images()[0])).toBe(
      toSvg(getIcon("arrow-up")!, {
        size: 24,
        color: "#2563eb",
        strokeWidth: 2,
      }),
    );
    expect(ArrowUpIcon.displayName).toBe("ArrowUpIcon");
  });

  it("DynamicIcon renders nothing for an unknown name", () => {
    const { container } = render(<DynamicIcon name="no-such-icon" />);
    expect(container.innerHTML).toBe("");
  });
});
