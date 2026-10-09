import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { it, expect, vi } from "vitest";
import MonacoCodeEditor from "./MonacoCodeEditor.vue";
it("H5 Monaco synchronizes owner changes and disposes its editor", async () => {
  let value = "source";
  const dispose = vi.fn(),
    modelDispose = vi.fn();
  const model = { dispose: modelDispose };
  const editor = {
    getValue: () => value,
    setValue: (v: string) => {
      value = v;
    },
    getModel: () => model,
    updateOptions: vi.fn(),
    dispose,
    onDidChangeModelContent: () => ({ dispose: vi.fn() }),
  };
  const create = vi.fn(() => editor);
  const monaco = {
    editor: { create, setTheme: vi.fn(), setModelLanguage: vi.fn() },
  } as unknown as typeof import("monaco-editor");
  const w = mount(MonacoCodeEditor, {
    props: { monaco, modelValue: "source", label: "Code" },
  });
  await nextTick();
  expect(create).toHaveBeenCalledOnce();
  await w.setProps({ modelValue: "owner" });
  expect(value).toBe("owner");
  await w.setProps({ language: "json", disabled: true, theme: "dark" });
  expect(monaco.editor.setModelLanguage).toHaveBeenLastCalledWith(
    model,
    "json",
  );
  expect(monaco.editor.setTheme).toHaveBeenLastCalledWith("vs-dark");
  expect(editor.updateOptions).toHaveBeenLastCalledWith({
    readOnly: true,
    domReadOnly: true,
    ariaLabel: "Code",
  });
  w.unmount();
  expect(modelDispose).toHaveBeenCalledOnce();
  expect(dispose).toHaveBeenCalledOnce();
});
it("H5 Monaco retry recovers a failed editor and uses shared default geometry", async () => {
  const model = { dispose: vi.fn() },
    instance = {
      getValue: () => "value",
      getModel: () => model,
      updateOptions: vi.fn(),
      dispose: vi.fn(),
      onDidChangeModelContent: () => ({ dispose: vi.fn() }),
    };
  const create = vi
    .fn()
    .mockImplementationOnce(() => {
      throw new Error("worker setup failed");
    })
    .mockReturnValue(instance);
  const monaco = {
    editor: { create, setTheme: vi.fn(), setModelLanguage: vi.fn() },
  } as unknown as typeof import("monaco-editor");
  const w = mount(MonacoCodeEditor, {
    props: { monaco, modelValue: "value", label: "Source" },
  });
  await nextTick();
  expect(w.find("[role=alert]").text()).toBe("The editor is unavailable");
  await w.find("button").trigger("click");
  await nextTick();
  expect(w.find("[role=alert]").exists()).toBe(false);
  expect(w.find(".mn-monaco-surface").attributes("style")).toContain("420px");
  w.unmount();
  expect(model.dispose).toHaveBeenCalledOnce();
});
