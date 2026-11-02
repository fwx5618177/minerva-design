// value is an attribute ("40"); minerva-change follows the drag and the keys.
export function setup(root: HTMLElement) {
  const slider = root.querySelector<HTMLElement>("#volume")!;
  const output = root.querySelector<HTMLOutputElement>("#volume-output")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: number }>).detail;
    output.value = `Volume: ${value}`;
  };
  slider.addEventListener("minerva-change", onChange);
  return () => slider.removeEventListener("minerva-change", onChange);
}
