import { useState } from "react";
import { Chip } from "@minerva/lib-core";

const filters = ["All", "Open", "In review", "Closed"];

export default function ClickableDemo() {
  const [active, setActive] = useState("All");

  return (
    <>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          variant="outlined"
          color="primary"
          clickable
          selected={active === filter}
          onClick={() => setActive(filter)}
        />
      ))}
    </>
  );
}
