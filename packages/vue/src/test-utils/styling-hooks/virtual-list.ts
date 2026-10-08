import { h } from "vue";
import { VirtualList } from "../../components/VirtualList";
import type { HookScenario } from "./types";

const items = [{ id: 1 }, { id: 2 }];
const renderItem = (item: { id: string | number }) => h("span", item.id);

export default [
  {
    name: "rows, loading",
    render: () =>
      h(VirtualList, {
        "aria-label": "Rows",
        items,
        itemHeight: 20,
        maxHeight: 100,
        renderItem,
        loading: true,
      }),
  },
] satisfies HookScenario[];
