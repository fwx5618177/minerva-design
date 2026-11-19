import { SearchIcon } from "minerva-design/icons";
import { Empty } from "minerva-design";

export default function CustomIconDemo() {
  return (
    <Empty
      icon={<SearchIcon size={36} />}
      description={
        <span>
          No matches for <strong>“minerva”</strong>
        </span>
      }
    />
  );
}
