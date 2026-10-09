// @vitest-environment happy-dom
import React, { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { beforeAll, describe, expect, it } from "vitest";
import i18n from "@i18n/config";
import SearchPalette from "./SearchPalette";
import type { CommandItem } from "minerva-design";
import { changeLanguage } from "@i18n/config";
import {
  FRAMEWORK_ITEM_PREFIX,
  HOME_ITEM_ID,
  buildSearchItems,
  foldSearchText,
  modKeyLabel,
  pathOfItem,
  rankSearchItems,
  searchScore,
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

  it("has one entry per framework, opening its guide with ?framework=", () => {
    const items = buildSearchItems(i18n.t);
    const frameworks = items.filter((item) =>
      item.id.startsWith(FRAMEWORK_ITEM_PREFIX),
    );
    expect(frameworks.map((item) => item.title)).toEqual([
      "Show the docs in React",
      "Show the docs in React Native",
      "Show the docs in Vue",
      "Show the docs in Angular",
      "Show the docs in Svelte",
      "Show the docs in Solid",
      "Show the docs in HTML",
    ]);
    expect(frameworks[1].group).toBe("Framework");
    expect(rankSearchItems(items, "angular")[0].id).toBe("wc-angular");
    expect(rankSearchItems(items, "angular").map((item) => item.id)).toContain(
      `${FRAMEWORK_ITEM_PREFIX}angular`,
    );
    expect(pathOfItem(`${FRAMEWORK_ITEM_PREFIX}vue`)).toBe(
      "/vue?framework=vue",
    );
    expect(pathOfItem(`${FRAMEWORK_ITEM_PREFIX}react`)).toBe(
      "/installation?framework=react",
    );
    expect(pathOfItem(`${FRAMEWORK_ITEM_PREFIX}html`)).toBe(
      "/wc-plain-html?framework=html",
    );
  });

  it("maps entries to routes and formats the shortcut per platform", () => {
    expect(pathOfItem(HOME_ITEM_ID)).toBe("/");
    expect(pathOfItem("button")).toBe("/button");
    expect(pathOfItem(`${FRAMEWORK_ITEM_PREFIX}cobol`)).toBe(
      `/${FRAMEWORK_ITEM_PREFIX}cobol`,
    );
    expect(modKeyLabel("MacIntel")).toBe("⌘K");
    expect(modKeyLabel("Win32")).toBe("Ctrl K");
  });
});

describe("rankSearchItems", () => {
  const ITEMS: CommandItem[] = [
    { id: "desc", title: "Zeta", description: "Shows a button group" },
    { id: "name", title: "Eta", keywords: "eta ButtonGroup minerva-button" },
    { id: "sub", title: "Togglebutton" },
    { id: "word", title: "Icon Button" },
    { id: "prefix", title: "Button group" },
    { id: "exact", title: "Button" },
    { id: "group", title: "Theta", group: "Buttons" },
    { id: "none", title: "Card", description: "Surface" },
  ];
  const ids = (query: string) =>
    rankSearchItems(ITEMS, query).map((item) => item.id);

  it("ranks exact title > prefix > word start > substring > name > description > group", () => {
    expect(ids("button")).toEqual([
      "exact",
      "prefix",
      "word",
      "sub",
      "name",
      "desc",
      "group",
    ]);
    expect(searchScore(ITEMS[7], "button")).toBeNull();
  });

  it("ranks whole component / tag names above partial ones", () => {
    const items: CommandItem[] = [
      { id: "tag-input", title: "Tag Input", keywords: "minerva-tag-input" },
      { id: "tag", title: "Tag", keywords: "minerva-tag" },
    ];
    expect(rankSearchItems(items, "minerva-tag").map((i) => i.id)).toEqual([
      "tag",
      "tag-input",
    ]);
  });

  it("is case- and accent-insensitive and keeps the order of equal matches", () => {
    expect(foldSearchText("  Thème  Sombre ")).toBe("theme sombre");
    const items: CommandItem[] = [
      { id: "a", title: "Thèmes" },
      { id: "b", title: "Théorie" },
      { id: "c", title: "Thèse" },
    ];
    expect(rankSearchItems(items, "THE").map((i) => i.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("ranks the real search entries (i18n titles included)", async () => {
    const items = buildSearchItems(i18n.t);
    const titles = (query: string) =>
      rankSearchItems(items, query)
        .slice(0, 2)
        .map((item) => item.title);
    expect(titles("tag")).toEqual([
      i18n.t("docs.tag.title"),
      i18n.t("docs.tag-input.title"),
    ]);
    expect(titles("button")[0]).toBe(i18n.t("docs.button.title"));
    expect(rankSearchItems(items, "minerva-card")[0].id).toBe("card");

    await changeLanguage("zh");
    try {
      const zh = buildSearchItems(i18n.t);
      expect(i18n.t("docs.button.title")).toBe("Button 按钮");
      // the translated word ranks the page whose title starts a word with it
      expect(rankSearchItems(zh, "按钮")[0].id).toBe("button");
    } finally {
      await changeLanguage("en");
    }
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

  it("lists the best match first", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.click(screen.getByRole("button", { name: "open search" }));
    await user.type(await screen.findByRole("combobox"), "input");
    expect(options()[0]).toBe(i18n.t("docs.input.title"));
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
