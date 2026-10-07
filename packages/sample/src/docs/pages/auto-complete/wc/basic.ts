// `options` is a JS property. Typing filters the options (label contains
// the text); picking one fires minerva-select and fills the input, Enter
// with no active option fires minerva-submit with the trimmed text.
type Option = { label: string; value: string };

export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement & { options: Option[] }>(
    "#fruit",
  )!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  input.options = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry"].map(
    (label) => ({ label, value: label.toLowerCase() }),
  );
  const onSelect = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-select: ${value}`;
  };
  const onSubmit = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-submit: ${value}`;
  };
  input.addEventListener("minerva-select", onSelect);
  input.addEventListener("minerva-submit", onSubmit);
  return () => {
    input.removeEventListener("minerva-select", onSelect);
    input.removeEventListener("minerva-submit", onSubmit);
  };
}
