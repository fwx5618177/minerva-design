import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaFlashcard } from "./flashcard";
import "../../elements/flashcard";
import { resetDevWarnings } from "../../internal/dev";
import { customStates } from "../../internal/styling-hooks";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const setup = (attrs = `front="Capital of France?" back="Paris"`, inner = "") =>
  mount<MinervaFlashcard>(
    `<minerva-flashcard ${attrs}>${inner}</minerva-flashcard>`,
    "minerva-flashcard",
  );
const card = (el: Element) => $(el, '[part="card"]');
const face = (el: Element, part: string) => $(el, `[part="${part}"]`);

describe("<minerva-flashcard>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-flashcard")).toBe(MinervaFlashcard);
  });

  it("renders a toggle button showing the front", async () => {
    const el = await setup();
    expect(card(el).getAttribute("role")).toBe("button");
    expect(card(el).getAttribute("tabindex")).toBe("0");
    expect(card(el).getAttribute("aria-pressed")).toBe("false");
    expect(card(el).getAttribute("aria-label")).toBe(
      "Flashcard, showing Question",
    );
    expect(card(el).getAttribute("aria-describedby")).toBe("front-content");
    expect(face(el, "front").textContent).toContain("Capital of France?");
    expect(face(el, "back").getAttribute("aria-hidden")).toBe("true");
    expect(face(el, "back").hasAttribute("inert")).toBe(true);
    expect(face(el, "back").getAttribute("aria-live")).toBe("polite");
    expect(el.shadowRoot!.querySelector('[part="footer"]')).toBeNull();
    expect(el.shadowRoot!.querySelector('[part="hint"]')).toBeNull();
    expect([...customStates(el)]).toEqual(
      expect.arrayContaining(["inactive", "variant-elevated", "size-medium"]),
    );
  });

  it("flips on click, Enter and Space and fires minerva-flipped-change", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-flipped-change", (event) =>
      onChange((event as CustomEvent).detail),
    );
    card(el).click();
    await el.updateComplete;
    expect(el.flipped).toBe(true);
    expect(el.hasAttribute("flipped")).toBe(true);
    expect(card(el).getAttribute("aria-pressed")).toBe("true");
    expect(card(el).getAttribute("aria-label")).toBe(
      "Flashcard, showing Answer",
    );
    expect(face(el, "front").hasAttribute("inert")).toBe(true);
    expect(face(el, "back").hasAttribute("aria-hidden")).toBe(false);
    expect([...customStates(el)]).toContain("active");
    card(el).dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    await el.updateComplete;
    expect(el.flipped).toBe(false);
    card(el).dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true }),
    );
    card(el).dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", repeat: true, bubbles: true }),
    );
    await el.updateComplete;
    expect(el.flipped).toBe(true);
    expect(onChange.mock.calls).toEqual([
      [{ flipped: true }],
      [{ flipped: false }],
      [{ flipped: true }],
    ]);
  });

  it("keeps the face when the event is canceled", async () => {
    const el = await setup();
    el.addEventListener("minerva-flipped-change", (event) =>
      event.preventDefault(),
    );
    card(el).click();
    await el.updateComplete;
    expect(el.flipped).toBe(false);
  });

  it("ignores clicks on interactive content inside a face", async () => {
    const el = await setup();
    const link = document.createElement("a");
    link.href = "#x";
    face(el, "front").querySelector(".content")!.append(link);
    link.click();
    await el.updateComplete;
    expect(el.flipped).toBe(false);
  });

  it("renders the slots and the footer", async () => {
    const el = await setup(
      "",
      `<b slot="front">Q</b><i slot="back">A</i><button slot="footer">Good</button>`,
    );
    expect(face(el, "footer").querySelector("slot")!.name).toBe("footer");
    el.querySelector("[slot=footer]")!.remove();
    await settle();
    expect(el.shadowRoot!.querySelector('[part="footer"]')).toBeNull();
  });

  it("does not flip while disabled; is a group without flip-on-click", async () => {
    const el = await setup(`front="Q" back="A" disabled show-hint`);
    expect(card(el).getAttribute("aria-disabled")).toBe("true");
    expect(card(el).getAttribute("tabindex")).toBe("-1");
    card(el).click();
    await el.updateComplete;
    expect(el.flipped).toBe(false);
    expect([...customStates(el)]).toContain("disabled");
    el.disabled = false;
    el.setAttribute("flip-on-click", "false");
    await el.updateComplete;
    expect(el.flipOnClick).toBe(false);
    expect(card(el).getAttribute("role")).toBe("group");
    expect(card(el).hasAttribute("tabindex")).toBe(false);
    expect(card(el).hasAttribute("aria-pressed")).toBe(false);
    expect(el.shadowRoot!.querySelector('[part="hint"]')).toBeNull();
    card(el).click();
    await el.updateComplete;
    expect(el.flipped).toBe(false);
    el.flipped = true;
    await el.updateComplete;
    expect(face(el, "back").hasAttribute("aria-hidden")).toBe(false);
  });

  it("customizes labels, hint, variant, size, axis and height", async () => {
    const el = await setup(
      `front="Q" back="A" front-label="Term" back-label="" hint="Tap me" show-hint variant="outline" size="large" axis="x" min-height="200" aria-label="Vocabulary"`,
    );
    expect(card(el).getAttribute("aria-label")).toBe("Vocabulary");
    expect(face(el, "front").textContent!.replace(/\s+/g, "")).toBe(
      "TermQTapme",
    );
    expect(face(el, "back").querySelector('[part="label"]')).toBeNull();
    const root = face(el, "root");
    expect(root.className).toContain("outline");
    expect(root.className).toContain("large");
    expect(root.className).toContain("axisX");
    expect(root.style.getPropertyValue("--flashcard-min-height")).toBe("200px");
    expect([...customStates(el)]).toEqual(
      expect.arrayContaining(["variant-outline", "size-large"]),
    );
  });
});
