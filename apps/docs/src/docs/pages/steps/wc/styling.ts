type Step = { value: string; label: string };

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement & { items: Step[] }>("#styled")!.items = [
    { value: "draft", label: "Draft" },
    { value: "review", label: "Review" },
    { value: "publish", label: "Publish" },
  ];
}
