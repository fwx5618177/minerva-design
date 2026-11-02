import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { Flashcard } from ".";

const card = () => document.querySelector<HTMLElement>('[data-part="card"]')!;
const face = (part: string) =>
  document.querySelector<HTMLElement>(`[data-part="${part}"]`)!;

describe("Flashcard (Vue)", () => {
  it("renders a toggle button showing the front", () => {
    render(Flashcard, {
      props: { front: "Capital of France?", back: "Paris" },
    });
    expect(card().getAttribute("role")).toBe("button");
    expect(card().getAttribute("aria-label")).toBe(
      "Flashcard, showing Question",
    );
    expect(card().getAttribute("aria-pressed")).toBe("false");
    expect(card().getAttribute("tabindex")).toBe("0");
    const describedBy = card().getAttribute("aria-describedby")!;
    expect(document.getElementById(describedBy)?.textContent).toBe(
      "Capital of France?",
    );
    expect(face("front").textContent).toContain("Question");
    expect(face("back").getAttribute("aria-hidden")).toBe("true");
    expect(face("back").hasAttribute("inert")).toBe(true);
    expect(face("back").getAttribute("aria-live")).toBe("polite");
    expect(face("root").dataset.state).toBe("inactive");
    expect(face("root").style.getPropertyValue("--flashcard-min-height")).toBe(
      "12rem",
    );
  });

  it("flips on click, Enter and Space and emits", async () => {
    const view = render(Flashcard, { props: { front: "Q", back: "A" } });
    await fireEvent.click(card());
    expect(card().getAttribute("aria-pressed")).toBe("true");
    expect(card().getAttribute("aria-label")).toBe("Flashcard, showing Answer");
    expect(face("front").hasAttribute("inert")).toBe(true);
    expect(face("back").hasAttribute("aria-hidden")).toBe(false);
    await fireEvent.keyDown(card(), { key: "Enter" });
    expect(card().getAttribute("aria-pressed")).toBe("false");
    await fireEvent.keyDown(card(), { key: " " });
    await fireEvent.keyDown(card(), { key: " ", repeat: true });
    expect(card().getAttribute("aria-pressed")).toBe("true");
    expect(view.emitted("flippedChange")).toEqual([[true], [false], [true]]);
    expect(view.emitted("update:flipped")).toHaveLength(3);
  });

  it("ignores clicks on interactive slot content", async () => {
    render(Flashcard, {
      slots: {
        front: '<span>See <a href="#docs">docs</a> <b>now</b></span>',
        back: "A",
      },
    });
    await fireEvent.click(document.querySelector("a")!);
    expect(card().getAttribute("aria-pressed")).toBe("false");
    await fireEvent.click(document.querySelector("b")!);
    expect(card().getAttribute("aria-pressed")).toBe("true");
  });

  it("supports v-model:flipped and the footer slot", async () => {
    const flipped = ref(true);
    const onChange = vi.fn();
    const Host = defineComponent({
      setup: () => () =>
        h(
          Flashcard,
          {
            front: "Q",
            back: "A",
            flipped: flipped.value,
            "onUpdate:flipped": (value: boolean) => {
              flipped.value = value;
              onChange(value);
            },
          },
          {
            footer: () =>
              h(
                "button",
                { type: "button", onClick: () => (flipped.value = false) },
                "Next",
              ),
          },
        ),
    });
    render(Host);
    expect(card().getAttribute("aria-pressed")).toBe("true");
    const next = face("footer").querySelector("button")!;
    await fireEvent.click(next);
    expect(card().getAttribute("aria-pressed")).toBe("false");
    await fireEvent.click(card());
    expect(onChange).toHaveBeenCalledWith(true);
    expect(flipped.value).toBe(true);
  });

  it("does not flip while disabled; is a group without flipOnClick", async () => {
    const view = render(Flashcard, {
      props: { front: "Q", back: "A", disabled: true },
    });
    expect(card().getAttribute("aria-disabled")).toBe("true");
    expect(card().getAttribute("tabindex")).toBe("-1");
    await fireEvent.click(card());
    expect(view.emitted("flippedChange")).toBeUndefined();
    expect(face("root").hasAttribute("data-disabled")).toBe(true);
    await view.rerender({
      disabled: false,
      flipOnClick: false,
      showHint: true,
    });
    await nextTick();
    expect(card().getAttribute("role")).toBe("group");
    expect(card().hasAttribute("tabindex")).toBe(false);
    expect(document.querySelector('[data-part="hint"]')).toBeNull();
    await fireEvent.click(card());
    expect(view.emitted("flippedChange")).toBeUndefined();
  });

  it("customizes labels, hint, variant, size, axis and height", () => {
    render(Flashcard, {
      props: {
        front: "Q",
        back: "A",
        frontLabel: "Term",
        backLabel: "",
        hint: "Tap me",
        showHint: true,
        variant: "outline",
        size: "large",
        axis: "x",
        minHeight: 200,
        "aria-label": "Vocabulary",
      },
      attrs: { class: "custom" },
    });
    expect(card().getAttribute("aria-label")).toBe("Vocabulary");
    expect(face("front").textContent).toBe("TermQTap me");
    expect(face("back").textContent).toBe("A");
    expect(face("root").classList.contains("custom")).toBe(true);
    expect(face("root").dataset.variant).toBe("outline");
    expect(face("root").dataset.size).toBe("large");
    expect(face("root").style.getPropertyValue("--flashcard-min-height")).toBe(
      "200px",
    );
  });
});
