import type { ReactNode } from "react";
import { vi } from "vitest";
import { loader, type Monaco } from "@monaco-editor/react";
import { MonacoCodeEditor } from "../../components/MonacoCodeEditor";
import type { HookScenario } from "./types";

// A local engine that cannot create an editor: the real (offline) loader
// resolves it and the editor falls back to the textarea.
const engine = {
  editor: {
    getModel: () => null,
    createModel: () => ({}),
    create: () => {
      throw new Error("No editor in happy-dom");
    },
  },
  Uri: { parse: () => ({}) },
} as unknown as Monaco;

/** Keeps the engine loading (spy restored after the component's test). */
const Pending = ({ children }: { children: ReactNode }) => {
  vi.spyOn(loader, "init").mockReturnValue(
    new Promise(() => {}) as ReturnType<typeof loader.init>,
  );
  return children;
};

const editor = (disabled = false) => (
  <MonacoCodeEditor
    monaco={engine}
    label="Source"
    value="a"
    onChange={() => {}}
    disabled={disabled}
  />
);

export default [
  { name: "unavailable (fallback), disabled", element: editor(true) },
  // last: the loader stays pending until the spies are restored
  { name: "loading", element: <Pending>{editor()}</Pending> },
] satisfies HookScenario[];
