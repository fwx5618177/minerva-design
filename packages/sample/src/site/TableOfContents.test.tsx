// @vitest-environment happy-dom
import React, { useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import TableOfContents from "./TableOfContents";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

/** Fake layout: heading tops are read from data-top (scrolled by `scrollY`) */
let scrollY = 0;
const mockLayout = () =>
  vi
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement) {
      const top = Number(this.dataset.top ?? 0) - scrollY;
      return {
        top,
        bottom: top + 20,
        left: 0,
        right: 0,
        width: 0,
        height: 20,
        x: 0,
        y: top,
        toJSON: () => ({}),
      };
    });

const scrollTo = async (y: number) => {
  scrollY = y;
  await act(async () => {
    window.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

const Page: React.FC = () => {
  const [more, setMore] = useState(false);
  return (
    <SiteProviders>
      <main id="main-content">
        <h1>Button</h1>
        <h2 id="import" data-top="100">
          Import
        </h2>
        <h2 id="examples" data-top="600">
          Examples
        </h2>
        <h3 id="basic" data-top="800">
          Basic
        </h3>
        <div data-toc-ignore>
          <h3 id="inside-demo">Demo heading</h3>
        </div>
        {more && (
          <h2 id="api" data-top="1500">
            API
          </h2>
        )}
        <button type="button" onClick={() => setMore(true)}>
          load more
        </button>
      </main>
      <TableOfContents />
    </SiteProviders>
  );
};

const tocLinks = () =>
  within(screen.getByRole("navigation", { name: "On this page" }))
    .getAllByRole("link")
    .map((link) => link.textContent);

describe("TableOfContents", () => {
  it("lists the page's h2 / h3 headings and follows content changes", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await waitFor(() =>
      expect(tocLinks()).toEqual(["Import", "Examples", "Basic"]),
    );
    const basic = screen.getByRole("link", { name: "Basic" });
    expect(basic.closest("li")).toHaveAttribute("data-level", "3");

    // lazily rendered content (demos, API tables) shows up in the list
    await user.click(screen.getByRole("button", { name: "load more" }));
    await waitFor(() =>
      expect(tocLinks()).toEqual(["Import", "Examples", "Basic", "API"]),
    );
  });

  it("highlights the section being read while scrolling", async () => {
    mockLayout();
    scrollY = 0;
    render(<Page />);
    const current = () =>
      screen
        .getAllByRole("link")
        .find((link) => link.getAttribute("aria-current") === "location")
        ?.textContent;

    await waitFor(() => expect(current()).toBe("Import"));
    await scrollTo(560);
    expect(current()).toBe("Examples");
    await scrollTo(750);
    expect(current()).toBe("Basic");
    await scrollTo(0);
    expect(current()).toBe("Import");
  });

  it("scrolls to and focuses a heading when its link is chosen", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(<Page />);

    const link = await screen.findByRole("link", { name: "Examples" });
    await user.click(link);

    expect(scrollIntoView).toHaveBeenCalled();
    const heading = screen.getByRole("heading", { name: "Examples" });
    expect(heading).toHaveFocus();
    expect(link).toHaveAttribute("aria-current", "location");
    // the URL (a hash route) is left untouched
    expect(window.location.hash).not.toBe("#examples");
  });

  it("renders nothing on a page without headings", () => {
    render(
      <SiteProviders>
        <main id="main-content">
          <p>Text only</p>
        </main>
        <TableOfContents />
      </SiteProviders>,
    );
    expect(
      screen.queryByRole("navigation", { name: "On this page" }),
    ).not.toBeInTheDocument();
  });
});
