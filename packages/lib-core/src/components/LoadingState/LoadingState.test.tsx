import { act, createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { afterEach, expect, it } from "vitest";
import i18n from "../../config/i18n";
import indicatorStyles from "../ProgressIndicator/progressIndicator.module.scss";
import LoadingState from "./LoadingState";
import styles from "./loadingState.module.scss";

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
  expect(status).toHaveClass(styles.loadingState, styles.medium);
  const label = status.querySelector<HTMLElement>(`:scope > .${styles.label}`)!;
  expect(label.textContent).toBe("Loading...");
  expect(label.hidden).toBe(false);
  expect(label.closest('[aria-hidden="true"]')).toBeNull();
  expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
  expect(
    container.querySelectorAll('[aria-live="polite"], [aria-live="assertive"]'),
  ).toHaveLength(1);
  const indicator = status.querySelector<HTMLElement>(
    `:scope > .${styles.indicator} > .${indicatorStyles.progressIndicator}`,
  )!;
  expect(indicator).toHaveClass(indicatorStyles.current);
  expect(indicator.hasAttribute("role")).toBe(false);
  expect(indicator.getAttribute("aria-hidden")).toBe("true");
  expect(indicator.hasAttribute("aria-label")).toBe(false);
  expect(indicator.querySelector(`svg.${indicatorStyles.spinner}`)).toHaveClass(
    indicatorStyles.medium,
  );
  expect(indicator.textContent).toBe("");
  expect(screen.queryByRole("progressbar")).toBeNull();
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
  expect(status).toHaveClass(styles.loadingState, "consumer");
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
  ["small", "64px"],
  ["medium", "160px"],
  ["large", "240px"],
] as const)(
  "renders size %s with the shipped minimum height %s",
  (size, minHeight) => {
    render(<LoadingState size={size} />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass(styles[size]);
    expect(status.hasAttribute("size")).toBe(false);
    expect(css).toMatch(
      new RegExp(
        `\\.${size}\\s*\\{[^}]*min-height:\\s*var\\(--loading-state-min-height,\\s*${minHeight}\\)\\s*;`,
      ),
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
    "gap: var(--loading-state-gap, var(--space-3));",
    "padding: var(--loading-state-padding, var(--space-4));",
    "color: var(--loading-state-color, var(--text-muted-color));",
    "font-size: var(--loading-state-font-size, var(--font-size-md));",
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

it("disables animation only on its decorative indicator under reduced motion", () => {
  expect(css).toMatch(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.loadingState > \.indicator \*\s*\{[^}]*animation:\s*none\s*;/,
  );
});
