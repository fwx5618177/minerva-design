// @vitest-environment happy-dom
// Landing page: the supported-frameworks pills of the hero and the live
// deploy panel (real Minerva components, driven with user-event).
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import HomePage from "./HomePage";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const renderHome = () =>
  render(
    <SiteProviders>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </SiteProviders>,
  );

const panel = () =>
  screen.getByRole("region", {
    name: "Live preview: a deploy panel built with Minerva components",
  });

describe("home page", () => {
  it("lists React and the Web Components frameworks as pills", () => {
    renderHome();
    const group = screen.getByRole("group", { name: "Supported frameworks" });
    expect(group).toHaveTextContent(/^React/);
    expect(within(group).getByText("Web Components:")).toBeInTheDocument();
    const pills = within(group)
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(pills).toEqual(["Vue", "Angular", "Svelte", "Solid", "HTML"]);
    expect(screen.queryByText("React + Web Components")).toBeNull();
  });

  it("translates the label but not the framework names", async () => {
    await i18n.changeLanguage("fr");
    try {
      renderHome();
      const group = screen.getByRole("group", {
        name: "Frameworks pris en charge",
      });
      expect(within(group).getByText("Web Components :")).toBeInTheDocument();
      expect(within(group).getByText("Angular")).toBeInTheDocument();
    } finally {
      await i18n.changeLanguage("en");
    }
  });

  it("renders the deploy panel controls", () => {
    renderHome();
    const view = within(panel());
    expect(view.getByLabelText("Project name")).toHaveValue("minerva-app");
    expect(view.getByRole("combobox", { name: "Branch" })).toHaveTextContent(
      "main",
    );
    expect(view.getByRole("switch", { name: "Production" })).toBeChecked();
    expect(view.getByRole("status")).toHaveTextContent("Ready");
    expect(view.getByRole("button", { name: "Deploy" })).toBeEnabled();
    expect(view.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });

  it("the panel is interactive: edit, pick a branch, toggle, deploy, cancel", async () => {
    const errors = vi.spyOn(console, "error");
    const user = userEvent.setup();
    renderHome();
    const view = within(panel());

    const name = view.getByLabelText("Project name");
    await user.clear(name);
    await user.type(name, "docs-site");
    expect(view.getByText("docs-site")).toBeInTheDocument();

    await user.click(view.getByRole("combobox", { name: "Branch" }));
    await user.click(await screen.findByRole("option", { name: "develop" }));
    expect(view.getByRole("combobox", { name: "Branch" })).toHaveTextContent(
      "develop",
    );

    await user.click(view.getByRole("switch", { name: "Production" }));
    expect(view.getByRole("switch", { name: "Production" })).not.toBeChecked();
    expect(view.getByText("develop · Preview")).toBeInTheDocument();

    await user.click(view.getByRole("button", { name: /Deploy/ }));
    expect(view.getByRole("status")).toHaveTextContent("Building");
    await user.click(view.getByRole("button", { name: "Cancel" }));
    expect(view.getByRole("status")).toHaveTextContent("Canceled");

    await user.click(view.getByRole("button", { name: /Deploy/ }));
    expect(view.getByRole("status")).toHaveTextContent("Building");
    await vi.waitFor(
      () => expect(view.getByRole("status")).toHaveTextContent("Ready"),
      { timeout: 3000 },
    );

    await user.clear(name);
    expect(view.getByRole("button", { name: "Deploy" })).toBeDisabled();
    expect(errors).not.toHaveBeenCalled();
  });
});
