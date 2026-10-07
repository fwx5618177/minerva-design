// Ported from @novel-isr/ui src/components/__test__/LoadingState.test.tsx
import { act, createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { afterEach, expect, it } from "vitest";
import i18n from "../../config/i18n";
import LoadingState from "./LoadingState";

const css = compile(join(import.meta.dirname, "loadingState.module.scss")).css;

afterEach(() => {
  act(() => {
    i18n.changeLanguage("en");
  });
});

it("renders the default visible label in one polite status region", () => {
  const { container } = render(<LoadingState />);
  const status = screen.getByRole("status");
  expect(status.tagName).toBe("DIV");
  expect(status.getAttribute("aria-live")).toBe("polite");
  expect(status.getAttribute("aria-atomic")).toBe("true");
  expect(status.hasAttribute("aria-busy")).toBe(false);
  expect(status).toHaveClass(
    "ui-loading-state",
    "ui-loading-state-size-default",
    "medium",
  );
  const label = status.querySelector<HTMLElement>(".ui-loading-state-label")!;
  expect(label.textContent).toBe("Loading...");
  expect(label.hidden).toBe(false);
  expect(label.closest('[aria-hidden="true"]')).toBeNull();
  expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
  expect(
    container.querySelectorAll('[aria-live="polite"], [aria-live="assertive"]'),
  ).toHaveLength(1);
  const spinner = status.querySelector(".ui-spinner")!;
  expect(spinner.getAttribute("role")).toBe("presentation");
  expect(spinner.getAttribute("aria-hidden")).toBe("true");
  expect(spinner.getAttribute("aria-live")).toBe("off");
  expect(spinner).toHaveClass("ui-spinner-size-md", "ui-spinner-color-current");
  expect(spinner.textContent).toBe("");
});

it("updates the visible custom label without introducing another announcement source", () => {
  const { container, rerender } = render(
    <LoadingState label="Loading calendar..." />,
  );
  const status = screen.getByRole("status");
  expect(status.textContent).toBe("Loading calendar...");
  const longLabel = "Loading" + "calendar".repeat(80);
  rerender(<LoadingState label={longLabel} />);
  expect(screen.getByRole("status")).toBe(status);
  expect(status.textContent).toBe(longLabel);
  expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
  expect(
    container.querySelectorAll('[aria-live="polite"], [aria-live="assertive"]'),
  ).toHaveLength(1);
});

it("localizes the default label", () => {
  act(() => {
    i18n.changeLanguage("zh");
  });
  render(<LoadingState />);
  expect(screen.getByRole("status").textContent).toBe("加载中...");
});

it("forwards the div ref, class, style, native attributes and event handlers", () => {
  const ref = createRef<HTMLDivElement>();
  const clicks: EventTarget[] = [];
  const { unmount } = render(
    <LoadingState
      ref={ref}
      label="Loading records..."
      id="pending"
      title="Pending records"
      data-owner="records"
      tabIndex={-1}
      aria-describedby="loading-detail"
      className="consumer"
      style={{ minHeight: 200 }}
      onClick={(event) => clicks.push(event.currentTarget)}
    />,
  );
  const status = ref.current!;
  expect(status).toBeInstanceOf(HTMLDivElement);
  expect(status).toBe(screen.getByRole("status"));
  expect(status).toHaveClass("ui-loading-state", "consumer");
  expect(status.style.minHeight).toBe("200px");
  expect(status.id).toBe("pending");
  expect(status.title).toBe("Pending records");
  expect(status.dataset.owner).toBe("records");
  expect(status.tabIndex).toBe(-1);
  expect(status.getAttribute("aria-describedby")).toBe("loading-detail");
  expect(status.hasAttribute("label")).toBe(false);
  act(() => status.click());
  expect(clicks).toEqual([status]);
  unmount();
  expect(ref.current).toBeNull();
});

it.each([
  ["small", "compact", "64px"],
  ["medium", "default", "160px"],
  ["large", "lg", "240px"],
] as const)(
  "renders size %s (hook %s) with the shipped minimum height %s",
  (size, hook, minHeight) => {
    render(<LoadingState size={size} />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass(size, `ui-loading-state-size-${hook}`);
    expect(status.hasAttribute("size")).toBe(false);
    expect(css).toMatch(
      new RegExp(`\\.${size}\\s*\\{[^}]*min-height:\\s*${minHeight}\\s*;`),
    );
  },
);

it("ships bounded horizontal layout, muted typography and wrapping without a card surface", () => {
  const block = css.match(/\.loadingState\s*\{([^}]*)\}/)?.[1];
  expect(block).toBeDefined();
  for (const declaration of [
    "box-sizing: border-box;",
    "min-width: 0;",
    "max-width: 100%;",
    "display: flex;",
    "flex-direction: row;",
    "align-items: center;",
    "justify-content: center;",
    "gap: var(--space-3);",
    "padding: var(--space-4);",
    "color: var(--text-muted-color);",
    "font-size: var(--font-size-md);",
    "font-family: var(--font-family-sans);",
    "line-height: var(--line-height-base);",
  ])
    expect(block).toContain(declaration);
  expect(block).not.toMatch(/(?:background|border|border-radius)\s*:/);
  const label = css.match(/\.label\s*\{([^}]*)\}/)?.[1];
  expect(label).toBeDefined();
  for (const declaration of [
    "min-width: 0;",
    "max-width: 100%;",
    "overflow-wrap: anywhere;",
    "white-space: normal;",
  ])
    expect(label).toContain(declaration);
});

it("disables animation only on its decorative Spinner under reduced motion", () => {
  expect(css).toMatch(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.loadingState > \.spinner\s*\{[^}]*animation:\s*none\s*;/,
  );
});
