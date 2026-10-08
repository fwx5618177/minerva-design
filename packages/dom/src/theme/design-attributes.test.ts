import { describe, expect, it } from "vitest";
import { applyDesignAttributes } from "./design-attributes";

describe("applyDesignAttributes", () => {
  it("applies and removes the attributes on an element", () => {
    const element = document.createElement("div");
    applyDesignAttributes(element, { density: "compact" });
    expect(element.getAttribute("data-density")).toBe("compact");
    expect(element.hasAttribute("data-radius")).toBe(false);
    applyDesignAttributes(element, null);
    expect(element.hasAttribute("data-density")).toBe(false);
  });

  it("writes standard values with `all`", () => {
    const element = document.createElement("div");
    applyDesignAttributes(element, {}, { all: true });
    expect(element.getAttribute("data-density")).toBe("standard");
  });
});
