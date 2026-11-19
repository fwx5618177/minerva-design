// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, expect, it } from "vitest";
import i18n from "@i18n/config";
import { SiteProviders, setupI18n } from "../../../test/utils";
import messages from "../../../i18n/locales/en/docs/input.json";
import AutofillDemo from "./demos/autofill";

beforeAll(async () => {
  await setupI18n();
  i18n.addResourceBundle(
    "en",
    "common",
    { docs: { input: messages } },
    true,
    true,
  );
});

it("preserves credential hints, form values and password visibility without authenticating", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <SiteProviders>
      <AutofillDemo />
    </SiteProviders>,
  );
  const username = screen.getByRole("textbox", { name: "Username" });
  const password = screen.getByLabelText(/Password/, { selector: "input" });
  expect(username).toHaveAttribute("autocomplete", "username");
  expect(password).toHaveAttribute("autocomplete", "current-password");
  await user.type(username, "demo-user");
  await user.type(password, "fake-password-for-test");
  const form = container.querySelector("form")!;
  expect(new FormData(form).get("username")).toBe("demo-user");
  expect(new FormData(form).get("password")).toBe("fake-password-for-test");
  await user.click(screen.getByRole("button", { name: /show password/i }));
  expect(password).toHaveAttribute("type", "text");
  expect(screen.getByRole("button", { name: /hide password/i })).toHaveFocus();
  expect(password).toHaveValue("fake-password-for-test");
  await user.click(screen.getByRole("button", { name: /hide password/i }));
  expect(password).toHaveAttribute("type", "password");
  expect(screen.getByRole("button", { name: /show password/i })).toHaveFocus();
  const event = new Event("submit", { bubbles: true, cancelable: true });
  fireEvent(form, event);
  expect(event.defaultPrevented).toBe(true);
  expect(screen.getByRole("status")).toHaveTextContent(
    "No credentials were sent",
  );
  expect(screen.getByRole("status")).not.toHaveTextContent(
    "fake-password-for-test",
  );
});
