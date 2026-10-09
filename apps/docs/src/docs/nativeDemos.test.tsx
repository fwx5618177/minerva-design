// @vitest-environment happy-dom
import { render } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { docPages } from "./registry";
import { loadNativeDemos } from "./nativeDemos";
import PhoneFrame from "./native/PhoneFrame";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);
beforeEach(() => localStorage.clear());
const cases = docPages.flatMap((page) =>
  (page.native?.demos ?? []).map((id) => [page.id, id] as const),
);
describe("published native examples", () => {
  it.each(cases)(
    "%s/%s mounts its real native components without errors",
    async (page, id) => {
      const errors = vi.spyOn(console, "error");
      const demos = await loadNativeDemos(page);
      expect(demos[id], `${page}/${id} must be loadable`).toBeDefined();
      const Demo = demos[id].Component;
      const { container, unmount } = render(
        <SiteProviders>
          <PhoneFrame label={id}>
            <Demo />
          </PhoneFrame>
        </SiteProviders>,
      );
      expect(
        container.querySelector("[data-native-screen]"),
      ).not.toBeEmptyDOMElement();
      unmount();
      expect(errors).not.toHaveBeenCalled();
    },
  );
});

it("documents every native counterpart with a runnable native demo", async () => {
  const { NATIVE_COMPONENTS } =
    await import("../../../../packages/native/src/manifest");
  const available = new Set(
    NATIVE_COMPONENTS.flatMap((entry) => [
      entry.name,
      ...(entry.aliases ?? []),
    ]),
  );
  for (const page of docPages) {
    const counterparts = (page.exports ?? []).filter((name) =>
      available.has(name),
    );
    if (!counterparts.length) continue;
    expect(
      page.native?.demos.length,
      `${page.id}: missing native example`,
    ).toBeGreaterThan(0);
    for (const name of counterparts)
      expect(page.native?.exports, `${page.id}: ${name}`).toContain(name);
  }
});
