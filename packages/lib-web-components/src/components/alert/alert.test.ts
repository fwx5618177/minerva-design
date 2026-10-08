import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaAlert } from "./alert";
import "../../elements/alert";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const closeButton = (el: Element) => $<HTMLButtonElement>(el, ".closeButton");

describe("<minerva-alert>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-alert")).toBe(MinervaAlert);
  });

  it("renders lib-core's structure and classes", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert heading="Heads up">Body</minerva-alert>`,
    );
    const base = $(el, "[part=root]");
    for (const cls of [
      "alert",
      "info",
      "subtle",
      "medium",
      "withIcon",
      "withTitle",
      "withAnimation",
      "animation-slideIn",
      "rounded",
      "expanded",
    ]) {
      expect(base.classList).toContain(cls);
    }
    expect(base).toHaveAttribute("role", "status");
    expect($(el, ".icon")).toHaveAttribute("role", "img");
    expect($(el, ".icon")).toHaveAttribute("aria-label", "info icon");
    expect($(el, ".title").textContent).toContain("Heads up");
    expect($(el, ".message slot")).not.toBeNull();
  });

  it("uses role=alert for danger / warning and honours alert-role", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert color="danger">x</minerva-alert>`,
    );
    expect($(el, "[part=root]")).toHaveAttribute("role", "alert");
    expect($(el, ".icon")).toHaveAttribute("aria-label", "danger icon");
    el.alertRole = "note";
    await el.updateComplete;
    expect($(el, "[part=root]")).toHaveAttribute("role", "note");
  });

  it("supports hide-icon, square, no-animation, banner, elevation and border-radius", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert hide-icon square no-animation banner elevation border-radius="6">x</minerva-alert>`,
    );
    const base = $(el, "[part=root]");
    expect(el.shadowRoot!.querySelector(".icon")).toBeNull();
    expect(base.classList).not.toContain("rounded");
    expect(base.classList).not.toContain("withAnimation");
    expect(base.classList).toContain("banner");
    expect(base.classList).toContain("withElevation");
    expect(base.style.borderRadius).toBe("6px");
  });

  it("closes with Space, fires minerva-close and hides itself", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert closable>Body</minerva-alert>`,
    );
    const onClose = vi.fn();
    el.addEventListener("minerva-close", onClose);
    closeButton(el).focus();
    await userEvent.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(el.hidden).toBe(true);
  });

  it("stays visible when minerva-close is canceled", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert closable close-label="Dismiss">Body</minerva-alert>`,
    );
    expect(closeButton(el)).toHaveAttribute("aria-label", "Dismiss");
    el.addEventListener("minerva-close", (e) => e.preventDefault());
    await userEvent.click(closeButton(el));
    expect(el.hidden).toBe(false);
  });

  it("moves focus to the next focusable element after closing", async () => {
    await mount(
      `<button>Before</button><minerva-alert closable>Body</minerva-alert><button id="after">After</button>`,
    );
    const el = document.querySelector<MinervaAlert>("minerva-alert")!;
    closeButton(el).focus();
    await userEvent.keyboard("{Enter}");
    expect(document.activeElement).toBe(document.getElementById("after"));
  });

  it("falls back to the previous focusable element, then to the container", async () => {
    await mount(
      `<input aria-label="Name" /><minerva-alert closable>Body</minerva-alert>`,
    );
    let el = document.querySelector<MinervaAlert>("minerva-alert")!;
    await userEvent.click(closeButton(el));
    expect(document.activeElement).toBe(document.querySelector("input"));

    await mount(
      `<section aria-label="Notices"><minerva-alert closable>Body</minerva-alert></section>`,
    );
    el = document.querySelector<MinervaAlert>("minerva-alert")!;
    await userEvent.click(closeButton(el));
    expect(document.activeElement).toBe(document.querySelector("section"));
  });

  it("focuses returnFocus (element or getter) and respects listener focus moves", async () => {
    await mount(
      `<button id="trigger">Trigger</button><minerva-alert closable>Body</minerva-alert><button>After</button>`,
    );
    const trigger = document.getElementById("trigger")!;
    let el = document.querySelector<MinervaAlert>("minerva-alert")!;
    el.returnFocus = () => trigger;
    await userEvent.click(closeButton(el));
    expect(document.activeElement).toBe(trigger);

    await mount(
      `<input id="target" /><minerva-alert closable>Body</minerva-alert><button>After</button>`,
    );
    el = document.querySelector<MinervaAlert>("minerva-alert")!;
    el.addEventListener("minerva-close", () =>
      document.getElementById("target")!.focus(),
    );
    await userEvent.click(closeButton(el));
    expect(document.activeElement).toBe(document.getElementById("target"));
  });

  it("still moves focus when a listener removes the alert", async () => {
    await mount(
      `<minerva-alert closable>Body</minerva-alert><button id="after">After</button>`,
    );
    const el = document.querySelector<MinervaAlert>("minerva-alert")!;
    el.addEventListener("minerva-close", () => el.remove());
    await userEvent.click(closeButton(el));
    expect(el.isConnected).toBe(false);
    expect(document.activeElement).toBe(document.getElementById("after"));
  });

  it("toggles collapsible content with Enter and Space", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert heading="Details" collapsible>Body</minerva-alert>`,
    );
    const onToggle = vi.fn();
    el.addEventListener("minerva-expanded-change", onToggle);
    const toggle = $<HTMLButtonElement>(el, ".expandButton");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", "message");
    expect(toggle).toHaveAttribute("aria-label", "Collapse");
    toggle.focus();
    await userEvent.keyboard("{Enter}");
    expect(el.collapsed).toBe(true);
    expect(onToggle.mock.calls[0][0].detail).toEqual({ expanded: false });
    await el.updateComplete;
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-label", "Expand");
    expect(el.shadowRoot!.querySelector(".message")).toBeNull();
    expect(el.shadowRoot!.activeElement).toBe(toggle);
    await userEvent.keyboard(" ");
    expect(el.collapsed).toBe(false);
  });

  it("keeps the state when minerva-expanded-change is canceled", async () => {
    const el = await mount<MinervaAlert>(
      `<minerva-alert heading="Details" collapsible>Body</minerva-alert>`,
    );
    el.addEventListener("minerva-expanded-change", (e) => e.preventDefault());
    await userEvent.click($(el, ".expandButton"));
    expect(el.collapsed).toBe(false);
  });

  it("renders the action slot and translated labels", async () => {
    const el = await mount<MinervaAlert>(
      `<div lang="fr"><minerva-alert closable><button slot="action">Undo</button>x</minerva-alert></div>`,
      "minerva-alert",
    );
    expect(el.shadowRoot!.querySelector(".action slot")).not.toBeNull();
    expect(closeButton(el)).toHaveAttribute("aria-label", "Fermer");
  });

  it("warns when collapsible has no heading", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaAlert>(
      `<minerva-alert collapsible>Body</minerva-alert>`,
    );
    expect(el.shadowRoot!.querySelector(".expandButton")).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("heading"));
  });
});
