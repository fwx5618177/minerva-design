import {
  PlusIcon,
  ArrowLeftIcon,
  RefreshIcon,
  TrashIcon,
} from "minerva-design/icons";
import { Button } from "minerva-design";

export default function WithIconDemo() {
  return (
    <>
      <Button startIcon={<PlusIcon size="1em" aria-hidden />}>Add</Button>
      <Button color="danger" startIcon={<RefreshIcon size="1em" aria-hidden />}>
        Retry
      </Button>
      <Button
        color="neutral"
        variant="ghost"
        startIcon={<ArrowLeftIcon size="1em" aria-hidden />}
      >
        Back
      </Button>
      <Button color="danger" variant="outline" aria-label="Delete item">
        <TrashIcon size="1em" aria-hidden />
      </Button>
    </>
  );
}
