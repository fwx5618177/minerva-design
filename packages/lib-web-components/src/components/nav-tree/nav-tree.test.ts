import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import { MinervaNavTree, type NavTreeSection } from "./nav-tree";
import "../../elements/nav-tree";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const tree = (): NavTreeSection[] => [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", href: "#home" },
      {
        id: "operations",
        label: "Operations",
        children: [
          { id: "analytics", label: "Analytics", href: "#analytics" },
          { id: "reports", label: "Reports", href: "#reports" },
        ],
      },
      { id: "off", label: "Archived", href: "#off", disabled: true },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];

const nav = () => document.querySelector<MinervaNavTree>("minerva-nav-tree")!;
const item = (label: string) =>
  Array.from(nav().shadowRoot!.querySelectorAll<HTMLElement>(".item")).find(
    (el) => el.querySelector(".label")?.textContent === label,
  ) ?? null;
const focused = () => nav().shadowRoot!.activeElement;

async function setup(
  sections = tree(),
  props: Partial<MinervaNavTree> = {},
  attrs = "",
) {
  const el = await mount<MinervaNavTree>(
    `<minerva-nav-tree ${attrs}></minerva-nav-tree>`,
  );
  Object.assign(el, { sections, ...props });
  await settle();
  return el;
}

describe("<minerva-nav-tree>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-nav-tree")).toBe(MinervaNavTree);
  });

  it("renders sections, titles, descriptions and the localized landmark name", async () => {
    const el = await setup([
      {
        id: "s",
        title: "Workspace",
        items: [{ id: "a", label: "Alpha", description: "First", href: "/a" }],
      },
      { id: "t", items: [{ id: "b", label: "Beta", href: "/b" }] },
    ]);
    const landmark = $(el, "nav");
    expect(landmark).toHaveClass("navTree");
    expect(landmark).toHaveAttribute("aria-label", "Navigation");
    expect(el.shadowRoot!.querySelectorAll(".section")).toHaveLength(2);
    expect($(el, "h2.sectionTitle").textContent).toBe("Workspace");
    const alpha = item("Alpha")!;
    expect(alpha.tagName).toBe("A");
    expect(alpha).toHaveAttribute("title", "Alpha / First");
    expect(alpha).toHaveAttribute("href", "/a");
    expect(alpha.querySelector(".description")?.textContent).toBe("First");
  });

  it("uses aria-label / lang for the landmark name", async () => {
    const el = await setup(tree(), {}, 'aria-label="Admin"');
    expect($(el, "nav")).toHaveAttribute("aria-label", "Admin");
    await mount(`<div lang="ja"><minerva-nav-tree></minerva-nav-tree></div>`);
    expect($(nav(), "nav")).toHaveAttribute("aria-label", "ナビゲーション");
  });

  it("marks the active item and expands its ancestors", async () => {
    await setup(tree(), { activeId: "analytics" });
    const branch = item("Operations")!;
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveAttribute("data-ancestor-active", "true");
    const analytics = item("Analytics")!;
    expect(analytics).toHaveAttribute("aria-current", "page");
    expect(analytics).toHaveClass("active");
    expect(analytics).toHaveClass("nested");
    expect(nav().getAttribute("active-id")).toBe("analytics");
  });

  it("expands and collapses branches and reports expanded ids", async () => {
    const user = userEvent.setup();
    const el = await setup();
    const onExpanded = vi.fn();
    const onSelect = vi.fn();
    el.addEventListener("minerva-expanded-change", (e) =>
      onExpanded((e as CustomEvent).detail.expandedIds),
    );
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail.value),
    );
    const branch = item("Operations")!;
    expect(branch).toHaveAttribute("aria-expanded", "false");
    expect(branch).not.toHaveClass("nested");
    await user.click(branch);
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveAttribute("data-expanded", "true");
    expect(onExpanded).toHaveBeenLastCalledWith(["operations"]);
    expect(onSelect).toHaveBeenLastCalledWith("operations");
    expect(el.expandedIds).toEqual(["operations"]);
    expect(item("Analytics")).toHaveClass("nested");
    await user.click(branch);
    await settle();
    expect(onExpanded).toHaveBeenLastCalledWith([]);
    expect(item("Analytics")).toBe(null);
  });

  it("keeps the state when minerva-expanded-change is canceled", async () => {
    const user = userEvent.setup();
    const el = await setup();
    el.addEventListener("minerva-expanded-change", (e) => e.preventDefault());
    await user.click(item("Operations")!);
    await settle();
    expect(item("Operations")).toHaveAttribute("aria-expanded", "false");
    el.expandedIds = ["operations"];
    await settle();
    expect(item("Analytics")).toBeTruthy();
  });

  it("lets the user collapse an active branch, and expandedIds reopen it", async () => {
    const user = userEvent.setup();
    const el = await setup(tree(), { activeId: "analytics" });
    await user.click(item("Operations")!);
    await settle();
    expect(item("Analytics")).toBe(null);
    el.expandedIds = ["operations"];
    await settle();
    expect(item("Analytics")).toBeTruthy();
  });

  it("disables links and branches", async () => {
    const user = userEvent.setup();
    const el = await setup([
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
    ]);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    const link = item("Archived")!;
    expect(link.tagName).toBe("SPAN");
    expect(link).toHaveAttribute("role", "link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveClass("disabled");
    await user.click(link);
    expect(onSelect).not.toHaveBeenCalled();
    expect(item("Branch")).toBeDisabled();
  });

  it("emits minerva-select for links; canceling prevents the navigation", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) => {
      onSelect((e as CustomEvent).detail);
      e.preventDefault();
    });
    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    item("Settings")!.dispatchEvent(click);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "settings" }),
    );
    expect(click.defaultPrevented).toBe(true);
  });

  it("renders leaf items without href as action buttons", async () => {
    const user = userEvent.setup();
    const el = await setup([
      { id: "s", items: [{ id: "x", label: "Log out" }] },
    ]);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail.value),
    );
    const action = item("Log out")!;
    expect(action.tagName).toBe("BUTTON");
    expect(action).toHaveAttribute("type", "button");
    expect(action).not.toHaveAttribute("aria-expanded");
    await user.click(action);
    expect(onSelect).toHaveBeenCalledWith("x");
  });

  it("supports renderLink, icons and end content", async () => {
    await setup(tree(), {
      activeId: "home",
      renderLink: (it, content, state) =>
        html`<a
          href="#/${it.id}"
          class=${state.className}
          data-depth=${state.depth}
          data-is-active=${String(state.active)}
          >${content}</a
        >`,
    });
    const home = item("Home")!;
    expect(home).toHaveAttribute("href", "#/home");
    expect(home).toHaveClass("item");
    expect(home).toHaveClass("active");
    expect(home).toHaveAttribute("data-is-active", "true");

    const badge = document.createElement("b");
    badge.textContent = "3";
    await setup([
      {
        id: "s",
        items: [
          { id: "i", label: "Inbox", href: "/i", icon: "✉", endContent: badge },
        ],
      },
    ]);
    expect(item("Inbox")!.querySelector(".icon")?.textContent).toBe("✉");
    expect(item("Inbox")!.querySelector(".end b")).toBe(badge);
  });

  it("compact mode hides children and trailing content; branches still notify", async () => {
    const el = await setup(tree(), { collapsed: true, activeId: "analytics" });
    expect($(el, "nav")).toHaveClass("collapsed");
    expect(el.shadowRoot!.querySelector(".children")).toBe(null);
    expect(el.shadowRoot!.querySelector(".trailing")).toBe(null);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    item("Operations")!.click();
    expect(onSelect).toHaveBeenCalled();
    el.wrapLabels = true;
    await settle();
    expect($(el, "nav")).not.toHaveClass("wrapLabels");
    el.collapsed = false;
    await settle();
    expect($(el, "nav")).toHaveClass("wrapLabels");
  });

  it("warns in development about duplicate ids", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup([
      {
        id: "s",
        items: [
          { id: "dup", label: "One" },
          { id: "dup", label: "Two" },
        ],
      },
    ]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"dup"'));
  });
});

