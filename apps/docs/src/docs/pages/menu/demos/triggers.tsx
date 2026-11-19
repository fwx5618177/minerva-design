import { MoreVerticalIcon } from "minerva-design/icons";
import { Button, HStack, IconButton, Menu } from "minerva-design";

const items = [
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { type: "separator" as const, key: "sep" },
  { key: "sign-out", label: "Sign out" },
];

export default function TriggersDemo() {
  return (
    <HStack gap={4}>
      <Menu items={items} align="start">
        <Button color="neutral" variant="outline">
          Account ▾
        </Button>
      </Menu>
      <Menu items={items} aria-label="More actions">
        <IconButton
          icon={<MoreVerticalIcon size="1em" />}
          label="More actions"
        />
      </Menu>
    </HStack>
  );
}
