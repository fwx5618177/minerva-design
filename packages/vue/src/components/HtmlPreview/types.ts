/** Viewport simulated by HtmlPreview */
export type HtmlPreviewViewport = "desktop" | "mobile";

/**
 * Props of `HtmlPreview` (same names and defaults as React). The iframe
 * itself is not configurable: it is always sandboxed (`sandbox=""`), has no
 * referrer and renders a sanitized document behind a strict
 * Content-Security-Policy. Only `class`, `style` and `data-*` attributes go
 * to the root.
 */
export interface HtmlPreviewProps {
  /** Untrusted HTML to preview (sanitized with DOMPurify in the browser) */
  html: string;
  /** Accessible title of the iframe */
  title: string;
  /**
   * Full-width desktop preview or a fixed-width mobile preview
   * @default "desktop"
   */
  viewport?: HtmlPreviewViewport;
  /**
   * Width of the mobile preview in pixels (invalid values fall back to 375)
   * @default 375
   */
  mobileWidth?: number;
  /**
   * Height of the iframe in pixels (invalid values fall back to 600)
   * @default 600
   */
  height?: number;
}
