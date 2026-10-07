import { Divider } from "@minerva/lib-core";

export default function WithTextDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed">
        Right
      </Divider>
    </div>
  );
}
