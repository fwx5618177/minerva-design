// navigable renders each step as a button. minerva-change is cancelable:
// the caller validates the transition (here: the terms checkbox).
type Step = { value: string; label: string; disabled?: boolean };
type Steps = HTMLElement & { items: Step[]; value: string };

const steps: Step[] = [
  { value: "account", label: "Account" },
  { value: "team", label: "Team" },
  { value: "billing", label: "Billing" },
  { value: "done", label: "Done", disabled: true },
];

export function setup(root: HTMLElement) {
  const wizard = root.querySelector<Steps>("#wizard")!;
  const terms = root.querySelector<HTMLInputElement>("#terms")!;
  const prev = root.querySelector<HTMLElement>("#prev")!;
  const next = root.querySelector<HTMLElement>("#next")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  wizard.items = steps;

  const allowed = (from: string) => from !== "account" || terms.checked;
  const onChange = (e: Event) => {
    if (!allowed(wizard.value)) {
      e.preventDefault();
      status.value = "Accept the terms first.";
      return;
    }
    status.value = `Moved to ${(e as CustomEvent<{ value: string }>).detail.value}`;
  };
  const move = (delta: number) => () => {
    const index = steps.findIndex((s) => s.value === wizard.value) + delta;
    const target = steps[index];
    if (!target || target.disabled) return;
    if (!allowed(wizard.value) && delta > 0) {
      status.value = "Accept the terms first.";
      return;
    }
    wizard.value = target.value;
    status.value = `Moved to ${target.value}`;
  };
  const onPrev = move(-1);
  const onNext = move(1);
  wizard.addEventListener("minerva-change", onChange);
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  return () => {
    wizard.removeEventListener("minerva-change", onChange);
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
  };
}
