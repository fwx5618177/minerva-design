// flipped is a reflected boolean attribute; minerva-flipped-change reports
// user flips (cancelable). The footer slot holds the rating buttons.
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];

type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

export function setup(root: HTMLElement) {
  const card = root.querySelector<Flashcard>("#card")!;
  const front = root.querySelector<HTMLElement>("#front")!;
  const back = root.querySelector<HTMLElement>("#back")!;
  const footer = root.querySelector<HTMLElement>("#footer")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const history: string[] = [];
  let index = 0;

  const button = (label: string, solid: boolean, onClick: () => void) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  const render = () => {
    const item = deck[index]!;
    card.frontLabel = `Card ${index + 1} / ${deck.length}`;
    front.textContent = item.front;
    back.textContent = item.back;
    footer.replaceChildren(
      ...(card.flipped
        ? ratings.map((rating) =>
            button(rating, rating === "Good", () => {
              history.push(`${item.front}: ${rating}`);
              log.value = history.slice(-3).join(" · ");
              card.flipped = false;
              index = (index + 1) % deck.length;
              render();
            }),
          )
        : [
            button("Show answer", true, () => {
              card.flipped = true;
              render();
            }),
          ]),
    );
  };
  const onFlip = () => queueMicrotask(render);
  card.addEventListener("minerva-flipped-change", onFlip);
  render();
  return () => card.removeEventListener("minerva-flipped-change", onFlip);
}
