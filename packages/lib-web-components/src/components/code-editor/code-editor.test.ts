// <minerva-code-editor> with a fake local engine (the subset of Monaco's API
// the element uses): engine injection, theme sync with the scope, loading /
// error fallback to a textarea, retry and form association. The real Monaco
// engine needs a browser (workers, layout): it is exercised on the docs site.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MinervaCodeEditor,
  type CodeEditorEngine,
  type CodeEditorInstance,
} from "../../elements/code-editor";
import "../../elements/config";
import type { MinervaConfig } from "../config/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

interface FakeEditor extends CodeEditorInstance {
  container: HTMLElement;
  options: Record<string, unknown>;
  content: string;
  type(text: string): void;
  blur(): void;
}

function fakeEngine({ fail = false } = {}) {
  const editors: FakeEditor[] = [];
  const engine = {
    editors,
    theme: "",
    language: new Map<unknown, string>(),
    editor: {
      setTheme: vi.fn((theme: string) => {
        engine.theme = theme;
      }),
      setModelLanguage: vi.fn((model: unknown, language: string) => {
        engine.language.set(model, language);
      }),
      create: vi.fn(
        (container: HTMLElement, options: Record<string, unknown> = {}) => {
          if (fail) throw new Error("Local engine failed");
          const change = new Set<() => void>();
          const blur = new Set<() => void>();
          const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 1,
            endColumn: 1,
          };
          const model = { getFullModelRange: () => range };
          const editor: FakeEditor = {
            container,
            options: { ...options },
            content: String(options.value ?? ""),
            getValue: () => editor.content,
            setValue: vi.fn((value: string) => {
              editor.content = value;
              change.forEach((listener) => listener());
            }),
            getModel: () => model,
            executeEdits: vi.fn((_source, edits) => {
              editor.content = edits[0].text ?? "";
              change.forEach((listener) => listener());
              return true;
            }),
            pushUndoStop: vi.fn(() => true),
            updateOptions: vi.fn((next: Record<string, unknown>) => {
              Object.assign(editor.options, next);
            }),
            onDidChangeModelContent: (listener) => {
              change.add(listener);
              return { dispose: () => change.delete(listener) };
            },
            onDidBlurEditorText: (listener) => {
              blur.add(listener);
              return { dispose: () => blur.delete(listener) };
            },
            focus: vi.fn(),
            dispose: vi.fn(),
            type(text: string) {
              editor.content = text;
              change.forEach((listener) => listener());
            },
            blur() {
              blur.forEach((listener) => listener());
            },
          };
          editors.push(editor);
          return editor;
        },
      ),
    },
  };
  return engine;
}

type Engine = ReturnType<typeof fakeEngine>;

const status = (el: Element) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=status]");
const alert = (el: Element) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=alert]");
const fallback = (el: Element) =>
  el.shadowRoot!.querySelector<HTMLTextAreaElement>("textarea");
const surface = (el: Element) => $<HTMLElement>(el, "[part=surface]");
const retryButton = (el: Element) => $<HTMLElement>(el, "[part=retry-button]");

async function setup(
  attrs = 'label="HTML source" value="<p>Hello</p>"',
  engine: Engine | null = fakeEngine(),
  wrap = (markup: string) => markup,
) {
  await mount(wrap(`<minerva-code-editor ${attrs}></minerva-code-editor>`));
  const el = document.querySelector<MinervaCodeEditor>("minerva-code-editor")!;
  if (engine) el.monaco = engine as unknown as CodeEditorEngine;
  await settle();
  return { el, engine: engine!, editor: engine?.editors?.at(-1) };
}

beforeEach(() => {
  resetDevWarnings();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-theme");
});

