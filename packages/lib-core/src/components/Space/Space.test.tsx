import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Space from "./Space";

const getItems = (group: HTMLElement) =>
  Array.from(group.querySelectorAll<HTMLElement>(":scope > .item"));

describe("Space", () => {
  it("renders a horizontal group with each child wrapped", () => {
    render(
      <Space>
        <span>A</span>
        <span>B</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    // aria-orientation is not a supported attribute of role="group"
    expect(group).not.toHaveAttribute("aria-orientation");
    expect(group).toHaveClass("space", "horizontal");
    const items = getItems(group);
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("A");
    expect(items[1]).toHaveTextContent("B");
  });

  it("skips null, undefined and boolean children", () => {
    render(
      <Space>
        <span>A</span>
        {null}
        {undefined}
        {false}
        <span>B</span>
      </Space>,
    );
    expect(getItems(screen.getByRole("group"))).toHaveLength(2);
  });

  it("uses medium (16px) right margin by default", () => {
    render(
      <Space>
        <span>A</span>
      </Space>,
    );
    const [item] = getItems(screen.getByRole("group"));
    expect(item.style.marginRight).toBe("16px");
    expect(item.style.marginBottom).toBe("0px");
  });

  it.each([
    ["small", "8px"],
    ["large", "24px"],
  ] as const)("maps size %s to %s", (size, px) => {
    render(
      <Space size={size}>
        <span>A</span>
      </Space>,
    );
    expect(getItems(screen.getByRole("group"))[0].style.marginRight).toBe(px);
  });

  it("accepts a numeric size", () => {
    render(
      <Space size={5}>
        <span>A</span>
      </Space>,
    );
    expect(getItems(screen.getByRole("group"))[0].style.marginRight).toBe(
      "5px",
    );
  });

  it("halves the preset gap in compact mode", () => {
    render(
      <Space compact size="large">
        <span>A</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass("compact");
    expect(getItems(group)[0].style.marginRight).toBe("12px");
  });

  it("renders vertically with bottom margins", () => {
    render(
      <Space direction="vertical">
        <span>A</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass("vertical");
    expect(group).toHaveClass("vertical");
    expect(group).not.toHaveClass("horizontal");
    const [item] = getItems(group);
    expect(item.style.marginRight).toBe("0px");
    expect(item.style.marginBottom).toBe("16px");
  });

  it("adds bottom margin when wrapping", () => {
    render(
      <Space wrap>
        <span>A</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass("wrap");
    expect(getItems(group)[0].style.marginBottom).toBe("16px");
  });

  it("applies align, justify, block and custom className/style", () => {
    render(
      <Space
        align="center"
        justify="space-between"
        block
        className="mine"
        style={{ padding: "2px" }}
      >
        <span>A</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "align-center",
      "justify-space-between",
      "block",
      "mine",
    );
    expect(group.style.padding).toBe("2px");
  });

  it("renders split between items but not after the last", () => {
    render(
      <Space split={<span data-testid="sep">|</span>}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Space>,
    );
    const group = screen.getByRole("group");
    expect(screen.getAllByTestId("sep")).toHaveLength(2);
    expect(group.lastElementChild).toHaveClass("item");
    expect(group.lastElementChild).toHaveTextContent("C");
  });

  it("renders an empty group with no children", () => {
    render(<Space />);
    expect(screen.getByRole("group")).toBeEmptyDOMElement();
  });

  it("keeps children state when a preceding child is conditionally removed", async () => {
    const user = userEvent.setup();
    const Form = ({ showLabel }: { showLabel: boolean }) => (
      <Space>
        {showLabel && <span>Label</span>}
        <input aria-label="Name" />
      </Space>
    );
    const { rerender } = render(<Form showLabel />);
    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada");
    rerender(<Form showLabel={false} />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
  });

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Space ref={ref}>A</Space>);
    expect(ref.current).toBe(screen.getByRole("group"));
  });
});
