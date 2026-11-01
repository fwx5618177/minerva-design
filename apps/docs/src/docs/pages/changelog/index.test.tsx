// @vitest-environment happy-dom
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { SiteProviders, setupI18n } from "../../../test/utils";
import { CURRENT_VERSION } from "../../releases";
import type { ChangelogRelease } from "../../changelog";

beforeAll(setupI18n);
afterEach(() => {
  vi.doUnmock("../../releases");
  vi.resetModules();
});

const renderPage = async (upcoming?: ChangelogRelease) => {
  if (upcoming) {
    vi.doMock("../../releases", async (importOriginal) => ({
      ...(await importOriginal<typeof import("../../releases")>()),
      UPCOMING_RELEASE: upcoming,
    }));
  }
  const { default: ChangelogDoc } = await import("./index");
  render(
    <SiteProviders>
      <MemoryRouter>
        <ChangelogDoc />
      </MemoryRouter>
    </SiteProviders>,
  );
};

describe("changelog page", () => {
  it("lists the released versions of the CHANGELOG, newest first", async () => {
    await renderPage();
    const released = screen.getByRole("region", { name: "Released versions" });
    const versions = within(released)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(versions[0]).toBe(CURRENT_VERSION);
    expect(versions).toContain("1.0.0");
    expect(versions.indexOf("1.0.0")).toBeGreaterThan(0);

    const latest = screen.getByRole("region", { name: "1.11.0" });
    expect(
      within(latest).getByRole("heading", { level: 4, name: "Minor changes" }),
    ).toBeInTheDocument();
    // inline code of the notes, and the commit hash linking to GitHub
    expect(
      within(latest).getByText("IconDefinition", { selector: "code" }),
    ).toBeInTheDocument();
    expect(
      within(latest).getByRole("link", { name: "Commit b50696a" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/fwx5618177/minerva-design/commit/b50696a",
    );
    expect(
      within(latest).getByRole("link", {
        name: "minerva-design 1.11.0 on npm",
      }),
    ).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/minerva-design/v/1.11.0",
    );
  });

  it("shows the upcoming release of the pending changesets first", async () => {
    await renderPage({
      version: "1.12.0",
      groups: [
        {
          type: "minor",
          title: "Minor Changes",
          items: [{ text: "New **WeekStrip** component: `<WeekStrip />`." }],
        },
      ],
    });
    const upcoming = screen.getByTestId("upcoming");
    expect(upcoming).toHaveTextContent("as version 1.12.0");
    expect(
      within(upcoming).getByRole("heading", { level: 3, name: "1.12.0" }),
    ).toHaveAttribute("id", "next-1-12-0");
    expect(within(upcoming).getByText("Next")).toBeInTheDocument();
    expect(
      within(upcoming).getByText("WeekStrip", { selector: "strong" }),
    ).toBeInTheDocument();
    // no npm link before the release, and the section comes first
    expect(within(upcoming).queryByRole("link")).toBeNull();
    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual(["Upcoming release", "Released versions"]);
  });
});
