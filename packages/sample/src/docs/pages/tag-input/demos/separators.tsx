import { TagInput } from "@minerva/lib-core";
import { useState } from "react";

export default function SeparatorsDemo() {
  const [tags, setTags] = useState<readonly string[]>(["alice@example.com"]);
  return (
    <TagInput
      aria-label="Recipients"
      placeholder='Type or paste "a; b, c"'
      value={tags}
      onChange={setTags}
      separators={[",", ";", "Enter"]}
    />
  );
}
