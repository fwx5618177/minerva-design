import type { CSSProperties } from "react";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Box } from "../Box";
import { HStack, Stack, VStack } from ".";
import { SplitLayout } from "../SplitLayout";
import { ResponsiveGrid } from "../ResponsiveGrid";

// Minerva resolves every spacing prop with one rule: numbers / numeric
// strings -> var(--space-N), decimal points become "-".
type Space = string | number | undefined;
const layouts = [
  {
    name: "Box",
    render: (gap: Space) => <Box p={gap} m={gap} />,
    selector: "div",
    properties: ["padding", "margin"],
    defaultValue: "",
  },
  {
    name: "Stack",
    render: (gap: Space) => <Stack gap={gap} />,
    selector: ".stack",
    properties: ["gap"],
    defaultValue: "",
  },
  {
    name: "HStack",
    render: (gap: Space) => <HStack gap={gap} />,
    selector: ".stack",
    properties: ["gap"],
    defaultValue: "",
  },
  {
    name: "VStack",
    render: (gap: Space) => <VStack gap={gap} />,
    selector: ".stack",
    properties: ["gap"],
    defaultValue: "",
  },
  {
    name: "SplitLayout",
    render: (gap: Space) => (
      <SplitLayout aside="Aside" gap={gap}>
        Main
      </SplitLayout>
    ),
    selector: ".root",
    properties: ["--split-layout-gap"],
    defaultValue: "var(--space-6)",
  },
  {
    name: "ResponsiveGrid",
    render: (gap: Space) => <ResponsiveGrid gap={gap} />,
    selector: ".root",
    properties: ["--grid-row-gap", "--grid-column-gap"],
    defaultValue: "var(--space-4)",
  },
];

describe.each(layouts)("$name spacing", (layout) => {
  const element = (container: HTMLElement) =>
    container.querySelector<HTMLElement>(layout.selector)!;

  it.each([0.5, "0.5"])("maps %j to the half-step token", (gap) => {
    const { container } = render(layout.render(gap));
    for (const property of layout.properties) {
      expect(element(container).style.getPropertyValue(property)).toBe(
        "var(--space-0-5)",
      );
    }
  });

  it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24])(
    "maps integer token %s and its numeric string",
    (token) => {
      for (const gap of [token, String(token)]) {
        const { container, unmount } = render(layout.render(gap));
        for (const property of layout.properties) {
          expect(element(container).style.getPropertyValue(property)).toBe(
            `var(--space-${token})`,
          );
        }
        unmount();
      }
    },
  );

  it.each([
    "2px",
    "0.5rem",
    "2em",
    "5%",
    "calc(1rem + 2px)",
    "var(--custom-gap)",
  ])("passes CSS value %s through", (gap) => {
    const markup = renderToStaticMarkup(layout.render(gap));
    for (const property of layout.properties) {
      expect(markup).toContain(`${property}:${gap}`);
    }
  });

  it("restores the defaults when spacing becomes undefined", () => {
    const { container, rerender } = render(layout.render(0.5));
    rerender(layout.render(undefined));
    for (const property of layout.properties) {
      expect(element(container).style.getPropertyValue(property)).toBe(
        layout.defaultValue,
      );
    }
  });

  // SSR output: the DOM style parser can discard unsupported declarations.
  it.each([
    [99, "var(--space-99)"],
    ["99", "var(--space-99)"],
    [1.5, "var(--space-1-5)"],
    ["1.5", "var(--space-1-5)"],
    [2.5, "var(--space-2-5)"],
    ["2.5", "var(--space-2-5)"],
    [-1, "var(--space--1)"],
    [-0.5, "var(--space--0-5)"],
    ["-0.5", "-0.5"],
    [".5", ".5"],
    ["0.50", "var(--space-0-50)"],
    ["04", "var(--space-04)"],
    [" 0.5 ", "0.5"],
    ["1e2", "1e2"],
    ["auto", "auto"],
    ["unknown", "unknown"],
    [NaN, "var(--space-NaN)"],
    [Infinity, "var(--space-Infinity)"],
  ] as const)("resolves %j as %s", (gap, expected) => {
    const markup = renderToStaticMarkup(layout.render(gap));
    for (const property of layout.properties) {
      expect(markup).toContain(`${property}:${expected}`);
    }
  });

  it("keeps empty strings empty", () => {
    const markup = renderToStaticMarkup(layout.render(""));
    for (const property of layout.properties) {
      expect(markup).not.toContain(`${property}:`);
    }
  });
});

