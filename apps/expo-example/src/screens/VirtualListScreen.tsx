import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { VirtualList } from "minerva-design/native";
import { Screen, Paragraph } from "../ui";
const rows = Array.from({ length: 10000 }, (_, id) => ({ id }));
export function VirtualListScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const { height } = useWindowDimensions();
  return (
    <Screen title="Virtual list" scroll={false}>
      <Paragraph>
        {selected === null
          ? "10,000 rows. Select any row."
          : `Selected row ${selected}`}
      </Paragraph>
      <VirtualList
        accessibilityLabel="Ten thousand records"
        items={rows}
        maxHeight={Math.max(200, height - 200)}
        itemHeight={48}
        renderItem={(item) => <Paragraph>Record {item.id}</Paragraph>}
        onItemClick={(item) => setSelected(item.id)}
      />
    </Screen>
  );
}
