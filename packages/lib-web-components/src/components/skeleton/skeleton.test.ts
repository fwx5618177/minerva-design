import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaSkeleton, MinervaSkeletonText } from "./skeleton";
import "../../elements/skeleton";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const all = (el: Element, selector: string) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(selector));

describe("<minerva-skeleton>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-skeleton")).toBe(MinervaSkeleton);
    expect(customElements.get("minerva-skeleton-text")).toBe(
      MinervaSkeletonText,
    );
  });

  it("is a busy status region named Loading with one text line", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton></minerva-skeleton>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("role", "status");
    expect(base).toHaveAttribute("aria-busy", "true");
    expect(base).toHaveAttribute("aria-label", "Loading");
    expect(base.classList).toContain("skeletonRoot");
    const lines = all(el, ".content .skeleton");
    expect(lines).toHaveLength(1);
    expect(lines[0].classList).toContain("text");
    expect(lines[0].classList).toContain("animation-pulse");
    expect(el.getAttribute("variant")).toBeNull();
  });

  it("renders lines with sizes (numbers are pixels)", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton lines="3" width="120" height="2rem" border-radius="4" animation="wave"></minerva-skeleton>`,
    );
    const lines = all(el, ".content .skeleton");
    expect(lines).toHaveLength(3);
    expect(lines[0].style.width).toBe("120px");
    expect(lines[0].style.height).toBe("2rem");
    expect(lines[0].style.borderRadius).toBe("4px");
    expect(lines[0].classList).toContain("animation-wave");
  });

  it("renders avatar, title and paragraph placeholders", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton avatar avatar-shape="square" avatar-size="48" heading paragraph></minerva-skeleton>`,
    );
    expect($(el, "[part=base]").classList).toContain("withAvatar");
    const avatar = $(el, ".avatar");
    expect(avatar.classList).toContain("avatar-square");
    expect(avatar.style.width).toBe("48px");
    expect($(el, ".title")).not.toBeNull();
    expect(all(el, ".paragraph .skeleton")).toHaveLength(4);
    // title / paragraph replace the lines
    expect(all(el, ".content > .skeleton.text")).toHaveLength(0);
  });

  it("renders the card variant", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton variant="card" active avatar heading></minerva-skeleton>`,
    );
    expect($(el, ".card").classList).toContain("active");
    expect($(el, ".card .cardContent .title")).not.toBeNull();
  });

  it("renders a decorative block", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton decorative variant="circular" size="24"></minerva-skeleton>`,
    );
    const block = $(el, "span[part=base]");
    expect(block).toHaveAttribute("aria-hidden", "true");
    expect(block).not.toHaveAttribute("role");
    expect(block.classList).toContain("decorative");
    expect(block.style.width).toBe("24px");
    expect(block.style.height).toBe("24px");
  });

  it("shows the slotted content once loaded", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton><p>Ready</p></minerva-skeleton>`,
    );
    expect(el.shadowRoot!.querySelector("slot")).toBeNull();
    el.loaded = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("[role=status]")).toBeNull();
    expect(el.hasAttribute("loaded")).toBe(true);
  });

  it("uses aria-label and translates the default name", async () => {
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton aria-label="Loading profile"></minerva-skeleton>`,
    );
    expect($(el, "[part=base]")).toHaveAttribute(
      "aria-label",
      "Loading profile",
    );
    const fr = await mount<MinervaSkeleton>(
      `<minerva-config locale="ja"><minerva-skeleton></minerva-skeleton></minerva-config>`,
      "minerva-skeleton",
    );
    expect($(fr, "[part=base]").getAttribute("aria-label")).not.toBe("Loading");
  });

  it("warns about invalid line counts", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaSkeleton>(
      `<minerva-skeleton lines="-2"></minerva-skeleton>`,
    );
    expect(all(el, ".content .skeleton")).toHaveLength(0);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("lines"));
  });
});

describe("<minerva-skeleton-text>", () => {
  it("renders decorative lines with a shortened last line", async () => {
    const el = await mount<MinervaSkeletonText>(
      `<minerva-skeleton-text></minerva-skeleton-text>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("aria-hidden", "true");
    expect(base.classList).toContain("skeletonText");
    expect(base.style.gap).toBe("var(--space-2)");
    const lines = all(el, "[part=line]");
    expect(lines).toHaveLength(3);
    expect(lines[0].className).toContain("skeleton decorative text");
    expect(lines[0].style.height).toBe("1em");
    expect(lines[2].style.width).toBe("70%");
  });

  it("supports lines, line-height, gap and no-shrink-last", async () => {
    const el = await mount<MinervaSkeletonText>(
      `<minerva-skeleton-text lines="2" line-height="12" gap="6px" no-shrink-last></minerva-skeleton-text>`,
    );
    const lines = all(el, "[part=line]");
    expect(lines).toHaveLength(2);
    expect(lines[1].style.width).toBe("100%");
    expect(lines[1].style.height).toBe("12px");
    expect($(el, "[part=base]").style.gap).toBe("6px");
  });

  it("warns about invalid line counts", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-skeleton-text lines="1.5"></minerva-skeleton-text>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("lines"));
  });
});
