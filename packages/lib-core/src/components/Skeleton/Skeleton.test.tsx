import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import i18n from "../../config/i18n";
import Skeleton from "./Skeleton";

const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe("Skeleton", () => {
  it("renders a single pulsing text line by default", () => {
    const { container } = render(<Skeleton />);
    const root = getRoot(container);
    expect(root).toHaveClass("skeletonRoot");
    expect(root).not.toHaveClass("withAvatar");
    const lines = container.querySelectorAll(".content > .skeleton");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveClass("text", "animation-pulse");
  });

  it("renders children instead of placeholders when not loading", () => {
    const { container } = render(
      <Skeleton loading={false}>
        <p>Loaded content</p>
      </Skeleton>,
    );
    expect(screen.getByText("Loaded content")).toBeInTheDocument();
    expect(container.querySelector(".skeleton")).not.toBeInTheDocument();
  });

  it("does not render children while loading", () => {
    render(
      <Skeleton>
        <p>Loaded content</p>
      </Skeleton>,
    );
    expect(screen.queryByText("Loaded content")).not.toBeInTheDocument();
  });

  it("renders the requested number of lines", () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.querySelectorAll(".content > .skeleton")).toHaveLength(3);
  });

  it.each(["circular", "rectangular", "rounded", "button", "image"] as const)(
    "applies the %s variant class",
    (variant) => {
      const { container } = render(<Skeleton variant={variant} />);
      expect(container.querySelector(".content > .skeleton")).toHaveClass(
        variant,
      );
    },
  );

  it("applies the wave animation class", () => {
    const { container } = render(<Skeleton animation="wave" />);
    expect(container.querySelector(".skeleton")).toHaveClass("animation-wave");
  });

  it("does not apply an animation class when animation is 'false'", () => {
    const { container } = render(<Skeleton animation="false" />);
    const line = container.querySelector(".skeleton");
    expect(line).not.toHaveClass("animation-pulse");
    expect(line).not.toHaveClass("animation-wave");
  });

  it("converts numeric dimensions to px and passes strings through", () => {
    const { container } = render(
      <Skeleton width={120} height="2rem" borderRadius="8px" />,
    );
    const line = container.querySelector(".skeleton") as HTMLElement;
    expect(line.style.width).toBe("120px");
    expect(line.style.height).toBe("2rem");
    expect(line.style.borderRadius).toBe("8px");
  });

  it("merges custom style onto lines and className onto the root", () => {
    const { container } = render(
      <Skeleton className="custom" style={{ opacity: 0.4 }} />,
    );
    expect(getRoot(container)).toHaveClass("custom");
    expect(
      (container.querySelector(".skeleton") as HTMLElement).style.opacity,
    ).toBe("0.4");
  });

  it("renders a circular avatar with the default size", () => {
    const { container } = render(<Skeleton avatar />);
    expect(getRoot(container)).toHaveClass("withAvatar");
    const avatar = container.querySelector(".avatar") as HTMLElement;
    expect(avatar).toHaveClass("skeleton", "avatar-circle", "animation-pulse");
    expect(avatar.style.width).toBe("40px");
    expect(avatar.style.height).toBe("40px");
  });

  it("renders a square avatar with a custom size", () => {
    const { container } = render(
      <Skeleton avatar avatarShape="square" avatarSize="3rem" />,
    );
    const avatar = container.querySelector(".avatar") as HTMLElement;
    expect(avatar).toHaveClass("avatar-square");
    expect(avatar.style.width).toBe("3rem");
    expect(avatar.style.height).toBe("3rem");
  });

  it("renders title and paragraph instead of lines", () => {
    const { container } = render(<Skeleton title paragraph lines={3} />);
    expect(container.querySelector(".title")).toBeInTheDocument();
    const paragraphLines = container.querySelectorAll(".paragraph > .skeleton");
    expect(paragraphLines).toHaveLength(4);
    expect((paragraphLines[2] as HTMLElement).style.width).toBe("92%");
    expect((paragraphLines[3] as HTMLElement).style.width).toBe("60%");
    expect(
      container.querySelectorAll(".content > .skeleton.text"),
    ).toHaveLength(0);
  });

  it("renders the card layout with avatar, title, paragraph and active state", () => {
    const { container } = render(
      <Skeleton variant="card" avatar title paragraph active />,
    );
    const card = container.querySelector(".card");
    expect(card).toHaveClass("active");
    expect(card?.querySelector(".avatar")).toBeInTheDocument();
    expect(card?.querySelector(".cardContent .title")).toBeInTheDocument();
    expect(card?.querySelector(".cardContent .paragraph")).toBeInTheDocument();
    expect(container.querySelector(".content")).not.toBeInTheDocument();
  });

  it("does not apply active class to the card when inactive", () => {
    const { container } = render(<Skeleton variant="card" title />);
    expect(container.querySelector(".card")).not.toHaveClass("active");
  });

  it("applies the rectangular variant class and lets dimensions override it", () => {
    const { container } = render(
      <Skeleton variant="rectangular" width={200} height={80} />,
    );
    const block = container.querySelector(
      ".content > .skeleton",
    ) as HTMLElement;
    expect(block).toHaveClass("skeleton", "rectangular", "animation-pulse");
    expect(block.className).not.toMatch(/undefined/);
    expect(block.style.width).toBe("200px");
    expect(block.style.height).toBe("80px");
  });

  it("exposes the placeholder as a busy, labelled status region", () => {
    const { rerender } = render(<Skeleton />);
    const status = screen.getByRole("status", { name: "Loading" });
    expect(status).toHaveAttribute("aria-busy", "true");
    rerender(<Skeleton ariaLabel="Loading profile" />);
    expect(
      screen.getByRole("status", { name: "Loading profile" }),
    ).toBeInTheDocument();
  });

  it("does not crash on invalid line counts", () => {
    const { container } = render(<Skeleton lines={-1} />);
    expect(container.querySelectorAll(".content > .skeleton")).toHaveLength(0);
  });

  it("forwards ref to the root element while loading", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("status"));
  });
});

describe("Skeleton localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the default label and lets ariaLabel win", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { rerender } = render(<Skeleton />);
    expect(screen.getByRole("status", { name: "加载中" })).toBeInTheDocument();

    rerender(<Skeleton ariaLabel="Loading profile" />);
    expect(
      screen.getByRole("status", { name: "Loading profile" }),
    ).toBeInTheDocument();
  });
});
