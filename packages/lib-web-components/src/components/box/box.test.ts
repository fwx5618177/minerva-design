import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaBox } from "./box";
import "../../elements/box";
import { resetDevWarnings } from "../../internal/dev";
import { mount } from "../../../tests/utils";
import { resolveSize, resolveSpace } from "./space";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

/** The generated `:host` rule text */
const rules = (el: MinervaBox) =>
  el.shadowRoot!.querySelector("style")!.textContent!.replace(/\s+/g, "");

describe("resolveSpace / resolveSize", () => {
  it("maps numbers to spacing tokens and keeps CSS values", () => {
    expect(resolveSpace(4)).toBe("var(--space-4)");
    expect(resolveSpace("0.5")).toBe("var(--space-0-5)");
    expect(resolveSpace("12px")).toBe("12px");
    expect(resolveSize(200)).toBe("200px");
    expect(resolveSize("50%")).toBe("50%");
  });
});

describe("<minerva-box>", () => {
  it("registers and slots its content", async () => {
    expect(customElements.get("minerva-box")).toBe(MinervaBox);
    const el = await mount<MinervaBox>(`<minerva-box>Hi</minerva-box>`);
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();
    expect(rules(el)).toBe(":host{}");
  });

  it("maps the shorthands to declarations on the host (side > axis > all)", async () => {
    const el = await mount<MinervaBox>(
      `<minerva-box p="4" px="2" pl="12px" m="auto" w="200" max-w="50%" min-h="10"></minerva-box>`,
    );
    const text = rules(el);
    expect(text).toContain("padding:var(--space-4);");
    expect(text).toContain(
      "padding-left:var(--space-2);padding-right:var(--space-2);",
    );
    expect(text.indexOf("padding-left:12px")).toBeGreaterThan(
      text.indexOf("padding-left:var(--space-2)"),
    );
    expect(text).toContain("margin:auto;");
    expect(text).toContain("width:200px;");
    expect(text).toContain("max-width:50%;");
    expect(text).toContain("min-height:10px;");
    expect(el.p).toBe(4);
  });

  it("resolves bg / rounded / box-shadow tokens and passes other values through", async () => {
    const el = await mount<MinervaBox>(
      `<minerva-box bg="bg.muted" rounded="lg" box-shadow="md" border="1px solid red"></minerva-box>`,
    );
    const text = rules(el);
    expect(text).toContain("background:var(--surface-muted-color);");
    expect(text).toContain("border-radius:var(--radius-lg);");
    expect(text).toContain("box-shadow:var(--shadow-md);");
    expect(text).toContain("border:1pxsolidred;");
    el.bg = "linear-gradient(red, blue)";
    el.rounded = "3px";
    await el.updateComplete;
    expect(rules(el)).toContain("background:linear-gradient(red,blue);");
    expect(rules(el)).toContain("border-radius:3px;");
  });

  it("cannot break out of the declaration block", async () => {
    const el = await mount<MinervaBox>(`<minerva-box></minerva-box>`);
    el.bg = "red;}:host{display:none";
    await el.updateComplete;
    expect(rules(el)).not.toContain("}:host{");
  });

  it("warns about unknown surface aliases in development", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount<MinervaBox>(`<minerva-box bg="bg.nope"></minerva-box>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("bg.nope"));
  });
});
