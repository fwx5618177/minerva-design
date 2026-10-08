import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders the uppercased initial of the name when no src is given", () => {
    const { container } = render(<Avatar name="alice" />);
    const avatar = screen.getByLabelText("alice");
    expect(avatar).toHaveTextContent("A");
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("renders an image with the name as alt text when src is given", () => {
    render(<Avatar name="Bob" src="https://example.com/bob.png" />);
    const img = screen.getByRole("img", { name: "Bob" });
    expect(img).toHaveAttribute("src", "https://example.com/bob.png");
    expect(img).toHaveAttribute("draggable", "false");
    expect(img).toHaveClass("avatarImg");
    expect(img.parentElement).not.toHaveTextContent("B");
    // Only the <img> carries the name: no duplicate label on the wrapper
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(img.parentElement).not.toHaveAttribute("aria-label");
  });

  it("exposes initials as an image named after the person", () => {
    render(<Avatar name="alice" />);
    const avatar = screen.getByRole("img", { name: "alice" });
    expect(avatar).toHaveTextContent("A");
    expect(avatar.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("falls back to the initial when the image fails to load and retries a new src", () => {
    const { rerender } = render(
      <Avatar name="Bob" src="https://example.com/broken.png" />,
    );
    fireEvent.error(screen.getByRole("img", { name: "Bob" }));
    const fallback = screen.getByRole("img", { name: "Bob" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("B");

    rerender(<Avatar name="Bob" src="https://example.com/ok.png" />);
    expect(screen.getByRole("img", { name: "Bob" })).toHaveAttribute(
      "src",
      "https://example.com/ok.png",
    );
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Avatar name="Ref" ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass("avatar");
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
