import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { flashcard } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "flashcard-case",
    template: flashcard.template,
    ...flashcard.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
const card = (w: ReturnType<typeof mount>) =>
  w.querySelector(".mn-flashcard__card")!;
const root = (w: ReturnType<typeof mount>) => w.querySelector(".mn-flashcard")!;
const events = (w: ReturnType<typeof mount>) => {
  const detail: unknown[] = [];
  w.addEventListener("flippedchange", (e) => detail.push(e.detail));
  return detail;
};

it("flashcard shows the front with translated captions", () => {
  const w = mount({ front: "Capital of France?", back: "Paris" });
  expect(w.data.current).toBe(false);
  expect(w.data.labels).toMatchObject({
    front: "Question",
    back: "Answer",
    hint: "Click or press Space to flip",
    card: "Flashcard, showing Question",
  });
  expect(w.data.minHeightStyle).toBe("12rem");
  expect(w.dom!.textContent).toContain("Capital of France?");
  expect(w.dom!.textContent).toContain("Paris");
  expect(w.dom!.querySelector(".mn-flashcard__hint")).toBeNull();
  expect(w.dom!.querySelector(".mn-flashcard__back")!.className).toContain(
    "mn-hidden-face",
  );
});

it("flashcard flips on tap when uncontrolled and reports it", async () => {
  const w = mount({ front: "Q", back: "A", showHint: true });
  const detail = events(w);
  expect(w.dom!.querySelector(".mn-flashcard__hint")).not.toBeNull();
  card(w).dispatchEvent("tap");
  await tick();
  expect(w.data.current).toBe(true);
  expect(w.data.labels.card).toBe("Flashcard, showing Answer");
  expect(root(w).dom!.className).toContain("mn-flipped");
  card(w).dispatchEvent("tap");
  await tick();
  expect(w.data.current).toBe(false);
  expect(detail).toEqual([{ flipped: true }, { flipped: false }]);
});

it("flashcard keeps a controlled state and honors disabled / flipOnClick", async () => {
  const w = mount({ front: "Q", back: "A", flipped: true });
  const detail = events(w);
  card(w).dispatchEvent("tap");
  await tick();
  expect(detail).toEqual([{ flipped: false }]);
  expect(w.data.current).toBe(true);
  w.setData({ flipped: false });
  await tick();
  expect(w.data.current).toBe(false);
  w.setData({ disabled: true });
  card(w).dispatchEvent("tap");
  await tick();
  expect(w.data.current).toBe(false);
  w.setData({ disabled: false, flipOnClick: false });
  card(w).dispatchEvent("tap");
  await tick();
  expect(w.data.current).toBe(false);
  expect(detail).toHaveLength(1);
});

it("flashcard customizes captions, look and height", () => {
  const w = mount({
    front: "Q",
    back: "A",
    frontLabel: "Term",
    backLabel: "",
    variant: "outline",
    size: "large",
    axis: "x",
    minHeight: 200,
    defaultFlipped: true,
    ariaLabel: "Vocabulary",
  });
  expect(w.data.current).toBe(true);
  expect(w.data.labels).toMatchObject({
    front: "Term",
    back: "",
    card: "Vocabulary",
  });
  expect(w.data.minHeightStyle).toBe("200px");
  const className = root(w).dom!.className;
  expect(className).toContain("mn-variant-outline");
  expect(className).toContain("mn-size-large");
  expect(className).toContain("mn-axis-x");
  expect(w.dom!.querySelectorAll(".mn-flashcard__label")).toHaveLength(1);
});
