import { afterEach, describe, expect, it } from "vitest";
import {
  canUseDOM,
  contains,
  focusElement,
  focusFirst,
  getActiveElement,
  getEventTarget,
  getFocusables,
  getOwnerDocument,
  getOwnerWindow,
  getTabbables,
  isFocusable,
  isHTMLElement,
  isTabbable,
} from "./dom";

const render = (html: string) => {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
};
const ids = (els: Element[]) => els.map((el) => el.id);

afterEach(() => {
  document.body.innerHTML = "";
});

describe("environment helpers", () => {
  it("detects the DOM", () => {
    expect(canUseDOM()).toBe(true);
  });

  it("resolves the owner document / window", () => {
    const el = document.createElement("div");
    expect(getOwnerDocument(el)).toBe(document);
    expect(getOwnerDocument(document)).toBe(document);
    expect(getOwnerDocument(null)).toBe(document);
    expect(getOwnerWindow(el)).toBe(window);
  });

  it("recognises HTML elements only", () => {
    expect(isHTMLElement(document.createElement("button"))).toBe(true);
    expect(
      isHTMLElement(
        document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      ),
    ).toBe(false);
    expect(isHTMLElement(document.createTextNode("x"))).toBe(false);
    expect(isHTMLElement(null)).toBe(false);
    expect(isHTMLElement({ nodeType: 1 })).toBe(false);
  });
});

describe("shadow DOM awareness", () => {
  it("getActiveElement pierces open shadow roots", () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    shadow.appendChild(button);
    button.focus();
    expect(getActiveElement()).toBe(button);
    expect(getActiveElement(document)).toBe(button);
  });

  it("contains() crosses shadow boundaries", () => {
    const outer = render(`<div id="host"></div>`);
    const host = outer.querySelector("#host")!;
    const shadow = host.attachShadow({ mode: "open" });
    const inner = document.createElement("span");
    shadow.appendChild(inner);

    expect(contains(outer, inner)).toBe(true);
    expect(contains(host, inner)).toBe(true);
    expect(contains(inner, outer)).toBe(false);
    expect(contains(outer, outer)).toBe(true);
    expect(contains(null, inner)).toBe(false);
    expect(contains(outer, null)).toBe(false);
  });

  it("contains() follows slots (flat tree)", () => {
    const outer = render(
      `<div id="host"><b id="slotted">s</b><i id="named" slot="side">n</i><u id="lost" slot="nowhere">u</u></div>`,
    );
    const host = outer.querySelector("#host")!;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `<div id="panel"><slot></slot></div><aside id="side"><slot name="side"></slot></aside>`;
    const panel = shadow.querySelector("#panel")!;
    const side = shadow.querySelector("#side")!;
    const slotted = outer.querySelector("#slotted")!;
    expect(contains(panel, slotted)).toBe(true);
    expect(contains(panel, slotted.firstChild)).toBe(true);
    expect(contains(side, outer.querySelector("#named"))).toBe(true);
    expect(contains(panel, outer.querySelector("#named"))).toBe(false);
    expect(contains(panel, outer.querySelector("#lost"))).toBe(false);
    expect(contains(side, slotted)).toBe(false);
  });

  it("getEventTarget returns the composed target", () => {
    const outer = render(`<div id="host"></div>`);
    const shadow = outer.querySelector("#host")!.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    shadow.appendChild(button);
    let seen: EventTarget | null = null;
    document.addEventListener("click", (e) => (seen = getEventTarget(e)), {
      once: true,
    });
    button.dispatchEvent(
      new MouseEvent("click", { bubbles: true, composed: true }),
    );
    expect(seen).toBe(button);
  });
});

