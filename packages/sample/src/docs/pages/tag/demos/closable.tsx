import { useState } from "react";
import { Tag } from "@minerva/lib-core";
import { FaTimesCircle } from "react-icons/fa";

const initialTags = ["Tag 1", "Tag 2", "Tag 3"];

export default function ClosableDemo() {
  const [tags, setTags] = useState(initialTags);
  const [opened, setOpened] = useState<string>();

  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeIcon={index === 2 ? <FaTimesCircle aria-hidden /> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          // clickable + closable: the tag and its close button are two
          // separate buttons, both reachable with Tab
          clickable={index === 0}
          onClick={() => setOpened(tag)}
        >
          {tag}
        </Tag>
      ))}
      {opened && <span>Opened: {opened}</span>}
      {tags.length === 0 && (
        <button type="button" onClick={() => setTags(initialTags)}>
          Reset
        </button>
      )}
    </>
  );
}
