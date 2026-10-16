import { useState } from "react";
import { DatePicker } from "minerva-design/native";

export default function Basic() {
  const [date, setDate] = useState<string | null>("2026-01-15");
  return (
    <DatePicker
      label="Departure"
      value={date}
      onChange={setDate}
      minDate="2026-01-10"
      maxDate="2026-02-20"
      clearable
    />
  );
}
