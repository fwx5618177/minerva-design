import { expect, it } from "vitest";
import * as entry from "./index";
it("exports a native editor component from the optional entry", () => {
  expect((entry as Record<string, unknown>)["MnMonacoCodeEditor"]).toBeTypeOf(
    "function",
  );
});

import { TestBed } from "@angular/core/testing";
import { vi } from "vitest";
import { MnMonacoCodeEditor, type MonacoModule } from "./index";
import { fireEvent, settle } from "../src/testing";
function engine() {
  let value = "";
  let listener = () => {};
  const model = { dispose: vi.fn() };
  const editor = {
    getValue: () => value,
    setValue: vi.fn((next: string) => {
      value = next;
    }),
    getModel: () => model,
    updateOptions: vi.fn(),
    dispose: vi.fn(),
    onDidChangeModelContent: vi.fn((fn: () => void) => {
      listener = fn;
      return { dispose: unsubscribe };
    }),
  };
  const unsubscribe = vi.fn();
  const monaco = {
    editor: {
      create: vi.fn((_element: HTMLElement, options: { value: string }) => {
        value = options.value;
        return editor;
      }),
      setModelLanguage: vi.fn(),
      setTheme: vi.fn(),
    },
  };
  return {
    monaco: monaco as unknown as MonacoModule,
    editor,
    model,
    unsubscribe,
    change: (next: string) => {
      value = next;
      listener();
    },
  };
}
it("uses an injected engine, updates value/language/theme, emits edits and disposes resources", async () => {
  const backend = engine();
  const loader = vi.fn(() => Promise.reject(new Error("must not load")));
  const f = TestBed.createComponent(MnMonacoCodeEditor);
  document.body.appendChild(f.nativeElement);
  f.componentRef.setInput("monaco", backend.monaco);
  f.componentRef.setInput("loader", loader);
  f.componentRef.setInput("value", "original");
  f.componentRef.setInput("theme", "vs-dark");
  await f.whenStable();
  await settle(f);
  expect(loader).not.toHaveBeenCalled();
  expect(backend.monaco.editor.create).toHaveBeenCalledOnce();
  f.componentRef.setInput("value", "replacement");
  f.componentRef.setInput("language", "json");
  f.componentRef.setInput("theme", "vs");
  await settle(f);
  expect(backend.editor.getValue()).toBe("replacement");
  expect(backend.monaco.editor.setTheme).toHaveBeenLastCalledWith("vs");
  backend.change("edited");
  expect(f.componentInstance.value()).toBe("edited");
  f.componentRef.setInput("disabled", true);
  await settle(f);
  backend.change("blocked");
  expect(f.componentInstance.value()).toBe("edited");
  expect(backend.editor.updateOptions).toHaveBeenLastCalledWith(
    expect.objectContaining({ readOnly: true, domReadOnly: true }),
  );
  f.destroy();
  expect(backend.editor.dispose).toHaveBeenCalledOnce();
  expect(backend.model.dispose).toHaveBeenCalledOnce();
  expect(backend.unsubscribe).toHaveBeenCalledOnce();
});
it("keeps the fallback editable after a loading error and can retry", async () => {
  const backend = engine();
  const loader = vi
    .fn()
    .mockRejectedValueOnce(new Error("Offline"))
    .mockResolvedValueOnce(backend.monaco);
  const f = TestBed.createComponent(MnMonacoCodeEditor);
  document.body.appendChild(f.nativeElement);
  f.componentRef.setInput("loader", loader);
  await f.whenStable();
  await settle(f);
  expect(f.nativeElement.querySelector("[role=alert]").textContent).toContain(
    "Offline",
  );
  const textarea = f.nativeElement.querySelector(
    "textarea",
  ) as HTMLTextAreaElement;
  fireEvent.input(textarea, { target: { value: "recovered text" } });
  await settle(f);
  expect(f.componentInstance.value()).toBe("recovered text");
  (f.nativeElement.querySelector("button") as HTMLButtonElement).click();
  await settle(f);
  expect(backend.editor.getValue()).toBe("recovered text");
  expect(f.nativeElement.querySelector("textarea")).toBeNull();
  f.destroy();
});
it("does not create an editor if loading resolves after destruction", async () => {
  const backend = engine();
  let resolve!: (value: MonacoModule) => void;
  const loader = () =>
    new Promise<MonacoModule>((r) => {
      resolve = r;
    });
  const f = TestBed.createComponent(MnMonacoCodeEditor);
  document.body.appendChild(f.nativeElement);
  f.componentRef.setInput("loader", loader);
  await f.whenStable();
  f.destroy();
  resolve(backend.monaco);
  await Promise.resolve();
  expect(backend.monaco.editor.create).not.toHaveBeenCalled();
});
