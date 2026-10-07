import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Box, type BoxProps } from ".";

describe("Box", () => {
  it("renders a div by default and a custom element via as", () => {
    const { rerender } = render(<Box data-testid="box">x</Box>);
    expect(screen.getByTestId("box").tagName).toBe("DIV");
    rerender(
      <Box as="section" aria-label="Region" data-testid="box">
        x
      </Box>,
    );
    expect(screen.getByRole("region", { name: "Region" }).tagName).toBe(
      "SECTION",
    );
  });

  it("forwards ref, className and native attributes without leaking style props", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Box
        ref={ref}
        className="consumer"
        id="b"
        p={4}
        bg="bg.subtle"
        rounded="md"
        data-testid="box"
      >
        x
      </Box>,
    );
    const box = screen.getByTestId("box");
    expect(ref.current).toBe(box);
    expect(box).toHaveClass("consumer");
    expect(box).toHaveAttribute("id", "b");
    for (const attr of ["p", "bg", "rounded", "as"]) {
      expect(box).not.toHaveAttribute(attr);
    }
  });

  it("maps padding and margin shorthands to spacing tokens", () => {
    render(<Box data-testid="box" p={2} mx="auto" my="3" />);
    const { style } = screen.getByTestId("box");
    expect(style.padding).toBe("var(--space-2)");
    expect(style.marginLeft).toBe("auto");
    expect(style.marginRight).toBe("auto");
    expect(style.marginTop).toBe("var(--space-3)");
    expect(style.marginBottom).toBe("var(--space-3)");
  });

  it("converts numeric sizes to px and passes strings through", () => {
    render(
      <Box
        data-testid="box"
        w={120}
        h="50%"
        minW={0}
        minH="2rem"
        maxW={720}
        maxH="100vh"
      />,
    );
    const { style } = screen.getByTestId("box");
    expect(style.width).toBe("120px");
    expect(style.height).toBe("50%");
    expect(style.minWidth).toBe("0px");
    expect(style.minHeight).toBe("2rem");
    expect(style.maxWidth).toBe("720px");
    expect(style.maxHeight).toBe("100vh");
  });

  it("resolves semantic background, radius and shadow tokens", () => {
    render(
      <Box
        data-testid="box"
        bg="bg.muted"
        rounded="full"
        boxShadow="lg"
        border="1px solid red"
      />,
    );
    const { style } = screen.getByTestId("box");
    expect(style.background).toBe("var(--surface-muted-color)");
    expect(style.borderRadius).toBe("var(--radius-full)");
    expect(style.boxShadow).toBe("var(--shadow-lg)");
    expect(style.border).toBe("1px solid red");
  });

  it.each([
    ["bg", "var(--surface-color)"],
    ["bg.subtle", "var(--surface-subtle-color)"],
    ["bg.emphasis", "var(--surface-muted-color)"],
    ["bg.canvas", "var(--canvas-color)"],
    ["bg.elevated", "var(--surface-elevated-color)"],
  ])("maps the %s surface alias to %s", (bg, css) => {
    render(<Box data-testid="box" bg={bg} />);
    expect(screen.getByTestId("box").style.background).toBe(css);
  });

  it("passes raw CSS values for background, radius and shadow through", () => {
    render(<Box data-testid="box" bg="red" rounded="3px" boxShadow="none" />);
    const { style } = screen.getByTestId("box");
    expect(style.background).toBe("red");
    expect(style.borderRadius).toBe("3px");
    expect(style.boxShadow).toBe("none");
  });

  it("emits no inline style properties when no style props are given", () => {
    render(<Box data-testid="box" />);
    expect(screen.getByTestId("box").getAttribute("style") ?? "").toBe("");
  });

  it.each([
    ["p", ["padding"]],
    ["px", ["padding-left", "padding-right"]],
    ["py", ["padding-top", "padding-bottom"]],
    ["pt", ["padding-top"]],
    ["pr", ["padding-right"]],
    ["pb", ["padding-bottom"]],
    ["pl", ["padding-left"]],
    ["m", ["margin"]],
    ["mx", ["margin-left", "margin-right"]],
    ["my", ["margin-top", "margin-bottom"]],
    ["mt", ["margin-top"]],
    ["mr", ["margin-right"]],
    ["mb", ["margin-bottom"]],
    ["ml", ["margin-left"]],
  ] as const)("resolves the half-step token for %s", (prop, properties) => {
    for (const value of [0.5, "0.5"]) {
      const props: BoxProps = { [prop]: value };
      const { container, unmount } = render(<Box {...props} />);
      for (const property of properties) {
        expect(
          (container.firstElementChild as HTMLElement).style.getPropertyValue(
            property,
          ),
        ).toBe("var(--space-0-5)");
      }
      unmount();
    }
  });

  it("applies side over axis over shorthand, px dimensions and final style overrides", () => {
    const markup = renderToStaticMarkup(
      <Box
        p={4}
        px={2}
        pl={0.5}
        m={4}
        my={2}
        mt="0.5"
        w={0.5}
        style={{ paddingRight: "9px", marginBottom: "7px" }}
      />,
    );
    expect(markup).toContain(
      "padding:var(--space-4);padding-left:var(--space-0-5);padding-right:9px",
    );
    expect(markup).toContain(
      "margin:var(--space-4);margin-top:var(--space-0-5);margin-bottom:7px",
    );
    expect(markup).toContain("width:0.5px");
  });
});
