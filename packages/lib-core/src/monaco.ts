/**
 * `@minerva/lib-core/monaco` — Monaco-based code editor, published as its own
 * entry so the main entry never pulls in the optional peers
 * `@monaco-editor/react` and `monaco-editor`.
 */
export { MonacoCodeEditor } from "./components/MonacoCodeEditor";
export type {
  MonacoCodeEditorProps,
  MonacoCodeEditorTheme,
} from "./components/MonacoCodeEditor";
