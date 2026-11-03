// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { version } from "../../../../../packages/minerva-design/package.json";
import ReferenceLinks from "./ReferenceLinks";
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { resolvedLanguage: "zh-CN" },
  }),
}));
describe("static reference links", () => {
  it.each([
    ["vue", "vue"],
    ["html", "wc"],
    ["react-native", "native"],
    ["react", "react"],
  ])(
    "links %s to its own API rather than the React API",
    (framework, renderer) => {
      const { unmount } = render(
        <MemoryRouter initialEntries={[`/input?framework=${framework}`]}>
          <ReferenceLinks page="input" />
        </MemoryRouter>,
      );
      expect(
        screen.getByRole("link", { name: "doc.reference.markdown" }),
      ).toHaveAttribute(
        "href",
        expect.stringContaining(
          `/reference/${version}/zh/${renderer}/input.md`,
        ),
      );
      unmount();
    },
  );
});
