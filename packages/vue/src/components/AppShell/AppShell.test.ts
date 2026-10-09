import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createSSRApp, h, nextTick, reactive } from "vue";
import { renderToString } from "vue/server-renderer";
import { AppShell, type AppShellNavigationState, type AppShellProps } from ".";

let mobile = false;
const listeners = new Set<() => void>();

beforeEach(() => {
  mobile = false;
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return mobile;
        },
        media: query,
        onchange: null,
        addEventListener: (_: string, listener: () => void) =>
          listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) =>
          listeners.delete(listener),
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => true,
      }) as unknown as MediaQueryList,
  );
});

afterEach(() => {
  listeners.clear();
  vi.restoreAllMocks();
});

const resize = async (next: boolean) => {
  mobile = next;
  for (const listener of listeners) listener();
  await nextTick();
  await nextTick();
};

const navigation = (state: AppShellNavigationState) =>
  h(
    "nav",
    {
      "aria-label": "Primary",
      "data-testid": "navigation",
      "data-mobile": String(state.isMobile),
      "data-collapsed": String(state.collapsed),
    },
    [
      h(
        "button",
        { type: "button", onClick: state.expandNavigation },
        "Expand group",
      ),
      h(
        "a",
        {
          href: "#books",
          onClick: (event: Event) => {
            event.preventDefault();
            state.closeNavigation();
          },
        },
        "Books",
      ),
    ],
  );

type ShellProps = Partial<AppShellProps> & Record<string, unknown>;

/** Renders an AppShell whose props can be updated (reactive) */
const renderShell = (initial: ShellProps = {}, extraSlots = {}) => {
  const props = reactive<ShellProps>({
    brand: "Minerva Admin",
    "data-testid": "shell",
    ...initial,
  });
  const result = render({
    setup: () => () =>
      h(AppShell, props, {
        navigation,
        "brand-icon": () => h("svg", { "data-testid": "brand-icon" }),
        default: () => h("h1", "Content"),
        ...extraSlots,
      }),
  });
  return { ...result, props };
};

const collapsed = () =>
  screen.getByTestId("navigation").getAttribute("data-collapsed");

