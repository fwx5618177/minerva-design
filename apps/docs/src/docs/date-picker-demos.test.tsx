// @vitest-environment happy-dom
// The DatePicker documentation demos: days outside min/max are disabled, a
// click commits and closes the calendar, Clear empties the field and a typed
// date is kept on blur; the Web Components script and the React Native touch
// calendar report the chosen value.
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import VueDemo from "./components/VueDemo";
import PhoneFrame from "./native/PhoneFrame";
import { loadNativeDemos } from "./nativeDemos";
import { vueDemosOf } from "./vueDemos";
import { loadWcDemos } from "./wcDemos";
import MinMaxDemo from "./pages/date-picker/demos/min-max";

beforeAll(setupI18n);

describe.each([
  { framework: "React", month: "04", demo: () => <MinMaxDemo /> },
  {
    framework: "Vue",
    month: "10",
    demo: () => <VueDemo demo={vueDemosOf("date-picker").range!} />,
  },
])("$framework bounded demo", ({ month, demo }) => {
  it("disables days outside the range, commits a click, clears and accepts typing", async () => {
    render(<SiteProviders>{demo()}</SiteProviders>);
    const user = userEvent.setup();
    const input = await screen.findByRole("textbox", {}, { timeout: 10000 });
    await user.click(input);
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("gridcell", { name: `2026-${month}-09` }),
    ).toHaveAttribute("aria-disabled", "true");
    await user.click(
      within(dialog).getByRole("gridcell", { name: `2026-${month}-16` }),
    );
    await waitFor(() => expect(input).toHaveValue(`2026-${month}-16`));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    await user.click(screen.getByRole("button", { name: "Clear date" }));
    await waitFor(() => expect(input).toHaveValue(""));
    await user.type(input, `2026-${month}-15`);
    await user.keyboard("{Escape}");
    await user.tab();
    await waitFor(() => expect(input).toHaveValue(`2026-${month}-15`));
  });
});

it("Web Components basic: the script mirrors minerva-change into the output", async () => {
  const demo = (await loadWcDemos("date-picker")).basic!;
  const root = document.createElement("div");
  root.innerHTML = demo.html;
  document.body.append(root);
  const cleanup = demo.setup?.(root);
  const picker = root.querySelector("#delivery-date")!;
  const result = root.querySelector<HTMLOutputElement>("#date-result")!;
  expect(picker).toHaveAttribute("min-date", "2026-10-10");
  expect(picker).toHaveAttribute("max-date", "2026-10-20");
  expect(result).toHaveTextContent("2026-10-15");
  picker.dispatchEvent(
    new CustomEvent("minerva-change", { detail: { value: "2026-10-16" } }),
  );
  expect(result.value).toBe("2026-10-16");
  picker.dispatchEvent(
    new CustomEvent("minerva-change", { detail: { value: "" } }),
  );
  expect(result.value).toBe("Cleared");
  if (typeof cleanup === "function") cleanup();
  root.remove();
});

it("React Native basic: picks January 16 from the touch calendar and clears it", async () => {
  const { Component: Demo } = (await loadNativeDemos("date-picker")).basic!;
  render(
    <SiteProviders>
      <PhoneFrame label="Example">
        <Demo />
      </PhoneFrame>
    </SiteProviders>,
  );
  fireEvent.click(
    await screen.findByRole(
      "combobox",
      { name: "Departure" },
      { timeout: 10000 },
    ),
  );
  const dialog = await screen.findByRole("dialog", { name: "Departure" });
  fireEvent.click(
    within(dialog).getByRole("button", { name: /January 16, 2026/ }),
  );
  expect(await screen.findByText("2026-01-16")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Clear date" }));
  expect(await screen.findByText("Select date")).toBeInTheDocument();
});
