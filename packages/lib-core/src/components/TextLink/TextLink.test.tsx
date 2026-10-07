// Ported from @novel-isr/ui src/components/TextLink/__test__/TextLink.test.tsx
// and the TextLink parts of src/components/__test__/ReadingPrimitives.test.tsx
import { createRef, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TextLink from "./TextLink";

describe("TextLink", () => {
  it("renders a native anchor with the default variant", () => {
    render(<TextLink href="/books">Books</TextLink>);
    const link = screen.getByRole("link", { name: "Books" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/books");
    expect(link).toHaveClass(
      "textLink",
      "default",
      "ui-text-link",
      "ui-text-link-default",
    );
    expect(link.querySelector("svg")).toBeNull();
  });

  it.each(["subtle", "action"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(
        <TextLink href="#" variant={variant}>
          Go
        </TextLink>,
      );
      expect(screen.getByRole("link", { name: "Go" })).toHaveClass(
        variant,
        `ui-text-link-${variant}`,
      );
    },
  );

  it("appends a decorative chevron only for the subtle variant", () => {
    const { rerender } = render(
      <TextLink href="#" variant="subtle">
        More
      </TextLink>,
    );
    const icon = screen
      .getByRole("link", { name: "More" })
      .querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
    rerender(
      <TextLink href="#" variant="action">
        More
      </TextLink>,
    );
    expect(
      screen.getByRole("link", { name: "More" }).querySelector("svg"),
    ).toBeNull();
  });

  it("forwards ref, className, native attributes and click handlers", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLAnchorElement>();
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(
      <TextLink
        ref={ref}
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        className="consumer"
        onClick={onClick}
      >
        External
      </TextLink>,
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(ref.current).toBe(link);
    expect(link).toHaveClass("ui-text-link", "consumer");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
    await user.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("slots onto a child element with asChild instead of nesting anchors", () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = render(
      <TextLink asChild variant="subtle" ref={ref} className="consumer">
        <a href="/route" data-router="yes">
          Routed
        </a>
      </TextLink>,
    );
    expect(container.querySelectorAll("a")).toHaveLength(1);
    const link = screen.getByRole("link", { name: "Routed" });
    expect(ref.current).toBe(link);
    expect(link).toHaveClass("ui-text-link", "ui-text-link-subtle", "consumer");
    expect(link).toHaveAttribute("data-router", "yes");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(link.textContent).toBe("Routed");
  });

  it("styles a routed anchor (action) without nesting interactive elements or losing its ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = render(
      <TextLink asChild variant="action" ref={ref}>
        <a href="/settings" className="router-link">
          Settings
        </a>
      </TextLink>,
    );
    const link = container.querySelector("a")!;
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(link.getAttribute("href")).toBe("/settings");
    expect(link).toHaveClass("ui-text-link", "router-link");
    expect(link.querySelector("button, a")).toBeNull();
    expect(ref.current).toBe(link);
  });
});
