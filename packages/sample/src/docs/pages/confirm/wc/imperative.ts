// confirm() appends a <minerva-confirm-dialog>, resolves true / false and
// removes it once closed. In an app: import { confirm } from
// "@minerva/lib-web-components/confirm".
export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#leave")!;
  const result = root.querySelector<HTMLElement>("#leave-result")!;
  const onClick = async () => {
    const { confirm } = await import("@minerva/lib-web-components");
    const ok = await confirm({
      title: "Discard your changes?",
      description: "The edits made since the last save are lost.",
      confirmLabel: "Discard",
      color: "warning",
    });
    result.textContent = ok ? "Changes discarded" : "Kept editing";
  };
  button.addEventListener("click", onClick);
  return () => button.removeEventListener("click", onClick);
}
