import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, ref } from "vue";
import { NavTree, type NavTreeItemState, type NavTreeSection } from ".";
import ConfigProvider from "../../config/ConfigProvider.vue";

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

const link = (name: string) => screen.getByRole("link", { name });

describe("NavTree", () => {
  it("renders sections, titles, descriptions, icons and the localized landmark name", () => {
    const { container } = render(NavTree, {
      props: {
        activeId: "home",
        sections: [
          {
            id: "a",
            title: "Workspace",
            items: [
              {
                id: "home",
                label: "Home",
                description: "Start",
                href: "/",
                icon: h("svg", { "data-testid": "icon" }),
                endContent: h("b", "3"),
              },
            ],
          },
          { id: "b", items: [{ id: "x", label: "X", href: "/x" }] },
        ],
      },
    });
    const nav = screen.getByRole("navigation", { name: "Navigation" });
    expect(nav).toHaveClass("navTree");
    expect(nav).toHaveAttribute("data-minerva", "nav-tree");
    expect(nav).toHaveAttribute("data-part", "root");
    const groups = container.querySelectorAll('[data-part="group"]');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveClass("section");
    expect(screen.getByRole("heading", { name: "Workspace" })).toHaveAttribute(
      "data-part",
      "group-label",
    );
    const home = link("Home Start 3");
    expect(home).toHaveAttribute("title", "Home / Start");
    expect(home).toHaveAttribute("aria-current", "page");
    expect(home).toHaveAttribute("data-current", "");
    expect(home).toHaveClass("item", "active");
    expect(home.querySelector('[data-part="icon"]')).toContainElement(
      screen.getByTestId("icon"),
    );
    expect(home.querySelector('[data-part="description"]')).toHaveTextContent(
      "Start",
    );
    expect(home.querySelector(".end")).toHaveTextContent("3");
  });

  it("applies compact and wrapLabels classes", async () => {
    const { rerender } = render(NavTree, {
      props: { sections: tree, wrapLabels: true },
    });
    expect(screen.getByRole("navigation")).toHaveClass("wrapLabels");
    await rerender({ sections: tree, wrapLabels: true, collapsed: true });
    expect(screen.getByRole("navigation")).toHaveClass("collapsed");
    expect(screen.getByRole("navigation")).not.toHaveClass("wrapLabels");
    expect(document.querySelector(".chevron")).toBeNull();
  });

  it("emits itemSelect when a collapsed branch is selected and never renders children in compact mode", async () => {
    const { container, emitted } = render(NavTree, {
      props: {
        collapsed: true,
        sections: [
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
        ],
      },
    });
    await fireEvent.click(container.querySelector("button")!);
    expect(emitted("itemSelect")![0]).toEqual([
      expect.objectContaining({ id: "operations" }),
    ]);
    expect(container.querySelector(".children")).toBeNull();
  });

  it("lets controlled expanded ids reopen an explicitly collapsed active branch", async () => {
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
    const { container, rerender, emitted } = render(NavTree, {
      props: { activeId: "analytics", expandedIds: [], sections },
    });
    expect(container.textContent).toContain("访问统计");
    expect(container.querySelector("button")).toHaveAttribute(
      "data-ancestor-active",
      "true",
    );
    await fireEvent.click(container.querySelector("button")!);
    expect(container.textContent).not.toContain("访问统计");
    expect(emitted("expandedChange")).toEqual([[[]]]);
    await rerender({
      activeId: "analytics",
      expandedIds: ["operations"],
      sections,
    });
    expect(container.textContent).toContain("访问统计");
  });

  it("expands and collapses branches uncontrolled and emits the expanded ids", async () => {
    const user = userEvent.setup();
    const { emitted } = render(NavTree, {
      props: { sections: tree, defaultExpandedIds: [] },
    });
    const branch = screen.getByRole("button", { name: "运营" });
    expect(branch).toHaveAttribute("aria-expanded", "false");
    expect(branch).toHaveClass("item");
    expect(branch).not.toHaveClass("nested");
    await user.click(branch);
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveAttribute("data-expanded", "");
    expect(emitted("expandedChange")!.at(-1)).toEqual([["operations"]]);
    expect(emitted("update:expandedIds")!.at(-1)).toEqual([["operations"]]);
    expect(link("访问统计")).toHaveClass("item", "nested");
    await user.click(branch);
    expect(branch).not.toHaveAttribute("data-expanded");
    expect(emitted("expandedChange")!.at(-1)).toEqual([[]]);
    expect(screen.queryByRole("link", { name: "访问统计" })).toBeNull();
  });

  it("disables links and branches", async () => {
    const user = userEvent.setup();
    const { emitted } = render(NavTree, {
      props: {
        sections: [
          {
            id: "s",
            items: [
              { id: "off", label: "Archived", href: "/off", disabled: true },
              {
                id: "b",
                label: "Branch",
                disabled: true,
                children: [{ id: "c", label: "C" }],
              },
            ],
          },
        ],
      },
    });
    const off = screen.getByRole("link", { name: "Archived" });
    expect(off.tagName).toBe("SPAN");
    expect(off).toHaveAttribute("aria-disabled", "true");
    expect(off).not.toHaveAttribute("href");
    expect(off).toHaveAttribute("data-disabled", "");
    expect(off).toHaveClass("disabled");
    const branch = screen.getByRole("button", { name: "Branch" });
    expect(branch).toBeDisabled();
    await user.click(off);
    await user.click(branch);
    expect(emitted("itemSelect")).toBeUndefined();
  });

  it("emits itemSelect on link activation and blocks unsafe hrefs", async () => {
    const user = userEvent.setup();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { emitted } = render(NavTree, {
      props: {
        sections: [
          {
            id: "s",
            items: [
              { id: "a", label: "Settings", href: "/settings" },
              { id: "b", label: "Bad", href: "javascript:alert(1)" },
            ],
          },
        ],
      },
    });
    link("Settings").addEventListener("click", (e) => e.preventDefault());
    await user.click(link("Settings"));
    expect(emitted("itemSelect")![0]).toEqual([
      expect.objectContaining({ id: "a" }),
    ]);
    expect(screen.getByText("Bad").closest("a")).not.toHaveAttribute("href");
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("supports renderLink and the link slot", () => {
    const renderLink = (
      item: { id: string; href?: string },
      content: unknown,
      state: NavTreeItemState,
    ) =>
      h(
        "a",
        {
          href: `#${item.href}`,
          class: state.className,
          "data-depth": state.depth,
          "data-is-active": String(state.active),
        },
        content as never,
      );
    const { unmount } = render(NavTree, {
      props: { activeId: "home", sections: tree, renderLink },
    });
    const home = link("Home");
    expect(home).toHaveAttribute("href", "#/home");
    expect(home).toHaveClass("item", "active");
    expect(home).toHaveAttribute("data-is-active", "true");
    unmount();
    render(NavTree, {
      props: { activeId: "settings", sections: tree },
      slots: {
        link: ({
          item,
          content,
          state,
        }: {
          item: { href?: string };
          content: unknown;
          state: NavTreeItemState;
        }) =>
          h(
            "a",
            { href: `/app${item.href}`, class: state.className },
            content as never,
          ),
      },
    });
    expect(link("Settings")).toHaveAttribute("href", "/app/settings");
    expect(link("Settings")).toHaveClass("active");
  });

  it("supports keyboard navigation between items and branches (v-model:expandedIds)", async () => {
    const user = userEvent.setup();
    const ids = ref<string[]>([]);
    render(
      defineComponent({
        setup: () => () =>
          h(NavTree, {
            sections: tree,
            expandedIds: ids.value,
            "onUpdate:expandedIds": (v: string[]) => (ids.value = v),
          }),
      }),
    );
    const home = link("Home");
    const branch = screen.getByRole("button", { name: "运营" });
    home.focus();
    await user.keyboard("{ArrowDown}");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(ids.value).toEqual(["operations"]);
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(link("访问统计")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(link("Reports")).toHaveFocus();
    // Disabled items are skipped
    await user.keyboard("{ArrowDown}");
    expect(link("Settings")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(link("Settings")).toHaveFocus();
    await user.keyboard("{ArrowUp}{ArrowLeft}");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveFocus();
    await user.keyboard("{End}");
    expect(link("Settings")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(home).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(home).toHaveFocus();
    await user.keyboard("a");
    expect(home).toHaveFocus();
    await fireEvent.keyDown(screen.getByRole("navigation"), {
      key: "ArrowDown",
    });
    expect(home).toHaveFocus();
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    const user = userEvent.setup();
    render(NavTree, { props: { sections: tree }, attrs: { dir: "rtl" } });
    const branch = screen.getByRole("button", { name: "运营" });
    branch.focus();
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveAttribute("aria-expanded", "false");
  });

  it("lets a consumer keydown handler cancel the navigation", async () => {
    render(NavTree, {
      props: { sections: tree },
      attrs: { onKeydown: (e: KeyboardEvent) => e.preventDefault() },
    });
    const home = link("Home");
    home.focus();
    await fireEvent.keyDown(home, { key: "ArrowDown" });
    expect(home).toHaveFocus();
  });

  it("renders leaf items without href as action buttons", async () => {
    const user = userEvent.setup();
    const { emitted } = render(NavTree, {
      props: {
        activeId: "x",
        sections: [{ id: "s", items: [{ id: "x", label: "Log out" }] }],
      },
    });
    const action = screen.getByRole("button", { name: "Log out" });
    expect(action).toHaveClass("item");
    expect(action).not.toHaveAttribute("aria-expanded");
    expect(action).toHaveAttribute("type", "button");
    expect(action).toHaveAttribute("aria-current", "page");
    await user.click(action);
    expect(emitted("itemSelect")![0]).toEqual([
      expect.objectContaining({ id: "x" }),
    ]);
  });

  it("ignores branch arrow keys in compact mode", async () => {
    render(NavTree, { props: { sections: tree, collapsed: true } });
    const branch = screen.getByRole("button", { name: "运营" });
    await fireEvent.keyDown(branch, { key: "ArrowRight" });
    expect(branch).toHaveAttribute("aria-expanded", "false");
  });

  it("forwards id, aria-labelledby and data-* to the nav landmark", () => {
    render(
      defineComponent({
        setup: () => () => [
          h("h2", { id: "nav-title" }, "Docs"),
          h(NavTree, {
            sections: tree,
            id: "docs-nav",
            "aria-labelledby": "nav-title",
            "data-testid": "nav",
            "data-part": "x",
          }),
        ],
      }),
    );
    const nav = screen.getByRole("navigation", { name: "Docs" });
    expect(nav).toHaveAttribute("id", "docs-nav");
    expect(nav).toHaveAttribute("data-testid", "nav");
    expect(nav).toHaveAttribute("data-part", "root");
    expect(nav).not.toHaveAttribute("aria-label");
  });

  it("uses aria-label and translates the default label", () => {
    const { unmount } = render(NavTree, {
      props: { sections: tree },
      attrs: { "aria-label": "Sidebar" },
    });
    expect(screen.getByRole("navigation", { name: "Sidebar" })).toBeVisible();
    unmount();
    render(
      defineComponent({
        setup: () => () =>
          h(ConfigProvider, { locale: { language: "zh" } }, () =>
            h(NavTree, { sections: tree }),
          ),
      }),
    );
    expect(screen.getByRole("navigation").getAttribute("aria-label")).not.toBe(
      "Navigation",
    );
  });
});
