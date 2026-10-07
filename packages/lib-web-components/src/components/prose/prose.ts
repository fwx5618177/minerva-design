import { css, html } from "lit";
import proseCss from "./prose-scoped.scss?inline";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";

type StyleScope = Document | ShadowRoot;

const STYLE_ID = "minerva-prose-styles";
/** Scopes (documents / shadow roots) that already received the styles. */
const styledScopes = new WeakSet<StyleScope>();
let sharedSheet: CSSStyleSheet | null | undefined;

/** One constructable stylesheet shared by every scope (null when unsupported). */
function getSheet(): CSSStyleSheet | null {
  if (sharedSheet !== undefined) return sharedSheet;
  sharedSheet = null;
  try {
    if (
      typeof CSSStyleSheet !== "undefined" &&
      "replaceSync" in CSSStyleSheet.prototype
    ) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(proseCss);
      sharedSheet = sheet;
    }
  } catch {
    sharedSheet = null;
  }
  return sharedSheet;
}

/**
 * Adds the prose stylesheet to `scope` once: through `adoptedStyleSheets`
 * when constructable stylesheets are supported, else as a `<style>` element
 * (document head / shadow root).
 */
function injectProseStyles(scope: StyleScope): void {
  if (styledScopes.has(scope)) return;
  styledScopes.add(scope);
  const sheet = getSheet();
  if (sheet && "adoptedStyleSheets" in scope) {
    try {
      scope.adoptedStyleSheets = [...scope.adoptedStyleSheets, sheet];
      return;
    } catch {
      // fall through to a <style> element
    }
  }
  const doc = scope.nodeType === 9 ? (scope as Document) : scope.ownerDocument;
  if (!doc) return;
  const parent =
    scope.nodeType === 9 ? (doc.head ?? doc.documentElement) : scope;
  if (parent.querySelector?.(`#${STYLE_ID}`)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = proseCss;
  parent.appendChild(style);
}

/**
 * Unframed, theme-aware typography for semantic HTML: articles, rendered
 * Markdown, rich-text editor output (`<Prose>` of lib-core). It does not
 * parse or sanitize HTML.
 *
 * Why light DOM styling: the content is slotted, and shadow DOM styles can
 * only reach slotted top-level elements (`::slotted(p)`), never their
 * descendants (`li > code`, `table td`...). So the element injects
 * lib-core's compiled prose rules, scoped with a `minerva-prose` selector,
 * into its root node (the document, or the shadow root it is rendered in)
 * once per root, via `adoptedStyleSheets` (a `<style>` element where
 * constructable stylesheets are unsupported). Injection happens on connect
 * only, so importing the module is SSR / Node safe. The same rules are
 * published as lib-core's `prose` Sass mixin, and read the same CSS
 * variables (`--prose-font-size`, `--prose-border-color`, ...).
 *
 * @summary Typography for long-form HTML content (articles, Markdown).
 * @tag minerva-prose
 * @slot - Semantic HTML content (headings, paragraphs, lists, tables, code...)
 */
export class MinervaProse extends MinervaElement {
  static override tagName = "minerva-prose";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    const root = this.getRootNode();
    if (root.nodeType === 9 || root.nodeType === 11) {
      injectProseStyles(root as StyleScope);
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-prose": MinervaProse;
  }
}
