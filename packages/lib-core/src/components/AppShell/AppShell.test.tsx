import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

const resize = (next: boolean) =>
  act(() => {
    mobile = next;
    for (const listener of listeners) listener();
  });

const navigation = (state: AppShellNavigationState) => (
  <nav
    aria-label="Primary"
    data-testid="navigation"
    data-mobile={String(state.isMobile)}
    data-collapsed={String(state.collapsed)}
  >
    <button type="button" onClick={state.expandNavigation}>
      Expand group
    </button>
    <a href="#books" onClick={state.closeNavigation}>
      Books
    </a>
  </nav>
);

const shell = (props: Partial<AppShellProps> = {}) => (
  <AppShell
    brand="Minerva Admin"
    brandIcon={<svg data-testid="brand-icon" />}
    navigation={navigation}
    data-testid="shell"
    {...props}
  >
    <h1>Content</h1>
  </AppShell>
);

const renderShell = (props: Partial<AppShellProps> = {}) =>
  render(shell(props));

const collapsed = () =>
  screen.getByTestId("navigation").getAttribute("data-collapsed");

describe("AppShell", () => {
  it("exposes landmarks: labelled complementary sidebar, banner header and main content", () => {
    renderShell({
      navigationLabel: "Site navigation",
      headerActions: <button type="button">Account</button>,
      pageNavigation: <nav aria-label="Open pages">Open pages</nav>,
    });
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

  it("uses a localized default navigation label", () => {
    renderShell();
    expect(
      screen.getByRole("complementary", { name: "Navigation" }),
    ).toBeInTheDocument();
  });

  it("reflects sidebar state in data attributes and forwards ref and native attributes", () => {
    const ref = createRef<HTMLDivElement>();
    renderShell({ className: "consumer", id: "shell", ref });
    const root = screen.getByTestId("shell");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("shell", "consumer");
    expect(root).toHaveAttribute("id", "shell");
    expect(root).toHaveAttribute("data-sidebar-mode", "expanded");
    expect(root).toHaveAttribute("data-sidebar-expanded", "true");
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

  it("toggles compact and floating modes, expands on hover and expands a compact group", () => {
    renderShell();
    fireEvent.click(
      screen.getAllByRole("button", { name: "Collapse sidebar" })[0]!,
    );
    expect(collapsed()).toBe("true");
    fireEvent.click(
      screen.getByRole("button", { name: "Enable floating sidebar" }),
    );
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-mode",
      "floating",
    );
    const sidebar = screen.getByRole("complementary");
    fireEvent.mouseEnter(sidebar);
    expect(collapsed()).toBe("false");
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-expanded",
      "true",
    );
    fireEvent.mouseLeave(sidebar);
    expect(collapsed()).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Expand group" }));
    expect(collapsed()).toBe("false");
    expect(screen.getByTestId("shell")).toHaveAttribute(
      "data-sidebar-mode",
      "expanded",
    );
  });

  it("respects controlled mode and localizes controls", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    const { rerender } = renderShell({
      sidebarMode: "compact",
      onSidebarModeChange: changed,
      labels: { expand: "Expand navigation" },
    });
    await user.click(
      screen.getAllByRole("button", { name: "Expand navigation" })[0]!,
    );
    expect(changed).toHaveBeenLastCalledWith("expanded");
    expect(collapsed()).toBe("true");
    rerender(shell({ sidebarMode: "expanded", onSidebarModeChange: changed }));
    expect(collapsed()).toBe("false");
  });

  it("keeps floating navigation expanded during keyboard use until focus leaves", () => {
    renderShell({ defaultSidebarMode: "floating" });
    const target = screen.getByRole("button", { name: "Expand group" });
    act(() => {
      target.focus();
      target.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
      );
    });
    expect(collapsed()).toBe("false");
    fireEvent.mouseLeave(screen.getByRole("complementary"));
    expect(collapsed()).toBe("false");
    act(() => screen.getByRole("banner").querySelector("button")!.focus());
    expect(collapsed()).toBe("true");
  });

  it("expands on keyboard focus and collapses again on pointer use", () => {
    renderShell({ defaultSidebarMode: "floating" });
    const target = screen.getByRole("button", { name: "Expand group" });
    const matches = vi
      .spyOn(Element.prototype, "matches")
      .mockImplementation((selector: string) => selector === ":focus-visible");
    fireEvent.focus(target);
    matches.mockRestore();
    expect(collapsed()).toBe("false");
    fireEvent.pointerDown(target);
    expect(collapsed()).toBe("true");
    fireEvent.focus(target);
    expect(collapsed()).toBe("true");
  });

  it("switches to the mobile layout and lets navigation close the drawer via closeNavigation", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(screen.queryByTestId("navigation")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog.querySelector("nav")).toHaveAttribute("data-mobile", "true");
    expect(dialog.querySelector("nav")).toHaveAttribute(
      "data-collapsed",
      "false",
    );
    expect(dialog).toHaveClass("drawer");
    await user.click(screen.getByRole("link", { name: "Books" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the mobile drawer with Escape and restores focus to the header trigger", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("uses one modal navigation on mobile and closes it on route and breakpoint changes", async () => {
    const user = userEvent.setup();
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    mobile = true;
    const { rerender, container } = renderShell({
      navigationLabel: "Workspace navigation",
      navigationKey: "/one",
    });
    expect(container.querySelector("aside")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen.getByRole("dialog", { name: "Workspace navigation" }),
    ).toBeInTheDocument();
    rerender(
      shell({ navigationLabel: "Workspace navigation", navigationKey: "/two" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    resize(false);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getAllByTestId("navigation")).toHaveLength(1);
    expect(container.querySelector("aside")).not.toBeNull();
    expect(container.querySelector("header button")).toHaveFocus();
    resize(true);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(warning).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it("does not move focus when leaving mobile with the drawer closed", () => {
    mobile = true;
    const { container } = renderShell();
    resize(false);
    expect(container.querySelector("header button")).not.toHaveFocus();
  });

  it("localizes the drawer close action", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell({ labels: { closeNavigation: "Close workspace" } });
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.click(screen.getByRole("button", { name: "Close workspace" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders the desktop layout on the server", () => {
    const html = renderToString(shell());
    expect(html).toContain('data-sidebar-mode="expanded"');
    expect(html).toContain("<aside");
    expect(html).not.toContain("Open navigation");
  });
});
