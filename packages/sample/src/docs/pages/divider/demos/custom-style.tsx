import { Divider } from "@minerva/lib-core";

export default function CustomStyleDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider color="#7c3aed" thickness={2} />
      <Divider color="#16a34a" thickness={3} variant="dashed" length="50%" />
      <Divider spacing={32} elevation />
    </div>
  );
}
