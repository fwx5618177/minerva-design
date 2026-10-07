import { createRef, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import { GridItem, ResponsiveGrid } from ".";

const css = compile(
  join(import.meta.dirname, "responsiveGrid.module.scss"),
).css;
const variables = (element: HTMLElement) =>
  ["base", "sm", "md", "lg"].map((key) =>
    element.style.getPropertyValue(`--ui-grid-${key}`),
  );

// Ported from novel-isr-ui components/__test__/ResponsiveDataLayout.test.tsx
// (ResponsiveGrid parts) and the GridItem part of FormLayout.test.tsx.
describe("ResponsiveGrid", () => {
  it("renders an accessible grid with normalized spacing and forwarded attributes", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <ResponsiveGrid
        ref={ref}
        as="section"
        aria-label="Metrics"
        className="consumer"
        columns={{ base: 1, sm: 2, md: 4 }}
        gap={3}
        rowGap={2}
        columnGap="20px"
        data-testid="grid"
      >
        <button type="button">First</button>
        <button type="button">Second</button>
      </ResponsiveGrid>,
    );
    const grid = ref.current!;
    expect(grid.tagName).toBe("SECTION");
    expect(grid).toBe(screen.getByRole("region", { name: "Metrics" }));
    expect(grid).toHaveClass("root", "ui-responsive-grid", "consumer");
    expect(grid.getAttribute("role")).toBeNull();
    expect(grid.hasAttribute("columns")).toBe(false);
    expect(variables(grid)).toEqual(["1", "2", "4", "4"]);
    expect(grid.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-2)",
    );
    expect(grid.style.getPropertyValue("--ui-grid-column-gap")).toBe("20px");
    expect(grid.firstElementChild).toHaveClass(
      "layout",
      "ui-responsive-grid-layout",
    );
    expect(
      Array.from(container.querySelectorAll("button"), (n) => n.textContent),
    ).toEqual(["First", "Second"]);
  });

  it("defaults to one column with token 4 gaps", () => {
    const { container } = render(<ResponsiveGrid />);
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.tagName).toBe("DIV");
    expect(variables(grid)).toEqual(["1", "1", "1", "1"]);
    expect(grid.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-4)",
    );
  });

  it("resolves sparse breakpoints and resets nested grid defaults", () => {
    const { container } = render(
      <ResponsiveGrid columns={{ md: 3 }}>
        <ResponsiveGrid data-testid="inner">
          <span>Nested</span>
        </ResponsiveGrid>
      </ResponsiveGrid>,
    );
    expect(variables(container.firstElementChild as HTMLElement)).toEqual([
      "1",
      "1",
      "3",
      "3",
    ]);
    expect(variables(screen.getByTestId("inner"))).toEqual([
      "1",
      "1",
      "1",
      "1",
    ]);
  });

  it("rejects invalid column counts without emitting broken CSS", () => {
    for (const columns of [0, -1, 1.5, 13, NaN, Infinity]) {
      expect(() =>
        renderToStaticMarkup(<ResponsiveGrid columns={columns} />),
      ).toThrow(RangeError);
    }
    expect(() =>
      renderToStaticMarkup(<ResponsiveGrid columns={{ md: 0 }} />),
    ).toThrow(/columns/);
    expect(renderToStaticMarkup(<ResponsiveGrid columns={12} />)).toContain(
      "--ui-grid-lg:12",
    );
  });

  it("ships the container query layout in its stylesheet", () => {
    expect(css).toMatch(
      /\.root\s*\{[^}]*container:\s*ui-grid\s*\/\s*inline-size/,
    );
    expect(css).toMatch(
      /\.layout\s*\{[^}]*grid-template-columns:\s*repeat\(var\(--ui-grid-base\), minmax\(0, 1fr\)\)/,
    );
    for (const [width, key] of [
      ["480px", "sm"],
      ["768px", "md"],
      ["1200px", "lg"],
    ]) {
      expect(css).toMatch(
        new RegExp(
          `@container ui-grid \\(min-width: ${width}\\)\\s*\\{\\s*\\.layout\\s*\\{\\s*grid-template-columns:\\s*repeat\\(var\\(--ui-grid-${key}\\)`,
        ),
      );
    }
    expect(css).toMatch(/\.layout > \*\s*\{[^}]*min-width:\s*0/);
  });
});

describe("GridItem", () => {
  it("makes full-width opt-in and forwards div attributes and refs", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ResponsiveGrid columns={2}>
        <GridItem
          ref={ref}
          id="regular"
          className="consumer"
          aria-label="Group"
          data-owner="editor"
          style={{ padding: 8 }}
        >
          Regular
        </GridItem>
        <GridItem fullWidth>Full row</GridItem>
        <GridItem fullWidth={false}>Regular again</GridItem>
      </ResponsiveGrid>,
    );
    const item = ref.current!;
    expect(item.tagName).toBe("DIV");
    expect(item.id).toBe("regular");
    expect(item).toHaveClass("item", "consumer");
    expect(item.getAttribute("aria-label")).toBe("Group");
    expect(item.dataset.owner).toBe("editor");
    expect(item.style.padding).toBe("8px");
    const items = Array.from(container.querySelectorAll(".ui-grid-item"));
    expect(items.map((i) => i.textContent)).toEqual([
      "Regular",
      "Full row",
      "Regular again",
    ]);
    expect(
      items.map((i) => i.classList.contains("ui-grid-item-full-width")),
    ).toEqual([false, true, false]);
    expect(items[1]).toHaveClass("fullWidth");
    expect(container.querySelector("[fullwidth], [aschild]")).toBeNull();
  });

  it("slots its child without a wrapper, merging classes, styles, refs and handlers", () => {
    const itemRef = createRef<HTMLDivElement>();
    const clicks: string[] = [];
    const { container, unmount } = render(
      <ResponsiveGrid>
        <GridItem
          fullWidth
          asChild
          ref={itemRef}
          className="item-class"
          data-owner="layout"
          style={{ padding: 8 }}
          onClick={(event: MouseEvent) =>
            clicks.push(`item:${event.defaultPrevented}`)
          }
        >
          <button
            type="button"
            className="field"
            data-child="kept"
            style={{ margin: 4 }}
            onClick={(event) => {
              clicks.push("child");
              event.preventDefault();
            }}
          >
            Title
          </button>
        </GridItem>
      </ResponsiveGrid>,
    );
    const field = itemRef.current!;
    expect(field.tagName).toBe("BUTTON");
    expect(field.parentElement).toHaveClass("ui-responsive-grid-layout");
    expect(field).toHaveClass(
      "ui-grid-item",
      "ui-grid-item-full-width",
      "item-class",
      "field",
    );
    expect(field.dataset.owner).toBe("layout");
    expect(field.dataset.child).toBe("kept");
    expect(field.style.padding).toBe("8px");
    expect(field.style.margin).toBe("4px");
    field.click();
    expect(clicks).toEqual(["child", "item:true"]);
    expect(container.querySelector("[fullwidth], [aschild]")).toBeNull();
    unmount();
    expect(itemRef.current).toBeNull();
  });

  it("ships explicit full rows and shrink boundaries", () => {
    expect(css).toMatch(/\.fullWidth\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/);
    expect(css).toMatch(/\.item\s*\{[^}]*min-width:\s*0/);
  });
});
