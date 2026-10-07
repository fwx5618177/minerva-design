import { Switch } from "@minerva/lib-core";

const colors = ["primary", "secondary", "success", "warning", "error"];

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <Switch key={color} color={color} label={color} defaultChecked />
      ))}
      <Switch color="#7c3aed" label="#7c3aed" defaultChecked />
    </>
  );
}
