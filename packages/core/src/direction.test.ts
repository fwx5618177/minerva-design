import { afterEach, describe, expect, it, vi } from "vitest";
import { getDirection, logicalArrowKey, resolveDirection } from "./direction";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const mount = (html: string) => {
  document.body.innerHTML = html;
  return document.getElementById("t")!;
};

describe("getDirection", () => {
  it("uses the closest dir attribute (case-insensitive)", () => {
    expect(
      getDirection(mount(`<div dir="RTL"><span id="t"></span></div>`)),
    ).toBe("rtl");
    expect(
      getDirection(
        mount(`<div dir="rtl"><p dir="ltr"><span id="t"></span></p></div>`),
      ),
    ).toBe("ltr");
  });

  it('skips dir="auto" and invalid values', () => {
    expect(
      getDirection(
        mount(`<div dir="rtl"><p dir="auto"><span id="t"></span></p></div>`),
      ),
    ).toBe("rtl");
    expect(
      getDirection(
        mount(`<div dir="rtl"><p dir="up"><span id="t"></span></p></div>`),
      ),
    ).toBe("rtl");
  });

  it("falls back to the computed CSS direction, then ltr", () => {
    expect(
      getDirection(
        mount(`<div style="direction: rtl"><span id="t"></span></div>`),
      ),
    ).toBe("rtl");
    expect(getDirection(mount(`<span id="t"></span>`))).toBe("ltr");
    expect(getDirection(null)).toBe("ltr");
    expect(getDirection(undefined)).toBe("ltr");
  });

  it("crosses shadow roots and slots", () => {
    document.body.innerHTML = `<div dir="rtl" id="outer"><div id="host"><span id="slotted"></span></div></div>`;
    const host = document.getElementById("host")!;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `<div dir="ltr"><slot></slot></div><b></b>`;
    // inside the shadow tree: the host's ancestors apply
    expect(getDirection(shadow.querySelector("b"))).toBe("rtl");
    // slotted content inherits from its slot (flat tree); happy-dom does
    // not implement `assignedSlot`, so it is stubbed here
    const slotted = document.getElementById("slotted")!;
    Object.defineProperty(slotted, "assignedSlot", {
      value: shadow.querySelector("slot"),
    });
    expect(getDirection(slotted)).toBe("ltr");
  });

  it("works for elements without a window", () => {
    const doc = document.implementation.createHTMLDocument("");
    const el = doc.createElement("span");
    vi.spyOn(el, "ownerDocument", "get").mockReturnValue(
      null as unknown as Document,
    );
    expect(getDirection(el)).toBe("ltr");
  });
});

describe("resolveDirection / logicalArrowKey", () => {
  it("prefers the explicit direction", () => {
    const el = mount(`<div dir="rtl"><span id="t"></span></div>`);
    expect(resolveDirection(undefined, el)).toBe("rtl");
    expect(resolveDirection("ltr", el)).toBe("ltr");
  });

  it("swaps horizontal arrows in RTL only", () => {
    const rtl = mount(`<div dir="rtl"><span id="t"></span></div>`);
    expect(logicalArrowKey("ArrowLeft", rtl)).toBe("ArrowRight");
    expect(logicalArrowKey("ArrowRight", rtl)).toBe("ArrowLeft");
    expect(logicalArrowKey("ArrowUp", rtl)).toBe("ArrowUp");
    expect(logicalArrowKey("ArrowLeft", rtl, "ltr")).toBe("ArrowLeft");
    expect(logicalArrowKey("ArrowLeft", null)).toBe("ArrowLeft");
    expect(logicalArrowKey("ArrowRight", null, "rtl")).toBe("ArrowLeft");
  });
});
