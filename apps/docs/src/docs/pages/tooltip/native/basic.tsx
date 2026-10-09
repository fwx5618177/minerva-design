import { Tooltip, TooltipProvider, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <TooltipProvider>
      <Tooltip content="Long press to read contextual help">
        <Button variant="outline">Help</Button>
      </Tooltip>
    </TooltipProvider>
  );
}
