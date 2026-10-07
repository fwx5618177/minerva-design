import { Switch } from "@minerva/lib-core";
import { FaCheck, FaMoon } from "react-icons/fa";

export default function IconsDemo() {
  return (
    <>
      <Switch label="Dark mode" icon={<FaMoon size={10} />} defaultChecked />
      <Switch label="Auto-save" icon={<FaCheck size={10} />} />
    </>
  );
}
