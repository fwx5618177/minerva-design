import { useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Cell,
  SwipeCell,
  useTheme,
  type SwipeCellHandle,
} from "minerva-design/native";

export default function CustomActions() {
  const { colors } = useTheme();
  const cell = useRef<SwipeCellHandle>(null);
  const [state, setState] = useState("closed");
  const [qty, setQty] = useState(1);
  const step = (delta: number) => (
    <Button
      variant="ghost"
      accessibilityRole="button"
      onPress={() => setQty((n) => Math.max(1, n + delta))}
      style={{ width: 56, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 22, color: colors["primary-color"] }}>
        {delta > 0 ? "+" : "−"}
      </Text>
    </Button>
  );
  return (
    <View style={{ gap: 12 }}>
      <SwipeCell
        ref={cell}
        right={
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors["surface-muted-color"],
            }}
          >
            {step(-1)}
            {step(1)}
          </View>
        }
        onOpen={(side) => setState(`open (${side})`)}
        onClose={() => setState("closed")}
      >
        <Cell
          title="Margherita pizza"
          label="Large · $12.90"
          value={`× ${qty}`}
        />
      </SwipeCell>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button size="small" onPress={() => cell.current?.open("right")}>
          Edit quantity
        </Button>
        <Button
          size="small"
          variant="outline"
          onPress={() => cell.current?.close()}
        >
          Done
        </Button>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Cell is {state}
      </Text>
    </View>
  );
}
