// @vitest-environment happy-dom
import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { beforeAll, describe, expect, it } from "vitest";
import i18n from "@i18n/config";
import MobileNav from "./MobileNav";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const Location: React.FC = () => (
  <output aria-label="location">{useLocation().pathname}</output>
);

const renderNav = () => {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: (
          <>
            <MobileNav />
            <Location />
          </>
        ),
      },
    ],
    { initialEntries: ["/overview"] },
  );
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

describe("MobileNav", () => {
  it("opens a drawer with the docs navigation, moves focus in, Escape closes it and restores focus", async () => {
    const user = userEvent.setup();
    renderNav();
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Minerva UI" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const nav = within(dialog).getByRole("navigation", {
      name: "Documentation",
    });
    expect(
      within(nav).getByRole("link", { name: i18n.t("docs.overview.title") }),
    ).toHaveAttribute("aria-current", "page");
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("keeps Tab inside the drawer while open", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = await screen.findByRole("dialog");
    for (let i = 0; i < 5; i++) {
      await user.tab({ shift: true });
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("closes after following a link", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = await screen.findByRole("dialog");
    await user.click(
      within(dialog).getByRole("link", { name: i18n.t("docs.button.title") }),
    );
    expect(screen.getByRole("status", { name: "location" })).toHaveTextContent(
      "/button",
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
