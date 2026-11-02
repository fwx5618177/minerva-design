import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnFlashcard } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const root = () => document.querySelector<HTMLElement>("mn-flashcard")!;
const card = () => document.querySelector<HTMLElement>('[data-part="card"]')!;
const face = (part: string) =>
  document.querySelector<HTMLElement>(`[data-part="${part}"]`)!;

describe("MnFlashcard", () => {
  it("renders a toggle button showing the front", async () => {
    @Component({
      imports: [MnFlashcard],
      template: `<mn-flashcard front="Capital of France?" back="Paris" />`,
    })
    class Host {}
    await render(Host);
    expect(root().getAttribute("data-part")).toBe("root");
    expect(root().getAttribute("data-state")).toBe("inactive");
    expect(root().getAttribute("data-variant")).toBe("elevated");
    expect(root().style.getPropertyValue("--flashcard-min-height")).toBe(
      "12rem",
    );
    expect(card().getAttribute("role")).toBe("button");
    expect(card().getAttribute("tabindex")).toBe("0");
    expect(card().getAttribute("aria-pressed")).toBe("false");
    expect(card().getAttribute("aria-label")).toBe(
      "Flashcard, showing Question",
    );
    const describedBy = card().getAttribute("aria-describedby")!;
    expect(document.getElementById(describedBy)?.textContent?.trim()).toBe(
      "Capital of France?",
    );
    expect(face("back").getAttribute("aria-hidden")).toBe("true");
    expect(face("back").hasAttribute("inert")).toBe(true);
    expect(face("back").getAttribute("aria-live")).toBe("polite");
  });

  it("flips on click, Enter and Space with [(flipped)]", async () => {
    @Component({
      imports: [MnFlashcard],
      template: `<mn-flashcard front="Q" back="A" [(flipped)]="flipped" />`,
    })
    class Host {
      readonly flipped = signal(false);
    }
    const fixture = await render(Host);
    fireEvent.click(card());
    await settle(fixture);
    expect(fixture.componentInstance.flipped()).toBe(true);
    expect(card().getAttribute("aria-pressed")).toBe("true");
    expect(card().getAttribute("aria-label")).toBe("Flashcard, showing Answer");
    expect(face("front").hasAttribute("inert")).toBe(true);
    expect(face("back").hasAttribute("aria-hidden")).toBe(false);
    fireEvent.keyDown(card(), { key: "Enter" });
    await settle(fixture);
    expect(fixture.componentInstance.flipped()).toBe(false);
    fireEvent.keyDown(card(), { key: " " });
    fireEvent.keyDown(card(), { key: " ", repeat: true });
    await settle(fixture);
    expect(fixture.componentInstance.flipped()).toBe(true);
    fixture.componentInstance.flipped.set(false);
    await settle(fixture);
    expect(card().getAttribute("aria-pressed")).toBe("false");
  });

  it("projects faces and footer; ignores clicks on interactive content", async () => {
    @Component({
      imports: [MnFlashcard],
      template: `<mn-flashcard
        ><span mnFront>See <a href="#docs">docs</a> <b>now</b></span
        ><i mnBack>Answer</i
        ><button mnFooter type="button">Good</button></mn-flashcard
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    expect(face("footer").textContent).toBe("Good");
    expect(face("back").textContent).toContain("Answer");
    fireEvent.click(document.querySelector("a")!);
    await settle(fixture);
    expect(card().getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(document.querySelector("b")!);
    await settle(fixture);
    expect(card().getAttribute("aria-pressed")).toBe("true");
  });

  it("does not flip while disabled; is a group without flipOnClick", async () => {
    @Component({
      imports: [MnFlashcard],
      template: `<mn-flashcard
        front="Q"
        back="A"
        showHint
        [disabled]="disabled()"
        [flipOnClick]="flipOnClick()"
      />`,
    })
    class Host {
      readonly disabled = signal(true);
      readonly flipOnClick = signal(true);
    }
    const fixture = await render(Host);
    expect(card().getAttribute("aria-disabled")).toBe("true");
    expect(card().getAttribute("tabindex")).toBe("-1");
    expect(root().hasAttribute("data-disabled")).toBe(true);
    fireEvent.click(card());
    await settle(fixture);
    expect(card().getAttribute("aria-pressed")).toBe("false");
    fixture.componentInstance.disabled.set(false);
    fixture.componentInstance.flipOnClick.set(false);
    await settle(fixture);
    expect(card().getAttribute("role")).toBe("group");
    expect(card().hasAttribute("tabindex")).toBe(false);
    expect(card().hasAttribute("aria-pressed")).toBe(false);
    expect(document.querySelector('[data-part="hint"]')).toBeNull();
    fireEvent.click(card());
    await settle(fixture);
    expect(face("back").getAttribute("aria-hidden")).toBe("true");
  });

  it("customizes labels, hint, variant, size, axis and height", async () => {
    @Component({
      imports: [MnFlashcard],
      template: `<mn-flashcard
        front="Q"
        back="A"
        frontLabel="Term"
        backLabel=""
        hint="Tap me"
        showHint
        variant="outline"
        size="large"
        axis="x"
        [minHeight]="200"
        aria-label="Vocabulary"
      />`,
    })
    class Host {}
    await render(Host);
    expect(card().getAttribute("aria-label")).toBe("Vocabulary");
    expect(face("front").textContent!.replace(/\s+/g, "")).toBe("TermQTapme");
    expect(face("back").querySelector('[data-part="label"]')).toBeNull();
    expect(root().className).toContain("outline");
    expect(root().className).toContain("large");
    expect(root().className).toContain("axisX");
    expect(root().getAttribute("data-size")).toBe("large");
    expect(root().style.getPropertyValue("--flashcard-min-height")).toBe(
      "200px",
    );
  });
});
