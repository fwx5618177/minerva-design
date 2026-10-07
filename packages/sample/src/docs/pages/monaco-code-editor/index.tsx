import React from "react";
import DocPage from "@/docs/components/DocPage";
import { collectDemos } from "@/docs/demos";

// Not part of the main entry: published from the "./monaco" sub-entry, with
// @monaco-editor/react and monaco-editor as optional peer dependencies.
const importCode = `import { MonacoCodeEditor } from "@minerva/lib-core/monaco";
import "@minerva/lib-core/style.css";`;

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const MonacoCodeEditorDoc: React.FC = () => (
  <DocPage id="monaco-code-editor" demos={demos} importCode={importCode} />
);

export default MonacoCodeEditorDoc;
