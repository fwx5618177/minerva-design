// Type-level check (run by `pnpm typecheck`): the real `monaco-editor`
// namespace is a valid `monaco` property value, without the published
// typings depending on monaco-editor.
import type * as monaco from "monaco-editor";
import { expect, it } from "vitest";
import type { CodeEditorEngine, MinervaCodeEditor } from "./code-editor";

it('accepts `import * as monaco from "monaco-editor"` as the engine', () => {
  // compile-time assignability (never called)
  const asEngine = (engine: typeof monaco): CodeEditorEngine => engine;
  const asProperty = (engine: typeof monaco): MinervaCodeEditor["monaco"] =>
    engine;
  expect(typeof asEngine).toBe("function");
  expect(typeof asProperty).toBe("function");
});