describe("<minerva-code-editor>", () => {
  it("is registered by its optional entry", () => {
    expect(customElements.get("minerva-code-editor")).toBe(MinervaCodeEditor);
  });

  it("shows a labelled loading state until the engine is set", async () => {
    const { el } = await setup(undefined, null);
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("role", "group");
    expect(base).toHaveAttribute("aria-label", "HTML source");
    expect($(el, "[part=label]").textContent).toBe("HTML source");
    expect(surface(el)).toHaveAttribute("aria-busy", "true");
    expect(status(el)!.querySelector("minerva-progress")).toHaveAttribute(
      "aria-label",
      "Loading editor",
    );
    expect(fallback(el)).toBeNull();
  });

  it("creates the editor with the injected local engine in a light DOM container", async () => {
    const { el, engine, editor } = await setup(
      'label="HTML source" language="html" value="<p>Hello</p>"',
    );
    expect(engine.editor.create).toHaveBeenCalledTimes(1);
    expect(editor!.container.parentElement).toBe(el);
    expect(editor!.container.slot).toBe("editor");
    expect(editor!.options).toMatchObject({
      value: "<p>Hello</p>",
      language: "html",
      readOnly: false,
      ariaLabel: "HTML source",
      automaticLayout: true,
      theme: "vs",
    });
    expect(status(el)).toBeNull();
    expect(surface(el)).toHaveAttribute("aria-busy", "false");
    expect(el.shadowRoot!.querySelector('slot[name="editor"]')).not.toBeNull();
    // clicking the label focuses the editor
    $(el, "[part=label]").click();
    expect(editor!.focus).toHaveBeenCalled();
  });

  it("reports edits (input / minerva-input each edit, change on blur) and accepts external values", async () => {
    const { el, editor } = await setup();
    const onInput = vi.fn();
    const onMinervaInput = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("input", onInput);
    el.addEventListener("minerva-input", (e) =>
      onMinervaInput((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail),
    );
    editor!.type("<p>Edited</p>");
    expect(el.value).toBe("<p>Edited</p>");
    expect(onInput).toHaveBeenCalledTimes(1);
    expect(onMinervaInput).toHaveBeenCalledWith({ value: "<p>Edited</p>" });
    editor!.blur();
    editor!.blur();
    expect(onChange).toHaveBeenCalledTimes(1);
    // an external value is applied as an undoable edit, without events
    el.value = "<p>From outside</p>";
    await settle();
    expect(editor!.executeEdits).toHaveBeenCalledWith("", [
      {
        range: editor!.getModel()!.getFullModelRange(),
        text: "<p>From outside</p>",
        forceMoveMarkers: true,
      },
    ]);
    expect(editor!.pushUndoStop).toHaveBeenCalled();
    expect(editor!.getValue()).toBe("<p>From outside</p>");
    expect(onMinervaInput).toHaveBeenCalledTimes(1);
  });

  it("disabled: read-only editor, edits ignored, value replaced with setValue", async () => {
    const { el, editor } = await setup();
    const onInput = vi.fn();
    el.addEventListener("minerva-input", onInput);
    el.disabled = true;
    await settle();
    expect(editor!.options).toMatchObject({
      readOnly: true,
      domReadOnly: true,
    });
    el.value = "locked";
    await settle();
    expect(editor!.setValue).toHaveBeenCalledWith("locked");
    expect(onInput).not.toHaveBeenCalled();
    editor!.type("blocked");
    expect(el.value).toBe("locked");
  });

  it("changes the language and the accessible label of the mounted editor", async () => {
    const { el, engine, editor } = await setup();
    el.language = "css";
    el.label = "Styles";
    await settle();
    expect(engine.editor.setModelLanguage).toHaveBeenCalledWith(
      editor!.getModel(),
      "css",
    );
    expect(editor!.options.ariaLabel).toBe("Styles");
  });

  it("follows the theme of its <minerva-config> scope and of <html>; the attribute wins", async () => {
    const { el, engine } = await setup(
      'label="Source"',
      fakeEngine(),
      (markup) => `<minerva-config theme="dark">${markup}</minerva-config>`,
    );
    const config = document.querySelector<MinervaConfig>("minerva-config")!;
    expect(el.resolvedTheme).toBe("dark");
    expect(engine.theme).toBe("vs-dark");
    expect(engine.editors[0].options.theme).toBe("vs-dark");
    config.theme = "light";
    await settle();
    expect(el.resolvedTheme).toBe("light");
    expect(engine.theme).toBe("vs");
    config.theme = "github-dark";
    await settle();
    expect(engine.theme).toBe("vs-dark");
    el.theme = "light";
    await settle();
    expect(engine.theme).toBe("vs");
    // no scope: the page theme
    el.theme = undefined;
    config.removeAttribute("theme");
    await settle();
    document.documentElement.setAttribute("data-theme", "dark");
    await settle();
    expect(el.resolvedTheme).toBe("dark");
    expect(engine.theme).toBe("vs-dark");
  });

  it("falls back to an editable textarea when the engine throws; retry mounts with the latest value", async () => {
    const broken = fakeEngine({ fail: true });
    const onError = vi.fn();
    document.addEventListener("minerva-error", onError, { once: true });
    const { el } = await setup(undefined, broken);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(alert(el)!.textContent!.trim()).toBe("The editor is unavailable");
    const input = fallback(el)!;
    expect(input.value).toBe("<p>Hello</p>");
    expect(input.disabled).toBe(false);
    expect(input).toHaveAttribute("aria-label", "HTML source");
    expect($(el, "[part=label]")).toHaveAttribute("for", "fallback");
    expect(surface(el)).toHaveAttribute("aria-busy", "false");
    expect(el.querySelector("[slot=editor]")).toBeNull();
    const onInput = vi.fn();
    el.addEventListener("minerva-input", (e) =>
      onInput((e as CustomEvent).detail),
    );
    input.value = "Edited";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(onInput).toHaveBeenCalledWith({ value: "Edited" });
    expect(el.value).toBe("Edited");
    const retry = retryButton(el);
    expect(retry).toHaveAttribute("aria-label", "Retry editor");
    expect(retry.textContent).toContain("Retry");
    // a working engine, then Retry
    const engine = fakeEngine();
    el.monaco = engine as unknown as CodeEditorEngine;
    await settle();
    expect(fallback(el)).toBeNull();
    expect(engine.editors[0].options.value).toBe("Edited");
    // Retry re-creates the editor
    el.retry();
    await settle();
    expect(engine.editor.create).toHaveBeenCalledTimes(2);
    expect(engine.editors[0].dispose).toHaveBeenCalled();
  });

  it("the Retry button tries the same engine again", async () => {
    const engine = fakeEngine({ fail: true });
    const { el } = await setup(undefined, engine);
    expect(engine.editor.create).toHaveBeenCalledTimes(1);
    retryButton(el).click();
    await settle();
    expect(engine.editor.create).toHaveBeenCalledTimes(2);
    expect(fallback(el)).not.toBeNull();
  });

  it("rejects something that is not an engine (dev warning), without any network loader", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const scripts = document.querySelectorAll("script[src]").length;
    const { el } = await setup(undefined, {} as Engine);
    expect(alert(el)).not.toBeNull();
    expect(error).toHaveBeenCalledWith(
      expect.stringMatching(
        /^\[minerva\] <minerva-code-editor>: `monaco` is not a Monaco engine/,
      ),
    );
    expect(document.querySelectorAll("script[src]")).toHaveLength(scripts);
  });

  it("ends a missing engine with a disabled fallback after load-timeout; a later engine loads", async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `<minerva-code-editor label="Source" disabled load-timeout="500" loading-label="Loading source"></minerva-code-editor>`;
    const el = document.querySelector<MinervaCodeEditor>(
      "minerva-code-editor",
    )!;
    await vi.advanceTimersByTimeAsync(0);
    await el.updateComplete;
    expect(
      status(el)!.querySelector('[aria-label="Loading source"]'),
    ).not.toBeNull();
    await vi.advanceTimersByTimeAsync(499);
    expect(fallback(el)).toBeNull();
    await vi.advanceTimersByTimeAsync(1);
    await el.updateComplete;
    expect(fallback(el)!.disabled).toBe(true);
    expect(alert(el)).not.toBeNull();
    expect(status(el)).toBeNull();
    const engine = fakeEngine();
    el.monaco = engine as unknown as CodeEditorEngine;
    await el.updateComplete;
    expect(engine.editor.create).toHaveBeenCalledTimes(1);
    expect(engine.editors[0].options.readOnly).toBe(true);
    await el.updateComplete;
    expect(fallback(el)).toBeNull();
  });

  it("allows overriding and localizes the built-in texts", async () => {
    const { el } = await setup(
      'label="源码" unavailable-text="编辑器暂不可用" retry-text="重试" retry-label="重试编辑器"',
      fakeEngine({ fail: true }),
    );
    expect(alert(el)!.textContent!.trim()).toBe("编辑器暂不可用");
    expect(retryButton(el)).toHaveAttribute("aria-label", "重试编辑器");
    expect(retryButton(el).textContent).toContain("重试");
    document.body.innerHTML = "";
    const localized = await setup(
      'label="Source"',
      fakeEngine({ fail: true }),
      (markup) => `<div lang="fr">${markup}</div>`,
    );
    expect(alert(localized.el)!.textContent!.trim()).not.toBe(
      "The editor is unavailable",
    );
  });

  it("keeps a bounded height", async () => {
    const { el } = await setup('label="S" height="900" max-height="500"');
    expect(surface(el).style.height).toBe("500px");
    el.height = 20;
    el.minHeight = 160;
    await settle();
    expect(surface(el).style.height).toBe("160px");
    el.height = Number.NaN;
    el.minHeight = -1;
    el.maxHeight = 0;
    await settle();
    expect(surface(el).style.height).toBe("420px");
  });

  it("disposes the editor on disconnect and re-creates it on reconnect", async () => {
    const { el, engine, editor } = await setup();
    const parent = el.parentNode!;
    el.remove();
    expect(editor!.dispose).toHaveBeenCalled();
    expect(el.querySelector("[slot=editor]")).toBeNull();
    parent.append(el);
    await settle();
    expect(engine.editor.create).toHaveBeenCalledTimes(2);
    expect(el.querySelectorAll("[slot=editor]")).toHaveLength(1);
  });

  it("warns without a label", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup("");
    expect(error).toHaveBeenCalledWith(expect.stringContaining("set label"));
  });
});

describe("<minerva-code-editor> in a form", () => {
  it("submits its value, resets to the value attribute and follows <fieldset disabled>", async () => {
    const { el, editor } = await setup(
      'label="Source" name="source" value="initial"',
      fakeEngine(),
      (markup) => `<form><fieldset>${markup}</fieldset></form>`,
    );
    const form = document.querySelector("form")!;
    expect(new FormData(form).get("source")).toBe("initial");
    editor!.type("edited");
    await settle();
    expect(new FormData(form).get("source")).toBe("edited");
    form.reset();
    await settle();
    expect(el.value).toBe("initial");
    expect(editor!.getValue()).toBe("initial");
    form.querySelector("fieldset")!.disabled = true;
    await settle();
    expect(editor!.options.readOnly).toBe(true);
    expect(new FormData(form).has("source")).toBe(false);
  });

  it("required: invalid while empty", async () => {
    const { el, editor } = await setup('label="Source" required');
    expect(el.checkValidity()).toBe(false);
    editor!.type("x");
    await settle();
    expect(el.checkValidity()).toBe(true);
  });
});
