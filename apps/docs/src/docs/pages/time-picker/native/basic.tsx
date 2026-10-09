import { TimePicker } from "minerva-design/native";
export default function Basic() {
  return (
    <TimePicker
      label="Appointment"
      defaultValue={new Date(2026, 0, 1, 13, 30)}
      use12Hours
      minuteStep={15}
      clearable
    />
  );
}
