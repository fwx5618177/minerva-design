// Maps a DOM selection inside a code block to offsets of its code, so an app
// can save the selected range as a mark (`CodeMark` of @minerva/core). DOM
// only (React DOM, Vue, Angular, Web Components, Taro H5).

/** A selected range of a code block's code */
export interface CodeSelectionRange {
  /** Start offset (inclusive), in UTF-16 code units of the code */
  start: number;
  /** End offset (exclusive), in UTF-16 code units of the code */
  end: number;
  /** The selected code (`code.slice(start, end)`) */
  text: string;
}

type Boundary = readonly [node: Node, offset: number];

/** The <code> holding the text: `container` itself or its first <code>. */
function codeRoot(container: Element | ShadowRoot): Node {
  if (container instanceof Element && container.localName === "code")
    return container;
  return container.querySelector("code") ?? container;
}

/** Selected range(s) of `selection`, as boundaries (first start, last end). */
function boundaries(
  selection: Selection | AbstractRange,
  root: Node,
): [Boundary, Boundary] | null {
  if ("rangeCount" in selection) {
    if (!selection.rangeCount) return null;
    const shadow = root.getRootNode();
    // a selection inside a shadow root: the composed range (Chrome / Safari /
    // Firefox), else the plain ranges (light DOM or older browsers)
    let composed: StaticRange[] | null = null;
    if (
      typeof ShadowRoot !== "undefined" &&
      shadow instanceof ShadowRoot &&
      typeof (selection as SelectionWithComposed).getComposedRanges ===
        "function"
    ) {
      try {
        composed = (selection as SelectionWithComposed).getComposedRanges({
          shadowRoots: [shadow],
        });
      } catch {
        composed = null; // older signature: getComposedRanges(...roots)
      }
    }
    const first = composed?.[0] ?? selection.getRangeAt(0);
    const last =
      composed?.[composed.length - 1] ??
      selection.getRangeAt(selection.rangeCount - 1);
    return [
      [first.startContainer, first.startOffset],
      [last.endContainer, last.endOffset],
    ];
  }
  return [
    [selection.startContainer, selection.startOffset],
    [selection.endContainer, selection.endOffset],
  ];
}

interface SelectionWithComposed extends Selection {
  getComposedRanges(options: { shadowRoots: ShadowRoot[] }): StaticRange[];
}

/** Offset in the text of `root` of a boundary point (clamped to the text). */
function textOffset(root: Node, [node, offset]: Boundary, total: number) {
  if (node === root || root.contains(node)) {
    const range = (root.ownerDocument ?? document).createRange();
    range.setStart(root, 0);
    range.setEnd(node, offset);
    return Math.min(total, range.toString().length);
  }
  const position = root.compareDocumentPosition(node);
  if (position & Node.DOCUMENT_POSITION_CONTAINS) {
    // `node` is an ancestor: the boundary is before its child `offset`
    let child: Node = root;
    while (child.parentNode && child.parentNode !== node)
      child = child.parentNode;
    const index = Array.prototype.indexOf.call(node.childNodes, child);
    return index < offset ? total : 0;
  }
  return position & Node.DOCUMENT_POSITION_PRECEDING ? 0 : total;
}

/**
 * The mark of a click in a code block: the item of `marks` at the
 * `data-mark-index` of the <mark> holding `target` (inside `container`),
 * `undefined` elsewhere or when the click ends a text selection drag in the
 * code (the user was selecting, not clicking the mark). Used by the
 * CodeBlock `onMarkClick` / `mark-click` of the web renderers.
 */
export function clickedCodeMark<M>(
  target: EventTarget | null,
  container: Element,
  marks: readonly M[] | null | undefined,
): M | undefined {
  const element =
    target && typeof (target as Element).closest === "function"
      ? (target as Element).closest("mark[data-mark-index]")
      : null;
  if (!element || !container.contains(element)) return undefined;
  const root = container.getRootNode() as Document | ShadowRoot;
  const selection =
    (root as { getSelection?: () => Selection | null }).getSelection?.() ??
    container.ownerDocument.getSelection();
  if (
    selection &&
    !selection.isCollapsed &&
    container.contains(selection.anchorNode)
  )
    return undefined;
  return marks?.[Number(element.getAttribute("data-mark-index"))];
}

/**
 * Offsets in the code of a selection made in a code block (CodeBlock of
 * every web renderer), to save it as a mark.
 *
 * `container` is the code block's <pre> (React `ref`, the Vue / Angular
 * element), its <code>, or any ancestor holding a single code block (its
 * first <code> is used); `selection` defaults to the document selection
 * (a `Range` / `StaticRange` also works). Line numbers are generated
 * content, so they never count. A selection extending outside the code is
 * clamped to it. Returns `null` without a DOM, a selection, or when nothing
 * of the code is selected.
 *
 * For `<minerva-code-block>` (shadow DOM) use its `getSelectionRange()`.
 */
export function getCodeSelectionRange(
  container: Element | ShadowRoot | null | undefined,
  selection?: Selection | AbstractRange | null,
): CodeSelectionRange | null {
  if (!container || typeof document === "undefined") return null;
  const root = codeRoot(container);
  const source =
    selection === undefined
      ? (root.ownerDocument?.defaultView ?? window).getSelection()
      : selection;
  if (!source) return null;
  const points = boundaries(source, root);
  if (!points) return null;
  const code = root.textContent ?? "";
  const a = textOffset(root, points[0], code.length);
  const b = textOffset(root, points[1], code.length);
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  if (start === end) return null;
  return { start, end, text: code.slice(start, end) };
}
