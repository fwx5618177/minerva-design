import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders a status badge with default classes", () => {
    render(<Badge content={5} ariaLabel="5 notifications" />);
    const badge = screen.getByRole("status", { name: "5 notifications" });
    expect(badge).toHaveTextContent("5");
    expect(badge).toHaveClass("badge", "primary", "medium", "top-right");
    expect(badge).not.toHaveClass("dot");
  });

  it("renders a zero count", () => {
    render(<Badge content={0} />);
    expect(screen.getByRole("status")).toHaveTextContent("0");
  });

  it("renders text children as both wrapped content and badge text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByRole("status")).toHaveTextContent("New");
    expect(screen.getByText("New", { selector: "div" })).toHaveClass("content");
  });

  it("wraps element children and shows content on the badge", () => {
    render(
      <Badge content={3}>
        <button type="button">Inbox</button>
      </Badge>,
    );
    const button = screen.getByRole("button", { name: "Inbox" });
    expect(button.parentElement).toHaveClass("content");
    expect(screen.getByRole("status")).toHaveTextContent("3");
  });

  it("falls back to a default label for element children without content", () => {
    render(
      <Badge>
        <span>Icon</span>
      </Badge>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Badge");
  });

  it("renders as an empty dot when dot is set", () => {
    render(<Badge dot content={9} />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveClass("dot");
    expect(badge).toBeEmptyDOMElement();
  });

  it.each([
    ["success", "small", "bottom-left"],
    ["danger", "large", "top-left"],
    ["dark", "medium", "bottom-right"],
  ] as const)(
    "applies variant %s, size %s and position %s",
    (variant, size, position) => {
      render(
        <Badge
          content="x"
          variant={variant}
          size={size}
          position={position}
          className="custom"
        />,
      );
      expect(screen.getByRole("status")).toHaveClass(
        variant,
        size,
        position,
        "custom",
      );
    },
  );

  it("renders an icon before the content", () => {
    render(<Badge content="Pro" icon={<svg data-testid="star" />} />);
    const icon = screen.getByTestId("star");
    expect(icon.parentElement).toHaveClass("icon");
    expect(screen.getByRole("status")).toHaveTextContent("Pro");
  });

  it("applies custom colors and borders", () => {
    render(
      <Badge
        content="1"
        bgColor="rgb(1, 2, 3)"
        textColor="rgb(4, 5, 6)"
        borderRadius="2px"
        borderWidth="3px"
        borderColor="rgb(7, 8, 9)"
      />,
    );
    const badge = screen.getByRole("status");
    expect(badge.style.backgroundColor).toBe("rgb(1, 2, 3)");
    expect(badge.style.color).toBe("rgb(4, 5, 6)");
    expect(badge.style.borderRadius).toBe("2px");
    expect(badge.style.borderWidth).toBe("3px");
    expect(badge.style.borderColor).toBe("rgb(7, 8, 9)");
  });

  it("is not a tab stop (non-interactive)", async () => {
    const user = userEvent.setup();
    render(<Badge content={1} ariaLabel="One" />);
    await user.tab();
    expect(screen.getByRole("status", { name: "One" })).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });
});
