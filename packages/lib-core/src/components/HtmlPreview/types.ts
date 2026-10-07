import type { CSSProperties, Ref } from "react";

/** Viewport simulated by HtmlPreview */
export type HtmlPreviewViewport = "desktop" | "mobile";

/**
 * Props of `HtmlPreview`. The iframe itself is not configurable: it is always
 * sandboxed (`sandbox=""`), has no referrer and renders a sanitized document
 * behind a strict Content-Security-Policy.
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
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Ref to the root `<div>` element */
  ref?: Ref<HTMLDivElement>;
}
