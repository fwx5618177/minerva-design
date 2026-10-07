import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import Divider from "./Divider";

const renderDivider = (ui: ReactElement) => {
  const { container } = render(ui);
  return container.firstElementChild as HTMLElement;
};

describe("Divider", () => {
  it("renders a solid horizontal divider by default", () => {
    const divider = renderDivider(<Divider />);
    expect(divider).toHaveClass("divider", "solid", "horizontal");
    expect(divider).not.toHaveClass("withText", "elevation");
    expect(divider).toBeEmptyDOMElement();
    expect(divider).toHaveStyle({
      borderWidth: "1px",
      marginTop: "16px",
      marginBottom: "16px",
    });
  });

  it.each(["solid", "dashed", "dotted"] as const)(
    "applies the %s variant class",
    (variant) => {
      expect(renderDivider(<Divider variant={variant} />)).toHaveClass(variant);
    },
  );

  it("renders vertically with horizontal spacing and length as height", () => {
    const divider = renderDivider(
      <Divider orientation="vertical" length={40} spacing={8} />,
    );
    expect(divider).toHaveClass("vertical");
    expect(divider).not.toHaveClass("horizontal");
    expect(divider).toHaveStyle({
      height: "40px",
      marginLeft: "8px",
      marginRight: "8px",
    });
    expect(divider.style.marginTop).toBe("0px");
    expect(divider.style.width).toBe("");
  });

  it("uses length as width for horizontal dividers", () => {
    const divider = renderDivider(<Divider length="50%" />);
    expect(divider.style.width).toBe("50%");
    expect(divider.style.height).toBe("");
  });

  it("applies color and thickness", () => {
    const divider = renderDivider(<Divider color="red" thickness={3} />);
    expect(divider.style.borderColor).toBe("red");
    expect(divider.style.borderWidth).toBe("3px");
  });

  it("does not set margins when spacing is 0", () => {
    const divider = renderDivider(<Divider spacing={0} />);
    expect(divider.style.marginTop).toBe("");
    expect(divider.style.marginBottom).toBe("");
  });

  it("renders text content centered by default", () => {
    const divider = renderDivider(<Divider>Section</Divider>);
    expect(divider).toHaveClass("withText", "textCenter");
    const text = screen.getByText("Section");
    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveClass("text");
  });

  it.each([
    ["left", "textLeft"],
    ["right", "textRight"],
  ] as const)("applies text alignment %s", (textAlign, cls) => {
    const divider = renderDivider(
      <Divider textAlign={textAlign}>Label</Divider>,
    );
    expect(divider).toHaveClass(cls);
  });

  it("applies elevation and custom className", () => {
    const divider = renderDivider(<Divider elevation className="custom" />);
    expect(divider).toHaveClass("elevation", "custom");
  });

  it("merges custom style while computed props take precedence", () => {
    const divider = renderDivider(
      <Divider color="blue" style={{ opacity: 0.5, borderColor: "green" }} />,
    );
    expect(divider.style.opacity).toBe("0.5");
    expect(divider.style.borderColor).toBe("blue");
  });

  it("exposes a horizontal separator role by default", () => {
    render(<Divider />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("sets aria-orientation to vertical for vertical dividers", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("keeps the separator role when rendering text", () => {
    render(<Divider>Section</Divider>);
    expect(screen.getByRole("separator")).toContainElement(
      screen.getByText("Section"),
    );
  });
});
