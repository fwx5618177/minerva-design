import { createRef, useState } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { compile } from "sass";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavTree, type NavTreeSection } from ".";
import styles from "./navTree.module.scss";

const scssPath = join(import.meta.dirname, "navTree.module.scss");

const tree: NavTreeSection[] = [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", href: "/home" },
      {
        id: "operations",
        label: "运营",
        children: [
          { id: "analytics", label: "访问统计", href: "/analytics" },
          { id: "reports", label: "Reports", href: "/reports" },
        ],
      },
      { id: "off", label: "Archived", href: "/off", disabled: true },
      { id: "settings", label: "Settings", href: "/settings" },
    ],
  },
];

describe("NavTree", () => {
  it("opts into readable multiline labels without changing default or compact navigation", () => {
    const style = document.createElement("style");
    style.textContent = compile(scssPath).css;
    document.head.append(style);
    const sections = [
      {
        id: "main",
        items: [
          {
            id: "long",
            label: "Article editor with a long name",
            endContent: <span>Preview</span>,
          },
        ],
      },
    ];
    try {
      const { container, rerender } = render(<NavTree sections={sections} />);
      const label = () => container.querySelector(`.${styles.label}`)!;
      expect(getComputedStyle(label()).whiteSpace).toBe("nowrap");
      rerender(<NavTree key="wrapped" sections={sections} wrapLabels />);
      expect(getComputedStyle(label()).whiteSpace).toBe("normal");
      expect(getComputedStyle(label()).overflowWrap).toBe("anywhere");
      expect(container.querySelector(`.${styles.end}`)?.textContent).toBe(
        "Preview",
      );
      expect(container.querySelector("nav")).toHaveClass(styles.wrapLabels);
      rerender(
        <NavTree key="compact" sections={sections} wrapLabels collapsed />,
      );
      expect(
        getComputedStyle(container.querySelector(`.${styles.copy}`)!).display,
      ).toBe("none");
      expect(container.querySelector("nav")).toHaveClass(styles.collapsed);
      expect(container.querySelector(`.${styles.end}`)).toBeNull();
    } finally {
      style.remove();
    }
  });

  it("keeps active item content and trailing metadata visible", () => {
    const { container } = render(
      <NavTree
        activeId="analytics"
        sections={[
          {
            id: "main",
            items: [
              {
                id: "analytics",
                label: "访问统计",
                icon: <span>chart</span>,
                endContent: <span data-testid="status">3</span>,
              },
            ],
          },
        ]}
      />,
    );
    const activeItem = container.querySelector(`.${styles.active}`);
    expect(activeItem?.textContent).toContain("访问统计");
    expect(activeItem).toHaveAttribute("aria-current", "page");
    expect(activeItem).toHaveClass("active");
    expect(
      activeItem?.querySelector('[data-testid="status"]')?.textContent,
    ).toBe("3");
    expect(activeItem?.querySelector(`.${styles.icon}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("uses semantic theme tokens for the active state", () => {
    const css = readFileSync(scssPath, "utf8");
    expect(css).toMatch(
      /\.active\s*\{[^}]*background:\s*var\(--selected-color\)[^}]*color:\s*var\(--text-color\)/s,
    );
    expect(css).toMatch(
      /\.active \.icon\s*\{[^}]*color:\s*var\(--primary-color\)/s,
    );
    expect(css).toMatch(/\.active:hover/);
    expect(css).toMatch(/\.active:focus-visible/);
    expect(css).not.toMatch(/inset\s+3px\s+0\s+0/);
  });

  it("notifies consumers when a collapsed branch is selected", () => {
    const onItemSelect = vi.fn();
    const { container } = render(
      <NavTree
        collapsed
        onItemSelect={onItemSelect}
        sections={[
          {
            id: "main",
            items: [
              {
                id: "operations",
                label: "运营",
                children: [{ id: "analytics", label: "访问统计" }],
              },
            ],
          },
        ]}
      />,
    );
    fireEvent.click(container.querySelector("button")!);
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "operations" }),
    );
    // Compact mode never renders children
    expect(container.querySelector(`.${styles.children}`)).toBeNull();
  });

  it("lets controlled expanded ids reopen an explicitly collapsed active branch", () => {
    const sections = [
      {
        id: "main",
        items: [
          {
            id: "operations",
            label: "运营",
            children: [{ id: "analytics", label: "访问统计" }],
          },
        ],
      },
    ];
    const onExpandedChange = vi.fn();
    const { container, rerender } = render(
      <NavTree
        activeId="analytics"
        expandedIds={[]}
        onExpandedChange={onExpandedChange}
        sections={sections}
      />,
    );
    expect(container.textContent).toContain("访问统计");
    expect(container.querySelector("button")).toHaveAttribute(
      "data-ancestor-active",
      "true",
    );
    fireEvent.click(container.querySelector("button")!);
    expect(container.textContent).not.toContain("访问统计");
    rerender(
      <NavTree
        activeId="analytics"
        expandedIds={["operations"]}
        sections={sections}
      />,
    );
    expect(container.textContent).toContain("访问统计");
  });

  it("expands and collapses branches uncontrolled and reports expanded ids", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <NavTree
        sections={tree}
        defaultExpandedIds={[]}
        onExpandedChange={onExpandedChange}
      />,
    );
    const branch = screen.getByRole("button", { name: "运营" });
    expect(branch).toHaveAttribute("aria-expanded", "false");
    expect(branch).toHaveClass(styles.item);
    expect(branch).not.toHaveClass(styles.nested);
    await user.click(branch);
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveAttribute("data-expanded", "true");
    expect(onExpandedChange).toHaveBeenLastCalledWith(["operations"]);
    expect(screen.getByRole("link", { name: "访问统计" })).toHaveClass(
      styles.item,
      styles.nested,
    );
    await user.click(branch);
    expect(onExpandedChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByRole("link", { name: "访问统计" })).toBeNull();
  });

  it("renders sections, titles, descriptions and the localized landmark name", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <NavTree
        ref={ref}
        className="consumer"
        style={{ width: 240 }}
        sections={[
          {
            id: "s",
            title: "Workspace",
            items: [
              { id: "a", label: "Alpha", description: "First", href: "/a" },
            ],
          },
          { id: "t", items: [{ id: "b", label: "Beta", href: "/b" }] },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Navigation" })).toBe(
      ref.current,
    );
    expect(ref.current).toHaveClass(styles.navTree, "consumer");
    expect(ref.current?.style.width).toBe("240px");
    expect(container.querySelectorAll(`.${styles.section}`)).toHaveLength(2);
    expect(
      screen.getByRole("heading", { level: 2, name: "Workspace" }),
    ).toHaveClass(styles.sectionTitle);
    const alpha = screen.getByRole("link", { name: /Alpha/ });
    expect(alpha).toHaveAttribute("title", "Alpha / First");
    expect(alpha).toHaveAttribute("href", "/a");
    expect(alpha.querySelector(`.${styles.description}`)?.textContent).toBe(
      "First",
    );
    render(<NavTree ariaLabel="Admin" sections={[]} />);
    expect(
      screen.getByRole("navigation", { name: "Admin" }),
    ).toBeInTheDocument();
  });

  it("disables links and branches", async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(
      <NavTree
        onItemSelect={onItemSelect}
        sections={[
          {
            id: "s",
            items: [
              { id: "off", label: "Archived", href: "/off", disabled: true },
              {
                id: "b",
                label: "Branch",
                disabled: true,
                children: [{ id: "c", label: "Child" }],
              },
            ],
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Archived" });
    expect(link.tagName).toBe("SPAN");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveClass(styles.disabled);
    await user.click(link);
    expect(onItemSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Branch" })).toBeDisabled();
  });

  it("notifies on link activation and supports renderLink", async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(
      <NavTree
        activeId="home"
        onItemSelect={onItemSelect}
        sections={tree}
        renderLink={(item, content, state) => (
          <a
            key={item.id}
            href={`#${item.href}`}
            className={state.className}
            data-depth={state.depth}
            data-is-active={String(state.active)}
          >
            {content}
          </a>
        )}
      />,
    );
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "#/home");
    expect(home).toHaveClass(styles.item, styles.active);
    expect(home).toHaveAttribute("data-is-active", "true");
    render(<NavTree onItemSelect={onItemSelect} sections={tree} />);
    await user.click(screen.getAllByRole("link", { name: "Settings" })[1]);
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "settings" }),
    );
  });

  it("supports keyboard navigation between items and branches", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [ids, setIds] = useState<string[]>([]);
      return (
        <NavTree sections={tree} expandedIds={ids} onExpandedChange={setIds} />
      );
    };
    render(<Controlled />);
    const home = screen.getByRole("link", { name: "Home" });
    const branch = screen.getByRole("button", { name: "运营" });
    home.focus();
    await user.keyboard("{ArrowDown}");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("link", { name: "访问统计" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("link", { name: "Reports" })).toHaveFocus();
    // Disabled items are skipped
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveFocus();
    await user.keyboard("{ArrowUp}{ArrowLeft}");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(home).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(home).toHaveFocus();
    // Other keys and non-item targets are ignored
    await user.keyboard("a");
    expect(home).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("navigation"), { key: "ArrowDown" });
    expect(home).toHaveFocus();
  });

  it("renders leaf items without href as action buttons", async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(
      <NavTree
        onItemSelect={onItemSelect}
        sections={[{ id: "s", items: [{ id: "x", label: "Log out" }] }]}
      />,
    );
    const action = screen.getByRole("button", { name: "Log out" });
    expect(action).toHaveClass(styles.item);
    expect(action).not.toHaveAttribute("aria-expanded");
    expect(action).toHaveAttribute("type", "button");
    await user.click(action);
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "x" }),
    );
  });

  it("ignores branch arrow keys in compact mode", () => {
    render(<NavTree sections={tree} collapsed />);
    const branch = screen.getByRole("button", { name: "运营" });
    fireEvent.keyDown(branch, { key: "ArrowRight" });
    expect(branch).toHaveAttribute("aria-expanded", "false");
  });
});
