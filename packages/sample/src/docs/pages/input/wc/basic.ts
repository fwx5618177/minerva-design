// `minerva-input` fires on every keystroke with detail.value; `change` /
// `minerva-change` when the value is committed (blur / Enter).
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement>("#in-name")!;
  const echo = root.querySelector<HTMLOutputElement>("#in-name-echo")!;
  const onInput = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    echo.value = value ? `Hello, ${value}!` : "Hello!";
  };
  input.addEventListener("minerva-input", onInput);
  return () => input.removeEventListener("minerva-input", onInput);
}
