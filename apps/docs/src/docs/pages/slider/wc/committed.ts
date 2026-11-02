// minerva-change follows the drag; minerva-change-end fires once on release
// (or after a key press): save there.
export function setup(root: HTMLElement) {
  const slider = root.querySelector<HTMLElement>("#brightness")!;
  const output = root.querySelector<HTMLOutputElement>("#brightness-output")!;
  let live: unknown = 50;
  let saved: unknown = 50;
  const render = () => {
    output.value = `While dragging: ${live} · Saved on release: ${saved}`;
  };
  const onChange = (e: Event) => {
    live = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  const onEnd = (e: Event) => {
    saved = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  slider.addEventListener("minerva-change", onChange);
  slider.addEventListener("minerva-change-end", onEnd);
  return () => {
    slider.removeEventListener("minerva-change", onChange);
    slider.removeEventListener("minerva-change-end", onEnd);
  };
}
