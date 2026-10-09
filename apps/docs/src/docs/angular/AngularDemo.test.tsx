// @vitest-environment happy-dom
import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { ConfigProvider } from "minerva-design";
import { setupI18n } from "../../test/utils";
import AngularDemo from "./AngularDemo";
import { angularExamples } from "./examples";
import { mountAngularExample, type AngularIsland } from "./runtime";
vi.mock("./runtime", () => ({ mountAngularExample: vi.fn() }));
beforeAll(setupI18n);
afterEach(() => vi.clearAllMocks());
function pendingIsland() {
  let resolve!: (value: AngularIsland) => void;
  vi.mocked(mountAngularExample).mockImplementationOnce(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  const island = { update: vi.fn(), destroy: vi.fn() };
  return { island, finish: () => resolve(island) };
}
it("applies the latest theme after an asynchronous Angular mount", async () => {
  const pending = pendingIsland();
  const example = angularExamples.button![0]!;
  const view = render(
    <ConfigProvider theme="light">
      <AngularDemo example={example} />
    </ConfigProvider>,
  );
  await waitFor(() => expect(mountAngularExample).toHaveBeenCalledOnce());
  view.rerender(
    <ConfigProvider theme="dark">
      <AngularDemo example={example} />
    </ConfigProvider>,
  );
  await act(async () => pending.finish());
  expect(pending.island.update).toHaveBeenLastCalledWith(
    expect.objectContaining({ theme: "dark" }),
  );
  view.unmount();
  expect(pending.island.destroy).toHaveBeenCalledOnce();
});
it("disposes an Angular island whose mount finishes after React unmounts", async () => {
  const pending = pendingIsland();
  const view = render(
    <ConfigProvider>
      <AngularDemo example={angularExamples.button![0]!} />
    </ConfigProvider>,
  );
  await waitFor(() => expect(mountAngularExample).toHaveBeenCalledOnce());
  view.unmount();
  await act(async () => pending.finish());
  expect(pending.island.destroy).toHaveBeenCalledOnce();
  expect(pending.island.update).not.toHaveBeenCalled();
});
