import { Tag } from "../../components/Tag";
import type { HookScenario } from "./types";

export default [
  {
    name: "icon, avatar, closable",
    element: (
      <Tag icon={<svg />} avatar={<img alt="" />} closable>
        Label
      </Tag>
    ),
  },
  {
    name: "pressed toggle, every key",
    element: (
      <Tag
        clickable
        pressed
        size="small"
        variant="solid"
        color="danger"
        shape="circle"
      >
        Filter
      </Tag>
    ),
  },
  {
    name: "unpressed toggle, disabled",
    element: (
      <Tag clickable pressed={false} disabled>
        Filter
      </Tag>
    ),
  },
  { name: "loading", element: <Tag loading>Saving</Tag> },
] satisfies HookScenario[];
