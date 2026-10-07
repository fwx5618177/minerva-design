import { useState } from "react";
import { Chip } from "@minerva/lib-core";
import { FaTrash } from "react-icons/fa";

export default function DeletableDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Vite", "Sass"]);

  const remove = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  return (
    <>
      {tags.map((tag, index) => (
        <Chip
          key={tag}
          label={tag}
          color="primary"
          variant="soft"
          onDelete={() => remove(tag)}
          deleteIcon={
            index === 0 ? <FaTrash size={12} aria-hidden /> : undefined
          }
          deleteLabel={`Remove ${tag} filter`}
        />
      ))}
      {tags.length === 0 && <span>All chips removed</span>}
    </>
  );
}
