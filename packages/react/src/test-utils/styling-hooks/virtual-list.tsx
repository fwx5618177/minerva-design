import { VirtualList } from "../../components/VirtualList";
import type { HookScenario } from "./types";

const items = [{ id: 1 }, { id: 2 }];
const renderItem = (item: { id: string | number }) => <span>{item.id}</span>;

export default [
  {
    name: "rows, loading",
    element: (
      <VirtualList
        aria-label="Rows"
        items={items}
        itemHeight={20}
        maxHeight={100}
        renderItem={renderItem}
        loading
      />
    ),
  },
] satisfies HookScenario[];
