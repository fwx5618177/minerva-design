import { ContextMenu, message } from "@minerva/lib-core";

export default function ContextMenuDemo() {
  return (
    <ContextMenu
      items={[
        { key: "open", label: "Open in new tab" },
        { key: "rename", label: "Rename", shortcut: "F2" },
        { type: "separator", key: "sep" },
        { key: "delete", label: "Delete" },
      ]}
      onSelect={(item) => message.info(`Selected: ${item.key}`)}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: 120,
          border: "1px dashed var(--border-color)",
          borderRadius: 8,
        }}
      >
        Right-click here
      </div>
    </ContextMenu>
  );
}
