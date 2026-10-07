import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { join } from "node:path";
import { compile } from "sass";
import { expect, it } from "vitest";
import { Card } from "../Card";
import { Divider } from "../Divider";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { Tag } from "../Tag";
import { PageSection } from "./Page";
import { Toolbar } from ".";

// Stylesheet contracts are checked on the compiled component module.
const css = compile(join(import.meta.dirname, "page.module.scss"))
  .css.replace(/:global\(([^)]*)\)/g, "$1")
  .replace(/\s+/g, " ");
const rule = (selector: string) =>
  css.match(
    new RegExp(
      `${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`,
    ),
  )?.[1];

it("keeps the default div group and its children without adding keyboard navigation", () => {
  const { container } = render(
    <Toolbar>
      <button type="button">First</button>
      <button type="button">Second</button>
    </Toolbar>,
  );
  const toolbar = container.firstElementChild!;
  expect(toolbar.tagName).toBe("DIV");
  expect(toolbar.getAttribute("role")).toBe("group");
  expect(Array.from(toolbar.classList)).toEqual(["toolbar"]);
  expect(toolbar.hasAttribute("tabindex")).toBe(false);
  const first = screen.getByRole("button", { name: "First" });
  expect(
    Array.from(toolbar.querySelectorAll("button"), (b) => b.tabIndex),
  ).toEqual([0, 0]);
  act(() => {
    first.focus();
    first.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
  });
  expect(document.activeElement).toBe(first);
});

it.each([
  ["default", true, ["toolbar"]],
  ["default", false, ["toolbar", "nowrap"]],
  ["compact", true, ["toolbar", "compact"]],
  ["compact", false, ["toolbar", "compact", "nowrap"]],
] as const)(
  "supports density=%s and wrap=%s without leaking control props",
  (density, wrap, modules) => {
    const { container } = render(
      <Toolbar density={density} wrap={wrap} asChild={false}>
        <span>Actions</span>
      </Toolbar>,
    );
    const toolbar = container.firstElementChild!;
    expect(Array.from(toolbar.classList).sort()).toEqual([...modules].sort());
    expect(toolbar.textContent).toBe("Actions");
    expect(container.querySelector("[density], [wrap], [aschild]")).toBeNull();
  },
);

it("renders an explicit no-wrap mode on the server without a wrap attribute", () => {
  const html = renderToStaticMarkup(
    <Toolbar wrap={false}>
      <select aria-label="Event">
        <option value="a">A</option>
      </select>
    </Toolbar>,
  );
  expect(html).toContain("nowrap");
  expect(html).not.toMatch(/ wrap=/);
});

it("forwards native attributes, role, class, style, events and the div ref", () => {
  const ref = createRef<HTMLDivElement>();
  const clicks: EventTarget[] = [];
  const { unmount } = render(
    <Toolbar
      ref={ref}
      id="actions"
      role="toolbar"
      aria-label="Formatting"
      data-owner="editor"
      title="Actions"
      className="consumer"
      style={{ gap: 10, maxWidth: 480 }}
      onClick={(event) => clicks.push(event.currentTarget)}
    >
      <button type="button">Action</button>
    </Toolbar>,
  );
  const toolbar = ref.current!;
  expect(toolbar).toBeInstanceOf(HTMLDivElement);
  expect(toolbar).toBe(screen.getByRole("toolbar", { name: "Formatting" }));
  expect(toolbar.id).toBe("actions");
  expect(toolbar.dataset.owner).toBe("editor");
  expect(toolbar.title).toBe("Actions");
  expect(toolbar).toHaveClass("consumer");
  expect(toolbar.style.gap).toBe("10px");
  expect(toolbar.style.maxWidth).toBe("480px");
  act(() => screen.getByRole("button", { name: "Action" }).click());
  expect(clicks).toEqual([toolbar]);
  unmount();
  expect(ref.current).toBeNull();
});

