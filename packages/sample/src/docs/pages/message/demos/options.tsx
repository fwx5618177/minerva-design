import { Button, message } from "@minerva/lib-core";
import { FiBell } from "react-icons/fi";

export default function OptionsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        onClick={() =>
          message.info({ content: "Shown for 8 seconds", duration: 8000 })
        }
      >
        Long duration
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          message.warning({
            content: "Stays until you close it",
            duration: 0,
            showClose: true,
            closeAriaLabel: "Dismiss",
          })
        }
      >
        Sticky with close button
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          message.success({
            content: "Custom icon, no progress bar",
            icon: <FiBell />,
            showProgress: false,
            pauseOnHover: false,
          })
        }
      >
        Icon and no progress
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          message.info({
            content: "Click me to dismiss",
            duration: 0,
            maxWidth: 360,
            onClick: () => message.destroy(),
          })
        }
      >
        Clickable
      </Button>
    </div>
  );
}
