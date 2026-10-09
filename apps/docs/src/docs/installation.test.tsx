// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import Installation from "./pages/installation";
beforeAll(setupI18n);
it("warns that replacing the legacy package import does not migrate its API", () => {
  render(
    <SiteProviders>
      <MemoryRouter>
        <Installation />
      </MemoryRouter>
    </SiteProviders>,
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Changing the package name alone",
  );
  expect(screen.getByRole("alert")).toHaveTextContent("colorScheme");
});
