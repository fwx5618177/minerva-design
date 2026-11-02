import { FormControl, FormHelperText, FormLabel, Slider } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Disabled" defaultValue={40} disabled />
      <Slider aria-label="Read only" defaultValue={60} readOnly showValue />
      <FormControl invalid>
        <FormLabel>Daily goal (minutes)</FormLabel>
        <Slider defaultValue={5} max={120} step={5} showValue />
        <FormHelperText>Pick at least 10 minutes.</FormHelperText>
      </FormControl>
    </div>
  );
}
