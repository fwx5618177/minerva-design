import { afterEach, describe, expect, it } from "vitest";
import { Button } from "./index";
import "../index";

const mount = async (html: string) => {
  document.body.innerHTML = html;
  const el = document.body.querySelector("minerva-button");
  if (!el) throw new Error("minerva-button not rendered");
  await el.updateComplete;
  const inner = el.shadowRoot?.querySelector("button");
  if (!inner) throw new Error("inner <button> not rendered");
  return { el, inner };
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("<minerva-button>", () => {
  it("registers the custom element", () => {
    expect(customElements.get("minerva-button")).toBe(Button);
    expect(document.createElement("minerva-button")).toBeInstanceOf(Button);
  });

  it("renders a native button with default classes and slotted content", async () => {
    const { el, inner } = await mount("<minerva-button>Save</minerva-button>");
    expect(inner.className).toBe(
      "button variant-primary size-medium shape-rounded",
    );
    expect(inner.querySelector("slot")).not.toBeNull();
    expect(el.textContent).toBe("Save");
    expect(el.getAttribute("variant")).toBe("primary");
  });

  it.each([
    ["variant", "ghost", "variant-ghost"],
    ["size", "tiny", "size-tiny"],
    ["shape", "pill", "shape-pill"],
  ])("maps the %s attribute to a CSS class", async (attr, value, cls) => {
    const { inner } = await mount(
      `<minerva-button ${attr}="${value}">x</minerva-button>`,
    );
    expect(inner.classList.contains(cls)).toBe(true);
  });

  it("only uses classes that exist in the stylesheet", async () => {
    const css = Button.styles?.toString() ?? "";
    const { inner } = await mount(
      '<minerva-button variant="info" size="large" shape="circle" active loading>x</minerva-button>',
    );
    for (const cls of inner.classList) {
      expect(css).toContain(`.${cls}`);
    }
  });

  it("disables the inner button and reflects the attribute", async () => {
    const { el, inner } = await mount(
      "<minerva-button disabled>x</minerva-button>",
    );
    expect(inner.disabled).toBe(true);
    expect(inner.classList.contains("disabled")).toBe(true);
    expect(el.hasAttribute("disabled")).toBe(true);
  });

  it("shows a spinner instead of the slot while loading", async () => {
    const { inner } = await mount("<minerva-button loading>x</minerva-button>");
    expect(inner.querySelector(".loading-spinner")).not.toBeNull();
    expect(inner.querySelector("slot")).toBeNull();
    expect(inner.getAttribute("aria-busy")).toBe("true");
  });

  it("forwards aria-label to the inner button", async () => {
    const { inner } = await mount(
      '<minerva-button aria-label="Close dialog">x</minerva-button>',
    );
    expect(inner.getAttribute("aria-label")).toBe("Close dialog");
  });

  it("adds a ripple on click and blocks clicks while loading", async () => {
    const { el, inner } = await mount("<minerva-button>x</minerva-button>");
    inner.click();
    expect(inner.querySelector(".ripple")).not.toBeNull();

    el.loading = true;
    await el.updateComplete;
    const spinnerButton = el.shadowRoot?.querySelector("button");
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    spinnerButton?.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("updates classes when properties change", async () => {
    const { el } = await mount("<minerva-button>x</minerva-button>");
    el.variant = "error";
    el.size = "small";
    await el.updateComplete;
    const inner = el.shadowRoot?.querySelector("button");
    expect(inner?.classList.contains("variant-error")).toBe(true);
    expect(inner?.classList.contains("size-small")).toBe(true);
    expect(el.getAttribute("variant")).toBe("error");
  });

  describe("theming", () => {
    const css = () => Button.styles?.toString() ?? "";

    it("consumes lib-core design tokens instead of redefining them", () => {
      // Declaring a token on :host would shadow the theme set on <html>
      for (const token of [
        "--primary-color",
        "--secondary-color",
        "--success-color",
        "--warning-color",
        "--danger-color",
        "--info-color",
        "--text-inverse-color",
      ]) {
        expect(css()).not.toMatch(new RegExp(`${token}\\s*:`));
        expect(css()).toContain(`var(${token},`);
      }
    });

    it("follows a theme token set on the document root", async () => {
      document.documentElement.style.setProperty(
        "--primary-color",
        "rgb(1, 2, 3)",
      );
      try {
        const { el } = await mount("<minerva-button>x</minerva-button>");
        expect(getComputedStyle(el).getPropertyValue("--_primary").trim()).toBe(
          "rgb(1, 2, 3)",
        );
      } finally {
        document.documentElement.style.removeProperty("--primary-color");
      }
    });

    it("shows a visible focus ring", () => {
      expect(css()).toMatch(
        /\.button:focus-visible\s*\{[^}]*outline: 2px solid/,
      );
    });
  });
});
