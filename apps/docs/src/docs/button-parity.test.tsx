// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import ReactBasic from "./pages/button/demos/basic";
import NativeBasic from "./pages/button/native/basic";
import VueDemo from "./components/VueDemo";
import PhoneFrame from "./native/PhoneFrame";
import { vueDemosOf } from "./vueDemos";

beforeAll(setupI18n);

describe("Button examples tell the same story", () => {
  it.each(["React", "Vue", "React Native"])(
    "%s counts each activation exactly once",
    async (framework) => {
      const user = userEvent.setup();
      render(
        <SiteProviders>
          {framework === "React" ? (
            <ReactBasic />
          ) : framework === "Vue" ? (
            <VueDemo demo={vueDemosOf("button").basic} />
          ) : (
            <PhoneFrame label="Basic usage">
              <NativeBasic />
            </PhoneFrame>
          )}
        </SiteProviders>,
      );
      const button = await screen.findByRole(
        "button",
        { name: "Click me" },
        { timeout: 10000 },
      );
      expect(screen.getByRole("status")).toHaveTextContent("Clicked 0 times");
      await user.click(button);
      expect(screen.getByRole("status")).toHaveTextContent("Clicked 1 times");
      await user.click(button);
      expect(screen.getByRole("status")).toHaveTextContent("Clicked 2 times");
    },
  );
});

it("offers the same Button example cases in the native renderer", async () => {
  const { getDocPage } = await import("./registry");
  const page = getDocPage("button")!;
  expect(page.native!.demos).toEqual(page.demos);
});
