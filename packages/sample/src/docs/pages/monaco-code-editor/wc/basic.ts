// The editor runs on the app's own Monaco engine (never a CDN): load the
// optional entry and the engine, then pass it as the `monaco` property. It
// follows the page / <minerva-config> theme and submits its value with the
// form. In an app:
//   import "@minerva/lib-web-components/code-editor";
//   import * as monaco from "monaco-editor"; // + workers (MonacoEnvironment)
//   editor.monaco = monaco;
import type { CodeEditorEngine } from "@minerva/lib-web-components/code-editor";

export function setup(root: HTMLElement) {
  const editor = root.querySelector<
    HTMLElement & { monaco?: CodeEditorEngine; value: string }
  >("#html-editor")!;
  const form = root.querySelector<HTMLFormElement>("#source-form")!;
  const output = root.querySelector<HTMLOutputElement>("#html-length")!;
  let cancelled = false;
  void Promise.all([
    import("@minerva/lib-web-components/code-editor"),
    // If the engine cannot load, the editor falls back to its textarea
    import("../engine").then(
      (m) => m.monaco,
      () => undefined,
    ),
  ]).then(([, engine]) => {
    if (!cancelled && engine) editor.monaco = engine;
  });
  const onInput = () => {
    output.value = `${editor.value.length} characters`;
  };
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const source = String(new FormData(form).get("source") ?? "");
    output.value = `Submitted ${source.length} characters`;
  };
  editor.addEventListener("minerva-input", onInput);
  form.addEventListener("submit", onSubmit);
  return () => {
    cancelled = true;
    editor.removeEventListener("minerva-input", onInput);
    form.removeEventListener("submit", onSubmit);
  };
}
