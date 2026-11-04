// @vitest-environment happy-dom
import React from "react";
import { afterEach, beforeAll, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { version } from "../../../../packages/minerva-design/package.json";
import { SiteProviders, setupI18n } from "../test/utils";
import Installation from "./pages/installation";
import WebComponents from "./pages/web-components";
import PlainHtml from "./pages/wc-plain-html";
import { FRAMEWORKS } from "./frameworks";
import { docPages } from "./registry";

beforeAll(setupI18n);
afterEach(cleanup);

it.each([
  ["installation", Installation],
  ["web-components", WebComponents],
  ["wc-plain-html", PlainHtml],
] as const)(
  "%s pins every Minerva CDN example to the published package version",
  (id, Page) => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${id}`]}>
        <SiteProviders>
          <Page />
        </SiteProviders>
      </MemoryRouter>,
    );
    const text = [...container.querySelectorAll("pre")]
      .map((el) => el.textContent)
      .join("\n");
    const urls =
      text.match(
        /https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/minerva-design(?:@[^/\s"'<>]+)?\/[^\s"'<>]+/g,
      ) ?? [];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(url).toContain(`minerva-design@${version}/`);
  },
);

it.each([
  ["button", "minerva"],
  ["line-chart", "chart"],
  ["icon", "icon"],
])(
  "pins the HTML framework CDN setup of %s to cdn/%s.js of the same version",
  (page, file) => {
    const setup = FRAMEWORKS.find((f) => f.id === "html")!.setup(
      docPages.find((p) => p.id === page)!.wc!,
    );
    const snippet = setup.find((s) => s.step === "htmlCdn")!.code;
    const template = document.createElement("template");
    template.innerHTML = snippet;
    expect(template.content.querySelector("script")!.src).toBe(
      `https://cdn.jsdelivr.net/npm/minerva-design@${version}/dist/web-components/cdn/${file}.js`,
    );
  },
);

it("has no CDN step for the code editor (the host injects Monaco)", () => {
  const setup = FRAMEWORKS.find((f) => f.id === "html")!.setup(
    docPages.find((p) => p.wc?.entry === "code-editor")!.wc!,
  );
  expect(setup.some((s) => s.step === "htmlCdn")).toBe(false);
});
