// ArrowUp / ArrowDown step, PageUp / PageDown step by 10, Home / End jump to
// min / max. `minerva-change` fires when a value is committed (blur, Enter,
// stepping), with detail.value (null when cleared).
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement>("#ni-guests")!;
  const output = root.querySelector<HTMLOutputElement>("#ni-guests-value")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: number | null }>).detail;
    output.value = `Committed: ${value ?? "empty"}`;
  };
  input.addEventListener("minerva-change", onChange);
  return () => input.removeEventListener("minerva-change", onChange);
}