describe("AppShell", () => {
  it("exposes landmarks: labelled complementary sidebar, banner header and main content", () => {
    renderShell(
      { navigationLabel: "Site navigation" },
      {
        "header-actions": () => h("button", { type: "button" }, "Account"),
        "page-navigation": () =>
          h("nav", { "aria-label": "Open pages" }, "Open pages"),
      },
    );
    expect(
      screen.getByRole("complementary", { name: "Site navigation" }),
    ).toHaveTextContent("Minerva Admin");
    expect(screen.getByRole("banner")).toContainElement(
      screen.getByRole("button", { name: "Account" }),
    );
    expect(screen.getByRole("main")).toHaveTextContent("Content");
    expect(screen.getByRole("main")).not.toContainElement(
      screen.getByRole("navigation", { name: "Open pages" }),
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByTestId("brand-icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("uses a localized default navigation label and a brand slot", () => {
    renderShell({ brand: undefined }, { brand: () => h("b", "Slot brand") });
    expect(
      screen.getByRole("complementary", { name: "Navigation" }),
    ).toHaveTextContent("Slot brand");
  });

  it("reflects sidebar state in data attributes and forwards attributes", () => {
    renderShell({ class: "consumer", id: "shell" });
    const root = screen.getByTestId("shell");
    expect(root).toHaveClass("shell", "consumer");
    expect(root).toHaveAttribute("id", "shell");
    expect(root).toHaveAttribute("data-sidebar-mode", "expanded");
    expect(root).toHaveAttribute("data-sidebar-expanded", "true");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).not.toHaveAttribute("brand");
    expect(screen.getAllByTestId("navigation")).toHaveLength(1);
    expect(collapsed()).toBe("false");
  });

  it("links the header toggle to the sidebar and reflects its expanded state", async () => {
    const user = userEvent.setup();
    const { container } = renderShell();
    const toggle = container.querySelector("header button")!;
    expect(toggle.getAttribute("aria-controls")).toBe(
      container.querySelector("aside")?.id,
    );
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Collapse sidebar");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Expand sidebar");
  });

  it("starts from defaultSidebarMode and notifies changes in uncontrolled mode", async () => {
    const user = userEvent.setup();
    const onSidebarModeChange = vi.fn();
    renderShell({ defaultSidebarMode: "compact", onSidebarModeChange });
    const root = screen.getByTestId("shell");
    expect(root).toHaveAttribute("data-sidebar-mode", "compact");
    expect(root).not.toHaveAttribute("data-sidebar-expanded");
    const [headerToggle] = screen.getAllByRole("button", {
      name: "Expand sidebar",
    });
    await user.click(headerToggle!);
    expect(onSidebarModeChange).toHaveBeenLastCalledWith("expanded");
    expect(root).toHaveAttribute("data-sidebar-mode", "expanded");
  });

  it("exposes the floating toggle as a pressed toggle button", async () => {
    const user = userEvent.setup();
    renderShell();
    const pin = screen.getByRole("button", { name: "Enable floating sidebar" });
    expect(pin).toHaveAttribute("aria-pressed", "false");
    await user.click(pin);
    expect(
      screen.getByRole("button", { name: "Disable floating sidebar" }),
    ).toHaveAttribute("aria-pressed", "true");
    await user.click(
      screen.getByRole("button", { name: "Disable floating sidebar" }),
    );
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-mode",
      "compact",
    );
  });

  it("toggles compact and floating modes, expands on hover and expands a compact group", async () => {
    renderShell();
    await fireEvent.click(
      screen.getAllByRole("button", { name: "Collapse sidebar" })[0]!,
    );
    expect(collapsed()).toBe("true");
    await fireEvent.click(
      screen.getByRole("button", { name: "Enable floating sidebar" }),
    );
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-mode",
      "floating",
    );
    const sidebar = screen.getByRole("complementary");
    await fireEvent.mouseEnter(sidebar);
    expect(collapsed()).toBe("false");
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-expanded",
      "true",
    );
    await fireEvent.mouseLeave(sidebar);
    expect(collapsed()).toBe("true");
    await fireEvent.click(screen.getByRole("button", { name: "Expand group" }));
    expect(collapsed()).toBe("false");
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-mode",
      "expanded",
    );
  });

  it("respects controlled mode (v-model:sidebar-mode) and localizes controls", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    const updated = vi.fn();
    const { props } = renderShell({
      sidebarMode: "compact",
      onSidebarModeChange: changed,
      "onUpdate:sidebarMode": updated,
      labels: { expand: "Expand navigation" },
    });
    await user.click(
      screen.getAllByRole("button", { name: "Expand navigation" })[0]!,
    );
    expect(changed).toHaveBeenLastCalledWith("expanded");
    expect(updated).toHaveBeenLastCalledWith("expanded");
    expect(collapsed()).toBe("true");
    props.sidebarMode = "expanded";
    await nextTick();
    expect(collapsed()).toBe("false");
  });

  it("keeps floating navigation expanded during keyboard use until focus leaves", async () => {
    renderShell({ defaultSidebarMode: "floating" });
    const target = screen.getByRole("button", { name: "Expand group" });
    target.focus();
    target.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    await nextTick();
    expect(collapsed()).toBe("false");
    await fireEvent.mouseLeave(screen.getByRole("complementary"));
    expect(collapsed()).toBe("false");
    screen.getByRole("banner").querySelector("button")!.focus();
    await nextTick();
    expect(collapsed()).toBe("true");
  });

  it("expands on keyboard focus and collapses again on pointer use", async () => {
    renderShell({ defaultSidebarMode: "floating" });
    const target = screen.getByRole("button", { name: "Expand group" });
    const matches = vi
      .spyOn(Element.prototype, "matches")
      .mockImplementation((selector: string) => selector === ":focus-visible");
    await fireEvent.focus(target);
    matches.mockRestore();
    expect(collapsed()).toBe("false");
    await fireEvent.pointerDown(target);
    expect(collapsed()).toBe("true");
    vi.spyOn(Element.prototype, "matches").mockImplementation(() => {
      throw new SyntaxError("unsupported selector");
    });
    await fireEvent.focus(target);
    expect(collapsed()).toBe("true");
  });

  it("switches to the mobile layout and lets navigation close the drawer via closeNavigation", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    await nextTick();
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(screen.queryByTestId("navigation")).toBeNull();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(screen.getByTestId("shell")).toHaveAttribute("data-state", "open");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-part", "content");
    expect(dialog.querySelector("nav")).toHaveAttribute("data-mobile", "true");
    expect(dialog.querySelector("nav")).toHaveAttribute(
      "data-collapsed",
      "false",
    );
    expect(dialog).toHaveClass("drawer");
    expect(document.querySelector('[data-part="overlay"]')).toHaveClass(
      "overlay",
    );
    await user.click(screen.getByRole("link", { name: "Books" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("closes the mobile drawer with Escape and restores focus to the header trigger", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    await nextTick();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(
        true,
      ),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("uses one modal navigation on mobile and closes it on route and breakpoint changes", async () => {
    const user = userEvent.setup();
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    mobile = true;
    const { props, container } = renderShell({
      navigationLabel: "Workspace navigation",
      navigationKey: "/one",
    });
    await nextTick();
    expect(container.querySelector("aside")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen.getByRole("dialog", { name: "Workspace navigation" }),
    ).toBeInTheDocument();
    props.navigationKey = "/two";
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await resize(false);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getAllByTestId("navigation")).toHaveLength(1);
    expect(container.querySelector("aside")).not.toBeNull();
    expect(container.querySelector("header button")).toHaveFocus();
    await resize(true);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(warning).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it("does not move focus when leaving mobile with the drawer closed", async () => {
    mobile = true;
    const { container } = renderShell();
    await nextTick();
    await resize(false);
    expect(container.querySelector("header button")).not.toHaveFocus();
  });

  it("localizes the drawer close action", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell({ labels: { closeNavigation: "Close workspace" } });
    await nextTick();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const close = screen.getByRole("button", { name: "Close workspace" });
    expect(close).toHaveAttribute("data-part", "close-button");
    await user.click(close);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("renders the desktop layout on the server", async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(AppShell, { brand: "Minerva" }, { navigation }),
      }),
    );
    expect(html).toContain('data-sidebar-mode="expanded"');
    expect(html).toContain("<aside");
    expect(html).not.toContain("Open navigation");
  });
});

describe("AppShell skip link", () => {
  it("is the first tab stop and moves focus to main", async () => {
    const user = userEvent.setup();
    renderShell();
    await user.tab();
    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toHaveFocus();
    expect(link).toHaveAttribute("data-part", "skip-link");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(link.getAttribute("href")).toBe(`#${screen.getByRole("main").id}`);
  });

  it("accepts a custom text and can be disabled", () => {
    const { unmount } = renderShell({ skipLink: "Jump to page" });
    expect(
      screen.getByRole("link", { name: "Jump to page" }),
    ).toBeInTheDocument();
    unmount();
    renderShell({ skipLink: false });
    expect(screen.queryByRole("link", { name: /skip/i })).toBeNull();
  });

  it("works without matchMedia", async () => {
    vi.restoreAllMocks();
    const original = window.matchMedia;
    // @ts-expect-error simulate an engine without matchMedia
    window.matchMedia = undefined;
    try {
      renderShell();
      await nextTick();
      expect(screen.getByRole("complementary")).toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });
});
