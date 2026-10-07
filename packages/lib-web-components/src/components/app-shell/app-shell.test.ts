import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement } from "@minerva/core";
import { MinervaAppShell } from "./app-shell";
import "../../elements/app-shell";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

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
  resetDevWarnings();
  document.documentElement.removeAttribute("lang");
});

const setMobile = async (value: boolean) => {
  mobile = value;
  for (const listener of [...listeners]) listener();
  await settle();
};

const setup = (attrs = "") =>
  mount<MinervaAppShell>(
    `<minerva-app-shell brand="Minerva Admin" ${attrs}>
       <nav slot="navigation" aria-label="Primary">
         <a href="#home" id="home">Home</a>
         <a href="#books" id="books">Books</a>
       </nav>
       <button slot="header-actions" id="profile">Profile</button>
       <button id="content">Content action</button>
     </minerva-app-shell>`,
    "minerva-app-shell",
  );

const headerToggle = (el: MinervaAppShell) =>
  $<HTMLButtonElement>(el, "header button");
const byLabel = (el: MinervaAppShell, label: string) =>
  $<HTMLButtonElement>(el, `button[aria-label="${label}"]`);

describe("<minerva-app-shell> (desktop)", () => {
  it("registers and renders the landmarks with lib-core's classes", async () => {
    expect(customElements.get("minerva-app-shell")).toBe(MinervaAppShell);
    const el = await setup();
    const shell = $(el, ".shell");
    expect(shell.dataset.sidebarMode).toBe("expanded");
    expect(shell.hasAttribute("data-sidebar-expanded")).toBe(true);
    const aside = $(el, "aside.sidebar");
    expect(aside).toHaveAttribute("aria-label", "Navigation");
    expect(aside.querySelector("slot[name=navigation]")).not.toBeNull();
    expect($(el, ".brandLabel").textContent?.trim()).toBe("Minerva Admin");
    expect($(el, "header.header")).not.toBeNull();
    const main = $(el, "main");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(main.querySelector("slot:not([name])")).not.toBeNull();
    expect(el.mobile).toBe(false);
    expect(el.collapsed).toBe(false);
  });

  it("toggles the sidebar from the header with Enter and Space, keeping aria-expanded in sync", async () => {
    const el = await setup();
    const onMode = vi.fn();
    el.addEventListener("minerva-sidebar-mode-change", onMode);
    headerToggle(el).focus();
    expect(headerToggle(el)).toHaveAttribute("aria-expanded", "true");
    expect(headerToggle(el)).toHaveAttribute("aria-label", "Collapse sidebar");
    expect(headerToggle(el)).toHaveAttribute("aria-controls", "sidebar");
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.sidebarMode).toBe("compact");
    expect(onMode.mock.calls[0][0].detail).toEqual({ mode: "compact" });
    expect(el.getAttribute("sidebar-mode")).toBe("compact");
    expect(el.hasAttribute("collapsed")).toBe(true);
    expect(headerToggle(el)).toHaveAttribute("aria-expanded", "false");
    expect(headerToggle(el)).toHaveAttribute("aria-label", "Expand sidebar");
    expect(getActiveElement()).toBe(headerToggle(el));
    await userEvent.keyboard(" ");
    await settle();
    expect(el.sidebarMode).toBe("expanded");
    expect(headerToggle(el)).toHaveAttribute("aria-expanded", "true");
  });

  it("the mode change is cancelable", async () => {
    const el = await setup();
    el.addEventListener("minerva-sidebar-mode-change", (e) =>
      e.preventDefault(),
    );
    headerToggle(el).click();
    await settle();
    expect(el.sidebarMode).toBe("expanded");
  });

  it("toggles the floating pin with Space and exposes aria-pressed", async () => {
    const el = await setup();
    const onMode = vi.fn();
    el.addEventListener("minerva-sidebar-mode-change", onMode);
    const pin = byLabel(el, "Enable floating sidebar");
    pin.focus();
    await userEvent.keyboard(" ");
    await settle();
    expect(onMode.mock.calls.at(-1)![0].detail.mode).toBe("floating");
    expect(pin).toHaveAttribute("aria-pressed", "true");
    expect(pin).toHaveAttribute("aria-label", "Disable floating sidebar");
    expect(getActiveElement()).toBe(pin);
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(onMode.mock.calls.at(-1)![0].detail.mode).toBe("compact");
    expect(pin).toHaveAttribute("aria-pressed", "false");
  });

  it("floating rail expands while hovered", async () => {
    const el = await setup('sidebar-mode="floating"');
    expect(el.collapsed).toBe(true);
    expect($(el, ".shell").hasAttribute("data-sidebar-expanded")).toBe(false);
    $(el, "aside").dispatchEvent(new MouseEvent("mouseenter"));
    await settle();
    expect(el.collapsed).toBe(false);
    $(el, "aside").dispatchEvent(new MouseEvent("mouseleave"));
    await settle();
    expect(el.collapsed).toBe(true);
  });

  it("floating rail expands while it holds keyboard focus (Tab)", async () => {
    const el = await setup('sidebar-mode="floating"');
    const pin = byLabel(el, "Disable floating sidebar");
    pin.focus();
    // user-event dispatches keys on document.activeElement (the host), so
    // the Tab keydown is dispatched from the focused control itself
    pin.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        composed: true,
      }),
    );
    await settle();
    expect(el.collapsed).toBe(false);
    $(el, "aside").dispatchEvent(new PointerEvent("pointerdown"));
    await settle();
    expect(el.collapsed).toBe(true);
  });

  it("uses the label overrides and the locale", async () => {
    document.documentElement.lang = "zh";
    const el = await setup('collapse-label="Hide menu"');
    expect(headerToggle(el)).toHaveAttribute("aria-label", "Hide menu");
    expect($(el, "aside").getAttribute("aria-label")).not.toBe("Navigation");
    expect($(el, ".skipLink").textContent?.trim()).not.toBe("Skip to content");
  });

  it("warns in development when the navigation slot is empty", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-app-shell brand="X"></minerva-app-shell>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("navigation"));
  });
});

