// minerva-theme-change reports the resolved mode of a scope, including the
// system preference when theme="system".
type Config = HTMLElement & {
  theme: string;
  resolvedMode: "light" | "dark" | null;
};

export function setup(root: HTMLElement) {
  const outer = root.querySelector<Config>("#outer")!;
  const mode = root.querySelector<HTMLOutputElement>("#mode")!;
  const show = () => (mode.value = `Resolved mode: ${outer.resolvedMode}`);
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id?.startsWith("outer-")) outer.theme = id.slice("outer-".length);
  };
  root.addEventListener("click", onClick);
  outer.addEventListener("minerva-theme-change", show);
  const frame = requestAnimationFrame(show);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    outer.removeEventListener("minerva-theme-change", show);
  };
}
