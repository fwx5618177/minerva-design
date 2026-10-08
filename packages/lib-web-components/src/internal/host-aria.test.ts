import { describe, expect, it } from "vitest";
import { setHostAria } from "./aria";

describe("setHostAria", () => {
  it("uses ElementInternals when it reflects ARIA (no host attribute)", () => {
    const host = document.createElement("div");
    const internals = {
      role: null,
      ariaSelected: null,
    } as unknown as ElementInternals;
    setHostAria(host, internals, { role: "option", ariaSelected: "true" });
    expect(internals.role).toBe("option");
    expect(internals.ariaSelected).toBe("true");
    expect(host.getAttributeNames()).toEqual([]);
  });

  it("falls back to attributes without ElementInternals ARIA, keeping the author's", () => {
    const host = document.createElement("div");
    host.setAttribute("role", "menuitemradio");
    const owned = new Set<string>();
    setHostAria(host, null, { role: "radio", ariaChecked: "false" }, owned);
    expect(host.getAttribute("role")).toBe("menuitemradio");
    expect(host.getAttribute("aria-checked")).toBe("false");
    setHostAria(host, null, { ariaChecked: null }, owned);
    expect(host.hasAttribute("aria-checked")).toBe(false);
    // an internals object without ARIA reflection also falls back
    setHostAria(host, {} as ElementInternals, { ariaDisabled: "true" }, owned);
    expect(host.getAttribute("aria-disabled")).toBe("true");
  });
});
