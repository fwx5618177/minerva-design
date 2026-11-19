import { CheckIcon, MoonIcon } from "minerva-design/icons";
import { Switch } from "minerva-design";

export default function IconsDemo() {
  return (
    <>
      <Switch label="Dark mode" icon={<MoonIcon size={10} />} defaultChecked />
      <Switch label="Auto-save" icon={<CheckIcon size={10} />} />
    </>
  );
}
