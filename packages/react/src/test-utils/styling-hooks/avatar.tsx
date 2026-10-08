import { Avatar } from "../../components/Avatar";
import type { HookScenario } from "./types";

export default [
  { name: "image", element: <Avatar src="a.png" name="Ada Lovelace" /> },
  {
    name: "initials, every key",
    element: <Avatar name="Ada Lovelace" size="small" shape="square" />,
  },
  { name: "pixel size", element: <Avatar name="Ada" size={40} /> },
] satisfies HookScenario[];
