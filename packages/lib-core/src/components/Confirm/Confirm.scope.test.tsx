// useConfirm() renders its dialog in the caller's ConfigProvider scope
// (portal host, theme, palette, language), with or without ConfirmProvider;
// confirm() keeps the root scope.
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ConfirmProvider, confirm, useConfirm } from "./index";
import { ConfigProvider } from "../../contexts/ConfigProvider";

const html = document.documentElement;

afterEach(() => {
  html.removeAttribute("style");
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
});

const hostOf = (element: HTMLElement) =>
  element.closest<HTMLElement>("[data-minerva-portal-host]");

function Ask({ onResult }: { onResult: (ok: boolean) => void }) {
  const scopedConfirm = useConfirm();
  return (
    <>
      <button
        type="button"
        onClick={() =>
          void scopedConfirm({ title: "Scoped question" }).then(onResult)
        }
      >
        scoped
      </button>
      <button
        type="button"
        onClick={() => void confirm({ title: "Root question" }).then(onResult)}
      >
        root
      </button>
    </>
  );
}

const app = (onResult: (ok: boolean) => void, withProvider: boolean) => {
  const nested = (
    <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
      <Ask onResult={onResult} />
    </ConfigProvider>
  );
  const content: ReactNode = withProvider ? (
    <ConfirmProvider>{nested}</ConfirmProvider>
  ) : (
    nested
  );
  return (
    <ConfigProvider theme="light" locale={{ language: "en" }}>
      {content}
    </ConfigProvider>
  );
};

describe.each([
  ["inside a ConfirmProvider", true],
  ["without a ConfirmProvider (standalone host)", false],
])("useConfirm() follows the calling scope %s", (_, withProvider) => {
  it("renders the dialog in the scoped portal host with the scoped theme and language", async () => {
    const results: boolean[] = [];
    render(app((ok) => results.push(ok), withProvider));

    await userEvent.click(screen.getByRole("button", { name: "scoped" }));
    const dialog = await screen.findByRole("alertdialog", {
      name: "Scoped question",
    });
    const host = hostOf(dialog);
    expect(host).not.toBeNull();
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toHaveAttribute("data-palette", "tech");
    expect(within(dialog).getByRole("button", { name: "取消" })).toBeVisible();

    await userEvent.click(within(dialog).getByRole("button", { name: "确定" }));
    await waitFor(() => expect(results).toEqual([true]));
  });

  it("confirm() called from the same place renders at the root, in the root language", async () => {
    const results: boolean[] = [];
    render(app((ok) => results.push(ok), withProvider));

    await userEvent.click(screen.getByRole("button", { name: "root" }));
    const dialog = await screen.findByRole("alertdialog", {
      name: "Root question",
    });
    expect(hostOf(dialog)).toBeNull();
    expect(
      within(dialog).getByRole("button", { name: "Confirm" }),
    ).toBeVisible();

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Cancel" }),
    );
    await waitFor(() => expect(results).toEqual([false]));
  });
});

describe("useConfirm() identity", () => {
  it("returns the global confirm outside a nested scope and a bound function inside", () => {
    const seen: unknown[] = [];
    function Probe() {
      seen.push(useConfirm());
      return null;
    }
    render(
      <ConfigProvider theme="light">
        <Probe />
        <ConfigProvider theme="dark">
          <Probe />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(seen[0]).toBe(confirm);
    expect(seen[seen.length - 1]).not.toBe(confirm);
  });
});
