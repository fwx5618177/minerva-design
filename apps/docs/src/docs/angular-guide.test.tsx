// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import AngularDoc from "./pages/angular";
import { getFramework } from "./frameworks";

beforeAll(setupI18n);

it("documents native Angular previews and the separate WC integration", () => {
  render(
    <SiteProviders>
      <MemoryRouter>
        <AngularDoc />
      </MemoryRouter>
    </SiteProviders>,
  );
  expect(screen.getByRole("status")).toHaveTextContent(
    "native Angular package is available",
  );
  expect(
    screen.getByRole("link", { name: "Platform support" }),
  ).toHaveAttribute("href", "/platform-support");
  expect(
    screen.getByRole("link", { name: "Web Components in Angular" }),
  ).toHaveAttribute("href", "/wc-angular");
  expect(
    screen.getByText(/compiled ahead of time with strict template checks/),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Angular Forms" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/no custom value-accessor directive is required/),
  ).toBeInTheDocument();
  const guide = document.querySelector("article") ?? document.body;
  expect(guide).toHaveTextContent("MnButton, MnInput, MnUpload");
  expect(guide).toHaveTextContent('[formControl]="files"');
  expect(guide).toHaveTextContent("(valueChange)");
  expect(getFramework("angular")).toMatchObject({
    renderer: "angular",
    guide: "angular",
  });
});
