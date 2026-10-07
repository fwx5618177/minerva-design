import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import { HStack, Stack, VStack } from ".";

describe("Stack", () => {
  it("defaults to a column div without inline alignment", () => {
    render(<Stack data-testid="s">x</Stack>);
    const el = screen.getByTestId("s");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("stack", "column");
    expect(el).not.toHaveClass("wrap");
    expect(el.style.alignItems).toBe("");
    expect(el.style.justifyContent).toBe("");
    expect(el.style.gap).toBe("");
  });

  it.each(["row", "row-reverse", "column-reverse"] as const)(
    "applies direction %s as a class",
    (direction) => {
      render(<Stack data-testid="s" direction={direction} />);
      expect(screen.getByTestId("s")).toHaveClass(direction);
    },
  );

  it.each([
    ["start", "flex-start"],
    ["center", "center"],
    ["end", "flex-end"],
    ["stretch", "stretch"],
    ["baseline", "baseline"],
  ] as const)("maps align=%s to align-items %s", (align, css) => {
    render(<Stack data-testid="s" align={align} />);
    expect(screen.getByTestId("s").style.alignItems).toBe(css);
  });

  it.each([
    ["start", "flex-start"],
    ["center", "center"],
    ["end", "flex-end"],
    ["between", "space-between"],
    ["around", "space-around"],
    ["evenly", "space-evenly"],
  ] as const)("maps justify=%s to justify-content %s", (justify, css) => {
    render(<Stack data-testid="s" justify={justify} />);
    expect(screen.getByTestId("s").style.justifyContent).toBe(css);
  });

  it("adds the wrap class and renders as a custom element with ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Stack
        ref={ref}
        as="ul"
        wrap
        className="consumer"
        aria-label="Items"
        data-testid="s"
      >
        <li>a</li>
      </Stack>,
    );
    const el = screen.getByTestId("s");
    expect(el.tagName).toBe("UL");
    expect(ref.current).toBe(el);
    expect(el).toHaveClass("stack", "wrap", "consumer");
    expect(el).toHaveAttribute("aria-label", "Items");
    for (const attr of ["wrap", "direction", "as"]) {
      expect(el).not.toHaveAttribute(attr);
    }
  });

  it("ships the flex layout and shrink boundary in its stylesheet", () => {
    const { css } = compile(join(import.meta.dirname, "stack.module.scss"));
    expect(css).toMatch(/\.stack\s*\{[^}]*display:\s*flex;[^}]*min-width:\s*0/);
    expect(css).toMatch(/\.row\s*\{[^}]*flex-direction:\s*row;/);
    expect(css).toMatch(
      /\.column-reverse\s*\{[^}]*flex-direction:\s*column-reverse/,
    );
    expect(css).toMatch(/\.wrap\s*\{[^}]*flex-wrap:\s*wrap/);
  });
});

describe("HStack / VStack", () => {
  it("HStack is a row centered on the cross axis by default", () => {
    render(<HStack data-testid="h" />);
    const el = screen.getByTestId("h");
    expect(el).toHaveClass("row");
    expect(el.style.alignItems).toBe("center");
  });

  it("VStack is a column stretched on the cross axis by default", () => {
    render(<VStack data-testid="v" />);
    const el = screen.getByTestId("v");
    expect(el).toHaveClass("column");
    expect(el.style.alignItems).toBe("stretch");
  });

  it("lets consumers override the default alignment and forwards refs", () => {
    const hRef = createRef<HTMLElement>();
    const vRef = createRef<HTMLElement>();
    render(
      <>
        <HStack ref={hRef} align="start" data-testid="h" />
        <VStack ref={vRef} align="end" data-testid="v" />
      </>,
    );
    expect(screen.getByTestId("h").style.alignItems).toBe("flex-start");
    expect(screen.getByTestId("v").style.alignItems).toBe("flex-end");
    expect(hRef.current).toBe(screen.getByTestId("h"));
    expect(vRef.current).toBe(screen.getByTestId("v"));
  });

  it("keeps the default when align is explicitly undefined (regression)", () => {
    render(
      <>
        <HStack data-testid="h" align={undefined} />
        <VStack data-testid="v" align={undefined} />
      </>,
    );
    expect(screen.getByTestId("h").style.alignItems).toBe("center");
    expect(screen.getByTestId("v").style.alignItems).toBe("stretch");
  });

  it("covers the app usage: gap token, justify, className and wrap", () => {
    render(
      <HStack
        gap="2"
        justify="between"
        className="actions"
        wrap
        data-testid="h"
      >
        <button type="button">Save</button>
      </HStack>,
    );
    const el = screen.getByTestId("h");
    expect(el.style.gap).toBe("var(--space-2)");
    expect(el.style.justifyContent).toBe("space-between");
    expect(el).toHaveClass("actions", "wrap");
  });
});
