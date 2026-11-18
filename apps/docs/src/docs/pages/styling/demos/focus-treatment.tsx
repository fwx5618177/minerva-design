import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  CommandDialog,
  DatePicker,
  FormField,
  Input,
  Stack,
  Textarea,
} from "minerva-design";

/** The frame owns focus; native fields must not add another outline. */
export default function FocusTreatment() {
  const { t } = useTranslation();
  const text = (key: string) => t(`docs.styling.focusDemo.${key}`);
  const dateRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <Stack gap={4} style={{ width: "100%", maxWidth: 760 }}>
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        }}
      >
        <FormField label={text("name")}>
          <Input placeholder={text("placeholder")} />
        </FormField>
        <FormField label={text("date")}>
          <DatePicker
            ref={dateRef}
            aria-label={text("date")}
            value={date}
            onChange={setDate}
          />
        </FormField>
        <FormField label={text("invalid")} errorMessage={text("error")}>
          <Input defaultValue="hello@" />
        </FormField>
        <FormField label={text("readonly")}>
          <Input readOnly defaultValue="Minerva Studio" />
        </FormField>
      </div>
      <FormField label={text("notes")}>
        <Textarea rows={2} placeholder={text("notesPlaceholder")} />
      </FormField>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Button variant="outline" onClick={() => setOpen(true)}>
          {text("commands")}
        </Button>
        <output aria-live="polite">{selected}</output>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={text("commands")}
        shortcut={[]}
        items={[
          {
            id: "schedule",
            title: text("schedule"),
            keywords: "schedule date calendar",
          },
          { id: "clear", title: text("clear"), keywords: "clear reset date" },
        ]}
        onSelect={(item) => {
          setSelected(item.title);
          if (item.id === "clear") setDate("");
          else requestAnimationFrame(() => dateRef.current?.focus());
        }}
      />
    </Stack>
  );
}
