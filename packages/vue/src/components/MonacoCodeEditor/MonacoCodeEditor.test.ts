import { afterEach, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createSSRApp, h, nextTick } from "vue";
import { renderToString } from "vue/server-renderer";
import * as entry from "../../monaco";

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-theme");
});

function engine() {
  let value = "initial";
  let change: () => void = () => undefined;
  const model = { dispose: vi.fn() };
  const instance = {
    getValue: () => value,
    setValue: vi.fn((next: string) => {
      value = next;
      change();
    }),
    getModel: () => model,
    updateOptions: vi.fn(),
    focus: vi.fn(),
    dispose: vi.fn(),
    onDidChangeModelContent: vi.fn((fn: () => void) => {
      change = fn;
      return { dispose: vi.fn() };
    }),
  };
  const api = {
    editor: {
      create: vi.fn(() => instance),
      setTheme: vi.fn(),
      setModelLanguage: vi.fn(),
    },
  } as unknown as typeof import("monaco-editor");
  return {
    api,
    instance,
    model,
    edit: (next: string) => {
      value = next;
      change();
    },
  };
}

it("publishes a real optional Vue editor", () => {
  expect(entry).toHaveProperty("MonacoCodeEditor");
});

it("mounts the injected engine, updates controlled values and disposes its model", async () => {
  const mock = engine();
  const wrapper = mount(entry.MonacoCodeEditor, {
    props: { monaco: mock.api, modelValue: "initial", label: "Source" },
  });
  await nextTick();
  expect(mock.api.editor.create).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({
      value: "initial",
      ariaLabel: "Source",
      automaticLayout: true,
    }),
  );
  mock.edit("edited");
  expect(wrapper.emitted("update:modelValue")).toEqual([["edited"]]);
  expect(wrapper.emitted("change")).toEqual([["edited"]]);
  await wrapper.setProps({
    modelValue: "external",
    language: "json",
    disabled: true,
  });
  expect(mock.instance.setValue).toHaveBeenCalledWith("external");
  expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
  expect(wrapper.emitted("change")).toHaveLength(1);
  expect(mock.api.editor.setModelLanguage).toHaveBeenCalledWith(
    mock.model,
    "json",
  );
  expect(mock.instance.updateOptions).toHaveBeenLastCalledWith(
    expect.objectContaining({ readOnly: true }),
  );
  mock.edit("blocked");
  expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
  wrapper.unmount();
  expect(mock.instance.dispose).toHaveBeenCalledOnce();
  expect(mock.model.dispose).toHaveBeenCalledOnce();
});

it("falls back on failure, preserves editing and retries without loading a CDN", async () => {
  const mock = engine();
  vi.mocked(mock.api.editor.create).mockImplementationOnce(() => {
    throw new Error("worker unavailable");
  });
  const wrapper = mount(entry.MonacoCodeEditor, {
    props: {
      monaco: mock.api,
      modelValue: "saved",
      label: "Code",
      height: 1,
      minHeight: 180,
    },
  });
  await nextTick();
  expect(wrapper.get('[role="alert"]').text()).toBeTruthy();
  expect(wrapper.get('[data-part="surface"]').attributes("style")).toContain(
    "180px",
  );
  await wrapper.get("textarea").setValue("recovered");
  expect(wrapper.emitted("update:modelValue")).toEqual([["recovered"]]);
  expect(wrapper.emitted("change")).toEqual([["recovered"]]);
  await wrapper.setProps({ modelValue: "recovered" });
  await wrapper.get("button").trigger("click");
  expect(mock.api.editor.create).toHaveBeenLastCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({ value: "recovered" }),
  );
  expect(wrapper.find("textarea").exists()).toBe(false);
  wrapper.unmount();
});

it("bounds an absent engine, can recover from late injection and follows page theme", async () => {
  vi.useFakeTimers();
  const wrapper = mount(entry.MonacoCodeEditor, {
    props: { modelValue: "draft", label: "Code", loadTimeout: 25 },
    attachTo: document.body,
  });
  await vi.advanceTimersByTimeAsync(25);
  expect(wrapper.find("textarea").exists()).toBe(true);
  const mock = engine();
  await wrapper.setProps({ monaco: mock.api });
  expect(wrapper.find("textarea").exists()).toBe(false);
  document.documentElement.setAttribute("data-theme", "dark");
  await vi.advanceTimersByTimeAsync(0);
  await nextTick();
  expect(mock.api.editor.setTheme).toHaveBeenLastCalledWith("vs-dark");
  await wrapper.setProps({ theme: "light" });
  expect(mock.api.editor.setTheme).toHaveBeenLastCalledWith("vs");
  wrapper.unmount();
});

it("renders an accessible SSR loading shell without touching the engine", async () => {
  const mock = engine();
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(entry.MonacoCodeEditor, {
          monaco: mock.api,
          modelValue: "code",
          label: "Source",
        }),
    }),
  );
  expect(html).toContain('aria-label="Source"');
  const doc = new DOMParser().parseFromString(html, "text/html");
  expect(
    doc
      .querySelector('[data-minerva="code-editor"]')
      ?.hasAttribute("data-loading"),
  ).toBe(true);
  expect(mock.api.editor.create).not.toHaveBeenCalled();
});