describe("getTabbables / getFocusables", () => {
  it("skips disabled, hidden, inert, tabindex=-1 and hidden inputs", () => {
    const root = render(`
      <button id="a">a</button>
      <button id="disabled" disabled>x</button>
      <input id="hiddenInput" type="hidden" />
      <input id="b" />
      <a id="noHref">no href</a>
      <a id="c" href="#c">c</a>
      <div id="minus" tabindex="-1">minus</div>
      <div hidden><button id="inHidden">x</button></div>
      <div style="display: none"><button id="inNone">x</button></div>
      <button id="invisible" style="visibility: hidden">x</button>
      <div inert><button id="inInert">x</button></div>
      <fieldset disabled>
        <legend><button id="legend">ok</button></legend>
        <input id="inFieldset" />
      </fieldset>
      <details><summary id="summary">s</summary><button id="inDetails">x</button></details>
      <div id="d" tabindex="0">d</div>
      <div id="editable" contenteditable="true">e</div>
      <textarea id="t"></textarea>
      <select id="s"><option>1</option></select>
    `);
    expect(ids(getTabbables(root))).toEqual([
      "a",
      "b",
      "c",
      "legend",
      "summary",
      "d",
      "editable",
      "t",
      "s",
    ]);
    expect(ids(getFocusables(root))).toContain("minus");
    expect(ids(getFocusables(root))).not.toContain("disabled");
  });

  it("puts positive tabindex first", () => {
    const root = render(`
      <button id="a">a</button>
      <button id="p2" tabindex="2">p2</button>
      <button id="p1" tabindex="1">p1</button>
      <button id="b">b</button>
    `);
    expect(ids(getTabbables(root))).toEqual(["p1", "p2", "a", "b"]);
  });

  it("collapses radio groups to the checked (or first) radio", () => {
    const root = render(`
      <input type="radio" name="g1" id="g1a" />
      <input type="radio" name="g1" id="g1b" checked />
      <input type="radio" name="g2" id="g2a" />
      <input type="radio" name="g2" id="g2b" />
      <input type="radio" id="lone" />
    `);
    expect(ids(getTabbables(root))).toEqual(["g1b", "g2a", "lone"]);
    expect(ids(getTabbables(root, { radioGroups: false }))).toHaveLength(5);
  });

  it("includes open shadow roots and optionally the container", () => {
    const root = render(`<button id="a">a</button><div id="host"></div>`);
    root.setAttribute("tabindex", "0");
    root.id = "root";
    const shadow = root.querySelector("#host")!.attachShadow({ mode: "open" });
    shadow.innerHTML = `<button id="shadowed">s</button>`;
    expect(ids(getTabbables(root))).toEqual(["a", "shadowed"]);
    expect(ids(getTabbables(root, { includeContainer: true }))).toEqual([
      "root",
      "a",
      "shadowed",
    ]);
  });

  it("walks the flat tree: slotted content in place of the <slot>, shadow internals of a host container", () => {
    const root = render(
      `<div id="host"><button id="slotted">s</button><button id="unslotted" slot="nowhere">u</button></div>`,
    );
    const host = root.querySelector<HTMLElement>("#host")!;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `<button id="before">b</button><slot></slot><div><slot name="empty"><button id="fallback">f</button></slot></div><button id="after">a</button>`;
    // the host itself as container: its shadow root is walked, not its light children
    expect(ids(getTabbables(host))).toEqual([
      "before",
      "slotted",
      "fallback",
      "after",
    ]);
    expect(ids(getTabbables(root))).toEqual([
      "before",
      "slotted",
      "fallback",
      "after",
    ]);
  });

  it("treats slotted content of a hidden shadow wrapper as hidden", () => {
    const root = render(`<div id="host"><button id="slotted">s</button></div>`);
    const shadow = root
      .querySelector<HTMLElement>("#host")!
      .attachShadow({ mode: "open" });
    shadow.innerHTML = `<div hidden><slot></slot></div>`;
    expect(isFocusable(root.querySelector("#slotted")!)).toBe(false);
  });

  it("isFocusable / isTabbable", () => {
    const root = render(
      `<div id="x">x</div><span id="m" tabindex="-1"></span><div id="ce" contenteditable="false">n</div>`,
    );
    expect(isFocusable(root.querySelector("#x")!)).toBe(false);
    expect(isFocusable(root.querySelector("#ce")!)).toBe(false);
    expect(isFocusable(root.querySelector("#m")!)).toBe(true);
    expect(isTabbable(root.querySelector("#m")!)).toBe(false);
  });
});

describe("focusElement / focusFirst", () => {
  it("focuses and optionally selects", () => {
    const root = render(`<input id="i" value="hello" />`);
    const input = root.querySelector<HTMLInputElement>("#i")!;
    expect(focusElement(input, { select: true, preventScroll: true })).toBe(
      true,
    );
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(5);
    expect(focusElement(null)).toBe(false);
  });

  it("returns false for elements that cannot take focus", () => {
    // detached elements cannot be focused
    expect(focusElement(document.createElement("button"))).toBe(false);
  });

  it("focusFirst focuses the first candidate accepting focus", () => {
    const root = render(
      `<button id="d" disabled>d</button><button id="ok">ok</button>`,
    );
    const pick = (id: string) => root.querySelector<HTMLElement>(`#${id}`);
    const detached = document.createElement("button");
    expect(focusFirst([null, pick("d"), detached, pick("ok")])).toBe(
      pick("ok"),
    );
    expect(document.activeElement).toBe(pick("ok"));
    expect(focusFirst([pick("d")])).toBeNull();
  });
});
