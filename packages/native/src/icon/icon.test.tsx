import { render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { defineIcon, getIcon, searchIcon } from "@minerva/icons/core";
import { hostElements, type Host } from "../../test/queries";
import { MinervaProvider } from "../theme/MinervaProvider";
import {
  ArrowUpIcon,
  DynamicIcon,
  Icon,
  SearchIcon,
  createIcon,
} from "../icons";

// react-native-svg turns its props into native ones (colors become ints,
// viewBox becomes vbWidth…): pass-through hosts keep the props the icon sets.
// icon.svg.test.tsx renders through the real library.
vi.mock("react-native-svg", async () => {
  const { createElement } = await import("react");
  const host = (type: string) => (props: Record<string, unknown>) =>
    createElement(type, props);
  const Svg = host("Svg");
  return { __esModule: true, default: Svg, Svg, Path: host("Path") };
});

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });

const twoTone = defineIcon({
  name: "two-tone",
  paths: ["M4 12h16", "M12 4v16"],
  colors: [undefined, "#16a34a"],
});

/** Host elements drawn by react-native-svg: the svg view and its paths */
const svgRoot = (): Host => {
  const root = hostElements().find((el) => el.type === "Svg");
  if (!root) throw new Error("no <Svg>");
  return root;
};
const paths = (): Host[] => hostElements().filter((el) => el.type === "Path");

describe("Icon (react-native-svg)", () => {
  it("draws every path of the icon on the 24×24 grid, round and unfilled", async () => {
    await render(<Icon icon={searchIcon} />);
    expect(paths().map((p) => p.props.d)).toEqual([...searchIcon.paths]);
    for (const path of paths()) {
      expect(path.props).toMatchObject({
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      });
    }
  });

  it("is 24dp by default and follows size", async () => {
    await render(<Icon icon={searchIcon} />);
    expect(svgRoot().props).toMatchObject({ width: 24, height: 24 });
    await render(<Icon icon={searchIcon} size={40} />);
    expect(svgRoot().props).toMatchObject({ width: 40, height: 40 });
  });

  it("strokes with the theme's text color, per mode, unless color is set", async () => {
    await render(
      <MinervaProvider theme="light">
        <Icon icon={searchIcon} />
      </MinervaProvider>,
    );
    expect(paths()[0]!.props.stroke).toBe(light.colors["text-color"]);
    await render(
      <MinervaProvider theme="dark">
        <Icon icon={searchIcon} />
      </MinervaProvider>,
    );
    expect(paths()[0]!.props.stroke).toBe(dark.colors["text-color"]);
    expect(dark.colors["text-color"]).not.toBe(light.colors["text-color"]);
    await render(
      <MinervaProvider theme="dark">
        <Icon icon={searchIcon} color="#e11d48" />
      </MinervaProvider>,
    );
    expect(paths().every((p) => p.props.stroke === "#e11d48")).toBe(true);
  });

  it("honours the per-path colors of the icon", async () => {
    await render(<Icon icon={twoTone} color="#111111" />);
    expect(paths().map((p) => p.props.stroke)).toEqual(["#111111", "#16a34a"]);
  });

  it("strokeWidth scales with the grid; absoluteStrokeWidth keeps it in dp", async () => {
    await render(<Icon icon={searchIcon} size={48} strokeWidth={1.5} />);
    expect(paths()[0]!.props.strokeWidth).toBe(1.5);
    await render(
      <Icon icon={searchIcon} size={48} strokeWidth={2} absoluteStrokeWidth />,
    );
    // 2dp on a 48dp icon: 1 unit of the 24×24 grid
    expect(paths()[0]!.props.strokeWidth).toBe(1);
  });

  it("is hidden from assistive technologies without a title", async () => {
    await render(<Icon icon={searchIcon} />);
    expect(svgRoot().props).toMatchObject({
      accessible: false,
      importantForAccessibility: "no-hide-descendants",
      accessibilityElementsHidden: true,
    });
    expect(screen.queryByRole("image")).toBeNull();
  });

  it("is an image named by its title", async () => {
    await render(<Icon icon={searchIcon} title="Search" />);
    const image = screen.getByRole("image", { name: "Search" });
    expect(image.props).toMatchObject({
      accessible: true,
      accessibilityRole: "image",
      accessibilityLabel: "Search",
    });
  });

  it("forwards the other Svg props", async () => {
    await render(<Icon icon={searchIcon} testID="lookup" opacity={0.5} />);
    const svg = screen.getByTestId("lookup", { includeHiddenElements: true });
    expect(svg.props).toMatchObject({ viewBox: "0 0 24 24", opacity: 0.5 });
  });
});

describe("named components, createIcon and DynamicIcon", () => {
  it("SearchIcon is Icon with searchIcon", async () => {
    expect(SearchIcon.displayName).toBe("SearchIcon");
    await render(<SearchIcon size={32} title="Find" />);
    expect(screen.getByRole("image", { name: "Find" })).toBeTruthy();
    expect(paths().map((p) => p.props.d)).toEqual([...searchIcon.paths]);
    expect(svgRoot().props.width).toBe(32);
  });

  it("createIcon names the component after the icon", async () => {
    const TwoTone = createIcon(twoTone);
    expect(TwoTone.displayName).toBe("TwoToneIcon");
    await render(<TwoTone />);
    expect(paths()).toHaveLength(2);
  });

  it("DynamicIcon draws a built-in icon by name", async () => {
    await render(<DynamicIcon name="arrow-up" color="#2563eb" />);
    expect(paths().map((p) => p.props.d)).toEqual([
      ...getIcon("arrow-up")!.paths,
    ]);
    expect(ArrowUpIcon.displayName).toBe("ArrowUpIcon");
  });

  it("DynamicIcon renders nothing for an unknown name", async () => {
    await render(<DynamicIcon name="no-such-icon" />);
    expect(screen.toJSON()).toBeNull();
  });
});
