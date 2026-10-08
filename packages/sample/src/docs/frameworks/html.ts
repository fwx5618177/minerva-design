// A small, lossless HTML fragment parser for the Web Component demos
// (pages/<id>/wc/<demo>.html). It keeps the original text of every tag so a
// framework serializer can re-emit the markup unchanged, except for the
// bindings it adds (refs, events, properties, text). Build-time only (used
// by the framework transformer, never shipped to the browser).

export interface HtmlAttr {
  name: string;
  /** Raw value (entities kept), `null` for a valueless boolean attribute */
  value: string | null;
  quote: '"' | "'" | "";
}

export interface HtmlElement {
  type: "element";
  name: string;
  attrs: HtmlAttr[];
  children: HtmlNode[];
  /** `<x />` in the source */
  selfClosing: boolean;
  /** Exact text of the start tag */
  rawStart: string;
  /** The end tag was present in the source */
  closed: boolean;
}

export interface HtmlText {
  type: "text";
  value: string;
}

export interface HtmlComment {
  type: "comment";
  value: string;
}

/** Content of <style> / <script> (raw text) */
export interface HtmlRaw {
  type: "raw";
  value: string;
}

export type HtmlNode = HtmlElement | HtmlText | HtmlComment | HtmlRaw;

export const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

const RAW_TEXT = new Set(["style", "script", "textarea", "title"]);

const ATTR =
  /\s*([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/y;

/** Parses an HTML fragment into a tree of nodes. */
export function parseHtml(source: string): HtmlNode[] {
  const root: HtmlNode[] = [];
  const stack: HtmlElement[] = [];
  const append = (node: HtmlNode) =>
    (stack.length ? stack[stack.length - 1].children : root).push(node);
  let i = 0;
  while (i < source.length) {
    if (source.startsWith("<!--", i)) {
      const end = source.indexOf("-->", i + 4);
      const stop = end === -1 ? source.length : end;
      append({ type: "comment", value: source.slice(i + 4, stop) });
      i = end === -1 ? source.length : end + 3;
      continue;
    }
    if (source.startsWith("</", i)) {
      const end = source.indexOf(">", i);
      const name = source
        .slice(i + 2, end)
        .trim()
        .toLowerCase();
      // close up to the matching element (tolerates unclosed children)
      const at = stack.map((el) => el.name).lastIndexOf(name);
      if (at !== -1) {
        stack[at].closed = true;
        stack.length = at;
      }
      i = end + 1;
      continue;
    }
    if (source[i] === "<" && /[a-zA-Z]/.test(source[i + 1] ?? "")) {
      const nameMatch = /^<([a-zA-Z][\w:-]*)/.exec(source.slice(i));
      const name = nameMatch![1];
      let j = i + nameMatch![0].length;
      const attrs: HtmlAttr[] = [];
      for (;;) {
        ATTR.lastIndex = j;
        const ws = /\s*/y;
        ws.lastIndex = j;
        ws.exec(source);
        const after = ws.lastIndex;
        if (source[after] === ">" || source.startsWith("/>", after)) {
          j = after;
          break;
        }
        const match = ATTR.exec(source);
        if (!match) {
          j = after + 1;
          continue;
        }
        const [, attrName, dq, sq, uq] = match;
        attrs.push({
          name: attrName,
          value: dq ?? sq ?? uq ?? null,
          quote: dq !== undefined ? '"' : sq !== undefined ? "'" : "",
        });
        j = ATTR.lastIndex;
      }
      const selfClosing = source.startsWith("/>", j);
      const end = j + (selfClosing ? 2 : 1);
      const element: HtmlElement = {
        type: "element",
        name: name.toLowerCase(),
        attrs,
        children: [],
        selfClosing,
        rawStart: source.slice(i, end),
        closed: false,
      };
      append(element);
      i = end;
      if (selfClosing || VOID_ELEMENTS.has(element.name)) continue;
      if (RAW_TEXT.has(element.name)) {
        const close = source.toLowerCase().indexOf(`</${element.name}`, i);
        const stop = close === -1 ? source.length : close;
        if (stop > i) {
          element.children.push({ type: "raw", value: source.slice(i, stop) });
        }
        element.closed = close !== -1;
        i = close === -1 ? source.length : source.indexOf(">", close) + 1;
        continue;
      }
      stack.push(element);
      continue;
    }
    const next = source.indexOf("<", i + 1);
    const stop = next === -1 ? source.length : next;
    append({ type: "text", value: source.slice(i, stop) });
    i = stop;
  }
  return root;
}

/** Every element of the tree, in document order */
export function* walkElements(nodes: HtmlNode[]): Generator<HtmlElement> {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    yield node;
    yield* walkElements(node.children);
  }
}

export const getAttr = (el: HtmlElement, name: string) =>
  el.attrs.find((attr) => attr.name.toLowerCase() === name);

interface Compound {
  tag?: string;
  id?: string;
  classes: string[];
  attrs: { name: string; value?: string }[];
}

/**
 * Parses a simple selector (`tag`, `#id`, `.class`, `[attr]`, `[attr=v]`
 * and their compounds). Returns `null` for anything else (combinators,
 * pseudo-classes, lists).
 */
export function parseSimpleSelector(selector: string): Compound | null {
  const re =
    /([a-zA-Z][\w-]*)|#([\w-]+)|\.([\w-]+)|\[\s*([\w-]+)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([\w-]+)))?\s*\]/y;
  const compound: Compound = { classes: [], attrs: [] };
  const text = selector.trim();
  let i = 0;
  let first = true;
  while (i < text.length) {
    re.lastIndex = i;
    const match = re.exec(text);
    if (!match) return null;
    const [, tag, id, cls, attr, dq, sq, bare] = match;
    if (tag !== undefined) {
      if (!first) return null;
      compound.tag = tag.toLowerCase();
    } else if (id !== undefined) compound.id = id;
    else if (cls !== undefined) compound.classes.push(cls);
    else compound.attrs.push({ name: attr, value: dq ?? sq ?? bare });
    first = false;
    i = re.lastIndex;
  }
  return i > 0 ? compound : null;
}

const matches = (el: HtmlElement, sel: Compound) => {
  if (sel.tag && el.name !== sel.tag) return false;
  if (sel.id && getAttr(el, "id")?.value !== sel.id) return false;
  const classes = (getAttr(el, "class")?.value ?? "").split(/\s+/);
  if (sel.classes.some((cls) => !classes.includes(cls))) return false;
  return sel.attrs.every((attr) => {
    const found = getAttr(el, attr.name);
    if (!found) return false;
    return attr.value === undefined || (found.value ?? "") === attr.value;
  });
};

/** First element matching a simple selector (see parseSimpleSelector) */
export function querySimple(
  nodes: HtmlNode[],
  selector: string,
): HtmlElement | undefined {
  const sel = parseSimpleSelector(selector);
  if (!sel) return undefined;
  for (const el of walkElements(nodes)) if (matches(el, sel)) return el;
  return undefined;
}

/** Decodes the few entities used in demo text */
export const decodeEntities = (text: string) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");

/** Text content of an element (no element children), `null` otherwise */
export function plainText(el: HtmlElement): string | null {
  let text = "";
  for (const child of el.children) {
    if (child.type === "element" || child.type === "raw") return null;
    if (child.type === "text") text += child.value;
  }
  return decodeEntities(text.replace(/\s+/g, " ").trim());
}
