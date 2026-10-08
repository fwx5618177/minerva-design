// useToast() renders in the caller's ConfigProvider scope (portal host,
// theme, palette, language); toast() keeps the owning provider's (root) scope.
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ToastProvider, toast, useToast } from ".";
import { toastStore } from "./store";
import { ConfigProvider } from "../../contexts/ConfigProvider";

const html = document.documentElement;

afterEach(() => {
  toastStore.reset();
  html.removeAttribute("style");
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
});

const hostOf = (element: HTMLElement) =>
  element.closest<HTMLElement>("[data-minerva-portal-host]");

const toastOf = (text: string) =>
  screen.getByText(text).closest<HTMLElement>("[role=status], [role=alert]")!;

function Notify() {
  const scopedToast = useToast();
  return (
    <>
      <button
        type="button"
        onClick={() => scopedToast.success("Scoped saved", { duration: 0 })}
      >
        scoped
      </button>
      <button
        type="button"
        onClick={() => toast.success("Root saved", { duration: 0 })}
      >
        root
      </button>
    </>
  );
}

const renderApp = (provider: { closeLabel?: string } = {}) =>
  render(
    <ConfigProvider theme="light" locale={{ language: "en" }}>
      <ToastProvider {...provider}>
        <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
          <Notify />
        </ConfigProvider>
      </ToastProvider>
    </ConfigProvider>,
  );

describe("useToast() follows the calling scope", () => {
  it("renders the toast in the scoped portal host with the scoped theme and language", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("button", { name: "scoped" }));

    const item = toastOf("Scoped saved");
    const host = hostOf(item);
    expect(host).not.toBeNull();
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toHaveAttribute("data-palette", "tech");
    expect(
      within(item).getByRole("button", { name: "关闭" }),
    ).toBeInTheDocument();
    expect(item.closest("[role=region]")).toHaveAccessibleName("通知（F8）");
  });

  it("toast() called from the same place renders at the root, in the root language", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("button", { name: "root" }));

    const item = toastOf("Root saved");
    expect(hostOf(item)).toBeNull();
    expect(item.closest("[role=region]")?.parentElement).toBe(document.body);
    expect(
      within(item).getByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
    expect(item.closest("[role=region]")).toHaveAccessibleName(
      "Notifications (F8)",
    );
  });

  it("groups toasts per scope: one viewport each, same position", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("button", { name: "scoped" }));
    await userEvent.click(screen.getByRole("button", { name: "root" }));

    const regions = screen.getAllByRole("region");
    expect(regions).toHaveLength(2);
    expect(regions[0].className).toBe(regions[1].className);
    expect(toastOf("Scoped saved").closest("[role=region]")).not.toBe(
      toastOf("Root saved").closest("[role=region]"),
    );
  });

  it("keeps the scope on update and closes from the scoped viewport", async () => {
    const apis: ReturnType<typeof useToast>[] = [];
    function Capture() {
      apis.push(useToast());
      return null;
    }
    render(
      <ConfigProvider theme="light" locale={{ language: "en" }}>
        <ToastProvider>
          <ConfigProvider theme="dark" locale={{ language: "zh" }}>
            <Capture />
          </ConfigProvider>
        </ToastProvider>
      </ConfigProvider>,
    );
    const api = apis[apis.length - 1];
    let id!: string | number;
    act(() => {
      id = api.loading("Uploading");
    });
    expect(hostOf(toastOf("Uploading"))).not.toBeNull();

    act(() => api.update(id, { title: "Uploaded", loading: false }));
    const item = toastOf("Uploaded");
    expect(hostOf(item)).toHaveAttribute("data-theme", "dark");

    await userEvent.click(within(item).getByRole("button", { name: "关闭" }));
    expect(toastStore.peek()[0]?.state).toBe("closing");
  });

  it("an explicit provider closeLabel still wins in scoped viewports", async () => {
    renderApp({ closeLabel: "Dismiss" });
    await userEvent.click(screen.getByRole("button", { name: "scoped" }));
    expect(
      within(toastOf("Scoped saved")).getByRole("button", { name: "Dismiss" }),
    ).toBeInTheDocument();
  });

  it("returns the toast export itself outside a nested scope", () => {
    const apis: unknown[] = [];
    function Capture() {
      apis.push(useToast());
      return null;
    }
    render(
      <ConfigProvider theme="light">
        <Capture />
      </ConfigProvider>,
    );
    expect(apis[apis.length - 1]).toBe(toast);
  });
});
