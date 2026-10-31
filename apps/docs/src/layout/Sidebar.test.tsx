// @vitest-environment happy-dom
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import { categories, sections } from "@/docs/registry";
import { menuConfig } from "@router/routes";
import TopNav from "@/site/TopNav";
import MobileNav from "@/site/MobileNav";
import Pager from "@/site/Pager";
import { SidebarNav } from "./Sidebar";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const renderAt = (path: string, element: React.ReactNode) =>
  render(
    <SiteProviders>
      <RouterProvider
        router={createMemoryRouter([{ path: "*", element }], {
          initialEntries: [path],
        })}
      />
    </SiteProviders>,
  );

const title = (id: string) => i18n.t(`docs.${id}.title`);

describe("docs sections", () => {
  it("puts every category in exactly one section, in registry order", () => {
    const listed = sections.flatMap((section) => section.categories);
    expect([...listed].sort()).toEqual([...categories].sort());
    expect(new Set(listed).size).toBe(listed.length);
    expect(listed).toEqual(categories);
    for (const section of sections)
      expect(
        menuConfig.some((group) =>
          group.items.some((item) => item.path === section.home),
        ),
      ).toBe(true);
  });

  it("lists only the section of the current page in the sidebar", () => {
    renderAt("/order-book-heatmap", <SidebarNav />);
    const nav = screen.getByRole("navigation", { name: "Documentation" });
    expect(nav).toHaveAttribute("data-section", "charts");
    expect(
      within(nav).getByRole("link", { name: title("order-book-heatmap") }),
    ).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: title("line-chart") }));
    expect(
      within(nav).queryByRole("link", { name: title("button") }),
    ).toBeNull();
    expect(
      within(nav).queryByRole("link", { name: title("installation") }),
    ).toBeNull();
  });

  it("shows the component groups without the charts on a component page", () => {
    renderAt("/button", <SidebarNav />);
    const nav = screen.getByRole("navigation", { name: "Documentation" });
    expect(within(nav).getByRole("link", { name: title("nav-bar") }));
    expect(
      within(nav).queryByRole("link", { name: title("line-chart") }),
    ).toBeNull();
  });

  it("keeps the Web Components guides with the docs", () => {
    renderAt("/wc-vue", <SidebarNav />);
    const nav = screen.getByRole("navigation", { name: "Documentation" });
    expect(nav).toHaveAttribute("data-section", "docs");
    expect(within(nav).getByRole("link", { name: title("installation") }));
  });

  it("highlights the section of the current page in the top navigation", () => {
    renderAt("/line-chart", <TopNav onSearch={vi.fn()} withMenu={false} />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Docs",
      "Components",
      "Charts",
    ]);
    expect(
      links.filter((link) => link.hasAttribute("data-active")),
    ).toHaveLength(1);
    expect(within(nav).getByRole("link", { name: "Charts" })).toHaveAttribute(
      "data-active",
    );
  });

  it("pages within the section only", () => {
    renderAt("/charts", <Pager pathname="/charts" />);
    // the first chart page has no previous page in another section
    expect(screen.queryByRole("link", { name: /Previous/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Next/ })).toBeInTheDocument();
  });

  it("switches sections inside the mobile drawer", async () => {
    const user = userEvent.setup();
    renderAt("/button", <MobileNav />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("button", { name: "Components" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(dialog).queryByRole("link", { name: title("line-chart") }),
    ).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: "Charts" }));
    expect(
      within(dialog).getByRole("link", { name: title("line-chart") }),
    ).toBeInTheDocument();
    expect(
      within(dialog).queryByRole("link", { name: title("button") }),
    ).toBeNull();
  });
});
