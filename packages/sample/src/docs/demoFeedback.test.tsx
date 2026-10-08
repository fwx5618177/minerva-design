// @vitest-environment happy-dom
// Demos give visible feedback with Minerva's own components (toast,
// ConfirmDialog, inline results) instead of window.alert / console.log.
// The source scan lives in tests/docs/demo-feedback.test.ts.
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { toast } from "@minerva/lib-core";
import ButtonBasic from "./pages/button/demos/basic";
import IconButtonBasic from "./pages/icon-button/demos/basic";
import FormLayoutBasic from "./pages/form-layout/demos/basic";
import ConfirmProviderDemo from "./pages/confirm/demos/provider";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

let alertSpy: ReturnType<typeof vi.fn>;
let logSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  alertSpy = vi.fn();
  vi.stubGlobal("alert", alertSpy);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  toast.dismiss();
  vi.unstubAllGlobals();
});

const renderDemo = (Demo: React.ComponentType) =>
  render(
    <SiteProviders>
      <Demo />
    </SiteProviders>,
  );

const expectNoBrowserFeedback = () => {
  expect(alertSpy).not.toHaveBeenCalled();
  expect(logSpy).not.toHaveBeenCalled();
};

describe("demo feedback uses Minerva components", () => {
  it("button basic: a click shows a toast", async () => {
    const user = userEvent.setup();
    renderDemo(ButtonBasic);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(await screen.findByText("Clicked!")).toBeInTheDocument();
    expectNoBrowserFeedback();
  });

  it("icon-button basic: a click updates the inline result", async () => {
    const user = userEvent.setup();
    renderDemo(IconButtonBasic);
    const output = screen.getByText("Nothing added yet");
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(output).toHaveTextContent("Added 2 item(s)");
    expectNoBrowserFeedback();
  });

  it("form-layout basic: submitting shows the saved values in an Alert", async () => {
    const user = userEvent.setup();
    renderDemo(FormLayoutBasic);
    await user.type(screen.getByLabelText("Language"), "English");
    await user.click(screen.getByRole("button", { name: "Save" }));
    const alert = await screen.findByText(/"language":"English"/);
    expect(alert).toHaveTextContent('"title":"Draft"');
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expectNoBrowserFeedback();
  });

  it("confirm provider: confirming shows a toast", async () => {
    const user = userEvent.setup();
    renderDemo(ConfirmProviderDemo);
    await user.click(screen.getByRole("button", { name: "Publish" }));
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toHaveTextContent("Publish chapter?");
    await user.click(within(dialog).getByRole("button", { name: "Publish" }));
    expect(await screen.findByText("Published")).toBeInTheDocument();
    expectNoBrowserFeedback();
  });
});
