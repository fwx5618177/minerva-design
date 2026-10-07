// @novel-isr/ui compatibility: the `@novel-isr/ui/monaco` sub-entry.
//
// Kept apart from the main compat entry so @monaco-editor/react (an optional
// peer) is only loaded by apps that import the editor. MonacoCodeEditor was
// ported with novel-isr-ui's API (local engine, same props, DOM and `ui-*`
// hooks); it follows `data-theme` on <html>, which novel's ThemeProvider
// writes. The adapter only pins novel's original Chinese built-in texts
// (independent of lib-core's language); consumer props override them.
import { MonacoCodeEditor as MinervaMonacoCodeEditor } from "../components/MonacoCodeEditor";
import type { MonacoCodeEditorProps } from "../components/MonacoCodeEditor";

export type { MonacoCodeEditorProps };

export const MonacoCodeEditor = ({
  unavailableText = "编辑器暂不可用",
  retryText = "重试",
  retryLabel = "重试编辑器",
  loadingLabel = "加载编辑器",
  ...props
}: MonacoCodeEditorProps) => (
  <MinervaMonacoCodeEditor
    {...props}
    unavailableText={unavailableText}
    retryText={retryText}
    retryLabel={retryLabel}
    loadingLabel={loadingLabel}
  />
);
