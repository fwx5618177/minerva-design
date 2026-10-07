import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("attached: role=group named by aria-label, no gap; warns without a name", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
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
