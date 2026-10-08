import { Button, List, ListItem } from "minerva-design";
import { LuGitBranch } from "react-icons/lu";

const branches = [
  { id: "main", name: "main", meta: "Production · deployed 3 min ago" },
  { id: "preview", name: "feat/checkout", meta: "Preview · 2 commits ahead" },
  { id: "docs", name: "docs/install", meta: "Preview · building" },
];

export default function BorderedDemo() {
  return (
    <List
      bordered
      density="comfortable"
      aria-label="Branches"
      style={{ maxWidth: 560 }}
    >
      {branches.map((branch) => (
        <ListItem
          key={branch.id}
          icon={<LuGitBranch />}
          primary={<span id={`branch-${branch.id}`}>{branch.name}</span>}
          secondary={branch.meta}
          actions={
            <Button
              size="small"
              variant="outline"
              aria-describedby={`branch-${branch.id}`}
            >
              Visit
            </Button>
          }
        />
      ))}
    </List>
  );
}
