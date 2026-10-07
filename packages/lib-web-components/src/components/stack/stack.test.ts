import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { html } from "lit";
import { MinervaHStack, MinervaStack, MinervaVStack } from "./stack";
import "../../elements/stack";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const base = (el: Element) => $(el, "[part=base]");

describe("<minerva-stack>", () => {
  it("registers the three tags", () => {
    expect(customElements.get("minerva-stack")).toBe(MinervaStack);
    expect(customElements.get("minerva-hstack")).toBe(MinervaHStack);
    expect(customElements.get("minerva-vstack")).toBe(MinervaVStack);
  });

  it("renders lib-core's classes, a column by default, no gap", async () => {
    const el = await mount<MinervaStack>(
      `<minerva-stack><span>a</span><span>b</span></minerva-stack>`,
    );
    const div = base(el);
    expect(div.classList).toContain("stack");
    expect(div.classList).toContain("column");
    expect(div.style.gap).toBe("");
    expect(div.hasAttribute("role")).toBe(false);
    expect(el.getAttribute("direction")).toBe("column");
    const slot = el.shadowRoot!.querySelector("slot")!;
    expect(slot.assignedElements()).toHaveLength(2);
  });

  it("maps gap / align / justify / wrap / direction", async () => {
    const el = await mount<MinervaStack>(
      `<minerva-stack direction="row-reverse" gap="3" align="end" justify="between" wrap><i></i></minerva-stack>`,
    );
    const div = base(el);
    expect(div.classList).toContain("row-reverse");
    expect(div.classList).toContain("wrap");
    expect(div.style.gap).toBe("var(--space-3)");
    expect(div.style.alignItems).toBe("flex-end");
    expect(div.style.justifyContent).toBe("space-between");
    el.gap = "10px";
    await el.updateComplete;
    expect(div.style.gap).toBe("10px");
  });

  it("interleaves a text separator between non-blank children", async () => {
    const el = await mount<MinervaStack>(
      `<minerva-stack separator="·"><span>a</span> <span>b</span>c</minerva-stack>`,
    );
    const div = base(el);
    const slots = div.querySelectorAll("slot");
    expect(slots).toHaveLength(3);
    expect(div.textContent!.match(/·/g)).toHaveLength(2);
    expect(slots[0].assignedNodes()[0]).toBe(el.querySelector("span"));
    expect(slots[2].assignedNodes()[0].textContent).toBe("c");
  });

  it("re-renders separators when children change; function separators get fresh nodes", async () => {
    const el = await mount<MinervaStack>(
      `<minerva-stack><span>a</span><span>b</span></minerva-stack>`,
    );
    el.separator = () => html`<hr class="sep" />`;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll(".sep")).toHaveLength(1);
    el.append(document.createElement("span"));
    await settle();
    expect(el.shadowRoot!.querySelectorAll(".sep")).toHaveLength(2);
    expect(el.shadowRoot!.querySelectorAll("slot")).toHaveLength(3);
  });

  it("uses manual slot assignment where slot.assign() exists (no light DOM changes)", async () => {
    expect(typeof HTMLSlotElement.prototype.assign).toBe("function");
    const el = await mount<MinervaStack>(
      `<minerva-stack separator="|"><b>a</b><b>b</b></minerva-stack>`,
    );
    expect(el.shadowRoot!.querySelectorAll("slot")).toHaveLength(2);
    for (const child of Array.from(el.children)) {
      expect(child.hasAttribute("slot")).toBe(false);
    }
  });

  describe("without slot.assign() (named-slot fallback)", () => {
    const assign = Object.getOwnPropertyDescriptor(
      HTMLSlotElement.prototype,
      "assign",
    )!;
    beforeEach(() => {
      // An engine without manual slot assignment (e.g. Safari < 16.4)
      delete (HTMLSlotElement.prototype as Partial<HTMLSlotElement>).assign;
    });
    afterEach(() => {
      Object.defineProperty(HTMLSlotElement.prototype, "assign", assign);
    });

    const named = (el: Element) =>
      Array.from(
        el.shadowRoot!.querySelectorAll<HTMLSlotElement>("slot[name]"),
      );

    it("interleaves separators between element children through named slots", async () => {
      const el = await mount<MinervaStack>(
        `<minerva-stack separator="·"><span>a</span> <span>b</span><span>c</span></minerva-stack>`,
      );
      await settle();
      expect(el.shadowRoot!.mode).toBe("open");
      const slots = named(el);
      expect(slots.map((s) => s.name)).toEqual([
        "minerva-stack-item-0",
        "minerva-stack-item-1",
        "minerva-stack-item-2",
      ]);
      const spans = Array.from(el.querySelectorAll("span"));
      spans.forEach((span, i) => {
        expect(span.getAttribute("slot")).toBe(`minerva-stack-item-${i}`);
        expect(slots[i].assignedElements()).toEqual([span]);
      });
      expect(base(el).textContent!.match(/·/g)).toHaveLength(2);
      // separators sit between the slots, in order
      const nodes = Array.from(base(el).childNodes).filter(
        (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent!.trim()),
      );
      expect(
        nodes.map((n) =>
          n.nodeType === 1
            ? (n as HTMLSlotElement).name || "default"
            : n.textContent!.trim(),
        ),
      ).toEqual([
        "minerva-stack-item-0",
        "·",
        "minerva-stack-item-1",
        "·",
        "minerva-stack-item-2",
        "default",
      ]);
    });

    it("follows child changes, function separators and releases its slot attributes", async () => {
      const el = await mount<MinervaStack>(
        `<minerva-stack><i>a</i><i>b</i></minerva-stack>`,
      );
      // no separator: plain default slot, children untouched
      expect(named(el)).toHaveLength(0);
      expect(el.querySelector("i")!.hasAttribute("slot")).toBe(false);
      el.separator = () => html`<hr class="sep" />`;
      await settle();
      expect(el.shadowRoot!.querySelectorAll(".sep")).toHaveLength(1);
      el.append(document.createElement("i"));
      await settle();
      expect(el.shadowRoot!.querySelectorAll(".sep")).toHaveLength(2);
      expect(named(el)).toHaveLength(3);
      // a removed child gets its attribute back
      const removed = el.querySelector("i")!;
      removed.remove();
      await settle();
      expect(named(el)).toHaveLength(2);
      expect(el.querySelector("i")!.getAttribute("slot")).toBe(
        "minerva-stack-item-0",
      );
      // children with their own slot are left alone
      const own = document.createElement("i");
      own.slot = "custom";
      el.append(own);
      await settle();
      expect(own.slot).toBe("custom");
      expect(named(el)).toHaveLength(2);
      el.separator = undefined;
      await settle();
      expect(named(el)).toHaveLength(0);
      expect(
        Array.from(el.querySelectorAll("i")).map((i) => i.getAttribute("slot")),
      ).toEqual([null, null, "custom"]);
    });

    it("keeps bare text children in a trailing default slot; cleans up on disconnect", async () => {
      const el = await mount<MinervaStack>(
        `<minerva-stack separator="|"><b>a</b>text<b>b</b></minerva-stack>`,
      );
      await settle();
      const fallback =
        el.shadowRoot!.querySelector<HTMLSlotElement>("slot:not([name])")!;
      expect(
        fallback.assignedNodes().map((n) => n.textContent!.trim()),
      ).toContain("text");
      expect(named(el)).toHaveLength(2);
      const parent = el.parentNode!;
      el.remove();
      expect(el.querySelector("b")!.hasAttribute("slot")).toBe(false);
      parent.append(el);
      await settle();
      expect(el.querySelector("b")!.getAttribute("slot")).toBe(
        "minerva-stack-item-0",
      );
    });
  });

  it("attached: role=group named by aria-label, no gap; warns without a name", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaStack>(
      `<minerva-stack attached gap="4" direction="row"><button>A</button><button>B</button></minerva-stack>`,
    );
    const div = base(el);
    expect(div).toHaveAttribute("role", "group");
    expect(div.classList).toContain("attached");
    expect(div.style.gap).toBe("");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("aria-label"));
    el.setAttribute("aria-label", "Alignment");
    await settle();
    expect(div).toHaveAttribute("aria-label", "Alignment");
  });

  it("hstack / vstack: fixed direction and default alignment", async () => {
    document.body.innerHTML = `<minerva-hstack direction="column"></minerva-hstack><minerva-vstack align="center"></minerva-vstack><minerva-hstack align="start"></minerva-hstack>`;
    await settle();
    const [h, v, h2] = Array.from(document.body.children);
    expect(base(h).classList).toContain("row");
    expect(base(h).style.alignItems).toBe("center");
    expect(base(v).classList).toContain("column");
    expect(base(v).style.alignItems).toBe("center");
    expect(base(h2).style.alignItems).toBe("flex-start");
    const v2 = document.createElement("minerva-vstack");
    document.body.append(v2);
    await settle();
    expect(base(v2).style.alignItems).toBe("stretch");
    expect(v2.getAttribute("direction")).toBe("column");
  });
});
