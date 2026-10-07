// The group fires `minerva-change` (detail.value) when the user selects
// another radio, by click or with the arrow keys.
export function setup(root: HTMLElement) {
  const group = root.querySelector<HTMLElement>("#rd-plan")!;
  const output = root.querySelector<HTMLOutputElement>("#rd-plan-value")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    output.value = `Selected: ${value}`;
  };
  group.addEventListener("minerva-change", onChange);
  return () => group.removeEventListener("minerva-change", onChange);
}
