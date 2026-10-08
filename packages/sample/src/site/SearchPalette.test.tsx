// @vitest-environment happy-dom
import React, { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { beforeAll, describe, expect, it } from "vitest";
import i18n from "@i18n/config";
import SearchPalette from "./SearchPalette";
import {
  HOME_ITEM_ID,
  buildSearchItems,
  modKeyLabel,
  pathOfItem,
} from "./searchItems";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

describe("buildSearchItems", () => {
  it("has the landing page plus one translated entry per docs page", () => {
    const items = buildSearchItems(i18n.t);
    expect(items[0]).toMatchObject({ id: HOME_ITEM_ID, title: "Home" });
    const card = items.find((item) => item.id === "card")!;
    expect(card.title).toBe(i18n.t("docs.card.title"));
    expect(card.group).toBe("Layout");
    // searchable by the component names the page documents
    expect(card.keywords).toContain("CardHeader");
    expect(card.keywords).toContain("minerva-card");
  });

  it("follows the language", async () => {
    await i18n.changeLanguage("fr");
    try {
      expect(buildSearchItems(i18n.t)[0].title).toBe("Accueil");
    } finally {
      await i18n.changeLanguage("en");
    }
  });

  it("maps entries to routes and formats the shortcut per platform", () => {
    expect(pathOfItem(HOME_ITEM_ID)).toBe("/");
    expect(pathOfItem("button")).toBe("/button");
    expect(modKeyLabel("MacIntel")).toBe("⌘K");
    expect(modKeyLabel("Win32")).toBe("Ctrl K");
  });
});

const Location: React.FC = () => {
  const { pathname } = useLocation();
  return <output aria-label="location">{pathname}</output>;
};

const Harness: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        open search
      </button>
      <SearchPalette open={open} onOpenChange={setOpen} />
      <Location />
    </>
  );
};

const renderPalette = () => {
  const router = createMemoryRouter([{ path: "*", element: <Harness /> }], {
    initialEntries: ["/overview"],
  });
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

const options = () =>
  within(screen.getByRole("listbox", { name: "Search results" }))
    .queryAllByRole("option")
    .map((option) => option.querySelector("strong")?.textContent);

describe("SearchPalette", () => {
  it("opens with Ctrl+K / ⌘K", async () => {
    renderPalette();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "k", ctrlKey: true });
    expect(
      await screen.findByRole("dialog", { name: /Search documentation/ }),
    ).toBeInTheDocument();
  });

  it("filters pages by title and component name", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.click(screen.getByRole("button", { name: "open search" }));
    const input = await screen.findByRole("combobox", {
      name: "Search pages and components…",
    });

    await user.type(input, "CardHeader");
    expect(options()).toEqual([i18n.t("docs.card.title")]);

    await user.clear(input);
    await user.type(input, "zzzz-nothing");
    expect(options()).toEqual([]);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("navigates with the keyboard and opens the chosen page", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.click(screen.getByRole("button", { name: "open search" }));
    const input = await screen.findByRole("combobox");

    await user.type(input, "minerva-tag");
    const results = within(screen.getByRole("listbox")).getAllByRole("option");
    expect(results[0]).toHaveAttribute("aria-selected", "true");
    if (results.length > 1) {
      await user.keyboard("{ArrowDown}");
      expect(results[1]).toHaveAttribute("aria-selected", "true");
      await user.keyboard("{ArrowUp}");
    }
    expect(results[0]).toHaveAttribute("aria-selected", "true");
    const chosen = results[0].querySelector("strong")!.textContent;
    expect(chosen).toBe(i18n.t("docs.tag.title"));

    await user.keyboard("{Enter}");
    expect(screen.getByRole("status", { name: "location" })).toHaveTextContent(
      "/tag",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.click(screen.getByRole("button", { name: "open search" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
