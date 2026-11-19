import { SearchIcon } from "minerva-design/icons";
import { Input } from "minerva-design";

export default function AddonsDemo() {
  return (
    <>
      <Input
        aria-label="Search"
        prefix={<SearchIcon size="1em" />}
        placeholder="Search"
      />
      <Input aria-label="Handle" prefix="@" defaultValue="minerva" />
      <Input aria-label="Price" prefix="$" suffix="USD" inputMode="decimal" />
    </>
  );
}
