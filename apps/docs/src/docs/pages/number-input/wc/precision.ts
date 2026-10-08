// stepUp() / stepDown() change the value programmatically (clamped, no event).
type NumberInput = HTMLElement & { stepUp(): void; stepDown(): void };

export function setup(root: HTMLElement) {
  const price = root.querySelector<NumberInput>("#ni-price")!;
  const up = root.querySelector<HTMLElement>("#ni-up")!;
  const down = root.querySelector<HTMLElement>("#ni-down")!;
  const onUp = () => price.stepUp();
  const onDown = () => price.stepDown();
  up.addEventListener("click", onUp);
  down.addEventListener("click", onDown);
  return () => {
    up.removeEventListener("click", onUp);
    down.removeEventListener("click", onDown);
  };
}
