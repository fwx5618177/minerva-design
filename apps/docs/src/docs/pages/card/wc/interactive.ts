// A link card renders a native <a>, a button card a native <button>
// (aria-pressed on the host is forwarded to it).
export function setup(root: HTMLElement) {
  const link = root.querySelector<HTMLElement>("minerva-card[as='a']")!;
  const card = root.querySelector<HTMLElement>("#select")!;
  // The docs use hash routing: keep the demo link from navigating
  const onLink = (event: Event) => event.preventDefault();
  const onClick = () => {
    const pressed = card.getAttribute("aria-pressed") === "true";
    card.setAttribute("aria-pressed", String(!pressed));
    card.setAttribute("variant", pressed ? "default" : "filled");
  };
  link.addEventListener("click", onLink);
  card.addEventListener("click", onClick);
  return () => {
    link.removeEventListener("click", onLink);
    card.removeEventListener("click", onClick);
  };
}
