import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Stack separator", () => {
  it("renders the separator between items but not before the first or after the last", () => {
    render(
      <HStack separator={<span data-testid="sep">|</span>} data-testid="s">
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </HStack>,
    );
    const el = screen.getByTestId("s");
    expect(screen.getAllByTestId("sep")).toHaveLength(2);
    expect(el.firstElementChild).toHaveTextContent("A");
    expect(el.lastElementChild).toHaveTextContent("C");
    expect(el.textContent).toBe("A|B|C");
    // No wrapper elements: separators and items are direct flex children
    expect(el.children).toHaveLength(5);
  });

  it("skips null, undefined and boolean children", () => {
    render(
      <Stack separator="·" data-testid="s">
        <span>A</span>
        {null}
        {undefined}
        {false}
        {true}
        <span>B</span>
      </Stack>,
    );
    expect(screen.getByTestId("s").textContent).toBe("A·B");
  });

  it("renders nothing extra for a single child or no children", () => {
    const { rerender } = render(
      <Stack separator="·" data-testid="s">
        <span>A</span>
      </Stack>,
    );
    expect(screen.getByTestId("s").textContent).toBe("A");
    rerender(<Stack separator="·" data-testid="s" />);
    expect(screen.getByTestId("s")).toBeEmptyDOMElement();
  });

  it("keeps children state when a preceding child is conditionally removed", async () => {
    const user = userEvent.setup();
    const Form = ({ showLabel }: { showLabel: boolean }) => (
      <HStack separator="/">
        {showLabel && <span>Label</span>}
        <input aria-label="Name" />
      </HStack>
    );
    const { rerender } = render(<Form showLabel />);
    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada");
    rerender(<Form showLabel={false} />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
  });
});

describe("Stack attached", () => {
  it("renders a labelled group without gap, even when gap is set", () => {
    render(
      <HStack attached gap={4} aria-label="Text alignment">
        <button type="button">Left</button>
        <button type="button">Right</button>
      </HStack>,
    );
    const group = screen.getByRole("group", { name: "Text alignment" });
    expect(group).toHaveClass("stack", "row", "attached");
    expect(group.style.gap).toBe("");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("lets consumers override the group role", () => {
    render(
      <Stack attached role="toolbar" aria-label="Formatting">
        <button type="button">Bold</button>
      </Stack>,
    );
    expect(
      screen.getByRole("toolbar", { name: "Formatting" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("group")).toBeNull();
  });

  it("is not a group when not attached", () => {
    render(<Stack data-testid="s" />);
    expect(screen.getByTestId("s")).not.toHaveAttribute("role");
  });

  it("ships shared borders and outer-only radii in its stylesheet", () => {
    const { css } = compile(join(import.meta.dirname, "stack.module.scss"));
    expect(css).toMatch(/\.attached\s*\{[^}]*gap:\s*0/);
    expect(css).toMatch(
      /\.attached\.row > \* \+ \*\s*\{[^}]*margin-inline-start:\s*-1px/,
    );
    expect(css).toMatch(
      /\.attached\.row > \*:not\(:first-child\)[^{]*\{[^}]*border-start-start-radius:\s*0/,
    );
    expect(css).toMatch(
      /\.attached\.column > \*:not\(:last-child\)[^{]*\{[^}]*border-end-start-radius:\s*0/,
    );
  });
});
