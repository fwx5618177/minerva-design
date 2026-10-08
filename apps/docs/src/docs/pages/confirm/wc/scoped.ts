// confirm({ host }) (or confirmFor(host)) is the React library's useConfirm(): the
// dialog renders inside the host's <minerva-config> scope (dark, tech,
// Chinese labels), queued by the closest <minerva-confirm-provider>.
// confirm() without a host uses the provider's own scope (here the root
// theme and language), like the React library's confirm().
// In an app: import { confirm, confirmFor } from
// "minerva-design/web-components/confirm".
export function setup(root: HTMLElement) {
  const scoped = root.querySelector<HTMLElement>("#scoped-delete")!;
  const plain = root.querySelector<HTMLElement>("#scoped-root")!;
  const answer = root.querySelector<HTMLOutputElement>("#scoped-answer")!;
  const onScoped = async () => {
    const { confirm } = await import("minerva-design/web-components");
    const ok = await confirm({
      title: "Delete this chapter? (dark, tech, 中文)",
      color: "danger",
      host: scoped,
    });
    answer.value = String(ok);
  };
  const onPlain = async () => {
    const { confirm } = await import("minerva-design/web-components");
    answer.value = String(
      await confirm({ title: "Retry the upload? (root scope)" }),
    );
  };
  scoped.addEventListener("click", onScoped);
  plain.addEventListener("click", onPlain);
  return () => {
    scoped.removeEventListener("click", onScoped);
    plain.removeEventListener("click", onPlain);
  };
}
