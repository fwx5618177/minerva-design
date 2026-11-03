// @vitest-environment happy-dom
// Docs demos that used to be checked in a real browser: Alert dismissal and
// focus return, the documented site search, AppShell navigation, the text
// divider options, the scripts of the Web Components demos and the Vue
// Monaco fallback editor.
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import VueDemo from "./components/VueDemo";
import { vueDemosOf } from "./vueDemos";
import { loadWcDemos } from "./wcDemos";
import AlertClosable from "./pages/alert/demos/closable";
import AlertReturnFocus from "./pages/alert/demos/return-focus";
import AppShellBasic from "./pages/app-shell/demos/basic";
import CommandSiteSearch from "./pages/command/demos/site-search";
import DividerWithText from "./pages/divider/demos/with-text";

beforeAll(setupI18n);

const show = (content: React.ReactNode) => {
  render(<SiteProviders>{content}</SiteProviders>);
  return userEvent.setup();
};

const alerts = () =>
  document.querySelectorAll('[role="alert"], [role="status"]');

describe("Alert demos", () => {
  it("closable: each close is counted and Reset brings both alerts back", async () => {
    const user = show(<AlertClosable />);
    expect(alerts()).toHaveLength(2);
    await user.click(screen.getAllByRole("button", { name: "Close" })[0]!);
    await waitFor(() => expect(alerts()).toHaveLength(1));
    expect(screen.getByText("Closed: 1")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(alerts()).toHaveLength(2);
    expect(screen.getByText("Closed: 1")).toBeInTheDocument();
  });

  it("return-focus: closing the second alert moves focus to Reset", async () => {
    const user = show(<AlertReturnFocus />);
    const closes = screen.getAllByRole("button", { name: "Close" });
    await user.click(closes[closes.length - 1]!);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Reset" })).toHaveFocus(),
    );
  });
});

it("command site-search: filters by keyword and reports the keyboard choice", async () => {
  const user = show(<CommandSiteSearch />);
  const trigger = screen.getByRole("button", { name: /Search documentation/ });
  expect(screen.getByRole("status")).toHaveTextContent("No page selected");
  await user.click(trigger);
  const dialog = await screen.findByRole("dialog", {
    name: /^Search documentation/,
  });
  const input = within(dialog).getByRole("combobox");
  await user.type(input, "submit");
  expect(within(dialog).getAllByRole("option")).toHaveLength(1);
  await user.keyboard("{ArrowDown}{Enter}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(screen.getByRole("status")).toHaveTextContent("Selected: Button");
});

it("app-shell basic: outline icons keep fill=none and the NavTree switches the page", async () => {
  const user = show(<AppShellBasic />);
  const iconButton = document.querySelector('[data-minerva="icon-button"]');
  expect(iconButton?.querySelector('svg[fill="none"]')).not.toBeNull();
  const navigation = document.querySelector<HTMLElement>(
    '[data-minerva="nav-tree"][data-part="root"]',
  )!;
  expect(navigation).not.toBeNull();
  expect(screen.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await user.click(within(navigation).getByText("Books"));
  expect(screen.getByRole("heading", { name: "Books" })).toBeInTheDocument();
  expect(
    within(navigation).getByRole("button", { name: "Books" }),
  ).toHaveAttribute("aria-current", "page");
});

describe("divider with-text: the right divider is dashed, 3px and right-aligned", () => {
  const expectRightDivider = (separator: Element | null | undefined) => {
    expect(separator).toBeTruthy();
    expect(separator).toHaveAttribute("data-variant", "dashed");
    expect(separator).toHaveAttribute("data-align", "right");
    expect(
      (separator as HTMLElement).style.getPropertyValue("--_divider-thickness"),
    ).toBe("3px");
  };

  it("React", () => {
    show(<DividerWithText />);
    const right = screen
      .getAllByRole("separator")
      .find((el) => el.textContent === "Right");
    expectRightDivider(right);
  });

  it("Vue", async () => {
    show(<VueDemo demo={vueDemosOf("divider")["with-text"]!} />);
    await screen.findByText("Right", undefined, { timeout: 10000 });
    const right = screen
      .getAllByRole("separator")
      .find((el) => el.textContent?.trim() === "Right");
    expectRightDivider(right);
  });
});

describe("Web Components demo scripts", () => {
  const mount = async (page: string, id = "basic") => {
    const demo = (await loadWcDemos(page))[id]!;
    const root = document.createElement("div");
    root.innerHTML = demo.html;
    document.body.append(root);
    const cleanup = demo.setup?.(root);
    return {
      root,
      dispose: () => {
        if (typeof cleanup === "function") cleanup();
        root.remove();
      },
    };
  };

  it("button basic: counts each click of the custom element", async () => {
    const { root, dispose } = await mount("button");
    const output = root.querySelector("output")!;
    expect(output).toHaveTextContent("Clicked 0 times");
    const button = root.querySelector("minerva-button")!;
    expect(button).toHaveTextContent("Click me");
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(output).toHaveTextContent("Clicked 2 times");
    dispose();
  });

  it("input basic: the controlled input writes each value back", async () => {
    const { root, dispose } = await mount("input");
    const input = root.querySelector<HTMLElement & { value: string }>(
      "#controlled-name",
    )!;
    expect(input).toHaveAttribute("aria-label", "Controlled");
    expect(input.value).toBe("");
    for (const value of ["Ada Lovelace", ""]) {
      input.dispatchEvent(
        new CustomEvent("minerva-input", { detail: { value } }),
      );
      expect(input.value).toBe(value);
    }
    dispose();
  });

  it("checkbox basic: Remember me starts unchecked, the other one checked", async () => {
    const { root, dispose } = await mount("checkbox");
    const boxes = [...root.querySelectorAll("minerva-checkbox")];
    expect(boxes.map((box) => box.getAttribute("label"))).toEqual([
      "Remember me",
      "Checked by default",
    ]);
    expect(boxes.map((box) => box.hasAttribute("checked"))).toEqual([
      false,
      true,
    ]);
    dispose();
  });

  it("divider with-text: dashed, 3px, right-aligned", async () => {
    const { root, dispose } = await mount("divider", "with-text");
    const right = root.querySelector('minerva-divider[text-align="right"]');
    expect(right).toHaveTextContent("Right");
    expect(right).toHaveAttribute("variant", "dashed");
    expect(right).toHaveAttribute("thickness", "3");
    dispose();
  });
});

it("Vue Monaco fallback: the plain editor keeps edits while the engine is missing", async () => {
  const user = show(
    <VueDemo demo={vueDemosOf("monaco-code-editor").fallback!} />,
  );
  const editor = await screen.findByRole(
    "textbox",
    { name: "Recoverable editor" },
    { timeout: 10000 },
  );
  await act(async () => {
    await user.clear(editor);
    await user.type(editor, "Keep my edits");
  });
  await waitFor(() =>
    expect(document.querySelector("output")).toHaveTextContent("Keep my edits"),
  );
  expect(
    screen.getByRole("button", { name: "Load local editor engine" }),
  ).toBeInTheDocument();
});
