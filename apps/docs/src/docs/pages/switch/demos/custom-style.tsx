import { Switch } from "minerva-design";

export default function CustomStyleDemo() {
  return (
    <>
      <Switch shape="square" label="Square" defaultChecked />
      <Switch label="No ripple" ripple={false} />
      <Switch
        label="Custom track & thumb"
        defaultChecked
        trackStyle={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }}
        thumbStyle={{ boxShadow: "0 0 0 2px #3b82f6" }}
      />
    </>
  );
}
