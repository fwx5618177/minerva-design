import type { CSSProperties } from "react";
import type { Monaco } from "@monaco-editor/react";
import type { DataAttributes } from "../../internal/dataAttributes";

/** Color theme of the Monaco editor */
export type MonacoCodeEditorTheme = "light" | "dark";

/** Props of `MonacoCodeEditor` (published from `@minerva/lib-core/monaco`) */
export interface MonacoCodeEditorProps extends DataAttributes {
  /**
   * Local Monaco engine (`import * as monaco from "monaco-editor"`). One
   * engine per application; configure its workers in the host. The editor is
   * never loaded from a CDN
   */
  monaco: Monaco;
  /** Source text (controlled) */
  value: string;
  /** Called with the new source text */
  onChange: (value: string) => void;
  /**
   * Monaco language id
   * @default "plaintext"
   */
  language?: string;
  /** Visible label, also the accessible name of the editor */
  label: string;
  /**
   * Height of the editor in pixels, clamped to [minHeight, maxHeight]
   * @default 420
   */
  height?: number;
  /**
   * Minimum height in pixels
   * @default 160
   */
  minHeight?: number;
  /**
   * Maximum height in pixels
   * @default 800
   */
  maxHeight?: number;
  /**
   * Makes the editor (and its fallback) read-only
   * @default false
   */
  disabled?: boolean;
  /**
   * Color theme. Defaults to the page theme: `data-theme` on `<html>`, then
   * the ConfigProvider theme, then light
   */
  theme?: MonacoCodeEditorTheme;
  /**
   * Milliseconds to wait for the engine and the editor before showing the
   * textarea fallback
   * @default 10000
   */
  loadTimeout?: number;
  /**
   * Message shown above the fallback textarea when the editor is unavailable
   * @default "The editor is unavailable" (localized)
   */
  unavailableText?: string;
  /**
   * Text of the retry button
   * @default "Retry" (localized)
   */
  retryText?: string;
  /**
   * Accessible label of the retry button
   * @default "Retry editor" (localized)
   */
  retryLabel?: string;
  /**
   * Accessible label of the loading indicator
   * @default "Loading editor" (localized)
   */
  loadingLabel?: string;
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
}
