import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaBadge } from "./badge";
import "../../elements/badge";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const badgeOf = (el: Element) => $(el, ".badge");

describe("<minerva-badge>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-badge")).toBe(MinervaBadge);
  });

  it("renders a standalone badge with text children as its content", async () => {
    const el = await mount<MinervaBadge>(`<minerva-badge>5</minerva-badge>`);
    const badge = badgeOf(el);
    expect(badge.classList).toContain("standalone");
    expect(badge.classList).toContain("primary");
    expect(badge.classList).toContain("solid");
    expect(badge.classList).toContain("medium");
    expect(badge).toHaveAttribute("role", "status");
    expect(badge.querySelector("slot:not([name])")).not.toBeNull();
    expect(el.shadowRoot!.querySelector(".badgeWrapper")).toBeNull();
  });

  it("attaches to element children at a corner with the content attribute", async () => {
    const el = await mount<MinervaBadge>(
      `<minerva-badge content="3" position="bottom-left"><button>Inbox</button></minerva-badge>`,
    );
    expect(
      el.shadowRoot!.querySelector(".badgeWrapper .content slot"),
    ).not.toBeNull();
    const badge = badgeOf(el);
    expect(badge.classList).toContain("bottom-left");
    expect(badge.classList).not.toContain("standalone");
    expect(badge.textContent).toContain("3");
  });

  it("falls back to the localized default text when attached without content", async () => {
    const el = await mount<MinervaBadge>(
      `<minerva-badge><button>Inbox</button></minerva-badge>`,
    );
    expect(badgeOf(el).textContent?.trim()).toBe("Badge");
  });

  it("uses text children as the anchor when content is set", async () => {
    const el = await mount<MinervaBadge>(
      `<minerva-badge content="New">Inbox</minerva-badge>`,
    );
    expect(el.shadowRoot!.querySelector(".badgeWrapper")).not.toBeNull();
    expect(badgeOf(el).textContent).toContain("New");
  });

  it("renders a dot without content, plus icon, radius and width", async () => {
    const el = await mount<MinervaBadge>(
      `<minerva-badge dot aria-label="Unread" border-radius="2px" border-width="3px"><span slot="icon">*</span><button>x</button></minerva-badge>`,
    );
    const badge = badgeOf(el);
    expect(badge.classList).toContain("dot");
    expect(badge).toHaveAttribute("aria-label", "Unread");
    expect(badge.style.borderRadius).toBe("2px");
    expect(badge.style.borderWidth).toBe("3px");
    expect(badge.querySelector(".icon slot[name=icon]")).not.toBeNull();
    expect(badge.textContent?.trim()).toBe("");
  });

  it("reflects attributes and accepts a custom role", async () => {
    const el = await mount<MinervaBadge>(
      `<minerva-badge badge-role="presentation">1</minerva-badge>`,
    );
    expect(el.getAttribute("color")).toBe("primary");
    el.color = "danger";
    el.variant = "outline";
    await el.updateComplete;
    expect(el.getAttribute("variant")).toBe("outline");
    expect(badgeOf(el).classList).toContain("danger");
    expect(badgeOf(el)).toHaveAttribute("role", "presentation");
  });

  it("translates the default text", async () => {
    const el = await mount<MinervaBadge>(
      `<div lang="zh"><minerva-badge><button>x</button></minerva-badge></div>`,
      "minerva-badge",
    );
    expect(badgeOf(el).textContent?.trim()).not.toBe("");
  });

  it("warns about unlabeled announced dots", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-badge dot></minerva-badge>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("aria-label"));
  });
});
