// @vitest-environment happy-dom
// The header search trigger, wired to the search palette as in <Layout>.
import React, { useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, expect, it } from "vitest";
import TopNav from "./TopNav";
import SearchPalette from "./SearchPalette";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TopNav onSearch={() => setOpen(true)} withMenu={false} />
      <SearchPalette open={open} onOpenChange={setOpen} />
    </>
  );
};

const renderHeader = () =>
  render(
    <SiteProviders>
      <RouterProvider
        router={createMemoryRouter([{ path: "*", element: <Header /> }], {
          initialEntries: ["/button"],
        })}
      />
    </SiteProviders>,
  );

const trigger = () =>
  document.querySelector<HTMLButtonElement>(
    'button[aria-keyshortcuts="Meta+K Control+K"]',
  )!;

it("puts the search icon before the label and ends with the shortcut hint", () => {
  renderHeader();
  const button = trigger();
  expect(button).toHaveAccessibleName("Search documentation");
  const icon = button.querySelector("svg")!;
  const label = button.querySelector('[data-part="label"]')!;
  const kbd = button.querySelector("kbd")!;
  expect(icon).not.toBeNull();
  expect(kbd).not.toBeNull();
  expect(label).not.toBeNull();
  expect(
    icon.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    label.compareDocumentPosition(kbd) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

it("opens the library search, finds Button and returns focus on Escape", async () => {
  const user = userEvent.setup();
  renderHeader();
  await user.click(trigger());
  const dialog = await screen.findByRole("dialog");
  await user.type(within(dialog).getByRole("combobox"), "Button");
  expect(within(dialog).getAllByRole("option")[0]).toHaveTextContent("Button");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await waitFor(() => expect(trigger()).toHaveFocus());
});
