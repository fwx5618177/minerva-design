import { useState } from "react";
import { Text, View } from "react-native";
import { MonthCalendar, Button } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [value, setValue] =
    useState<import("minerva-design/native").CalendarValue>(null);
  return (
    <View>
      <Button onPress={() => setOpen(true)}>Choose date</Button>
      <Text>
        {value instanceof Date
          ? value.toLocaleDateString()
          : "No date selected"}
      </Text>
      <MonthCalendar
        poppable
        open={open}
        onOpenChange={setOpen}
        value={value}
        onChange={setValue}
      />
    </View>
  );
}
