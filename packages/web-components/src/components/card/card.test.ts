import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  MinervaCard,
  MinervaCardContent,
  MinervaCardDescription,
  MinervaCardFooter,
  MinervaCardHeader,
  MinervaCardTitle,
} from "./card";
import "../../elements/card";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const base = (el: Element) => $(el, "[part=root]");

const full = `<minerva-card>
  <minerva-card-header>
    <minerva-card-title>Plan</minerva-card-title>
    <minerva-card-description>Monthly</minerva-card-description>
  </minerva-card-header>
  <minerva-card-content>Body</minerva-card-content>
  <minerva-card-footer>Actions</minerva-card-footer>
</minerva-card>`;

const part = <E extends Element>(selector: string) =>
  document.querySelector<E>(selector)!;

describe("<minerva-card>", () => {
  it("registers the card and its parts", () => {
    expect(customElements.get("minerva-card")).toBe(MinervaCard);
    expect(customElements.get("minerva-card-header")).toBe(MinervaCardHeader);
    expect(customElements.get("minerva-card-title")).toBe(MinervaCardTitle);
    expect(customElements.get("minerva-card-description")).toBe(
      MinervaCardDescription,
    );
    expect(customElements.get("minerva-card-content")).toBe(MinervaCardContent);
    expect(customElements.get("minerva-card-footer")).toBe(MinervaCardFooter);
  });

  it("renders the React library's classes for the sections layout", async () => {
    const el = await mount<MinervaCard>(full);
    const root = base(el);
    expect(root.tagName).toBe("DIV");
    expect(root.classList).toContain("card");
    expect(root.classList).toContain("default");
    expect(root.classList).not.toContain("padded");
    expect(base(part("minerva-card-header")).className.trim()).toBe(
      "cardHeader",
    );
    expect(base(part("minerva-card-content")).classList).toContain(
      "cardContent",
    );
    expect(base(part("minerva-card-footer")).classList).toContain("cardFooter");
    const title = base(part("minerva-card-title"));
    expect(title.tagName).toBe("H3");
    expect(title.className.trim()).toBe("cardTitle");
    expect(base(part("minerva-card-description")).tagName).toBe("P");
  });

  it("padded layout: the parts follow the card, with the previous-section classes", async () => {
    const el = await mount<MinervaCard>(full);
    el.padding = "medium";
    await settle();
    expect(base(el).classList).toContain("padded");
    expect(base(el).classList).toContain("pad-medium");
    expect(el.getAttribute("padding")).toBe("medium");
    const content = base(part("minerva-card-content"));
    expect(content.classList).toContain("padded");
    expect(content.classList).toContain("afterHeader");
    const footer = base(part("minerva-card-footer"));
    expect(footer.classList).toContain("afterContent");
    expect(base(part("minerva-card-title")).classList).toContain("padded");
    expect(base(part("minerva-card-description")).classList).toContain(
      "padded",
    );
    // removing the content: the footer now follows the header
    part("minerva-card-content").remove();
    await settle();
    expect(base(part("minerva-card-footer")).classList).toContain(
      "afterHeader",
    );
    el.padding = undefined;
    await settle();
    expect(base(part("minerva-card-title")).classList).not.toContain("padded");
  });

  it("section padding overrides, content animation, title level", async () => {
    await mount(
      `<minerva-card><minerva-card-header padding="none"><minerva-card-title as="h2">T</minerva-card-title></minerva-card-header><minerva-card-content animation="fadeIn" padding="large"></minerva-card-content></minerva-card>`,
    );
    expect(base(part("minerva-card-header")).classList).toContain("pad-none");
    const content = base(part("minerva-card-content"));
    expect(content.classList).toContain("pad-large");
    expect(content.classList).toContain("fadeIn");
    expect(base(part("minerva-card-title")).tagName).toBe("H2");
  });

  it("variant / interactive classes and the shared stylesheet", async () => {
    const el = await mount<MinervaCard>(
      `<minerva-card variant="elevated" as="article"></minerva-card>`,
    );
    expect(base(el).tagName).toBe("ARTICLE");
    expect(base(el).classList).toContain("elevated");
    const css = (MinervaCard.styles as { cssText?: string }[])
      .map((s) => s.cssText ?? "")
      .join("");
    expect(css).toContain("--card-bg-color");
  });

  it("is not focusable by default, even when interactive (dev warning)", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaCard>(
      `<minerva-card interactive>Static</minerva-card>`,
    );
    expect(base(el).classList).toContain("interactive");
    expect(base(el).hasAttribute("tabindex")).toBe(false);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("interactive"));
  });

  it('as="button": Enter / Space activate it; disabled blocks clicks', async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaCard>(
      `<minerva-card as="button" interactive aria-label="Pick plan">Pick plan</minerva-card>`,
    );
    el.addEventListener("click", onClick);
    const button = base(el) as HTMLButtonElement;
    expect(button.tagName).toBe("BUTTON");
    expect(button.type).toBe("button");
    expect(button).toHaveAttribute("aria-label", "Pick plan");
    el.focus();
    expect(el.shadowRoot!.activeElement).toBe(button);
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    el.disabled = true;
    await el.updateComplete;
    expect(button.disabled).toBe(true);
    el.click();
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('as="button" type="submit" submits its form', async () => {
    document.body.innerHTML = `<form><minerva-card as="button" type="submit">Go</minerva-card></form>`;
    await settle();
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    document.querySelector("form")!.addEventListener("submit", onSubmit);
    await userEvent.click(base(document.querySelector("minerva-card")!));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('as="a": a link with href / target / rel; warns without href', async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaCard>(
      `<minerva-card as="a" href="/plans" target="_blank" rel="noopener">Plans</minerva-card>`,
    );
    const link = base(el) as HTMLAnchorElement;
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/plans");
    expect(link.target).toBe("_blank");
    expect(link.rel).toBe("noopener");
    expect(warn).not.toHaveBeenCalled();
    el.href = undefined;
    await el.updateComplete;
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("href"));
  });
});
