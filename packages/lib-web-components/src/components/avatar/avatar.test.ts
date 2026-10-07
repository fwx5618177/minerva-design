import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaAvatar, MinervaAvatarGroup } from "./avatar";
import "../../elements/avatar";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-avatar>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-avatar")).toBe(MinervaAvatar);
    expect(customElements.get("minerva-avatar-group")).toBe(MinervaAvatarGroup);
  });

  it("shows the initials as a named image when there is no src", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar name="Ada Lovelace"></minerva-avatar>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("role", "img");
    expect(base).toHaveAttribute("aria-label", "Ada Lovelace");
    expect(base.classList).toContain("avatar");
    expect(base.classList).toContain("circle");
    expect(base.classList).toContain("medium");
    expect($(el, ".avatarText").textContent?.trim()).toBe("AL");
    expect($(el, ".avatarText")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses the first CJK character", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar name="张三"></minerva-avatar>`,
    );
    expect($(el, ".avatarText").textContent?.trim()).toBe("张");
  });

  it("renders the image with the name as alt and falls back on error", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar src="a.png" name="Ada"></minerva-avatar>`,
    );
    const img = $<HTMLImageElement>(el, "img");
    expect(img.className).toBe("avatarImg");
    expect(img).toHaveAttribute("alt", "Ada");
    img.dispatchEvent(new Event("error"));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("img")).toBeNull();
    expect($(el, "[role=img]")).toHaveAttribute("aria-label", "Ada");
    // a new src is tried again
    el.src = "b.png";
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("img")).not.toBeNull();
  });

  it("supports a decorative image (alt='')", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar src="a.png" name="Ada" alt=""></minerva-avatar>`,
    );
    expect($(el, "img")).toHaveAttribute("alt", "");
  });

  it("uses slotted fallback content and the localized default label", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar><svg></svg></minerva-avatar>`,
    );
    expect(
      el.shadowRoot!.querySelector(".avatarText slot:not([name])"),
    ).not.toBeNull();
    expect($(el, "[role=img]")).toHaveAttribute("aria-label", "avatar");
    el.innerHTML = `<span slot="fallback">?</span>`;
    el.name = "Ada";
    await settle();
    expect(el.shadowRoot!.querySelector("slot[name=fallback]")).not.toBeNull();
  });

  it("prefers aria-label on the host", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar name="Ada" aria-label="Profile"></minerva-avatar>`,
    );
    expect($(el, "[role=img]")).toHaveAttribute("aria-label", "Profile");
  });

  it("reflects shape / size / stacked and supports numeric sizes", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-avatar name="A" shape="rounded" size="40" stacked></minerva-avatar>`,
    );
    expect(el.size).toBe(40);
    const base = $(el, "[part=base]");
    expect(base.classList).toContain("rounded");
    expect(base.classList).toContain("stacked");
    expect(base.style.getPropertyValue("--avatar-size")).toBe("40px");
    el.size = "large";
    await el.updateComplete;
    expect(el.getAttribute("size")).toBe("large");
    expect(base.classList).toContain("large");
  });

  it("follows the locale", async () => {
    const el = await mount<MinervaAvatar>(
      `<minerva-config locale="zh"><minerva-avatar></minerva-avatar></minerva-config>`,
      "minerva-avatar",
    );
    expect($(el, "[role=img]")).toHaveAttribute("aria-label", "头像");
  });

  it("warns about unknown size presets", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-avatar size="huge"></minerva-avatar>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("unknown size"));
  });
});

describe("<minerva-avatar-group>", () => {
  it("wraps each avatar in an item and labels the group", async () => {
    const el = await mount<MinervaAvatarGroup>(
      `<minerva-avatar-group>
        <minerva-avatar name="A"></minerva-avatar>
        <minerva-avatar name="B"></minerva-avatar>
      </minerva-avatar-group>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("role", "group");
    expect(base).toHaveAttribute("aria-label", "Avatar group");
    const slots = el.shadowRoot!.querySelectorAll<HTMLSlotElement>(
      ".avatarGroupItem slot",
    );
    expect(slots).toHaveLength(2);
    expect(slots[1].assignedElements()[0]).toBe(el.children[1]);
    expect(el.shadowRoot!.querySelector(".count")).toBeNull();
  });

  it("limits visible avatars with max and adds count to +N", async () => {
    const el = await mount<MinervaAvatarGroup>(
      `<minerva-avatar-group max="2" count="3">
        <minerva-avatar name="A"></minerva-avatar>
        <minerva-avatar name="B"></minerva-avatar>
        <minerva-avatar name="C"></minerva-avatar>
      </minerva-avatar-group>`,
    );
    expect(el.shadowRoot!.querySelectorAll(".avatarGroupItem")).toHaveLength(2);
    expect($(el, ".count").textContent?.trim()).toBe("+4");
    expect($(el, ".count")).toHaveAttribute("aria-hidden", "true");
    expect($(el, "[part=base]")).toHaveAttribute(
      "aria-label",
      "Avatar group with 4 more",
    );
  });

  it("updates when avatars are added", async () => {
    const el = await mount<MinervaAvatarGroup>(
      `<minerva-avatar-group max="1"><minerva-avatar name="A"></minerva-avatar></minerva-avatar-group>`,
    );
    expect(el.shadowRoot!.querySelector(".count")).toBeNull();
    el.append(document.createElement("minerva-avatar"));
    await settle();
    expect($(el, ".count").textContent?.trim()).toBe("+1");
  });

  it("warns about an invalid max", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-avatar-group max="-1"></minerva-avatar-group>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("max"));
  });
});
