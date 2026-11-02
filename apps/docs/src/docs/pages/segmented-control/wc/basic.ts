// options is a JSON (or comma-separated) attribute; minerva-change reports
// the selected value. One tab stop: the arrow keys move and select.
export function setup(root: HTMLElement) {
  const control = root.querySelector<HTMLElement>("#view")!;
  const output = root.querySelector<HTMLOutputElement>("#selected")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Showing the ${value} view`;
  };
  control.addEventListener("minerva-change", onChange);
  return () => control.removeEventListener("minerva-change", onChange);
}
