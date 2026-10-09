// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, expect, it } from "vitest";
import PropsTable from "./PropsTable";
import CssVarsTable from "./CssVarsTable";
import DrawerDemo from "../pages/drawer/demos/basic";
import PopoverDemo from "../pages/popover/demos/basic";
import ResolveThemeDemo from "../pages/theme-utils/demos/resolve-theme";
import { SiteProviders, setupI18n } from "../../test/utils";

beforeAll(setupI18n);
it("renders API and token tables through the public table primitives", () => {
  render(
    <SiteProviders>
      <PropsTable page="button" name="ButtonProps" />
      <CssVarsTable page="button" folder="Button" />
    </SiteProviders>,
  );
  const tables = screen.getAllByRole("table");
  expect(tables).toHaveLength(2);
  for (const table of tables)
    expect(table).toHaveAttribute("data-minerva", "data-table");
  expect(screen.getAllByRole("columnheader").length).toBeGreaterThan(3);
});
it.each([
  ["drawer", DrawerDemo, "Filters", "Completed only"],
  ["popover", PopoverDemo, "Filter", "Read"],
] as const)(
  "%s uses the same library checkbox users install",
  async (_name, Demo, trigger, label) => {
    const user = userEvent.setup();
    render(
      <SiteProviders>
        <Demo />
      </SiteProviders>,
    );
    await user.click(screen.getByRole("button", { name: trigger }));
    const checkbox = screen.getByRole("checkbox", { name: label });
    expect(checkbox).toHaveAttribute("data-minerva", "checkbox");
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
);
it("theme helper demonstration uses the public Select and updates token output", async () => {
  const user = userEvent.setup();
  render(
    <SiteProviders>
      <ResolveThemeDemo />
    </SiteProviders>,
  );
  const select = screen.getByRole("combobox", { name: "theme" });
  expect(select).toHaveAttribute("data-minerva", "select");
  await user.click(select);
  await user.click(screen.getByRole("option", { name: '"github-dark"' }));
  expect(screen.getByText(/primary-color: #58a6ff/)).toBeInTheDocument();
});
