// Web Components emit their next value in CustomEvent.detail.
// The owner writes it back through the element's value property.
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement & { value: string }>(
    "#controlled-name",
  )!;
  let value = "";
  input.value = value;
  const onInput = (event: Event) => {
    value = (event as CustomEvent<{ value: string }>).detail.value;
    input.value = value;
  };
  input.addEventListener("minerva-input", onInput);
  return () => input.removeEventListener("minerva-input", onInput);
}
