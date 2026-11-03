// @vitest-environment happy-dom
// The copy toast of the icon gallery (formerly a browser test): shown at the
// top center of the window, one at a time
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import Gallery from "./pages/icons/demos/gallery";

beforeAll(setupI18n);

afterEach(() => {
  vi.restoreAllMocks();
});

it("copies an icon and says so in one toast at the top center", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  render(
    <SiteProviders>
      <Gallery />
    </SiteProviders>,
  );
  const tile = await screen.findByRole(
    "button",
    { name: "check-check" },
    { timeout: 5000 },
  );
  await act(async () => {
    fireEvent.click(tile);
  });
  expect(writeText).toHaveBeenCalledWith("<CheckCheckIcon />");
  const message = await screen.findByText("Copied <CheckCheckIcon />");
  // the viewport of the provider of the demo: top center of the window
  const viewport = message.closest<HTMLElement>('[class*="viewport"]');
  expect(viewport?.className).toMatch(/top-center|topCenter/);
  // a second copy replaces the toast instead of stacking a new one
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "check" }));
  });
  expect(await screen.findByText("Copied <CheckIcon />")).toBeTruthy();
  expect(screen.queryByText("Copied <CheckCheckIcon />")).toBeNull();
});
