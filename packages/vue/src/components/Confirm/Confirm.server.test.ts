import { afterEach, describe, expect, it, vi } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { ConfirmDialog, ConfirmProvider, confirm } from ".";

describe("Confirm on the server", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("confirm() resolves false without a document", async () => {
    vi.stubGlobal("document", undefined);
    await expect(confirm({ title: "SSR" })).resolves.toBe(false);
  });

  it("renders the provider and a dialog to a string (teleports skipped)", async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(ConfirmProvider, null, () => [
            h("p", "app"),
            h(ConfirmDialog, { open: true, title: "SSR" }),
          ]),
      }),
    );
    expect(html).toContain("<p>app</p>");
    expect(html).not.toContain("alertdialog");
  });
});
