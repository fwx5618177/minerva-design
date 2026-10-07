// The toggle in the heading fires `minerva-expanded-change` (cancelable)
// before flipping the `collapsed` property.
export function setup(root: HTMLElement) {
  const details = root.querySelector<HTMLElement>("#details")!;
  const state = root.querySelector<HTMLOutputElement>("#state")!;
  const onChange = (event: Event) => {
    const { expanded } = (event as CustomEvent<{ expanded: boolean }>).detail;
    state.value = expanded ? "Expanded" : "Collapsed";
  };
  details.addEventListener("minerva-expanded-change", onChange);
  return () => details.removeEventListener("minerva-expanded-change", onChange);
}
