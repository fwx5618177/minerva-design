import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const navigation = (state: AppShellNavigationState) => (
  <nav aria-label="Primary" data-collapsed={String(state.collapsed)}>
    <a href="#home">Home</a>
    <a href="#books" onClick={state.closeNavigation}>
      Books
    </a>
  </nav>
);

const renderShell = (props: Partial<AppShellProps> = {}) =>
  render(
    <AppShell
      brand="Minerva Admin"
      navigation={navigation}
      headerActions={<button type="button">Profile</button>}
      {...props}
    >
      <button type="button">Content action</button>
    </AppShell>,
  );

const headerToggle = () =>
  within(screen.getByRole("banner")).getAllByRole("button")[0]!;

describe("AppShell keyboard (desktop)", () => {
  it("reaches the skip link, sidebar navigation, sidebar controls, header controls and content in order", async () => {
    const user = userEvent.setup();
    renderShell();
    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Books" })).toHaveFocus();
    await user.tab();
    const aside = screen.getByRole("complementary");
    expect(
      within(aside).getByRole("button", { name: "Collapse sidebar" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Enable floating sidebar" }),
    ).toHaveFocus();
    await user.tab();
    expect(headerToggle()).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Profile" })).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Content action" }),
    ).toHaveFocus();
  });

  it("toggles the sidebar from the header with Enter and Space, keeping focus and aria-expanded in sync", async () => {
    const user = userEvent.setup();
    renderShell();
    const toggle = headerToggle();
    act(() => toggle.focus());
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Expand sidebar");
    expect(toggle).toHaveFocus();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveFocus();
  });

  it("toggles the floating pin with Space and exposes aria-pressed", async () => {
    const user = userEvent.setup();
    const onSidebarModeChange = vi.fn();
    renderShell({ onSidebarModeChange });
    const pin = screen.getByRole("button", { name: "Enable floating sidebar" });
    act(() => pin.focus());
    await user.keyboard(" ");
    expect(onSidebarModeChange).toHaveBeenLastCalledWith("floating");
    expect(pin).toHaveAttribute("aria-pressed", "true");
    expect(pin).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onSidebarModeChange).toHaveBeenLastCalledWith("compact");
    expect(pin).toHaveAttribute("aria-pressed", "false");
  });
});

describe("AppShell keyboard (mobile drawer)", () => {
  it("opens the drawer with Enter, moves focus inside, traps Tab and closes with the close button", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    act(() => trigger.focus());
    await user.keyboard("{Enter}");
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    // Tab cycles inside the modal drawer
    for (let i = 0; i < 5; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    const close = within(dialog).getByRole("button", {
      name: "Close navigation",
    });
    act(() => close.focus());
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the drawer when a navigation link is activated with Enter and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    act(() => trigger.focus());
    await user.keyboard(" ");
    const link = within(screen.getByRole("dialog")).getByRole("link", {
      name: "Books",
    });
    act(() => link.focus());
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });
});

describe("AppShell skip link", () => {
  it("is the first tab stop and moves focus to main with Enter", async () => {
    const user = userEvent.setup();
    renderShell();
    await user.tab();
    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveFocus();
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(skip).toHaveAttribute("href", `#${main.id}`);
    await user.keyboard("{Enter}");
    expect(main).toHaveFocus();
    // Tab continues from the content
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Content action" }),
    ).toHaveFocus();
  });

  it("moves focus to main on click and is first in mobile layout too", async () => {
    const user = userEvent.setup();
    mobile = true;
    renderShell();
    await user.tab();
    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveFocus();
    await user.click(skip);
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("accepts a custom text and can be disabled", async () => {
    const user = userEvent.setup();
    const { unmount } = renderShell({ skipLink: "Jump to main" });
    expect(
      screen.getByRole("link", { name: "Jump to main" }),
    ).toBeInTheDocument();
    unmount();
    renderShell({ skipLink: false });
    expect(
      screen.queryByRole("link", { name: "Skip to content" }),
    ).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
  });
});
