export interface MonacoCodeEditorProps {
  /** Local Monaco engine. Configure its workers in the host; never fetched from a CDN. */
  monaco?: typeof import("monaco-editor");
  /** Controlled source text, used with v-model. */
  modelValue: string;
  /** Visible and accessible editor label. */
  label: string;
  language?: string;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  disabled?: boolean;
  theme?: "light" | "dark";
  /** Time allowed for a late engine injection before showing the editable fallback. */
  loadTimeout?: number;
  unavailableText?: string;
  retryText?: string;
  retryLabel?: string;
  loadingLabel?: string;
}
