import { useState } from "react";
import { Text, View } from "react-native";
import { SegmentedControl } from "minerva-design/native";

type Mode = "day" | "week" | "month";

export default function Basic() {
  const [view, setView] = useState<Mode>("week");
  return (
    <View style={{ gap: 12 }}>
      <SegmentedControl<Mode>
        aria-label="Calendar view"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={view}
        onChange={setView}
      />
      <SegmentedControl
        fullWidth
        color="primary"
        aria-label="Status filter"
        options={["All", "Open", "Closed"]}
        defaultValue="All"
      />
      <Text>Showing the {view} view</Text>
    </View>
  );
}