describe("<minerva-nav-tree> keyboard", () => {
  it("moves between items and branches with arrows, Home and End", async () => {
    const user = userEvent.setup();
    await setup();
    const home = item("Home")!;
    const branch = item("Operations")!;
    home.focus();
    await user.keyboard("{ArrowDown}");
    expect(focused()).toBe(branch);
    await user.keyboard("{ArrowRight}");
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(focused()).toBe(branch);
    await user.keyboard("{ArrowRight}");
    expect(focused()).toBe(item("Analytics"));
    await user.keyboard("{ArrowDown}");
    expect(focused()).toBe(item("Reports"));
    // disabled items are skipped
    await user.keyboard("{ArrowDown}");
    expect(focused()).toBe(item("Settings"));
    await user.keyboard("{ArrowDown}");
    expect(focused()).toBe(item("Settings"));
    await user.keyboard("{ArrowUp}{ArrowLeft}");
    expect(focused()).toBe(branch);
    await user.keyboard("{ArrowLeft}");
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowLeft}");
    expect(focused()).toBe(branch);
    await user.keyboard("{End}");
    expect(focused()).toBe(item("Settings"));
    await user.keyboard("{Home}");
    expect(focused()).toBe(home);
    await user.keyboard("{ArrowUp}");
    expect(focused()).toBe(home);
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    const user = userEvent.setup();
    await setup(tree(), {}, 'dir="rtl"');
    const branch = item("Operations")!;
    branch.focus();
    await user.keyboard("{ArrowLeft}");
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowLeft}");
    expect(focused()).toBe(item("Analytics"));
    await user.keyboard("{ArrowRight}");
    expect(focused()).toBe(branch);
  });

  it("Enter and Space toggle a branch; Enter activates an action", async () => {
    const user = userEvent.setup();
    const el = await setup([
      {
        id: "s",
        items: [
          {
            id: "lib",
            label: "Library",
            children: [{ id: "a", label: "Authors" }],
          },
        ],
      },
    ]);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail.value),
    );
    const branch = item("Library")!;
    branch.focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(focused()).toBe(branch);
    await user.keyboard("{ArrowDown}");
    expect(focused()).toBe(item("Authors"));
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenLastCalledWith("a");
    branch.focus();
    await user.keyboard(" ");
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "false");
    expect(item("Authors")).toBe(null);
  });

  it("typeahead moves to the next visible item starting with the typed text", async () => {
    const user = userEvent.setup();
    await setup();
    item("Home")!.focus();
    await user.keyboard("s");
    expect(focused()).toBe(item("Settings"));
    await user.keyboard("{Home}");
    // disabled "Archived" is not matched; no match keeps focus
    await user.keyboard("z");
    expect(focused()).toBe(item("Home"));
  });

  it("ignores branch arrow keys in compact mode", async () => {
    await setup(tree(), { collapsed: true });
    const branch = item("Operations")!;
    branch.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    await settle();
    expect(branch).toHaveAttribute("aria-expanded", "false");
  });
});
