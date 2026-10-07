// Server HTML of every public component hydrates without mismatches
// (useId, client-only portals, media queries...): no recoverable errors and
// nothing logged by React.
import { act, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider, FormField, Input } from "./index";
import { componentSsrCases } from "./test-utils/componentSsrCases";

// Not using Testing Library's render here: opt in to act() explicitly.
(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

function hydrate(element: ReactElement) {
  const ui = <ConfigProvider theme="light">{element}</ConfigProvider>;
  const container = document.createElement("div");
  container.innerHTML = renderToString(ui);
  document.body.appendChild(container);
  const serverHtml = container.innerHTML;

  const problems: unknown[] = [];
  vi.spyOn(console, "error").mockImplementation((...args) =>
    problems.push(args),
  );
  let root: ReturnType<typeof hydrateRoot> | undefined;
  act(() => {
    root = hydrateRoot(container, ui, {
      onRecoverableError: (error) => problems.push(error),
    });
  });
  return { problems, serverHtml, container, unmount: () => root?.unmount() };
}

describe("hydration", () => {
  it.each(componentSsrCases)("hydrates %s without mismatches", (_, element) => {
    const { problems, unmount } = hydrate(element);
    expect(problems).toEqual([]);
    act(() => unmount());
  });

  it("keeps server-generated ids (useId) for label associations", () => {
    const { container, serverHtml, unmount } = hydrate(
      <FormField label="Email">
        <Input />
      </FormField>,
    );
    // The DOM nodes are reused as is: ids match what the server sent.
    const input = container.querySelector("input")!;
    expect(serverHtml).toContain(`id="${input.id}"`);
    expect(container.querySelector(`label[for="${input.id}"]`)).not.toBeNull();
    act(() => unmount());
  });
});
