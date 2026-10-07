import { Button, Menu, message } from "@minerva/lib-core";

export default function GroupsDemo() {
  return (
    <Menu
      size="small"
      side="bottom"
      align="start"
      items={[
        {
          type: "group",
          key: "file",
          label: "File",
          items: [
            { key: "new", label: "New" },
            { key: "open", label: "Open…" },
          ],
        },
        { type: "separator", key: "sep" },
        {
          key: "export",
          label: "Export as",
          children: [
            { key: "csv", label: "CSV" },
            { key: "json", label: "JSON" },
            { key: "pdf", label: "PDF", disabled: true },
          ],
        },
      ]}
      onSelect={(item) => message.info(`Selected: ${item.key}`)}
    >
      <Button variant="secondary">File</Button>
    </Menu>
  );
}
