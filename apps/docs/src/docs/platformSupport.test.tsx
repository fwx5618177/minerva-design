// @vitest-environment happy-dom
// Platform support page: the matrix is generated from the component
// contracts (one row per component, one column per platform) and filtered by
// product track.
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { PLATFORMS, componentContracts, contractsForTrack } from "@contracts";
import PlatformSupportDoc from "./pages/platform-support";
import { SiteProviders, setupI18n } from "../test/utils";

vi.mock("minerva-design/web-components", () => ({}));

beforeAll(setupI18n);

const renderPage = () => {
  const router = createMemoryRouter(
    [{ path: "/platform-support", element: <PlatformSupportDoc /> }],
    { initialEntries: ["/platform-support"] },
  );
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

/** The scrollable table region (inside the section of the same name) */
const matrix = async () =>
  within(
    (await screen.findAllByRole("region", { name: "Support matrix" })).at(-1)!,
  );

describe("platform support page", () => {
  it("shows every component on every platform", async () => {
    renderPage();
    const table = await matrix();
    const rows = table.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(componentContracts.length);
    expect(table.getAllByRole("columnheader")).toHaveLength(
      PLATFORMS.length + 2,
    );
    const button = table.getByRole("rowheader", { name: /^Button/ });
    expect(within(button).getByRole("link")).toHaveAttribute("href", "/button");
    const cells = within(button.closest("tr")!).getAllByRole("cell");
    // Product tracks followed by the shared renderer display order.
    expect(cells.map((c) => c.textContent)).toEqual([
      "toB, toC",
      "Stable",
      "Stable",
      "Stable",
      "Beta",
      "Beta",
      "Beta",
      "Beta",
      "Beta",
    ]);
  });

  it("filters by product track", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderPage();
    await matrix();
    await user.click(screen.getByRole("radio", { name: "toC" }));
    const rows = (await matrix()).getAllByRole("row").slice(1);
    expect(rows).toHaveLength(contractsForTrack("toC").length);
    expect(rows.length).toBeLessThan(componentContracts.length);
    expect(
      screen.getByText(`Components shown: ${rows.length}`),
    ).toBeInTheDocument();
  });
});
