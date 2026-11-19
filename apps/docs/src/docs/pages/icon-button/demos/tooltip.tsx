import { CopyIcon, InfoIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function TooltipDemo() {
  return (
    <>
      <IconButton
        icon={<CopyIcon size="1em" />}
        aria-label="Copy"
        showTooltip
        tooltip={{ content: "Copy to clipboard" }}
      />
      <IconButton
        icon={<InfoIcon size="1em" />}
        color="info"
        aria-label="More information"
        showTooltip
        tooltip={{ content: "Hover or focus to see me", arrow: true }}
      />
    </>
  );
}
