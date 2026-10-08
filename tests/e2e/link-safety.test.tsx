// A navigation built from backend data that contains a `javascript:` link:
// neither the React NavTree nor <minerva-nav-tree> renders the URL, the
// other links keep working, and new-tab links get rel="noopener noreferrer".
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavTree, TextLink, type NavTreeSection } from "@minerva/lib-core";
import "@minerva/lib-web-components";

const fromBackend = (): NavTreeSection[] => [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", href: "#home" },
      {
        id: "evil",
        label: "Promo",
        href: " JaVaScRiPt:alert(document.cookie)",
      },
    ],
  },
];

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("link safety (e2e)", () => {
  it("React: the unsafe entry is inert, the others navigate", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onItemSelect = vi.fn();
    render(
      <>
        <NavTree sections={fromBackend()} onItemSelect={onItemSelect} />
        <TextLink href="https://example.com" target="_blank">
          External
        </TextLink>
      </>,
    );
    const evil = screen.getByText("Promo").closest("a")!;
    expect(evil).not.toHaveAttribute("href");
    await userEvent.click(evil);
    expect(window.location.href).not.toMatch(/^javascript:/i);
    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(onItemSelect).toHaveBeenLastCalledWith(
      expect.objectContaining({ id: "home" }),
    );
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("Web Components: the unsafe entry is inert, the others navigate", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    document.body.innerHTML = `<minerva-nav-tree label="Main"></minerva-nav-tree>`;
    const tree = document.querySelector("minerva-nav-tree") as HTMLElement & {
      sections: NavTreeSection[];
      updateComplete: Promise<unknown>;
    };
    tree.sections = fromBackend();
    await tree.updateComplete;
    const evil = tree.shadowRoot!.querySelector('[data-id="evil"]')!;
    expect(evil).not.toHaveAttribute("href");
    const selected = vi.fn();
    tree.addEventListener("minerva-select", (e) =>
      selected((e as CustomEvent).detail),
    );
    await userEvent.click(tree.shadowRoot!.querySelector('[data-id="home"]')!);
    expect(selected).toHaveBeenCalled();
  });
});