it("slots into one child element and preserves child props, both refs and handlers", () => {
  const toolbarRef = createRef<HTMLDivElement>();
  const childRef = createRef<HTMLDivElement>();
  const clicks: string[] = [];
  const { container, unmount } = render(
    <Toolbar
      density="compact"
      wrap={false}
      asChild
      ref={toolbarRef}
      id="parent-id"
      role="group"
      aria-label="Parent label"
      className="parent-class"
      data-parent="kept"
      style={{ margin: 8, padding: 12 }}
      onClick={(event) => {
        expect(event.currentTarget).toBe(toolbarRef.current);
        clicks.push(`parent:${event.defaultPrevented}`);
      }}
    >
      <div
        ref={childRef}
        id="card-id"
        role="toolbar"
        aria-label="Formatting"
        className="child-class"
        data-child="kept"
        style={{ padding: 4 }}
        onClick={(event) => {
          clicks.push("child");
          event.preventDefault();
        }}
        onKeyDown={() => clicks.push("key")}
      >
        <button type="button">Bold</button>
        <Divider orientation="vertical" />
      </div>
    </Toolbar>,
  );
  const child = childRef.current!;
  expect(container.childElementCount).toBe(1);
  expect(child).toBe(container.firstElementChild);
  expect(toolbarRef.current).toBe(child);
  expect(child.children).toHaveLength(2);
  expect(child).toHaveClass(
    "toolbar",
    "compact",
    "nowrap",
    "parent-class",
    "child-class",
  );
  expect(child.id).toBe("card-id");
  expect(child.getAttribute("role")).toBe("toolbar");
  expect(child.getAttribute("aria-label")).toBe("Formatting");
  expect(child.dataset.parent).toBe("kept");
  expect(child.dataset.child).toBe("kept");
  expect(child.style.margin).toBe("8px");
  expect(child.style.padding).toBe("4px");
  expect(container.querySelector("[density], [wrap], [aschild]")).toBeNull();
  act(() => screen.getByRole("button", { name: "Bold" }).click());
  expect(clicks).toEqual(["child", "parent:true"]);
  unmount();
  expect(toolbarRef.current).toBeNull();
  expect(childRef.current).toBeNull();
});

it("slots an elevated Card into one element sharing classes and ref", () => {
  const toolbarRef = createRef<HTMLDivElement>();
  const { container } = render(
    <Toolbar asChild density="compact" ref={toolbarRef} className="parent">
      <Card variant="elevated">
        <button type="button">Bold</button>
        <Divider orientation="vertical" />
      </Card>
    </Toolbar>,
  );
  const card = container.firstElementChild as HTMLElement;
  expect(container.childElementCount).toBe(1);
  expect(toolbarRef.current).toBe(card);
  expect(card).toHaveClass("card", "elevated", "toolbar", "compact", "parent");
  expect(card.querySelector(".toolbar")).toBeNull();
  expect(card.querySelector('[aria-orientation="vertical"]')).not.toBeNull();
});

it("ships compact gap and direct-child vertical divider sizing", () => {
  expect(rule(".compact")).toContain("gap: var(--space-1);");
  const divider = rule(
    ".compact > [aria-orientation=vertical]:is(hr, [role=separator])",
  );
  expect(divider).toContain("height: var(--space-5);");
  expect(divider).toContain("align-self: center;");
  expect(divider).toContain("flex: 0 0 auto;");
});

it("retains the default toolbar, nowrap and input/select sizing contracts", () => {
  const toolbar = rule(".toolbar");
  for (const value of [
    "display: flex;",
    "align-items: center;",
    "flex-wrap: wrap;",
    "gap: var(--space-3);",
    "min-width: 0;",
    "max-width: 100%;",
  ]) {
    expect(toolbar).toContain(value);
  }
  expect(rule(".nowrap")).toContain("flex-wrap: nowrap;");
  expect(rule(".toolbar > [data-component=input]")).toContain(
    "flex: 1 1 16rem;",
  );
  expect(rule(".toolbar > [data-component=select]")).toContain(
    "flex: 0 1 12rem;",
  );
  expect(rule(".nowrap > [data-component=select]")).toContain("width: 12rem;");
});

it("matches direct Input / Select children through their data-component attribute", () => {
  const { container } = render(
    <Toolbar>
      <Input aria-label="Search" />
      <Select aria-label="Status">
        <SelectItem value="open">Open</SelectItem>
      </Select>
    </Toolbar>,
  );
  const toolbar = container.firstElementChild!;
  expect(
    toolbar.querySelector(':scope > [data-component="input"]'),
  ).toContainElement(screen.getByRole("textbox", { name: "Search" }));
  expect(toolbar.querySelector(':scope > [data-component="select"]')).toBe(
    screen.getByRole("combobox", { name: "Status" }),
  );
});

it("keeps a Tag directly inside a PageSection at its intrinsic width", () => {
  render(
    <PageSection title="Release">
      <Tag>Beta</Tag>
    </PageSection>,
  );
  const region = screen.getByRole("region", { name: "Release" });
  expect(
    region.querySelector(':scope > [data-component="tag"]'),
  ).toHaveTextContent("Beta");
  expect(rule(".section > [data-component=tag]")).toContain(
    "align-self: flex-start;",
  );
});
