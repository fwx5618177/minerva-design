// Ported from @novel-isr/ui src/components/Avatar/__test__/Avatar.test.tsx
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

describe("Avatar (merged capabilities)", () => {
  it("renders an image with alt text and the default styling hooks", () => {
    const { container } = render(<Avatar src="/a.png" alt="Alice" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("ui-avatar", "ui-avatar-size-md");
    expect(root).not.toHaveClass("ui-avatar-shape-square");
    const img = screen.getByRole("img", { name: "Alice" });
    expect(img).toHaveAttribute("src", "/a.png");
    expect(img).toHaveClass("ui-avatar-img");
  });

  it("falls back to name for alt text and supports an explicit decorative alt", () => {
    const { rerender, container } = render(
      <Avatar src="/a.png" name="Bob Smith" />,
    );
    expect(screen.getByRole("img", { name: "Bob Smith" })).toBeInTheDocument();
    rerender(<Avatar src="/a.png" alt="" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("switches to initials when the image fails to load", () => {
    render(<Avatar src="/broken.png" name="jane doe" />);
    fireEvent.error(screen.getByRole("img", { name: "jane doe" }));
    const fallback = screen.getByRole("img", { name: "jane doe" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("JD");
  });

  it.each([
    ["Ada Lovelace Byron", "AL"],
    ["  grace   hopper  ", "GH"],
    ["linus", "L"],
    ["张三", "张"],
  ])("derives initials from %j as %s", (name, expected) => {
    render(<Avatar name={name} />);
    const fallback = screen.getByText(expected);
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveAttribute("aria-hidden", "true");
  });

  it("prefers a custom fallback over initials", () => {
    render(
      <Avatar name="Jane Doe" fallback={<span data-testid="fb">*</span>} />,
    );
    expect(screen.getByTestId("fb")).toBeInTheDocument();
    expect(screen.queryByText("JD")).toBeNull();
  });

  it("falls back to children when there is no name", () => {
    const { container } = render(<Avatar>AB</Avatar>);
    expect(container).toHaveTextContent("AB");
    expect(screen.getByRole("img", { name: "avatar" })).toBeInTheDocument();
  });

  it("applies sizes and the square hook, forwards ref and native attributes", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Avatar
        ref={ref}
        name="X"
        size="xxlarge"
        shape="rounded"
        className="c"
        data-testid="av"
        title="X user"
      />,
    );
    const root = screen.getByTestId("av");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass(
      "ui-avatar-size-2xl",
      "xxlarge",
      "ui-avatar-shape-square",
      "c",
    );
    expect(root).toHaveAttribute("title", "X user");
    expect(root).not.toHaveAttribute("name");
  });

  it.each([
    ["xsmall", "xs"],
    ["small", "sm"],
    ["large", "lg"],
    ["xlarge", "xl"],
  ] as const)("maps size %s to ui-avatar-size-%s", (size, hook) => {
    render(<Avatar name="S" size={size} />);
    expect(screen.getByRole("img")).toHaveClass(`ui-avatar-size-${hook}`);
  });

  it("accepts a size in pixels", () => {
    render(<Avatar name="P" size={40} style={{ color: "red" }} />);
    const root = screen.getByRole("img", { name: "P" });
    expect(root).toHaveStyle({ width: "40px", height: "40px", color: "red" });
    expect(root.style.getPropertyValue("--avatar-size")).toBe("40px");
    expect(root.className).not.toMatch(/ui-avatar-size-/);
  });

  it("retries the image when src changes after a load error", () => {
    const { rerender, container } = render(
      <Avatar src="/broken.png" name="Ada Lovelace" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    expect(container).toHaveTextContent("AL");
    rerender(<Avatar src="/fixed.png" name="Ada Lovelace" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/fixed.png");
  });
});

describe("AvatarGroup (merged capabilities)", () => {
  it("renders all children when max is not set", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
      </AvatarGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(group).toHaveClass("ui-avatar-group");
    expect(group.querySelectorAll(".ui-avatar")).toHaveLength(3);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it("limits visible avatars to max and shows a +N overflow indicator", () => {
    const { container } = render(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>,
    );
    const avatars = container.querySelectorAll(".ui-avatar");
    expect(avatars).toHaveLength(3);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).toBeNull();
    expect(avatars[2]).toHaveTextContent("+2");
    expect(
      screen.getByRole("group", { name: "Avatar group with 2 more" }),
    ).toBeInTheDocument();
  });

  it("adds count to the avatars hidden by max", () => {
    render(
      <AvatarGroup max={1} count={3}>
        <Avatar name="A" />
        <Avatar name="B" />
      </AvatarGroup>,
    );
    expect(screen.getByText("+4")).toBeInTheDocument();
  });

  it("ignores falsy children when counting, handles a single child, and forwards ref and attributes", () => {
    const ref = createRef<HTMLDivElement>();
    const show = false;
    const { container, rerender } = render(
      <AvatarGroup ref={ref} max={2} data-testid="g">
        <Avatar name="A" />
        {show && <Avatar name="Hidden" />}
        <Avatar name="B" />
      </AvatarGroup>,
    );
    expect(ref.current).toBe(screen.getByTestId("g"));
    expect(container.querySelectorAll(".ui-avatar")).toHaveLength(2);
    expect(screen.queryByText(/^\+/)).toBeNull();

    rerender(
      <AvatarGroup max={1}>
        <Avatar name="Solo" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll(".ui-avatar")).toHaveLength(1);
    expect(screen.getByText("S")).toBeInTheDocument();
  });
});
