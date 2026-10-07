import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaDivider } from "./divider";
import "../../elements/divider";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-divider>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-divider")).toBe(MinervaDivider);
  });

  it("renders a native <hr> with lib-core's classes and default styles", async () => {
    const el = await mount<MinervaDivider>(
      `<minerva-divider></minerva-divider>`,
    );
    const hr = $(el, "hr");
    expect(hr.classList).toContain("divider");
    expect(hr.classList).toContain("solid");
    expect(hr.classList).toContain("horizontal");
    expect(hr).toHaveAttribute("aria-orientation", "horizontal");
    expect(hr.style.borderWidth).toBe("1px");
    expect(hr.style.marginTop).toBe("16px");
    expect(hr.style.marginLeft).toBe("0px");
    expect(el.getAttribute("orientation")).toBe("horizontal");
    expect(el.getAttribute("variant")).toBe("solid");
  });

  it("renders text in a role=separator with the alignment class", async () => {
    const el = await mount<MinervaDivider>(
      `<minerva-divider text-align="left">OR</minerva-divider>`,
    );
    const sep = $(el, "[role=separator]");
    expect(sep.tagName).toBe("DIV");
    expect(sep.classList).toContain("withText");
    expect(sep.classList).toContain("textLeft");
    expect($(el, ".text slot")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("hr")).toBeNull();
  });

  it("switches to the text layout when text is added later", async () => {
    const el = await mount<MinervaDivider>(
      `<minerva-divider></minerva-divider>`,
    );
    el.textContent = "Section";
    await settle();
    expect(
      el.shadowRoot!.querySelector("[role=separator].withText"),
    ).not.toBeNull();
  });

  it("vertical: inline-axis spacing, length as height, flex-item, no text (dev warning)", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaDivider>(
      `<minerva-divider orientation="vertical" length="40" spacing="4" thickness="2" flex-item variant="dashed">x</minerva-divider>`,
    );
    const hr = $(el, "hr");
    expect(hr.classList).toContain("vertical");
    expect(hr.classList).toContain("dashed");
    expect(hr.classList).toContain("flexItem");
    expect(hr).toHaveAttribute("aria-orientation", "vertical");
    expect(hr.style.height).toBe("40px");
    expect(hr.style.marginLeft).toBe("4px");
    expect(hr.style.marginTop).toBe("0px");
    expect(hr.style.borderWidth).toBe("2px");
    expect(el.shadowRoot!.querySelector("slot")).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("vertical"));
  });

  it("accepts CSS lengths and the elevation flag", async () => {
    const el = await mount<MinervaDivider>(
      `<minerva-divider length="50%" elevation></minerva-divider>`,
    );
    expect($(el, "hr").style.width).toBe("50%");
    expect($(el, "hr").classList).toContain("elevation");
    expect(el.hasAttribute("elevation")).toBe(true);
  });
});
