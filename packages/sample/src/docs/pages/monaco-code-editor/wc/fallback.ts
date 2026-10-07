// Without an engine the editor shows its loading state, then (after
// load-timeout) an editable textarea with a Retry button: the value is kept
// and still submitted. Setting `monaco` later loads the editor with the
// latest value.
import type { CodeEditorEngine } from "@minerva/lib-web-components/code-editor";

export function setup(root: HTMLElement) {
  const editor = root.querySelector<
    HTMLElement & { monaco?: CodeEditorEngine }
  >("#fallback-editor")!;
  const button = root.querySelector<HTMLElement>("#load-engine")!;
  const status = root.querySelector<HTMLOutputElement>("#fallback-status")!;
  void import("@minerva/lib-web-components/code-editor");
  const onError = () => {
    status.value = "Engine unavailable: textarea fallback";
  };
  const onClick = async () => {
    const engine = await import("../engine").then(
      (m) => m.monaco,
      () => undefined,
    );
    if (!engine) return;
    editor.monaco = engine;
    status.value = "Engine provided";
  };
  editor.addEventListener("minerva-error", onError);
  button.addEventListener("click", onClick);
  return () => {
    editor.removeEventListener("minerva-error", onError);
    button.removeEventListener("click", onClick);
  };
}
