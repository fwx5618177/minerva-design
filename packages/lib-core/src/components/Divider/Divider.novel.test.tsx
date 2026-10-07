// Ported from @novel-isr/ui src/components/Divider/__test__/Divider.test.tsx
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Divider from "./Divider";

describe("Divider (native <hr> and ui-* hooks)", () => {
  it("renders a horizontal <hr> exposed as an implicit separator", () => {
    render(<Divider />);
    const sep = screen.getByRole("separator");
    expect(sep.tagName).toBe("HR");
    expect(sep).not.toHaveAttribute("role");
    expect(sep).toHaveAttribute("aria-orientation", "horizontal");
    expect(sep).toHaveClass("ui-divider", "ui-divider-horizontal");
  });

  it("renders a vertical separator", () => {
    render(<Divider orientation="vertical" className="x" />);
    const sep = screen.getByRole("separator");
    expect(sep.tagName).toBe("HR");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep).toHaveClass("ui-divider-vertical", "x");
  });

  it("renders a labelled horizontal divider as a div with role=separator", () => {
    render(<Divider className="y">OR</Divider>);
    const sep = screen.getByRole("separator");
    expect(sep.tagName).toBe("DIV");
    expect(sep).toHaveAttribute("role", "separator");
    expect(sep).toHaveTextContent("OR");
    expect(sep).toHaveClass("ui-divider-with-label", "y");
    expect(sep).not.toHaveClass("ui-divider");
  });

  it("ignores children for vertical orientation and renders a plain <hr>", () => {
    render(<Divider orientation="vertical">OR</Divider>);
    const sep = screen.getByRole("separator");
    expect(sep.tagName).toBe("HR");
    expect(sep).toBeEmptyDOMElement();
    expect(screen.queryByText("OR")).toBeNull();
  });

  it("forwards refs and native attributes for both render paths", () => {
    const hrRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLDivElement>();
    render(
      <>
        <Divider ref={hrRef} id="plain" data-k="1" />
        <Divider ref={labelRef} id="labelled" aria-label="Section break">
          More
        </Divider>
      </>,
    );
    expect(hrRef.current?.tagName).toBe("HR");
    expect(hrRef.current).toHaveAttribute("id", "plain");
    expect(hrRef.current).toHaveAttribute("data-k", "1");
    expect(labelRef.current?.tagName).toBe("DIV");
    expect(screen.getByRole("separator", { name: "Section break" })).toBe(
      labelRef.current,
    );
  });

  it("stretches a vertical divider inside a flex container with flexItem", () => {
    render(<Divider orientation="vertical" flexItem spacing={0} />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveClass("vertical", "flexItem");
    expect(sep.style.marginLeft).toBe("0px");
  });
});
