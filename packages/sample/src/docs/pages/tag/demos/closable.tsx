import { useState } from "react";
import { Tag } from "@minerva/lib-core";
import { FaTimesCircle } from "react-icons/fa";

export default function ClosableDemo() {
  const [tags, setTags] = useState(["Tag 1", "Tag 2", "Tag 3"]);

  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeLabel={`Remove ${tag}`}
          closeIcon={index === 2 ? <FaTimesCircle aria-hidden /> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && (
        <button
          type="button"
          onClick={() => setTags(["Tag 1", "Tag 2", "Tag 3"])}
        >
          Reset
        </button>
      )}
    </>
  );
}
