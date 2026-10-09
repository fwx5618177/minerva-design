// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../../../test/utils";
import { supportSummary, type Platform } from "../../support";
import ArchitectureDoc from "./index";

beforeAll(setupI18n);
it("architecture renderer statuses agree with the generated support matrix", () => {
  render(
    <SiteProviders>
      <MemoryRouter>
        <ArchitectureDoc />
      </MemoryRouter>
    </SiteProviders>,
  );
  for (const [platform, name] of [
    ["vue", "Vue"],
    ["angular", "Angular"],
    ["native", "React Native"],
    ["taro", "Taro"],
    ["weapp", "WeChat"],
    ["uni", "uni-app"],
  ] as const) {
    const summary = supportSummary(platform as Platform);
    const expected = summary.planned
      ? "Planned"
      : summary.beta
        ? "Beta"
        : "Stable";
    expect(
      screen
        .getByRole("rowheader", { name: new RegExp(`^${name}`) })
        .closest("tr"),
    ).toHaveTextContent(expected);
  }
});
