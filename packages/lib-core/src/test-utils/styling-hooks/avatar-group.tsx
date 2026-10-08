import { Avatar, AvatarGroup } from "../../components/Avatar";
import type { HookScenario } from "./types";

export default [
  {
    name: "with +N",
    element: (
      <AvatarGroup max={1}>
        <Avatar name="Ada" />
        <Avatar name="Alan" />
      </AvatarGroup>
    ),
  },
] satisfies HookScenario[];
