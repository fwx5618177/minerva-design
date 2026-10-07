// Space and Enter toggle the focused switch; `minerva-change` reports the
// new state in detail.checked.
export function setup(root: HTMLElement) {
  const wifi = root.querySelector<HTMLElement>("#sw-wifi")!;
  const output = root.querySelector<HTMLOutputElement>("#sw-wifi-state")!;
  const onChange = (event: Event) => {
    const { checked } = (event as CustomEvent<{ checked: boolean }>).detail;
    output.value = `Wi-Fi is ${checked ? "on" : "off"}`;
  };
  wifi.addEventListener("minerva-change", onChange);
  return () => wifi.removeEventListener("minerva-change", onChange);
}
