import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Annual budget by department, in US dollars
const budget: TreemapNode[] = [
  { name: "Engineering", value: 4_200_000 },
  { name: "Sales", value: 2_800_000 },
  { name: "Marketing", value: 1_900_000 },
  { name: "Customer success", value: 1_200_000 },
  { name: "Operations", value: 900_000 },
  { name: "Finance", value: 600_000 },
  { name: "People", value: 500_000 },
  { name: "Legal", value: 300_000 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const format = (value: number) => currency.format(value);

export default function FlatDemo() {
  return (
    <TreemapChart
      data={budget}
      format={format}
      gap={4}
      height={320}
      ariaLabel="Annual budget by department"
    />
  );
}