it.each([Stack, HStack, VStack])(
  "preserves Stack style overrides",
  (Component) => {
    const { container } = render(
      <Component gap={0.5} style={{ gap: "9px" }} />,
    );
    expect((container.firstElementChild as HTMLElement).style.gap).toBe("9px");
  },
);

it("preserves independent grid row and column gaps", () => {
  const { container, rerender } = render(
    <ResponsiveGrid gap={4} rowGap={0.5} columnGap="0.5" />,
  );
  const grid = container.firstElementChild as HTMLElement;
  expect(grid.style.getPropertyValue("--grid-row-gap")).toBe(
    "var(--space-0-5)",
  );
  expect(grid.style.getPropertyValue("--grid-column-gap")).toBe(
    "var(--space-0-5)",
  );
  rerender(
    <ResponsiveGrid gap={0.5} rowGap={0} columnGap="calc(1rem + 2px)" />,
  );
  expect(grid.style.getPropertyValue("--grid-row-gap")).toBe("var(--space-0)");
  expect(grid.style.getPropertyValue("--grid-column-gap")).toBe(
    "calc(1rem + 2px)",
  );
});

it("preserves grid and split layout variable overrides", () => {
  const { container } = render(
    <>
      <ResponsiveGrid
        id="grid"
        gap={0.5}
        style={
          {
            "--grid-row-gap": "9px",
            "--grid-column-gap": "7px",
          } as CSSProperties
        }
      />
      <SplitLayout
        id="split"
        aside="Aside"
        gap={0.5}
        style={{ "--split-layout-gap": "11px" } as CSSProperties}
      />
    </>,
  );
  const grid = container.querySelector<HTMLElement>("#grid")!;
  expect(grid.style.getPropertyValue("--grid-row-gap")).toBe("9px");
  expect(grid.style.getPropertyValue("--grid-column-gap")).toBe("7px");
  expect(
    container
      .querySelector<HTMLElement>("#split")!
      .style.getPropertyValue("--split-layout-gap"),
  ).toBe("11px");
});

it("keeps spacing references dynamic for consumer token overrides", () => {
  const style = {
    "--space-0-5": "7px",
    "--space-4": "19px",
    "--space-99": "23px",
  } as CSSProperties;
  const { container } = render(
    <Box p={0.5} m={4} style={style}>
      <Stack gap="0.5" />
      <ResponsiveGrid id="grid" gap={99} />
      <SplitLayout id="split" aside="Aside" gap="4" />
    </Box>,
  );
  const box = container.firstElementChild as HTMLElement;
  expect(box.style.getPropertyValue("--space-0-5")).toBe("7px");
  expect(box.style.getPropertyValue("--space-4")).toBe("19px");
  expect(box.style.getPropertyValue("--space-99")).toBe("23px");
  expect(box.style.padding).toBe("var(--space-0-5)");
  expect(box.style.margin).toBe("var(--space-4)");
  expect(container.querySelector<HTMLElement>(".stack")!.style.gap).toBe(
    "var(--space-0-5)",
  );
  expect(
    container
      .querySelector<HTMLElement>("#grid")!
      .style.getPropertyValue("--grid-row-gap"),
  ).toBe("var(--space-99)");
  expect(
    container
      .querySelector<HTMLElement>("#split")!
      .style.getPropertyValue("--split-layout-gap"),
  ).toBe("var(--space-4)");
});
