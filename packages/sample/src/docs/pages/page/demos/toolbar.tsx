import { Button, Divider, TextField, Toolbar } from "@minerva/lib-core";

export default function ToolbarDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Toolbar aria-label="Filters">
        <TextField name="query" label="Search books" />
        <Button variant="secondary">Reset</Button>
        <Button>Apply</Button>
      </Toolbar>
      <Toolbar density="compact" wrap={false} aria-label="Formatting">
        <Button size="small" variant="secondary">
          Bold
        </Button>
        <Divider orientation="vertical" />
        <Button size="small" variant="secondary">
          Italic
        </Button>
      </Toolbar>
    </div>
  );
}
