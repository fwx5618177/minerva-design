import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaTextLink } from "./text-link";
import "../../elements/text-link";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const link = (el: Element) => $<HTMLAnchorElement>(el, "a");

describe("<minerva-text-link>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-text-link")).toBe(MinervaTextLink);
  });

  it("renders a native anchor with the React library's classes", async () => {
    const el = await mount<MinervaTextLink>(
      `<minerva-text-link href="/docs" target="_blank" rel="noopener">Docs</minerva-text-link>`,
    );
    const a = link(el);
    expect(a.classList).toContain("textLink");
    expect(a.classList).toContain("default");
    expect(a).toHaveAttribute("href", "/docs");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener");
    expect(a.querySelector("svg")).toBeNull();
    expect(el.getAttribute("variant")).toBeNull();
  });

  it("adds a decorative chevron to the subtle variant", async () => {
    const el = await mount<MinervaTextLink>(
      `<minerva-text-link href="#" variant="subtle">More</minerva-text-link>`,
    );
    const icon = link(el).querySelector("svg")!;
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(link(el).classList).toContain("subtle");
    el.variant = "action";
    await el.updateComplete;
    expect(link(el).classList).toContain("action");
    expect(link(el).querySelector("svg")).toBeNull();
  });

  it("is focused through focus() and activated with Enter", async () => {
    const el = await mount<MinervaTextLink>(
      `<minerva-text-link href="#next">Next</minerva-text-link>`,
    );
    const onClick = vi.fn((e: Event) => e.preventDefault());
    el.addEventListener("click", onClick);
    el.focus();
    expect(el.shadowRoot!.activeElement).toBe(link(el));
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    // Space does not activate links
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards aria-label and aria-current", async () => {
    const el = await mount<MinervaTextLink>(
      `<minerva-text-link href="#" aria-label="Settings page" aria-current="page">S</minerva-text-link>`,
    );
    expect(link(el)).toHaveAttribute("aria-label", "Settings page");
    expect(link(el)).toHaveAttribute("aria-current", "page");
    el.removeAttribute("aria-current");
    await settle();
    expect(link(el)).not.toHaveAttribute("aria-current");
  });

  it("warns without href", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-text-link>x</minerva-text-link>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("href"));
  });
});
