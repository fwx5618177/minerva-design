import { mount } from "@vue/test-utils";
import { h } from "vue";
import { expect, it } from "vitest";
import Flashcard from "./Flashcard.vue";

const card = (w: ReturnType<typeof mount>) => w.find('[data-part="card"]');
const face = (w: ReturnType<typeof mount>, part: string) =>
  w.find(`[data-part="${part}"]`);

it("flashcard renders a toggle button showing the front", () => {
  const w = mount(Flashcard, {
    props: { front: "Capital of France?", back: "Paris" },
  });
  expect(card(w).attributes("role")).toBe("button");
  expect(card(w).attributes("tabindex")).toBe("0");
  expect(card(w).attributes("aria-pressed")).toBe("false");
  expect(card(w).attributes("aria-label")).toBe("Flashcard, showing Question");
  const describedBy = card(w).attributes("aria-describedby")!;
  expect(w.find(`[id="${describedBy}"]`).text()).toBe("Capital of France?");
  expect(face(w, "root").classes()).toContain("mn-variant-elevated");
  expect(face(w, "root").attributes("data-state")).toBe("inactive");
  expect(face(w, "front").text()).toContain("Question");
  expect(face(w, "back").attributes("aria-hidden")).toBe("true");
  expect(face(w, "back").classes()).toContain("mn-hidden-face");
  expect(face(w, "back").attributes("aria-live")).toBe("polite");
  expect(face(w, "footer").exists()).toBe(false);
});

it("flashcard flips on tap, Enter and Space and emits", async () => {
  const w = mount(Flashcard, { props: { front: "Q", back: "A" } });
  await card(w).trigger("click");
  expect(card(w).attributes("aria-pressed")).toBe("true");
  expect(card(w).attributes("aria-label")).toBe("Flashcard, showing Answer");
  expect(face(w, "root").classes()).toContain("mn-flipped");
  expect(face(w, "front").attributes("aria-hidden")).toBe("true");
  await card(w).trigger("keydown", { key: "Enter" });
  expect(card(w).attributes("aria-pressed")).toBe("false");
  await card(w).trigger("keydown", { key: " " });
  await card(w).trigger("keydown", { key: " ", repeat: true });
  expect(card(w).attributes("aria-pressed")).toBe("true");
  expect(w.emitted("flippedChange")).toEqual([[true], [false], [true]]);
  expect(w.emitted("update:flipped")).toHaveLength(3);
});

it("flashcard keeps a controlled state, renders slots and ignores interactive taps", async () => {
  const w = mount(Flashcard, {
    props: { flipped: false },
    slots: {
      front: () => h("span", [h("a", { href: "#x" }, "docs"), h("b", "now")]),
      back: () => "Answer",
      footer: () => h("button", "Good"),
    },
    attachTo: document.body,
  });
  expect(face(w, "footer").text()).toBe("Good");
  expect(face(w, "back").text()).toContain("Answer");
  await w.find("a").trigger("click");
  expect(w.emitted("flippedChange")).toBeUndefined();
  await w.find("b").trigger("click");
  expect(w.emitted("flippedChange")).toEqual([[true]]);
  expect(card(w).attributes("aria-pressed")).toBe("false");
  await w.setProps({ flipped: true });
  expect(card(w).attributes("aria-pressed")).toBe("true");
  w.unmount();
});

it("flashcard does not flip while disabled; is a group without flipOnClick", async () => {
  const w = mount(Flashcard, {
    props: { front: "Q", back: "A", disabled: true, showHint: true },
  });
  expect(card(w).attributes("aria-disabled")).toBe("true");
  expect(card(w).attributes("tabindex")).toBe("-1");
  expect(face(w, "root").attributes("data-disabled")).toBe("");
  await card(w).trigger("click");
  expect(w.emitted("flippedChange")).toBeUndefined();
  expect(face(w, "hint").text()).toBe("Click or press Space to flip");
  await w.setProps({ disabled: false, flipOnClick: false });
  expect(card(w).attributes("role")).toBe("group");
  expect(card(w).attributes("tabindex")).toBeUndefined();
  expect(card(w).attributes("aria-pressed")).toBeUndefined();
  expect(face(w, "hint").exists()).toBe(false);
  await card(w).trigger("click");
  expect(w.emitted("flippedChange")).toBeUndefined();
});

it("flashcard customizes labels, variant, size, axis and height", () => {
  const w = mount(Flashcard, {
    props: {
      front: "Q",
      back: "A",
      frontLabel: "Term",
      backLabel: "",
      variant: "outline",
      size: "large",
      axis: "x",
      minHeight: 200,
      ariaLabel: "Vocabulary",
    },
  });
  expect(card(w).attributes("aria-label")).toBe("Vocabulary");
  expect(face(w, "front").text()).toBe("TermQ");
  expect(face(w, "back").text()).toBe("A");
  expect(face(w, "root").classes()).toEqual(
    expect.arrayContaining([
      "mn-variant-outline",
      "mn-size-large",
      "mn-axis-x",
    ]),
  );
  expect(face(w, "root").attributes("style")).toContain(
    "--flashcard-min-height: 200px",
  );
});
