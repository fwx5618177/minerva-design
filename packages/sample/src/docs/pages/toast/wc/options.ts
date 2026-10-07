// Options: title, description, duration, action, closable...; `max` keeps
// the 3 newest toasts. minerva-close tells why a toast closed.
type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
};
type Region = HTMLElement & { toast: (options: ToastOptions) => unknown };
type Close = CustomEvent<{ id: string | number; reason: string }>;

export function setup(root: HTMLElement) {
  const region = root.querySelector<Region>("#options-region")!;
  const button = root.querySelector<HTMLElement>("#archive")!;
  const log = root.querySelector<HTMLElement>("#options-log")!;
  let count = 0;
  const onClick = () => {
    count += 1;
    const name = `Conversation #${count}`;
    region.toast({
      title: "Conversation archived",
      description: `${name} moved to the archive.`,
      duration: 8000,
      action: {
        label: "Undo",
        onClick: () => (log.textContent = `${name} restored`),
      },
    });
  };
  const onClose = (event: Event) => {
    const { id, reason } = (event as Close).detail;
    log.textContent = `Toast ${id} closed (reason: ${reason})`;
  };
  button.addEventListener("click", onClick);
  region.addEventListener("minerva-close", onClose);
  return () => {
    button.removeEventListener("click", onClick);
    region.removeEventListener("minerva-close", onClose);
  };
}
