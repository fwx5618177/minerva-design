import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Portal } from "./Portal";
import { ThemeScopeContext } from "./themeScope";

describe("Portal", () => {
  it("renders into document.body by default", () => {
    const { container } = render(
      <Portal>
        <p>portalled</p>
      </Portal>,
    );
    const node = screen.getByText("portalled");
    expect(container).not.toContainElement(node);
    expect(node.parentElement).toBe(document.body);
  });

  it("renders into an explicit container", () => {
    const host = document.createElement("section");
    document.body.append(host);
    render(
      <Portal container={host}>
        <p>inside host</p>
      </Portal>,
    );
    expect(screen.getByText("inside host").parentElement).toBe(host);
    host.remove();
  });

  it("uses the theme-scoped container and waits for it to exist", () => {
    const host = document.createElement("div");
    document.body.append(host);
    const { rerender } = render(
      <ThemeScopeContext.Provider
        value={{ scoped: true, portalContainer: null, language: undefined }}
      >
        <Portal>
          <p>scoped</p>
        </Portal>
      </ThemeScopeContext.Provider>,
    );
    expect(screen.queryByText("scoped")).toBeNull();
    rerender(
      <ThemeScopeContext.Provider
        value={{ scoped: true, portalContainer: host, language: undefined }}
      >
        <Portal>
          <p>scoped</p>
        </Portal>
      </ThemeScopeContext.Provider>,
    );
    expect(screen.getByText("scoped").parentElement).toBe(host);
    host.remove();
  });

  it("renders nothing on the server", () => {
    expect(
      renderToString(
        <div>
          <Portal>
            <p>never</p>
          </Portal>
        </div>,
      ),
    ).toBe("<div></div>");
  });
});
