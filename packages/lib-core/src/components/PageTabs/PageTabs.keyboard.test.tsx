import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PageTab, PageTabs } from ".";
import { IconButton } from "../IconButton";
import styles from "./pageTabs.module.scss";

afterEach(() => {
  vi.restoreAllMocks();
});

const page = (name: string) =>
  screen.getByText(name, { selector: `.${styles.label}` }).closest("button")!;

describe("PageTabs keyboard", () => {
  it("reaches each page and its action as separate tab stops, skipping disabled pages", async () => {
    const user = userEvent.setup();
    render(
      <PageTabs
        aria-label="Open pages"
        activeValue="home"
        actions={<IconButton aria-label="Page menu" icon="m" />}
      >
        <PageTab
          value="home"
          label="Home"
          active
          action={<IconButton aria-label="Close Home" icon="x" />}
        />
        <PageTab value="draft" label="Draft" disabled />
        <PageTab
          value="report"
          label="Report"
          action={<IconButton aria-label="Close Report" icon="x" />}
        />
      </PageTabs>,
    );
    await user.tab();
    expect(page("Home")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close Home" })).toHaveFocus();
    await user.tab();
    expect(page("Report")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close Report" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Page menu" })).toHaveFocus();
  });

  it("selects a page with Enter and Space, but not through its action", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      <PageTabs aria-label="Open pages" activeValue="home">
        <PageTab value="home" label="Home" active />
        <PageTab
          value="report"
          label="Report"
          onSelect={onSelect}
          action={
            <IconButton aria-label="Close Report" icon="x" onClick={onClose} />
          }
        />
      </PageTabs>,
    );
    act(() => page("Report").focus());
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onSelect).toHaveBeenCalledTimes(2);
    await user.tab();
    expect(screen.getByRole("button", { name: "Close Report" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it("moves focus to the current page when the focused item is closed from the keyboard", async () => {
    const user = userEvent.setup();
    const renderTabs = (open: string[]) => (
      <PageTabs aria-label="Open pages" activeValue="home">
        {open.map((value) => (
          <PageTab
            key={value}
            value={value}
            label={value}
            active={value === "home"}
            action={
              <IconButton
                aria-label={`Close ${value}`}
                icon="x"
                onClick={() => rerender(renderTabs(["home"]))}
              />
            }
          />
        ))}
      </PageTabs>
    );
    const { rerender } = render(renderTabs(["home", "report"]));
    act(() => screen.getByRole("button", { name: "Close report" }).focus());
    await user.keyboard("{Enter}");
    expect(
      screen.queryByRole("button", { name: "Close report" }),
    ).not.toBeInTheDocument();
    expect(page("home")).toHaveFocus();
    expect(page("home")).toHaveAttribute("aria-current", "page");
  });

  it("hands focus to the opposite scroll button when the focused one reaches its end", async () => {
    const user = userEvent.setup();
    // 600px of pages in a 200px viewport; the active page is at the far end
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
      function (this: HTMLElement) {
        return this.classList.contains(styles.viewport) ? 200 : 0;
      },
    );
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
      function (this: HTMLElement) {
        return this.classList.contains(styles.viewport) ? 600 : 0;
      },
    );
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        const item = this.classList.contains(styles.pageTab);
        const x = item
          ? 400 -
            (document.querySelector(`.${styles.viewport}`)?.scrollLeft || 0)
          : 0;
        const width = 200;
        return {
          x,
          y: 0,
          width,
          height: 48,
          left: x,
          right: x + width,
          top: 0,
          bottom: 48,
          toJSON() {},
        } as DOMRect;
      },
    );
    render(
      <PageTabs aria-label="Open pages" activeValue="last">
        <PageTab value="last" label="Last" active />
      </PageTabs>,
    );
    const left = screen.getByRole("button", { name: "Scroll pages left" });
    const right = screen.getByRole("button", { name: "Scroll pages right" });
    expect(right).toBeDisabled();
    act(() => left.focus());
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    expect(left).toHaveFocus();
    await user.keyboard("{Enter}");
    // The start is reached: Scroll left is disabled, focus is not lost
    expect(left).toBeDisabled();
    expect(right).not.toBeDisabled();
    expect(right).toHaveFocus();
  });
});
