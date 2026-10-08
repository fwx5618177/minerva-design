import { IconButton } from "../../components/IconButton";
import type { HookScenario } from "./types";

const Icon = () => <svg />;

export default [
  {
    name: "default",
    element: <IconButton label="Settings" icon={<Icon />} />,
  },
  {
    name: "toggle pressed, every key",
    element: (
      <IconButton
        label="Bold"
        pressed
        onPressedChange={() => {}}
        size="small"
        variant="solid"
        color="danger"
        shape="square"
      >
        <Icon />
      </IconButton>
    ),
  },
  {
    name: "toggle not pressed",
    element: <IconButton label="Mute" defaultPressed={false} icon={<Icon />} />,
  },
  { name: "loading", element: <IconButton label="Saving" loading /> },
  {
    name: "disabled",
    element: <IconButton label="Delete" disabled icon={<Icon />} />,
  },
] satisfies HookScenario[];