describe("<minerva-app-shell> skip link", () => {
  it("moves focus to main with Enter and on click", async () => {
    const el = await setup();
    const skip = $<HTMLAnchorElement>(el, "a.skipLink");
    expect(skip.textContent?.trim()).toBe("Skip to content");
    expect(skip.getAttribute("href")).toBe("#main");
    skip.focus();
    await userEvent.keyboard("{Enter}");
    expect(getActiveElement()).toBe($(el, "main"));
    headerToggle(el).focus();
    await userEvent.click(skip);
    expect(getActiveElement()).toBe($(el, "main"));
  });

  it("accepts a custom text and can be removed", async () => {
    const el = await setup('skip-link="Jump to main"');
    expect($(el, "a.skipLink").textContent?.trim()).toBe("Jump to main");
    el.noSkipLink = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("a.skipLink")).toBeNull();
  });
});

describe("<minerva-app-shell> (mobile drawer)", () => {
  it("moves the navigation into a modal drawer opened from the header", async () => {
    mobile = true;
    const el = await setup();
    expect(el.mobile).toBe(true);
    expect(el.shadowRoot!.querySelector("aside")).toBeNull();
    expect(el.shadowRoot!.querySelector("slot[name=navigation]")).toBeNull();
    const trigger = headerToggle(el);
    expect(trigger).toHaveAttribute("aria-label", "Open navigation");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    const dialog = $(el, "[role=dialog]");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      $(el, "#" + dialog.getAttribute("aria-labelledby")).textContent,
    ).toBe("Navigation");
    expect(
      dialog.querySelector(".drawerBody slot[name=navigation]"),
    ).not.toBeNull();
    expect(headerToggle(el)).toHaveAttribute("aria-expanded", "true");
    // focus moved inside (core's focus scope prefers non-link tabbables)
    const close = byLabel(el, "Close navigation");
    expect(getActiveElement()).toBe(close);

    // trap edges (user-event's Tab order ignores shadow DOM: see modal tests)
    await userEvent.tab();
    expect(getActiveElement()).toBe(document.getElementById("home"));

    close.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.shadowRoot!.querySelector("[role=dialog]")).toBeNull();
    expect(getActiveElement()).toBe(headerToggle(el));
    expect(headerToggle(el)).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape, on closeNavigation() and on a navigation-key change", async () => {
    mobile = true;
    const el = await setup('navigation-key="a"');
    const onOpen = vi.fn();
    el.addEventListener("minerva-open-change", onOpen);
    headerToggle(el).click();
    await settle();
    expect(onOpen.mock.calls[0][0].detail).toEqual({ open: true });
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.shadowRoot!.querySelector("[role=dialog]")).toBeNull();
    expect(onOpen.mock.calls[1][0].detail).toEqual({ open: false });

    el.openNavigation();
    await settle();
    document
      .getElementById("books")!
      .addEventListener("click", () => el.closeNavigation());
    document.getElementById("books")!.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.shadowRoot!.querySelector("[role=dialog]")).toBeNull();
    expect(getActiveElement()).toBe(headerToggle(el));

    el.openNavigation();
    await settle();
    el.navigationKey = "b";
    await settle();
    expect(el.shadowRoot!.querySelector("[role=dialog]")).toBeNull();
  });

  it("leaving the mobile layout closes the drawer and focuses the desktop toggle", async () => {
    mobile = true;
    const el = await setup();
    headerToggle(el).click();
    await settle();
    await wait(5);
    await setMobile(false);
    expect(el.mobile).toBe(false);
    expect(el.shadowRoot!.querySelector("[role=dialog]")).toBeNull();
    expect($(el, "aside slot[name=navigation]")).not.toBeNull();
    expect(getActiveElement()).toBe(headerToggle(el));
    expect(headerToggle(el)).toHaveAttribute("aria-label", "Collapse sidebar");
  });
});
