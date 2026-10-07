// `dimensions` is a JS property. The scale updates it itself and re-emits
// each row's change with the dimension key.
interface Dimension {
  key: string;
  label: string;
  value: number;
  hint?: string;
}
type Scale = HTMLElement & { dimensions: readonly Dimension[] };

export function setup(root: HTMLElement) {
  const scale = root.querySelector<Scale>("#scale")!;
  const summary = root.querySelector<Scale>("#summary")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  scale.dimensions = [
    { key: "plot", label: "Plot", value: 8.2, hint: "Story and pacing" },
    { key: "characters", label: "Characters", value: 7.5 },
    { key: "writing", label: "Writing", value: 9 },
  ];
  summary.dimensions = scale.dimensions;
  const onChange = (event: Event) => {
    const { key, value, dimensions } = (
      event as CustomEvent<{
        key: string;
        value: number;
        dimensions: readonly Dimension[];
      }>
    ).detail;
    summary.dimensions = dimensions;
    result.value = `${key} = ${value}`;
  };
  scale.addEventListener("minerva-change", onChange);
  return () => scale.removeEventListener("minerva-change", onChange);
}
