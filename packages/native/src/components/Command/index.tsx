import { useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Dialog } from "../Dialog";
import { Input } from "../Input";
export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
  disabled?: boolean;
}
export interface CommandDialogProps {
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  title?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  emptyText?: ReactNode;
  /** @default 12 */
  maxResults?: number;
  filter?: (items: CommandItem[], query: string) => CommandItem[];
  resultsLabel?: string;
}
export function CommandDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  items,
  onSelect,
  title = "Command palette",
  description,
  placeholder = "Search commands",
  emptyText = "No matching results",
  maxResults = 12,
  filter,
  resultsLabel = "Command results",
}: CommandDialogProps) {
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  const [query, setQuery] = useState("");
  const { tokens: t } = useTheme();
  const enabled = items.filter((item) => !item.disabled);
  const q = query.trim();
  const results = (
    q
      ? filter
        ? filter(enabled, q)
        : enabled.filter((item) =>
            [item.title, item.description, item.group, item.keywords]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(q.toLowerCase()),
          )
      : enabled
  )
    .filter((item) => !item.disabled)
    .slice(0, Math.max(0, maxResults));
  const pick = (item: CommandItem) => {
    onSelect(item);
    setShown(false);
    setQuery("");
  };
  return (
    <Dialog
      open={shown}
      onOpenChange={(next) => {
        setShown(next);
        if (!next) setQuery("");
      }}
      title={title}
      description={description}
    >
      <Input
        autoFocus
        accessibilityLabel="Search commands"
        placeholder={placeholder}
        value={query}
        onChange={setQuery}
        onSubmitEditing={() => {
          if (results[0]) pick(results[0]);
        }}
      />
      <View accessibilityLabel={resultsLabel}>
        {results.length ? (
          results.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              onPress={() => pick(item)}
              style={({ pressed }) => ({
                minHeight: t.touchTargetMin,
                padding: t.space["3"],
                backgroundColor: pressed
                  ? t.colors["surface-muted-color"]
                  : undefined,
              })}
            >
              <Text style={textStyle(t)}>{item.title}</Text>
              {Boolean(item.description) && (
                <Text style={textStyle(t, "sm")}>{item.description}</Text>
              )}
              {Boolean(item.group) && (
                <Text style={textStyle(t, "sm")}>{item.group}</Text>
              )}
            </Pressable>
          ))
        ) : typeof emptyText === "string" ? (
          <Text style={textStyle(t)}>{emptyText}</Text>
        ) : (
          emptyText
        )}
      </View>
    </Dialog>
  );
}
