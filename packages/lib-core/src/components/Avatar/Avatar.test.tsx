import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders the uppercased initial of the name when no src is given", () => {
    render(<Avatar name="alice" />);
    const avatar = screen.getByLabelText("alice");
    expect(avatar).toHaveTextContent("A");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders an image with the name as alt text when src is given", () => {
    render(<Avatar name="Bob" src="https://example.com/bob.png" />);
    const img = screen.getByRole("img", { name: "Bob" });
    expect(img).toHaveAttribute("src", "https://example.com/bob.png");
    expect(img).toHaveAttribute("draggable", "false");
    expect(img).toHaveClass("avatarImg");
    expect(screen.getByLabelText("Bob")).not.toHaveTextContent("B");
  });

  it("falls back to a generic label without a name", () => {
    const { rerender } = render(<Avatar />);
    expect(screen.getByLabelText("avatar")).toHaveTextContent("");

    rerender(<Avatar src="https://example.com/x.png" />);
    expect(screen.getByRole("img", { name: "avatar" })).toBeInTheDocument();
  });

  it("applies default shape and size classes", () => {
    render(<Avatar name="Carol" />);
    const avatar = screen.getByLabelText("Carol");
    expect(avatar).toHaveClass("avatar", "circle", "medium");
    expect(avatar).not.toHaveClass("stacked");
  });

  it.each([
    ["square", "small"],
    ["rounded", "large"],
  ] as const)("applies shape %s and size %s", (shape, size) => {
    render(<Avatar name="Dan" shape={shape} size={size} />);
    expect(screen.getByLabelText("Dan")).toHaveClass(shape, size);
  });

  it("applies the stacked and custom classes", () => {
    render(<Avatar name="Eve" stacked className="custom" />);
    expect(screen.getByLabelText("Eve")).toHaveClass("stacked", "custom");
  });

  it("is not a tab stop (non-interactive)", async () => {
    const user = userEvent.setup();
    render(<Avatar name="Frank" />);
    await user.tab();
    expect(screen.getByLabelText("Frank")).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });
});
