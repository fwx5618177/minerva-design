// DOM helpers shared by the DOM drivers (React DOM, Web Components): queries
// that see through open shadow roots, implicit ARIA roles and a small
// accessible-name computation (enough for the contract suites).
import type { QueryOptions } from "./types";

/** Every element of `root`, open shadow roots included (document order) */
export function deepElements(root: ParentNode = document.body): Element[] {
  const out: Element[] = [];
  const visit = (node: ParentNode) => {
    for (const el of Array.from(node.children)) {
      out.push(el);
      if (el.shadowRoot) visit(el.shadowRoot);
      visit(el);
    }
  };
  visit(root);
  return out;
}

/** Parent across shadow boundaries (slotted nodes go through their host) */
const composedParent = (el: Element): Element | null => {
  if (el.parentElement) return el.parentElement;
  const root = el.getRootNode();
  return root instanceof ShadowRoot ? root.host : null;
};

/** Hidden from the user: `hidden`, `aria-hidden`, `inert` or `display: none` on it or an ancestor */
export function isHidden(el: Element): boolean {
  for (let node: Element | null = el; node; node = composedParent(node)) {
    if (
      node.hasAttribute("hidden") ||
      node.getAttribute("aria-hidden") === "true" ||
      node.hasAttribute("inert") ||
      (node as HTMLElement).style?.display === "none"
    )
      return true;
  }
  return false;
}

const INPUT_ROLES: Record<string, string> = {
  checkbox: "checkbox",
  radio: "radio",
  button: "button",
  submit: "button",
  reset: "button",
  text: "textbox",
  search: "searchbox",
  email: "textbox",
  number: "spinbutton",
};

/** Explicit or implicit ARIA role */
export function roleOf(el: Element): string | null {
  const explicit = el.getAttribute("role");
  if (explicit) return explicit.split(" ")[0];
  switch (el.localName) {
    case "button":
      return "button";
    case "a":
      return el.hasAttribute("href") ? "link" : null;
    case "input":
      return INPUT_ROLES[(el as HTMLInputElement).type || "text"] ?? null;
    case "textarea":
      return "textbox";
    case "dialog":
      return "dialog";
    case "nav":
      return "navigation";
    case "ul":
    case "ol":
      return "list";
    case "li":
      return "listitem";
    default:
      return null;
  }
}

/** Nodes rendered in place of a slot: the host children assigned to it */
function slotted(slot: HTMLSlotElement): Node[] {
  const root = slot.getRootNode();
  if (!(root instanceof ShadowRoot)) return Array.from(slot.childNodes);
  const name = slot.getAttribute("name") ?? "";
  const assigned = Array.from(root.host.childNodes).filter((node) =>
    node.nodeType === 1
      ? ((node as Element).getAttribute("slot") ?? "") === name
      : name === "" && node.nodeType === 3,
  );
  return assigned.length ? assigned : Array.from(slot.childNodes);
}

/** Rendered text: shadow trees and slotted content included */
function composedText(node: Node): string {
  if (node.nodeType === 3) return node.textContent ?? "";
  if (node.nodeType !== 1 && node.nodeType !== 11) return "";
  const el = node as Element;
  if (el.localName === "slot")
    return slotted(el as HTMLSlotElement)
      .map(composedText)
      .join("");
  if (el.localName === "style" || el.localName === "template") return "";
  const children = el.shadowRoot ? el.shadowRoot.childNodes : el.childNodes;
  return Array.from(children).map(composedText).join("");
}

const text = (el: Element) => composedText(el).replace(/\s+/g, " ").trim();

/** Accessible name: aria-label, aria-labelledby, label, then text content */
export function nameOf(el: Element): string {
  const label = el.getAttribute("aria-label");
  if (label) return label.trim();
  const root = el.getRootNode() as Document | ShadowRoot;
  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const parts = labelledby
      .split(/\s+/)
      .map((id) => root.getElementById?.(id))
      .filter((n): n is HTMLElement => !!n)
      .map(text);
    if (parts.length) return parts.join(" ");
  }
  if (el.localName === "input" || el.localName === "textarea") {
    const id = el.getAttribute("id");
    const forLabel = id
      ? root.querySelector?.(`label[for="${CSS.escape(id)}"]`)
      : null;
    const wrapping = el.closest("label");
    const found = forLabel ?? wrapping;
    if (found) return text(found);
    return "";
  }
  return text(el);
}

const matches = (value: string, expected?: string | RegExp) =>
  expected === undefined ||
  (typeof expected === "string" ? value === expected : expected.test(value));

export function queryAllByRole(
  role: string,
  { name }: QueryOptions = {},
): Element[] {
  return deepElements().filter(
    (el) => roleOf(el) === role && !isHidden(el) && matches(nameOf(el), name),
  );
}

/** Innermost visible elements whose text matches */
export function queryByText(expected: string | RegExp): Element | null {
  const all = deepElements().filter(
    (el) => !isHidden(el) && matches(text(el), expected),
  );
  return (
    all.find(
      (el) => !all.some((other) => other !== el && el.contains(other)),
    ) ?? null
  );
}

export function queryByTestId(id: string): Element | null {
  return (
    deepElements().find((el) => el.getAttribute("data-testid") === id) ?? null
  );
}

export function isChecked(el: Element): boolean {
  const aria = el.getAttribute("aria-checked");
  if (aria !== null && !(el instanceof HTMLInputElement))
    return aria === "true";
  return !!(el as HTMLInputElement).checked;
}

export const tokenVar = (el: Element, name: string) =>
  getComputedStyle(el).getPropertyValue(name).trim();

export const wait = (ms = 0) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
