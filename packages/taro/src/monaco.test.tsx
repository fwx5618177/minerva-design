import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { MonacoCodeEditor } from "./monaco";
it("H5 Monaco creates an injected editor, reflects text and disposes it", async () => {
  let text = "initial";
  let changed = () => {};
  const dispose = vi.fn(),
    modelDispose = vi.fn();
  const model = { dispose: modelDispose };
  const editor = {
    getValue: () => text,
    setValue: (v: string) => {
      text = v;
    },
    getModel: () => model,
    updateOptions: vi.fn(),
    focus: vi.fn(),
    dispose,
    onDidChangeModelContent: (fn: () => void) => {
      changed = fn;
      return { dispose: vi.fn() };
    },
  };
  const create = vi.fn(() => editor);
  const monaco = {
    editor: { create, setTheme: vi.fn(), setModelLanguage: vi.fn() },
  } as unknown as typeof import("monaco-editor");
  const change = vi.fn();
  const w = render(
    <MonacoCodeEditor
      monaco={monaco}
      value="initial"
      label="Code"
      onChange={change}
    />,
  );
  await waitFor(() => expect(create).toHaveBeenCalledOnce());
  text = "edited";
  changed();
  expect(change).toHaveBeenCalledWith("edited");
  w.rerender(<MonacoCodeEditor monaco={monaco} value="owner" label="Code" />);
  expect(text).toBe("owner");
  w.rerender(
    <MonacoCodeEditor
      monaco={monaco}
      value="owner"
      label="Code"
      language="json"
      disabled
      theme="dark"
    />,
  );
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
it("H5 Monaco unavailable engine exposes an editable fallback and retry", async () => {
  const change = vi.fn();
  render(
    <MonacoCodeEditor
      value="source"
      label="Code"
      loadTimeout={1}
      onChange={change}
    />,
  );
  await waitFor(() =>
    expect(screen.getByRole("textbox", { name: "Code" })).toBeInTheDocument(),
  );
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "new" } });
  expect(change).toHaveBeenCalledWith("new");
  expect(
    screen.getByRole("button", { name: "Retry editor" }),
  ).toBeInTheDocument();
});
it("H5 Monaco recovers a failed local engine on retry", async () => {
  let source = "value";
  const model = { dispose: vi.fn() },
    instance = {
      getValue: () => source,
      setValue: (v: string) => {
        source = v;
      },
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
    editor: { create, setModelLanguage: vi.fn(), setTheme: vi.fn() },
  } as unknown as typeof import("monaco-editor");
  const w = render(
    <MonacoCodeEditor monaco={monaco} value="value" label="Source" />,
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    "The editor is unavailable",
  );
  fireEvent.click(screen.getByRole("button", { name: "Retry editor" }));
  await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
  expect(w.container.querySelector(".mn-monaco-surface")).toHaveStyle({
    height: "420px",
  });
  w.unmount();
  expect(model.dispose).toHaveBeenCalledOnce();
});
