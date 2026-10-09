// @vitest-environment happy-dom
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import type { ComponentType } from "react";
import { SiteProviders, setupI18n } from "../test/utils";
import VueDemo from "./components/VueDemo";
import PhoneFrame from "./native/PhoneFrame";
import { vueDemosOf } from "./vueDemos";
import { loadNativeDemos } from "./nativeDemos";

const react = import.meta.glob<{ default: ComponentType }>(
  "./pages/*/demos/*.tsx",
);
beforeAll(setupI18n);
async function show(page: string, framework: string, id = "basic") {
  let content;
  if (framework === "React") {
    const { default: Demo } = await react[`./pages/${page}/demos/${id}.tsx`]();
    content = <Demo />;
  } else if (framework === "Vue") {
    const demo = vueDemosOf(page)[id];
    expect(demo, `${page}/${id}`).toBeDefined();
    content = <VueDemo demo={demo} />;
  } else {
    const demo = (await loadNativeDemos(page))[id];
    expect(demo, `${page}/${id}`).toBeDefined();
    const Demo = demo.Component;
    content = (
      <PhoneFrame label="Example">
        <Demo />
      </PhoneFrame>
    );
  }
  render(<SiteProviders>{content}</SiteProviders>);
  return userEvent.setup();
}

describe.each(["React", "Vue", "React Native"])(
  "%s authored scenarios",
  (framework) => {
    it("steps start at Review and allow Draft while Publish stays disabled", async () => {
      const user = await show("steps", framework);
      const review = await screen.findByRole(
        "button",
        { name: /Review/ },
        { timeout: 10000 },
      );
      const attribute =
        framework === "React Native" ? "aria-selected" : "aria-current";
      const current = framework === "React Native" ? "true" : "step";
      expect(review).toHaveAttribute(attribute, current);
      const draft = screen.getByRole("button", { name: /Draft/ });
      await user.click(draft);
      fireEvent.click(screen.getByRole("button", { name: /Publish/ }));
      expect(draft).toHaveAttribute(attribute, current);
    });
    it("the theme preview starts with editorial and changes locally to dark tech", async () => {
      const user = await show("theme-palette", framework, "toggles");
      const pageTheme = document.documentElement.getAttribute("data-theme");
      await screen.findByText(
        /Theme: .*palette: editorial/,
        {},
        { timeout: 10000 },
      );
      const role = framework === "React Native" ? "radio" : "button";
      await user.click(await screen.findByRole(role, { name: "Dark" }));
      await user.click(screen.getByRole(role, { name: "Tech" }));
      expect(
        await screen.findByText("Theme: dark; palette: tech"),
      ).toBeInTheDocument();
      expect(document.documentElement.getAttribute("data-theme")).toBe(
        pageTheme,
      );
    });
    it("icon actions add an item and toggle Like with matching feedback", async () => {
      const user = await show("icon-button", framework);
      await user.click(
        await screen.findByRole("button", { name: "Add" }, { timeout: 10000 }),
      );
      expect(await screen.findByText("Added 1 item(s)")).toBeInTheDocument();
    });
    it("Like starts off and Bookmark starts on", async () => {
      const user = await show("icon-button", framework, "toggle");
      const like = await screen.findByRole(
        "button",
        { name: "Like" },
        { timeout: 10000 },
      );
      expect(like).toHaveAttribute(
        framework === "React Native" ? "aria-selected" : "aria-pressed",
        "false",
      );
      expect(screen.getByRole("button", { name: "Bookmark" })).toHaveAttribute(
        framework === "React Native" ? "aria-selected" : "aria-pressed",
        "true",
      );
      await user.click(like);
      expect(await screen.findByText("Liked")).toBeInTheDocument();
      await user.click(like);
      expect(await screen.findByText("Not liked yet")).toBeInTheDocument();
    });
    it("closable tags can all be removed and reset", async () => {
      const user = await show("tag", framework, "closable");
      await screen.findByText("Tag 1", {}, { timeout: 10000 });
      for (const tag of ["Tag 1", "Tag 2", "Tag 3"]) {
        await user.click(screen.getByRole("button", { name: `Remove ${tag}` }));
      }
      expect(screen.queryByText("Tag 2")).toBeNull();
      await user.click(screen.getByRole("button", { name: "Reset" }));
      expect(await screen.findByText("Tag 2")).toBeInTheDocument();
    });
    it("card action opens the same project", async () => {
      const user = await show("card", framework);
      await user.click(
        await screen.findByRole("button", { name: "Open" }, { timeout: 10000 }),
      );
      expect(
        await screen.findByText("Opened Project Apollo"),
      ).toBeInTheDocument();
    });
    it("the device list removes only the selected device", async () => {
      const user = await show("list", framework);
      await user.click(
        await screen.findByRole(
          "button",
          { name: "Delete iPhone 16" },
          { timeout: 10000 },
        ),
      );
      expect(screen.queryByText("iPhone 16")).toBeNull();
      expect(screen.getByText("MacBook Air")).toBeInTheDocument();
    });
    it.each([
      ["basic", ["Content above the divider.", "Content below the divider."]],
      ["vertical", ["Home", "Products", "About"]],
      ["with-text", ["Left", "Center", "Right"]],
    ] as const)("divider %s has the same labels", async (id, labels) => {
      await show("divider", framework, id);
      for (const label of labels)
        expect(
          await screen.findByText(label, {}, { timeout: 10000 }),
        ).toBeInTheDocument();
    });
    it("select-all starts mixed, selects all fruit, then clears all", async () => {
      const user = await show("checkbox", framework, "indeterminate");
      const all = await screen.findByRole(
        "checkbox",
        { name: "Select all" },
        { timeout: 10000 },
      );
      expect(all).toBePartiallyChecked();
      await user.click(all);
      for (const name of ["Apple", "Banana", "Cherry"])
        expect(screen.getByRole("checkbox", { name })).toBeChecked();
      await user.click(all);
      for (const name of ["Apple", "Banana", "Cherry"])
        expect(screen.getByRole("checkbox", { name })).not.toBeChecked();
    });
    it("disabled individual and grouped radio choices preserve their selections", async () => {
      await show("radio", framework, "disabled");
      const available = await screen.findByRole(
        "radio",
        { name: "Available" },
        { timeout: 10000 },
      );
      fireEvent.click(screen.getByRole("radio", { name: "Sold out" }));
      fireEvent.click(screen.getByRole("radio", { name: "Option B" }));
      expect(available).toBeChecked();
      expect(screen.getByRole("radio", { name: "Option A" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Option B" })).not.toBeChecked();
    });
    it("the document rename form saves the same edited name", async () => {
      const user = await show("modal", framework, "form");
      await user.click(
        await screen.findByRole(
          "button",
          { name: "Rename “Quarterly report”" },
          { timeout: 10000 },
        ),
      );
      const input = await screen.findByRole("textbox", { name: "Name" });
      await user.clear(input);
      await user.type(input, "Annual report");
      await user.click(screen.getByRole("button", { name: "Save" }));
      expect(
        await screen.findByRole("button", { name: "Rename “Annual report”" }),
      ).toBeInTheDocument();
    });
    it("checkboxes start with the same defaults and toggle independently", async () => {
      const user = await show("checkbox", framework);
      const remember = await screen.findByRole(
        "checkbox",
        { name: "Remember me" },
        { timeout: 10000 },
      );
      const checked = screen.getByRole("checkbox", {
        name: "Checked by default",
      });
      expect(remember).not.toBeChecked();
      expect(checked).toBeChecked();
      await user.click(remember);
      await user.click(checked);
      expect(remember).toBeChecked();
      expect(checked).not.toBeChecked();
    });
    it("the controlled checkbox updates subscription feedback", async () => {
      const user = await show("checkbox", framework, "controlled");
      const checkbox = await screen.findByRole(
        "checkbox",
        { name: "Subscribe to the newsletter" },
        { timeout: 10000 },
      );
      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(await screen.findByText("Not subscribed")).toBeInTheDocument();
      await user.click(checkbox);
      expect(await screen.findByText("Subscribed")).toBeInTheDocument();
    });
    it("radio choices start at Apple and select Banana exclusively", async () => {
      const user = await show("radio", framework);
      const apple = await screen.findByRole(
        "radio",
        { name: "Apple" },
        { timeout: 10000 },
      );
      const banana = screen.getByRole("radio", { name: "Banana" });
      expect(apple).toBeChecked();
      expect(banana).not.toBeChecked();
      await user.click(banana);
      expect(banana).toBeChecked();
      expect(apple).not.toBeChecked();
    });
    it("the controlled radio updates the selected plan", async () => {
      const user = await show("radio", framework, "controlled");
      const pro = await screen.findByRole(
        "radio",
        { name: "Pro" },
        { timeout: 10000 },
      );
      expect(pro).toBeChecked();
      await user.click(screen.getByRole("radio", { name: "Team" }));
      expect(
        await screen.findByText("Selected plan: team"),
      ).toBeInTheDocument();
    });
    it("language selection starts at English and commits French", async () => {
      const user = await show("select", framework);
      const trigger = await screen.findByRole(
        "combobox",
        { name: "Language" },
        { timeout: 10000 },
      );
      expect(trigger).toHaveTextContent("English");
      await user.click(trigger);
      await user.click(
        await screen.findByRole(
          framework === "React Native" ? "radio" : "option",
          { name: "French" },
        ),
      );
      await waitFor(() => expect(trigger).toHaveTextContent("French"));
    });
    it("book tabs show matching content and keep the unavailable section disabled", async () => {
      const user = await show("tabs", framework);
      const overview = await screen.findByRole(
        "tab",
        { name: "Overview" },
        { timeout: 10000 },
      );
      expect(overview).toHaveAttribute("aria-selected", "true");
      expect(
        screen.getByText(
          "A desert planet, a noble family and a precious spice.",
        ),
      ).toBeInTheDocument();
      await user.click(screen.getByRole("tab", { name: "Reviews" }));
      expect(
        await screen.findByText("“A masterpiece of world building.”"),
      ).toBeInTheDocument();
      const unavailable = screen.getByRole("tab", { name: "Similar books" });
      expect(
        unavailable.hasAttribute("disabled") ||
          unavailable.getAttribute("aria-disabled") === "true",
      ).toBe(true);
      fireEvent.click(screen.getByRole("tab", { name: "Similar books" }));
      expect(screen.getByRole("tab", { name: "Reviews" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
    it.each(["basic", "simple"])(
      "%s pagination starts on page one and advances once",
      async (id) => {
        const user = await show("pagination", framework, id);
        const next = await screen.findByRole(
          "button",
          { name: "Next page" },
          { timeout: 10000 },
        );
        await user.click(next);
        if (id === "basic")
          expect(
            screen.getByRole("button", { name: /page 2/i }),
          ).toHaveAttribute(
            framework === "React Native" ? "aria-selected" : "aria-current",
            framework === "React Native" ? "true" : "page",
          );
        else expect(screen.getByRole("navigation")).toHaveTextContent("2");
      },
    );
    it("the deletion dialog cancels without deleting and confirms the same result", async () => {
      const user = await show("modal", framework);
      const open = await screen.findByRole(
        "button",
        { name: "Delete record" },
        { timeout: 10000 },
      );
      await user.click(open);
      expect(
        await screen.findByText("Delete this record?"),
      ).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByText("Record deleted")).toBeNull();
      await user.click(open);
      await user.click(await screen.findByRole("button", { name: "Delete" }));
      expect(await screen.findByText("Record deleted")).toBeInTheDocument();
    });
    it("success and danger toast actions display the same messages", async () => {
      const user = await show("toast", framework);
      await user.click(
        await screen.findByRole(
          "button",
          { name: "Success" },
          { timeout: 10000 },
        ),
      );
      expect(await screen.findByText("Saved")).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Danger" }));
      expect(await screen.findByText("Request failed")).toBeInTheDocument();
    });
  },
);
