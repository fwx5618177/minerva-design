// Read-only progress: earlier steps are complete, the current one has
// aria-current="step". Steps are a JS property.
type Step = { value: string; label: string; disabled?: boolean };

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement & { items: Step[] }>("#order")!.items = [
    { value: "placed", label: "Order placed" },
    { value: "paid", label: "Payment confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];
}
