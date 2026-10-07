// Ported from @novel-isr/ui src/components/Skeleton/__test__/Skeleton.test.tsx
import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skeleton from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

describe("Skeleton decorative", () => {
  it("renders a decorative text skeleton with animation by default", () => {
    const { container } = render(<Skeleton decorative />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).not.toHaveAttribute("role");
    expect(el).toHaveClass(
      "skeleton",
      "decorative",
      "text",
      "animation-pulse",
      "ui-skeleton",
      "ui-skeleton-variant-text",
    );
    expect(el).not.toHaveClass("ui-skeleton-static");
    expect(el.style.width).toBe("");
    expect(el.style.height).toBe("");
  });

  it("converts numeric width/height to px and passes strings through", () => {
    const { container, rerender } = render(
      <Skeleton decorative variant="rectangular" width={120} height="12rem" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveClass("rectangular", "ui-skeleton-variant-rect");
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("12rem");

    rerender(<Skeleton decorative width="100%" height={0} />);
    expect(el.style.width).toBe("100%");
    expect(el.style.height).toBe("0px");
  });

  it("sizes circles from size, then width, then a 32px default (ignoring height)", () => {
    const { container, rerender } = render(
      <Skeleton
        decorative
        variant="circular"
        size={40}
        width={10}
        height={99}
      />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveClass("circular", "ui-skeleton-variant-circle");
    expect(el.style.width).toBe("40px");
    expect(el.style.height).toBe("40px");

    rerender(<Skeleton decorative variant="circular" width="3rem" />);
    expect(el.style.width).toBe("3rem");
    expect(el.style.height).toBe("3rem");

    rerender(<Skeleton decorative variant="circular" />);
    expect(el.style.width).toBe("32px");
    expect(el.style.height).toBe("32px");
  });

  it("merges custom style (style wins, like the composite), supports no animation, ref and attrs", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <Skeleton
        decorative
        ref={ref}
        animation="false"
        className="c"
        data-id="s"
        width={50}
        style={{ opacity: 0.5 }}
      />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(el);
    expect(el).toHaveClass("ui-skeleton-static", "c");
    expect(el).not.toHaveClass("animation-pulse");
    expect(el).toHaveAttribute("data-id", "s");
    expect(el.style.width).toBe("50px");
    expect(el.style.opacity).toBe("0.5");
  });

  it("keeps other variants' names as hooks and renders children when not loading", () => {
    const { container, rerender } = render(
      <Skeleton decorative variant="rounded" />,
    );
    expect(container.firstElementChild).toHaveClass(
      "ui-skeleton-variant-rounded",
    );
    rerender(
      <Skeleton decorative loading={false}>
        <p>Loaded</p>
      </Skeleton>,
    );
    expect(container.querySelector("p")).toHaveTextContent("Loaded");
    expect(container.querySelector(".ui-skeleton")).toBeNull();
  });

  it("forwards native attributes to the loading status region", () => {
    const { getByRole } = render(<Skeleton id="sk" data-k="v" />);
    expect(getByRole("status")).toHaveAttribute("id", "sk");
    expect(getByRole("status")).toHaveAttribute("data-k", "v");
  });
});

describe("SkeletonText", () => {
  it("renders 3 lines by default with the last line shrunk to 70%", () => {
    const { container } = render(<SkeletonText />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("skeletonText", "ui-skeleton-text");
    expect(root).toHaveAttribute("aria-hidden", "true");
    const lines = root.querySelectorAll<HTMLElement>(".ui-skeleton");
    expect(lines).toHaveLength(3);
    expect(lines[0]!.style.width).toBe("100%");
    expect(lines[1]!.style.width).toBe("100%");
    expect(lines[2]!.style.width).toBe("70%");
    expect(lines[0]!.style.height).toBe("1em");
    expect(root.style.gap).toBe("var(--space-2)");
  });

  it("respects lines, lineHeight, gap, shrinkLast=false and animation", () => {
    const { container } = render(
      <SkeletonText
        lines={5}
        lineHeight={12}
        gap="4px"
        shrinkLast={false}
        animation="false"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.gap).toBe("4px");
    const lines = root.querySelectorAll<HTMLElement>(".ui-skeleton");
    expect(lines).toHaveLength(5);
    lines.forEach((line) => {
      expect(line.style.width).toBe("100%");
      expect(line.style.height).toBe("12px");
      expect(line).toHaveClass("ui-skeleton-static");
    });
  });

  it("resolves numeric gaps on the spacing scale", () => {
    const { container } = render(<SkeletonText gap={4} />);
    expect((container.firstElementChild as HTMLElement).style.gap).toBe(
      "var(--space-4)",
    );
  });

  it("renders nothing inside when lines=0 (or invalid) and forwards ref/attrs", () => {
    const ref = createRef<HTMLDivElement>();
    const { container, rerender } = render(
      <SkeletonText ref={ref} lines={0} id="st" className="extra" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(root);
    expect(root).toHaveAttribute("id", "st");
    expect(root).toHaveClass("ui-skeleton-text", "extra");
    expect(root.children).toHaveLength(0);
    rerender(<SkeletonText lines={Number.NaN} />);
    expect(root.children).toHaveLength(0);
  });
});
