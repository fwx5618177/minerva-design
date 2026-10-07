import type { CSSProperties } from "react";
import { Divider } from "@minerva/lib-core";

// The line color comes from the --divider-color custom property; set it
// inline, in a class or on an ancestor.
const violet = { "--divider-color": "#7c3aed" } as CSSProperties;
const green = { "--divider-color": "#16a34a" } as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider style={violet} thickness={2} />
      <Divider style={green} thickness={3} variant="dashed" length="50%" />
      <Divider style={violet}>Section</Divider>
      <Divider spacing={32} elevation />
    </div>
  );
}
