import { BookIcon, StarIcon, UsersIcon } from "minerva-design/icons";
import { ResponsiveGrid, StatCard } from "minerva-design";

export default function StatCardsDemo() {
  return (
    <ResponsiveGrid
      as="section"
      aria-label="Metrics"
      columns={{ base: 1, sm: 3 }}
    >
      <StatCard label="Books" value="1,284" icon={<BookIcon size="1em" />} />
      <StatCard label="Readers" value="9.6k" icon={<UsersIcon size="1em" />} />
      <StatCard
        label="Reviews"
        value={0}
        icon={<StarIcon size="1em" />}
        description="No reviews yet"
      />
    </ResponsiveGrid>
  );
}
