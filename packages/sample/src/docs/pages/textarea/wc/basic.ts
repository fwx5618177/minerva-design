// `minerva-input` fires on every keystroke with detail.value.
export function setup(root: HTMLElement) {
  const textarea = root.querySelector<HTMLElement>("#ta-bio")!;
  const output = root.querySelector<HTMLOutputElement>("#ta-bio-count")!;
  const onInput = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    output.value = `${words} word${words === 1 ? "" : "s"}`;
  };
  textarea.addEventListener("minerva-input", onInput);
  return () => textarea.removeEventListener("minerva-input", onInput);
}
