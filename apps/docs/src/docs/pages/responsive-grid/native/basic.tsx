import { useState } from "react";
import { ResponsiveGrid, GridItem, Button } from "minerva-design/native";
export default function Basic() {
  const [count, setCount] = useState(0);
  return (
    <ResponsiveGrid columns={{ base: 1, sm: 2 }} gap={3}>
      <GridItem text="Project A" />
      <GridItem text="Project B" />
      <GridItem fullWidth text="Spans the complete row" />
      <GridItem fullWidth asChild>
        <Button onPress={() => setCount((value) => value + 1)}>
          {`Slotted full row: ${count}`}
        </Button>
      </GridItem>
    </ResponsiveGrid>
  );
}
