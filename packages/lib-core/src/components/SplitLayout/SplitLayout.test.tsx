import { createRef, type ReactNode } from "react";
import { act, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { join } from "node:path";
import { compile } from "sass";
import { expect, it } from "vitest";
import { SplitLayout } from ".";

it("forwards native div attributes, styles, events and ref without leaking layout props", () => {
  const ref = createRef<HTMLDivElement>();
  const clicks: HTMLDivElement[] = [];
  const { container, unmount } = render(
    <SplitLayout
      ref={ref}
      id="editor"
      role="group"
      aria-label="Article editor"
      data-owner="article"
      title="Editor"
      tabIndex={-1}
      className="consumer"
      style={{ maxWidth: 960, padding: 8 }}
      aside={<button type="button">Properties</button>}
      asideWidth={280}
      collapseBelow="lg"
      gap="20px"
      onClick={(event) => {
        clicks.push(event.currentTarget);
        event.preventDefault();
      }}
    >
      <button type="button">Edit</button>
    </SplitLayout>,
  );
  const layout = ref.current!;
  expect(layout).toBeInstanceOf(HTMLDivElement);
  expect(layout).toBe(container.firstElementChild);
  expect(layout).toBe(screen.getByRole("group", { name: "Article editor" }));
  expect(layout.id).toBe("editor");
  expect(layout.dataset.owner).toBe("article");
  expect(layout.title).toBe("Editor");
  expect(layout.tabIndex).toBe(-1);
  expect(layout).toHaveClass("root", "consumer");
  expect(layout.style.maxWidth).toBe("960px");
  expect(layout.style.padding).toBe("8px");
  expect(layout.style.getPropertyValue("--split-layout-aside-width")).toBe(
    "280px",
  );
  expect(layout.style.getPropertyValue("--split-layout-gap")).toBe("20px");
  expect(layout.firstElementChild).toHaveClass("lg");
  expect(
    container.querySelector("[aside], [asidewidth], [collapsebelow], [gap]"),
  ).toBeNull();
  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  act(() => {
    screen.getByRole("button", { name: "Edit" }).dispatchEvent(event);
  });
  expect(clicks).toEqual([layout]);
  expect(event.defaultPrevented).toBe(true);
  unmount();
  expect(ref.current).toBeNull();
});

it("renders main before aside once and defaults to a 320px aside, md collapse and gap token 6", () => {
  const { container } = render(
    <SplitLayout aside={<button type="button">Properties</button>}>
      <input aria-label="Title" />
    </SplitLayout>,
  );
  const layout = container.firstElementChild as HTMLElement;
  const grid = layout.firstElementChild!;
  expect(grid).toHaveClass("grid", "md", "hasAside");
  expect(Array.from(grid.children, (child) => child.className)).toEqual([
    "main",
    "aside",
  ]);
  expect(
    Array.from(layout.querySelectorAll("input, button"), (n) => n.tagName),
  ).toEqual(["INPUT", "BUTTON"]);
  expect(layout.style.getPropertyValue("--split-layout-aside-width")).toBe(
    "320px",
  );
  expect(layout.style.getPropertyValue("--split-layout-gap")).toBe(
    "var(--space-6)",
  );
});

it.each([null, undefined, false])(
  "omits the aside and split columns when aside is %s",
  (aside) => {
    const { container } = render(<SplitLayout aside={aside}>Main</SplitLayout>);
    const grid = container.querySelector(".grid")!;
    expect(grid.children).toHaveLength(1);
    expect(grid.firstElementChild?.textContent).toBe("Main");
    expect(grid).not.toHaveClass("hasAside");
    expect(container.querySelector(".aside")).toBeNull();
  },
);

it("preserves zero as valid aside content", () => {
  const { container } = render(<SplitLayout aside={0}>Main</SplitLayout>);
  expect(container.querySelector(".aside")?.textContent).toBe("0");
  expect(container.querySelector(".grid.hasAside")).not.toBeNull();
});

it.each([0, -1, NaN, Infinity, -Infinity])(
  "rejects invalid asideWidth %s",
  (asideWidth) => {
    expect(() =>
      renderToStaticMarkup(
        <SplitLayout aside="Properties" asideWidth={asideWidth}>
          Main
        </SplitLayout>,
      ),
    ).toThrow(RangeError);
  },
);

it.each([0.5, 280, 10000])(
  "accepts finite positive asideWidth %s for CSS sizing",
  (asideWidth) => {
    const { container } = render(
      <SplitLayout aside="Properties" asideWidth={asideWidth}>
        Main
      </SplitLayout>,
    );
    expect(
      (container.firstElementChild as HTMLElement).style.getPropertyValue(
        "--split-layout-aside-width",
      ),
    ).toBe(`${asideWidth}px`);
  },
);

it.each([
  [0, "var(--space-0)"],
  [4, "var(--space-4)"],
  ["2", "var(--space-2)"],
  [1.5, "var(--space-1-5)"],
  ["1.5", "var(--space-1-5)"],
  [2.5, "var(--space-2-5)"],
  ["2.5", "var(--space-2-5)"],
  ["24px", "24px"],
  ["var(--custom-gap)", "var(--custom-gap)"],
] as const)("resolves gap %s as %s", (gap, expected) => {
  const { container } = render(
    <SplitLayout aside="Properties" gap={gap}>
      Main
    </SplitLayout>,
  );
  expect(
    (container.firstElementChild as HTMLElement).style.getPropertyValue(
      "--split-layout-gap",
    ),
  ).toBe(expected);
});

it.each([0.5, "0.5"])(
  "resolves fractional gap %s to a token declared by the compiled scale",
  (gap) => {
    const tokens = compile(
      join(import.meta.dirname, "../../styles/scales.scss"),
    ).css;
    const { container } = render(
      <SplitLayout aside="Properties" gap={gap}>
        Main
      </SplitLayout>,
    );
    const reference = (
      container.firstElementChild as HTMLElement
    ).style.getPropertyValue("--split-layout-gap");
    const variable = /^var\((--[a-z0-9-]+)\)$/.exec(reference)?.[1];
    expect(variable).toBe("--space-0-5");
    const declared = new RegExp(`${variable}:\\s*([^;]+);`)
      .exec(tokens)?.[1]
      ?.trim();
    expect(declared).toBe("0.125rem");
  },
);

it("resets nested layout defaults independently of the outer width, gap and breakpoint", () => {
  const { container } = render(
    <SplitLayout
      id="outer"
      aside="Outer properties"
      asideWidth={480}
      gap={2}
      collapseBelow="lg"
    >
      <SplitLayout id="inner" aside="Inner properties">
        Inner main
      </SplitLayout>
    </SplitLayout>,
  );
  const outer = container.querySelector<HTMLElement>("#outer")!;
  const inner = container.querySelector<HTMLElement>("#inner")!;
  expect(inner.closest(".main")?.parentElement).toBe(outer.firstElementChild);
  expect(inner.style.getPropertyValue("--split-layout-aside-width")).toBe(
    "320px",
  );
  expect(inner.style.getPropertyValue("--split-layout-gap")).toBe(
    "var(--space-6)",
  );
  expect(inner.firstElementChild).toHaveClass("md");
  expect(inner.firstElementChild).not.toHaveClass("lg");
  expect(outer.firstElementChild).toHaveClass("lg");
});

it("preserves main input state when the aside is removed, restored or reconfigured", () => {
  const layout = (aside: ReactNode, extra = {}) => (
    <SplitLayout aside={aside} {...extra}>
      <input aria-label="Draft title" defaultValue="Draft" />
    </SplitLayout>
  );
  const { rerender } = render(layout(<input aria-label="Property" />));
  const main = screen.getByRole<HTMLInputElement>("textbox", {
    name: "Draft title",
  });
  main.value = "Unsaved title";
  for (const aside of [null, <input key="property" aria-label="Property" />]) {
    rerender(layout(aside, { asideWidth: 400, collapseBelow: "lg", gap: 3 }));
    expect(screen.getByRole("textbox", { name: "Draft title" })).toBe(main);
    expect(main.value).toBe("Unsaved title");
  }
});

it("ships the container-query split rules in its stylesheet", () => {
  const css = compile(join(import.meta.dirname, "splitLayout.module.scss")).css;
  expect(css).toMatch(
    /\.root\s*\{[^}]*container:\s*minerva-split-layout\s*\/\s*inline-size/,
  );
  expect(css).toMatch(
    /\.grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);[^}]*gap:\s*var\(--split-layout-gap\)/,
  );
  for (const [width, key] of [
    ["768px", "md"],
    ["1200px", "lg"],
  ]) {
    expect(css).toMatch(
      new RegExp(
        `@container minerva-split-layout \\(min-width: ${width}\\)\\s*\\{\\s*\\.grid\\.${key}\\.hasAside\\s*\\{\\s*grid-template-columns:\\s*minmax\\(0, 1fr\\) min\\(var\\(--split-layout-aside-width\\), 50%\\)`,
      ),
    );
  }
});
