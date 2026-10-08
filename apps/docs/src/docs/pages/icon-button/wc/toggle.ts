// toggle buttons expose aria-pressed and fire a cancelable
// minerva-pressed-change; preventDefault() keeps the current state.
export function setup(root: HTMLElement) {
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onChange = (event: Event) => {
    const { pressed } = (event as CustomEvent<{ pressed: boolean }>).detail;
    const button = event.target as HTMLElement & { label?: string };
    if (button.id === "locked" && !pressed) {
      event.preventDefault();
      log.value = "Unpinning was prevented";
      return;
    }
    log.value = `${button.label}: ${pressed ? "on" : "off"}`;
  };
  root.addEventListener("minerva-pressed-change", onChange);
  return () => root.removeEventListener("minerva-pressed-change", onChange);
}
